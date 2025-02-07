import { NextRequest, NextResponse } from "next/server";
import initializeFirebaseApp from "@/db/firebase";
import { setCorsHeaders } from "@/utils/cors";

export async function GET(request: NextRequest) {
  try {
    const db = await initializeFirebaseApp();
    const noticeRef = db.collection("service").doc("notice");
    const noticeDoc = await noticeRef.get();
    const noticeList = await noticeDoc.data();

    const response = NextResponse.json(noticeList ? noticeList.notice : []);
    return setCorsHeaders(response); // CORS 설정 추가
  } catch (error) {
    console.error("Error getting notice:", error);
    const response = NextResponse.json({
      msg: "공지사항을 가져오는데 실패했습니다.",
      error: error,
      status: 500,
    });
    return setCorsHeaders(response); // CORS 설정 추가
  }
}
