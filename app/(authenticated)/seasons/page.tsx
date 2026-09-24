import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSeason } from "./actions";

export default async function SeasonsPage() {
    const seasons = await prisma.season.findMany({
        orderBy: [
            {
                year: "desc",
            },
            {
                type: "desc",
            },
        ],
    });

    return (
        <main>
            <h1>Safras</h1>

            <Link href="/seasons/new">
                Nova safra
            </Link>

            <div>
                {seasons.length === 0 ? (
                    <p>Nenhuma safra cadastrada.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Ano</th>
                                <th>Período</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {seasons.map((season) => (
                                <tr key={season.id}>
                                    <td>{season.year}</td>

                                    <td>
                                        {season.type === "SUMMER"
                                            ? "Verão"
                                            : "Inverno"}
                                    </td>

                                    <td>
                                        <form action={deleteSeason}>
                                            <input type="hidden" name="id" value={season.id} />
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
        </main>
    );
}