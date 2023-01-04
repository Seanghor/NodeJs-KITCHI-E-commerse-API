import { User } from '@prisma/client';
import { prisma } from '../prisma/db';

const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email,
        }
    })
};

const createUserByEmailAndPassword = async (user: User) => {
    return await prisma.user.create({
        data: user
    })
};

const findUserById = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}


export { findUserByEmail, createUserByEmailAndPassword, findUserById};