"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createField(
    previousState: { error: string, fields: { name: string, area: number | "" } },
    formData: FormData  
): Promise<{ error: string, fields: { name: string, area: number | "" } }> {
    const name = formData.get("name")?.toString() || "";
    const area = Number(formData.get("area"));

    const fields = { name, area };
    
    if (!name || !area) {
        return { error: "Nome e área são obrigatórios.", fields };
    }

    if (area <= 0) {
        return { error: "Área deve ser maior que zero.", fields };
    }

    try {
        await prisma.field.create({
            data: {
                name,
                area,
            },
        });
    } catch (error) {
        return { error: "Erro ao criar talhão.", fields };

        throw error;
    }

    redirect("/fields");
}

export async function deleteField(formData: FormData) {
    const id = Number(formData.get("id"));

    await prisma.field.delete({
        where: {
            id,
        },
    });

    redirect("/fields");
}