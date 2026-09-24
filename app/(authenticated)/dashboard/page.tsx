import LogoutButton from "@/app/components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">
                Dashboard
            </h1>

            <p>
                Bem-vindo
            </p>

            <Link href="/seasons">Safras</Link>

            <Link href="/fields">Talhões</Link>

            <LogoutButton />
        </main>
    );
}