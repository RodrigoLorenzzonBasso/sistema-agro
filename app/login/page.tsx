import { signIn } from "@/auth";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-sm rounded-lg border p-8">
                <h1 className="mb-2 text-2xl font-bold">
                    Gerenciador da Fazenda
                </h1>

                <p className="mb-6 text-gray-600">
                    Entre para acessar o sistema.
                </p>

                <form
                    action={async () => {
                        "use server";

                        await signIn("google", {
                            redirectTo: "/dashboard",
                        });
                    }}
                >
                    <button
                        type="submit"
                        className="w-full rounded-md border px-4 py-2 font-medium"
                    >
                        Entrar com Google
                    </button>
                </form>
            </div>
        </main>
    );
}