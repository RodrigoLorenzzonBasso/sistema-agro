"use server";

import { prisma } from "@/lib/prisma";
import { ProductUnit } from "@/app/generated/prisma/client";
import { redirect } from "next/navigation";

export async function createProduct(
    previousState: { error: string, fields: { name: string, unit: string | "" } },
    formData: FormData  
): Promise<{ error: string, fields: { name: string, unit: string | "" } }> {
    const name = formData.get("name")?.toString() || "";
    const unit = formData.get("unit")?.toString() || "";
    
    const fields = { name, unit };

    if (!name || !unit) { 
        return { error: "Nome e unidade são obrigatórios.", fields };
    }

    if (!Object.values(ProductUnit).includes(unit as ProductUnit)) {
        return { error: "Unidade inválida.", fields };
    }

    try {
        await prisma.product.create({
            data: {
                name: name as string,
                unit: unit as ProductUnit,
            },
        });
    } catch (error) {
        return { error: "Erro ao criar produto.", fields };   
    }

    redirect("/products");
}

export async function deleteProduct(formData: FormData) {
    const id = Number(formData.get("id"));
    
    await prisma.product.delete({
        where: {
            id,
        },
    });

    redirect("/products");
}

