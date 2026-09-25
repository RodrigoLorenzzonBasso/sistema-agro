"use client";

import { useActionState } from "react";
import { createProduct } from "../actions";
import { productUnitLabels } from "@/lib/labels";
import Link from "next/link";

export default function ProductForm() {
    const [state, formAction, isPending] = useActionState(createProduct, { error: "", fields: { name: "", unit: "" } });

    return (
        <form action={formAction}>
            { state.error && <p>{state.error}</p> }

            <div>
                <label htmlFor="name">
                    Nome
                </label>

                <input required autoComplete="off" id="name" name="name" type="text" key={state.fields.name} defaultValue={state.fields.name} />
            </div>

            <div>
                <label htmlFor="unit">
                    Unidade
                </label>

                <select required id="unit" name="unit" key={state.fields.unit} defaultValue={state.fields.unit}>
                    <option value="" disabled>
                        Selecione
                    </option>

                    {Object.entries(productUnitLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" disabled={isPending}>
                {isPending ? "Criando..." : "Criar Produto"}
            </button>

            <Link href="/products">
                Voltar
            </Link>
        </form>
    );
}