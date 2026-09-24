"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createSeason(
    previousState: { error: string, year: number | "", type: string },
    formData: FormData
): Promise<{ error: string, year: number | "", type: string }> {
    const year = Number(formData.get("year"));
    const type = formData.get("type")?.toString() || "";

    if (!year || !type) {
        return { error: "Ano e período são obrigatórios.", year, type };
    }

    if (type !== "SUMMER" && type !== "WINTER") {
        return { error: "Período inválido.", year, type };
    }

    try {
        await prisma.season.create({
            data: {
                year,
                type,
            },
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return {
                error: "Já existe uma safra cadastrada para esse ano e período.",
                year,
                type,
            };
        }

        throw error;
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