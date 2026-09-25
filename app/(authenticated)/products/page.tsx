import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { productUnitLabels } from "@/lib/labels";
import { deleteProduct } from "./actions";

export default async function ProductsPage() {
    const products = await prisma.product.findMany();

    return (
        <div>
            <h1>Produtos</h1>

            <Link href="/products/new">
                Novo produto
            </Link>

            <div>
                {products.length === 0 ? (
                    <p>Nenhum produto cadastrado.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Unidade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{productUnitLabels[product.unit]}</td>
                                    <td>
                                        <form action={deleteProduct}>
                                            <input type="hidden" name="id" value={product.id} />
                                            <button type="submit">Excluir</button>
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