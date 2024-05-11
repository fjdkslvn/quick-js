import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.notice.findMany({
        orderBy: {
          create_date: 'desc'
        }
      });
      console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error getting notice:', error);
  }
}