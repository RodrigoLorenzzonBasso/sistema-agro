import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const adminEmail = process.env.AUTHORIZED_ADMIN_EMAIL;
    const employeeEmails = process.env.AUTHORIZED_EMAILS?.split(",") || [];

    if (!adminEmail || !employeeEmails.length) {
        throw new Error(
            "AUTHORIZED_ADMIN_EMAIL ou AUTHORIZED_EMAILS não foram definidos."
        );
    }

    await prisma.user.upsert({
        where: {
            email: adminEmail,
        },
        update: {
            active: true,
            role: "ADMIN",
        },
        create: {
            email: adminEmail,
            role: "ADMIN",
            active: true,
        },
    });

    for (const email of employeeEmails) {
        await prisma.user.upsert({
            where: {
                email: email,
            },
            update: {
                active: true,
                role: "EMPLOYEE",
            },
            create: {
                email: email,
                role: "EMPLOYEE",
                active: true,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);

        await prisma.$disconnect();

        process.exit(1);
    });