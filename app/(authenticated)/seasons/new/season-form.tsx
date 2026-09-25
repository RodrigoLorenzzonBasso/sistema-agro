"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createSeason } from "../actions";
import { seasonTypeLabels } from "@/lib/labels";

export default function SeasonForm() {
    const [state, formAction, isPending] = useActionState(createSeason, { error: "", fields: { year: "", type: "" } });

    return (
        <form action={formAction}>
            { state.error && <p>{state.error}</p> }

            <div>
                <label htmlFor="year">
                    Ano
                </label>

                <input required id="year" name="year" type="number" key={state.fields.year}
                    defaultValue={state.fields.year}
                />
            </div>

            <div>
                <label htmlFor="type">
                    Período
                </label>

                <select required id="type" name="type" key={state.fields.type} defaultValue={state.fields.type}>
                    <option value="" disabled>
                        Selecione
                    </option>

                    {Object.entries(seasonTypeLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>

            <button type="submit" disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar"}
            </button>

            <Link href="/seasons">
                Voltar
            </Link>
        </form>
    );
}