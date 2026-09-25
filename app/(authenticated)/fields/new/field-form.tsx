"use client";

import { useActionState } from "react";
import { createField } from "../actions";
import Link from "next/link";

export default function FieldForm() {
    const [state, formAction, isPending] = useActionState(createField, { error: "", fields: { name: "", area: "" } });

    return (
        <form action={formAction}>
            { state.error && <p>{state.error}</p> }

            <div>
                <label htmlFor="name">
                    Nome
                </label>

                <input required autoComplete="off" id="name" name="name" type="text" key={state.fields.name} defaultValue={state.fields.name}/>
            </div>

            <div>
                <label htmlFor="area">
                    Área (ha)
                </label>

                <input
                    required
                    id="area"
                    name="area"
                    type="number"
                    step="0.01"
                    key={state.fields.area}
                    defaultValue={state.fields.area}
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
            >
                {isPending ? "Salvando..." : "Salvar"}
            </button>

            <Link href="/fields">
                Voltar
            </Link>
        </form>
    )
}