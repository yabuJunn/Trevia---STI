import supabase from './supabaseClient'
import type { group, groupMembers } from './supabaseGetUser'

export type UpdateMemberResult = {
  success: boolean
  message?: string
  updatedGroup?: group
}

/**
 * Actualiza la respuesta de un miembro concreto dentro de un grupo:
 *   - Graba `questionnaireData`
 *   - Marca `questionnaireCompleted` en true
 * @param userId UUID del usuario
 * @param groupId ID numérico del grupo dentro de `groups`
 * @param memberName Nombre del miembro (clave para encontrarlo)
 * @param questionnaireData Objeto con las respuestas del formulario
 */
export async function updateMemberQuestionnaire(
  userId: string,
  groupId: number,
  memberName: string,
  questionnaireData: {
    destination: string
    activities: string[]
    budget: string
    lodging: string
    comfort: string
    climate: string
  }
): Promise<UpdateMemberResult> {
  // 1) Recuperar el array completo
  const { data: userRow, error: fetchError } = await supabase
    .from('Users')
    .select('groups')
    .eq('id', userId)
    .single()

  if (fetchError) {
    return { success: false, message: fetchError.message }
  }
  const existingGroups: group[] = userRow?.groups ?? []

  // 2) Transformar los grupos, actualizando sólo el miembro apuntado
  const updatedGroups: group[] = existingGroups.map((grp) => {
    if (grp.id !== groupId) return grp

    const newMembers: groupMembers[] = grp.members?.map((m) => {
      if (m.name !== memberName) return m
      return {
        ...m,
        questionnaireCompleted: true,
        questionnaireData
      }
    }) ?? []

    return {
      ...grp,
      members: newMembers
    }
  })

  // 3) Actualizar la columna JSONB en Supabase
  const { error: updateError } = await supabase
    .from('Users')
    .update({ groups: updatedGroups })
    .eq('id', userId)

  if (updateError) {
    return { success: false, message: updateError.message }
  }

  // 4) Devolver el grupo ya actualizado
  const updatedGroup = updatedGroups.find((g) => g.id === groupId)
  return { success: true, updatedGroup }
}
