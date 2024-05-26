import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getFavoritesDocs = async (userID:string) => {
  const favoriteDocs = await prisma.favorites.findMany({
    where: {
      user_id: userID ?? ''
    },
    include: {
      docs: {
        include: {
          side_submenu: {
            select: {
              link: true
            }
          }
        }
      }
    }
  });
  return favoriteDocs;
}

export async function GET(request: NextRequest) {
  try {
    const userID = request.nextUrl.searchParams.get("user_id");
    const favoriteDocs = await getFavoritesDocs(userID ?? '');
    
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

    const favoriteDocs = await getFavoritesDocs(body.user_id);
    
    return NextResponse.json({ msg:'즐겨찾기에 추가되었습니다.', data:favoriteDocs, status: 200 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ msg:'즐겨찾기에 추가하지 못했습니다.', error: error, status: 500 });
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

    const favoriteDocs = await getFavoritesDocs(userID ?? '');
    
    return NextResponse.json({ msg:'즐겨찾기에서 제외되었습니다.', data:favoriteDocs, status: 200 });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    return NextResponse.json({ msg:'즐겨찾기에서 제외하지 못했습니다.', error: error, status: 500 });
  }
}