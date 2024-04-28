'use server'

import { sql } from "@vercel/postgres";

export interface Notice {
    id: number;
    title: string;
    content: string;
    create_date: Date;
}

export async function getNoticeList(): Promise<Notice[]> {
	try {
		const { rows }: { rows: Notice[] } = await sql
			`SELECT id, title, content, create_date FROM notice ORDER BY create_date DESC;`;
		return rows;
	} catch (error) {
		throw new Error('Failed to fetch notice list');
	}
}