'use server'

import { sql } from "@vercel/postgres";
import { Docs } from "@/services/docs";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  link: string;
  sub_menus: SubMenuItem[];
}

export interface SubMenuItem {
  id: number;
  name: string;
  description: string;
  link: string;
  docs : Docs[];
}

export async function getSideMenuData(): Promise<MenuItem[]> {
  try {
    const { rows }: { rows: MenuItem[] } = await sql
      `SELECT
        m.id,
        m.name,
        m.description,
        m.link,
        COALESCE(json_agg(json_build_object('id', sub.id, 'name', sub.name, 'description', sub.description, 'link', sub.link) ORDER BY sub.index ASC), '[]') AS sub_menus
      FROM
        side_menu AS m
      LEFT JOIN
        side_submenu AS sub ON m.id = sub.side_menu_id
      GROUP BY
        m.id
      ORDER BY
        m.id ASC;`;
    return rows;
  } catch (error) {
    throw new Error('Failed to fetch side menu data');
  }
}

export async function getMenuData(name:string): Promise<MenuItem> {
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
        ) ORDER BY sub.index ASC) AS sub_menus
      FROM
        side_menu AS m
      LEFT JOIN
        side_submenu AS sub ON m.id = sub.side_menu_id
      WHERE
        m.name = ${name}
      GROUP BY
        m.id;`;
    return rows[0];
  } catch (error) {
    throw new Error('Failed to fetch menu data');
  }
}

export async function getSideToDocs(): Promise<MenuItem[]> {
  try {
    const { rows }: { rows: MenuItem[] } = await sql
      `SELECT
          m.id,
          m.name,
          m.description,
          m.link,
          COALESCE(json_agg(
              json_build_object(
                  'id', sub.id, 
                  'name', sub.name, 
                  'description', sub.description, 
                  'link', sub.link,
                  'docs', (
                      SELECT json_agg(json_build_object(
                          'id', d.id,
                          'title', d.title,
                          'description', d.description,
                          'display_code', d.display_code
                      ) ORDER BY d.index ASC)
                      FROM docs AS d
                      WHERE d.side_submenu_id = sub.id
                  )
              ) ORDER BY sub.index ASC
          ), '[]') AS sub_menus
      FROM
          side_menu AS m
      LEFT JOIN
          side_submenu AS sub ON m.id = sub.side_menu_id
      GROUP BY
          m.id
      ORDER BY
          m.id ASC;`;
    return rows;
  } catch (error) {
    throw new Error('Failed to fetch menu data');
  }
}