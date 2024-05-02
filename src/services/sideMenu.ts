'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllSideMenus() {
  try {
    const data = await prisma.side_menu.findMany({
      include: {
        side_submenu: {
          include: {
            docs: true
          }
        }
      }
    });
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error getting all side menus`);
  } finally {
    await prisma.$disconnect();
  }
}