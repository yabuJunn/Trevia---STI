// src/utils/auth.ts
import supabase from "./supabaseClient";

export type AuthResult = {
    success: boolean;
    message: string;
};

export async function loginUser({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<AuthResult> {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, message: error.message };
    }

    // opcional: puedes inspeccionar data.session o data.user si lo necesitas
    return { success: true, message: 'Inicio de sesión exitoso.' };
}
