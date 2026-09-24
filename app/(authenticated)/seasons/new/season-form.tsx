"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createSeason } from "../actions";

export default function SeasonForm() {
    const [state, formAction, isPending] = useActionState(createSeason, { error: "", year: "", type: "" });

    return (
        <form action={formAction}>
            { state.error && <p>{state.error}</p> }

            <div>
                <label htmlFor="year">
                    Ano
                </label>

                <input
                    required
                    id="year"
                    name="year"
                    type="number"
                    key={state.year}
                    defaultValue={state.year}
                />
            </div>

            <div>
                <label htmlFor="type">
                    Período
                </label>

                <select
                    required
                    id="type"
                    name="type"
                    key={state.type}
                    defaultValue={state.type}
                >
                    <option value="" disabled>
                        Selecione
                    </option>

                    <option value="SUMMER">
                        Verão
                    </option>

                    <option value="WINTER">
                        Inverno
                    </option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isPending}
            >
                {isPending ? "Salvando..." : "Salvar"}
            </button>

            <Link href="/seasons">
                Voltar
            </Link>
        </form>
    );
}