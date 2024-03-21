'use server'

import { sql } from "@vercel/postgres";

export interface Docs {
	id : number,
	title : string,
	description : string,
	display_code : string,
}

export async function getDocsData(id:number): Promise<Docs[]> {
	try {
		const { rows }: { rows: Docs[] } = await sql
			`SELECT id, title, description, display_code FROM docs WHERE parent_id = ${id};`;
		return rows;
	} catch (error) {
		throw new Error('Failed to fetch docs data');
	}
}