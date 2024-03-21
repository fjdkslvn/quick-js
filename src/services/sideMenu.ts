'use server'

import { sql } from "@vercel/postgres";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  link: string;
  sub_menus: SubMenuItem[];
}

interface SubMenuItem {
  id: number;
  name: string;
  description: string;
  link: string;
}

export async function getSideMenuData(): Promise<MenuItem[]> {
  try {
    const { rows }: { rows: MenuItem[] } = await sql
      `SELECT
        m.id,
        m.name,
        m.description,
        m.link,
        COALESCE(json_agg(json_build_object('id', sub.id, 'name', sub.name, 'description', sub.description, 'link', sub.link)), '[]') AS sub_menus
      FROM
        side_menu AS m
      LEFT JOIN
        side_menu AS sub ON m.id = sub.parent_id
      WHERE
        m.parent_id IS NULL
      GROUP BY
        m.id;`;
    return rows;
  } catch (error) {
    throw new Error('Failed to fetch side menu data');
  }
}

export async function getMenuData(id:number): Promise<MenuItem> {
  try {
    const { rows }: { rows: MenuItem[] } = await sql
      `SELECT
        m.id AS id,
        m.name AS name,
        m.description AS description,
        m.link AS link,
        json_agg(json_build_object(
          'id', sub.id,
          'name', sub.name,
          'description', sub.description,
          'link', sub.link
        )) AS sub_menus
      FROM
        side_menu AS m
      LEFT JOIN
        side_menu AS sub ON m.id = sub.parent_id
      WHERE
        m.id = ${id}
      GROUP BY
        m.id;`;
    return rows[0];
  } catch (error) {
    throw new Error('Failed to fetch menu data');
  }
}