import { NextRequest, NextResponse } from "next/server";
import initializeFirebaseApp from "@/db/firebase";

export async function GET(request: NextRequest) {
  try {
    const db = await initializeFirebaseApp();
    const sideMenuRef = db.collection('service').doc('side_menu');
    const sideMenuDoc = await sideMenuRef.get();
    const sideMenuList = await sideMenuDoc.data();

    return NextResponse.json(sideMenuList ? sideMenuList.side_menu : []);
  } catch (error) {
    console.error('Error getting side menus:', error);
  }
}