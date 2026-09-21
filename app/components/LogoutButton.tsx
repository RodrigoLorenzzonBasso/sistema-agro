import { signOut } from "@/auth";

export default function LogoutButton() {
    return (
        <form
            action={async () => {
                "use server";

                await signOut({
                    redirectTo: "/login",
                });
            }}
        >
            <button type="submit" className="rounded-md bg-red-500 px-4 py-2 text-white">
                Sair
            </button>
        </form>
    );
}