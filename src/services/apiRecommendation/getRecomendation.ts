// src/services/recommendation.ts
import supabase from "../supabase/supabaseClient";
import type { group, groupMembers } from "../supabase/supabaseGetUser";
import { getWikipediaImage } from "./imageWikipedia";

// Cambia esta URL por la de tu túnel ngrok (sin el /recomendar)
const API_URL = "https://75e7-34-53-28-142.ngrok-free.app/";

/** Tipo que devuelve tu API de Flask */
export type Recommendation = {
    ciudad: string;
    país: string;
    descripcion: string;
    tipo_destino: string;
    presupuesto: string;
    alojamiento: string;
    zona_confort: string;
    clima: string;
    actividades: string[];
    score: number;
};

/**
 * Llama al endpoint /recomendar con los datos de questionnaireData de cada miembro.
 */
export async function requestRecommendation(
    userId: string,
    groupId: number,
    members: groupMembers[]
): Promise<{
    success: boolean;
    message?: string;
    recommendation?: Recommendation;
}> {
    try {
        // 1) Preparamos el body: un array de questionnaireData
        const payload = {
            grupo: members.map((m) => m.questionnaireData)
        };

        const res = await fetch(`${API_URL}/recomendar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json();
            return { success: false, message: err.error || res.statusText };
        }

        const { recomendaciones } = await res.json();
        if (!Array.isArray(recomendaciones) || recomendaciones.length === 0) {
            return { success: false, message: "No se obtuvieron recomendaciones" };
        }

        // 2) Tomamos la primera recomendación
        const top: Recommendation = recomendaciones[0];

        console.log("Recomendacion es: ", top);

        // 3) Construimos la URL de imagen (por ejemplo usando Unsplash)
        const imageUrl = await getWikipediaImage(top.ciudad) ?? "https://storage.googleapis.com/pod_public/1300/103141.jpg";

        // 4) Guardamos de vuelta en Supabase: marcamos el grupo como afterRecommendation
        const { data, error: fetchError } = await supabase
            .from("Users")
            .select("groups")
            .eq("id", userId)
            .single();

        // Y luego casteas:
        const userRow = data as { groups: group[] } | null;

        if (fetchError) {
            return { success: false, message: fetchError.message };
        }

        const updatedGroups: group[] = (userRow?.groups ?? []).map((g) =>
            g.id === groupId
                ? {
                    ...g,
                    type: "afterRecommendation",
                    destination: top.ciudad,
                    imageUrl,
                }
                : g
        );

        const { error: updateError } = await supabase
            .from("Users")
            .update({ groups: updatedGroups })
            .eq("id", userId);

        if (updateError) {
            return { success: false, message: updateError.message };
        }

        console.log("Database actualizado es: ", updatedGroups);
        

        return {
            success: true,
            recommendation: top,
        };
    } catch (e: unknown) {
        const errorMessage =
            e instanceof Error ? e.message : "Ocurrió un error desconocido";

        return { success: false, message: errorMessage };
    }

}
