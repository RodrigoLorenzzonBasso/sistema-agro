import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteField } from "./actions";

export default async function FieldsPage() {
    const fields = await prisma.field.findMany();
    
    return (
        <div>
            <h1>Talhões</h1>

            <Link href="/fields/new">
                Novo talhão
            </Link>

            <div>
                {fields.length === 0 ? (
                    <p>Nenhum talhão cadastrado.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Área (ha)</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field) => (
                                <tr key={field.id}>
                                    <td>{field.name}</td>
                                    <td>{Number(field.area)}</td>
                                    <td>
                                        <form action={deleteField}>
                                            <input type="hidden" name="id" value={field.id} />
                                            <button type="submit">
                                                Excluir
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}