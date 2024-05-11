import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
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
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error getting side menus:', error);
  }

}