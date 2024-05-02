'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllNotice() {
  try {
    const data = await prisma.notice.findMany();
    return data;
  } catch (error) {
    throw new Error(`Error getting all notice`);
  } finally {
    await prisma.$disconnect();
  }
}