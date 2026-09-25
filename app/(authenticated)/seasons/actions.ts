"use server";

import { prisma } from "@/lib/prisma";
import { SeasonType } from "@/app/generated/prisma/client";
import { redirect } from "next/navigation";

export async function createSeason(
    previousState: { error: string, fields: { year: number | "", type: string } },
    formData: FormData
): Promise<{ error: string, fields: { year: number | "", type: string } }> {
    const year = Number(formData.get("year"));
    const type = formData.get("type")?.toString() || "";

    const fields = { year, type };

    if (!year || !type) {
        return { error: "Ano e período são obrigatórios.", fields };
    }

    if (!Object.values(SeasonType).includes(type as SeasonType)) {
        return { error: "Período inválido.", fields };
    }

    try {
        await prisma.season.create({
            data: {
                year: year as number,
                type: type as SeasonType,
            },
        });
    } catch (error) {
        return { error: "Erro ao criar produto.", fields };  
    }

    redirect("/seasons");
}

export async function deleteSeason(formData: FormData) {
    const id = Number(formData.get("id"));

    await prisma.season.delete({
        where: {
            id,
        },
    });

    redirect("/seasons");
}