import { NextRequest, NextResponse } from "next/server";
import initializeFirebaseApp from "@/db/firebase";
import { FieldValue } from "firebase-admin/firestore";

const getFavoritesDocs = async (userID: string) => {
  const db = await initializeFirebaseApp();
  const favoritesRef = db.collection("favorites").doc(userID);
  const favoritesDoc = await favoritesRef.get();
  const favoritesList = await favoritesDoc.data();
  return favoritesList ? favoritesList.favorites : [];
};

export async function GET(request: NextRequest) {
  try {
    const userID = request.nextUrl.searchParams.get("user_id");
    const favoriteDocs = await getFavoritesDocs(userID ?? "");

    return NextResponse.json({ data: favoriteDocs, status: 200 });
  } catch (error) {
    console.error("Error getting favorites:", error);
  }
}

export async function POST(request: NextRequest) {
  const db = await initializeFirebaseApp();
  try {
    const body = await request.json();
    if (!body) {
      throw new Error("Request body is missing.");
    }

    const favoritesRef = db.collection("favorites").doc(body.user_id);
    try {
      await favoritesRef.update({
        favorites: FieldValue.arrayUnion(body.faorites_id),
      });
    } catch (error) {
      // 문서가 존재하지 않으면 생성
      await favoritesRef.set({
        favorites: [body.faorites_id],
      });
    }

    const favoriteDocs = await getFavoritesDocs(body.user_id);
    return NextResponse.json({
      msg: "즐겨찾기에 추가되었습니다.",
      data: favoriteDocs,
      status: 200,
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json({
      msg: "즐겨찾기에 추가하지 못했습니다.",
      error: error,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const db = await initializeFirebaseApp();
  try {
    const userID = request.nextUrl.searchParams.get("user_id") ?? "";
    const docsIDList = request.nextUrl.searchParams.get("docs_id_list") ?? "";

    const favoritesRef = db.collection("favorites").doc(userID);
    await favoritesRef.set({
      favorites: JSON.parse(docsIDList),
    });

    const favoriteDocs = await getFavoritesDocs(userID);
    return NextResponse.json({
      msg: "즐겨찾기에서 제외되었습니다.",
      data: favoriteDocs,
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return NextResponse.json({
      msg: "즐겨찾기에서 제외하지 못했습니다.",
      error: error,
      status: 500,
    });
  }
}
