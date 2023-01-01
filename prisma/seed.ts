
import { PrismaClient, Teacher } from "@prisma/client";
import { teachers } from "./products";

const prisma = new PrismaClient();

async function main() {
    for (let teacher of teachers) {
        await prisma.teacher.create({
            data: teacher
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect
})