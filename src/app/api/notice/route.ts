import { NextRequest, NextResponse } from "next/server";
import initializeFirebaseApp from '@/db/firebase';

export async function GET(request: NextRequest) {
  try {
    const db = await initializeFirebaseApp();
    const noticeRef = db.collection('service').doc('notice');
    const noticeDoc = await noticeRef.get();
    const noticeList = await noticeDoc.data();

    return NextResponse.json(noticeList ? noticeList.notice : []);
  } catch (error) {
    console.error('Error getting notice:', error);
  }
}