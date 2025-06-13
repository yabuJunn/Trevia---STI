import supabase from "./supabaseClient";

export type OperationResult<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export async function logOutSupabase(): Promise<OperationResult<null>> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: null };
}