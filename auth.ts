import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
    ],

    callbacks: {
        async signIn({ user }) {
            if (!user.email) {
                return false;
            }

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: user.email,
                },
            });

            if (!existingUser) {
                return false;
            }

            if (!existingUser.active) {
                return false;
            }

            return true;
        },
    },
});