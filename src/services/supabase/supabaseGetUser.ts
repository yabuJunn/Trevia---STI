import supabase from "./supabaseClient";

export type UserProfile = {
    id: string;
    created_at: string;
    name: string;
    email: string;
    groups: group[];
};

type group = {
    id: number;
    type: "beforeRecommendation" | "afterRecommendation" | "newGroup";
    members?: groupMembers[];
}

type groupMembers = {
    name: string;
    questionnaireCompleted: boolean;
    questionnaireData?: {
        destination: string;
        activities: string[];
        budget: string;
        lodging: string;
        comfort: string;
        climate: string;
    }
}

/** Resultado genérico de las operaciones */
export type OperationResult<T> = {
    success: boolean;
    data?: T;
    message?: string;
};

/**
 * Obtiene el perfil completo del usuario que está en sesión,
 * consultando la tabla "users" en Supabase por su ID.
 */
export async function getUser(): Promise<OperationResult<UserProfile>> {
    // 1) Obtener datos de la sesión actual
    const {
        data: { user },
        error: sessionError
    } = await supabase.auth.getUser();

    if (sessionError) {
        return { success: false, message: sessionError.message };
    }
    if (!user) {
        return { success: false, message: 'No hay usuario autenticado.' };
    }

    // 2) Consultar la tabla "users" por el UUID del auth user
    const { data, error: dbError } = await supabase
        .from('Users')
        .select('*')
        .eq('id', user.id)
        .single();

    if (dbError) {
        return { success: false, message: dbError.message };
    }

    return { success: true, data: data as UserProfile };
}