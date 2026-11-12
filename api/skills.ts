/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        const NOTION_API_KEY = process.env.NOTION_API_KEY;
        const NOTION_SKILLS_DATABASE_ID = process.env.NOTION_SKILLS_DATABASE_ID;

        const notionResponse = await fetch(`https://api.notion.com/v1/databases/${NOTION_SKILLS_DATABASE_ID}/query`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${NOTION_API_KEY}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
        });

        if (!notionResponse.ok) {
            const errorData = await notionResponse.text();
            console.error("Помилка Notion API для скілів:", errorData);
            return res.status(500).json({ error: "Помилка доступу до Notion API" });
        }

        const data: any = await notionResponse.json();

        const skillsList = data.results.map((page: any) => {
            return {
                id: page.id,
                name: page.properties.Name?.title[0]?.plain_text || "Без назви",
                category: page.properties.Category?.select?.name || "other",
                icon: page.properties.Icon?.rich_text[0]?.plain_text || "🔹",
            };
        });

        res.status(200).json(skillsList);
    } catch (error) {
        console.error("Помилка бекенду:", error);
        res.status(500).json({ error: "Помилка сервера" });
    }
}
