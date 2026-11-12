/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
import { Client } from "@notionhq/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        // @ts-ignore
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID as string,
        });

        const projects = response.results.map((page: any) => {
            return {
                id: page.id,
                title: page.properties.Name?.title[0]?.plain_text || "Без назви",
                description: page.properties.Description?.rich_text[0]?.plain_text || "",
                techStack: page.properties.TechStack?.multi_select.map((tag: any) => tag.name) || [],
                liveUrl: page.properties.LiveUrl?.url || undefined,
            };
        });

        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Помилка отримання даних з Notion" });
    }
}
