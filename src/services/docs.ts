'use server'

import { sql } from "@vercel/postgres";

export interface Docs {
	id : number,
	title : string,
	description : string,
	display_code : string,
}

export async function getDocsData(name:string): Promise<Docs[]> {
	try {
		const { rows }: { rows: Docs[] } = await sql
			`SELECT d.id, d.title, d.description, d.display_code 
			FROM docs d
			JOIN side_submenu s ON d.side_submenu_id = s.id
			WHERE s.name = ${name} ORDER BY d.index ASC;`;
		return rows;
	} catch (error) {
		throw new Error('Failed to fetch docs data');
	}
}