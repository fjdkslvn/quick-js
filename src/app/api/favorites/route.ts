import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userID = request.nextUrl.searchParams.get("user_id");
    const favoriteDocs = await prisma.favorites.findMany({
      where: {
        user_id: userID ?? ''
      },
      include: {
        docs: true
      }
    });
    
    return NextResponse.json({ data:favoriteDocs, status: 200 });
  } catch (error) {
    console.error('Error getting notice:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body) {
      throw new Error('Request body is missing.');
    }
    
    const newFavorite = await prisma.favorites.create({
      data: {
        user_id: body.user_id,
        docs_id: body.docs_id
      }
    });

    const favoriteDocs = await prisma.favorites.findMany({
      where: {
        user_id: body.user_id
      },
      include: {
        docs: true
      }
    });
    
    return NextResponse.json({ data:favoriteDocs, status: 200 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ msg:'즐겨찾기 등록에 실패하였습니다.', error: error, status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userID = request.nextUrl.searchParams.get("user_id");
    const docsID = request.nextUrl.searchParams.get("docs_id");
    const deletedData = await prisma.favorites.delete({
      where: {
        user_id_docs_id: {
          user_id: userID as string,
          docs_id: parseInt(docsID as string)
        }
      }
    });

    const favoriteDocs = await prisma.favorites.findMany({
      where: {
        user_id: userID ?? ''
      },
      include: {
        docs: true
      }
    });
    
    return NextResponse.json({ data:favoriteDocs, status: 200 });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    return NextResponse.json({ msg:'즐겨찾기 삭제에 실패하였습니다.', error: error, status: 500 });
  }
}