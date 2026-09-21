import LogoutButton from "@/app/components/LogoutButton";

export default async function DashboardPage() {

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">
                Dashboard
            </h1>

            <p>
                Bem-vindo
            </p>

            <LogoutButton />
        </main>
    );
}