import supabase from './supabaseClient';
import type { group, groupMembers } from './supabaseGetUser';

export type AddGroupResult = {
    success: boolean;
    message?: string;
    newGroup?: group;
};

/**
 * Añade un nuevo grupo de tipo "beforeRecommendation" al final
 * del array jsonb `groups` del usuario indicado.
 * @param userId UUID del usuario en Supabase.
 * @param memberNames Array de strings con los nombres de los nuevos miembros.
 */
export async function addNewGroup(
    userId: string,
    memberNames: string[]
): Promise<AddGroupResult> {
    // 1) Leer el campo `groups` de la fila userId
    const { data: userRow, error: fetchError } = await supabase
        .from('Users')
        .select('groups')
        .eq('id', userId)
        .single();

    if (fetchError) {
        return { success: false, message: fetchError.message };
    }

    const existingGroups: group[] = userRow?.groups ?? [];

    // 2) Construir members como groupMembers[]
    const members: groupMembers[] = memberNames.map((name) => ({
        name,
        questionnaireCompleted: false
    }));

    // 3) Calcular nuevo ID
    const nextId =
        existingGroups.length > 0
            ? Math.max(...existingGroups.map((g) => g.id)) + 1
            : 1;

    // 4) Crear el objeto newGroup
    const newGroup: group = {
        id: nextId,
        type: 'beforeRecommendation',
        members
    };

    // 5) Insertar al final del array
    const updatedGroups = [...existingGroups, newGroup];

    // 6) Guardar de vuelta en Supabase
    const { error: updateError } = await supabase
        .from('Users')
        .update({ groups: updatedGroups })
        .eq('id', userId);

    if (updateError) {
        return { success: false, message: updateError.message };
    }

    return { success: true, newGroup };
}
