import supabase from "./supabaseClient";

export type RegisterResult = {
    success: boolean;
    message: string;
};

export async function registerUser({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}): Promise<RegisterResult> {
    // 1) Crear usuario en Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (signUpError) {
        // fallo en Auth
        return { success: false, message: signUpError.message };
    }
    if (!data.user) {
        // esto no debería pasar, pero lo cubrimos
        return { success: false, message: 'No se pudo crear el usuario.' };
    }

    // 2) Insertar perfil en la tabla "Users"
    const { error: dbError } = await supabase
        .from('Users')
        .insert([
            {
                id: data.user.id,
                name,
                email,
                groups: [],          // o null, según tu lógica
            },
        ]);

    if (dbError) {
        // opcional: podrías hacer un rollback (eliminar el auth) si falla aquí
        return { success: false, message: dbError.message };
    }

    // 3) Todo OK
    return { success: true, message: 'Registro exitoso. ¡Bienvenido!' };
}
