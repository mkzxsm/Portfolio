/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        const NOTION_API_KEY = process.env.NOTION_API_KEY;
        const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

        const notionResponse = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${NOTION_API_KEY}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
        });

        if (!notionResponse.ok) {
            const errorData = await notionResponse.text();
            console.error("Помилка від Notion API:", errorData);
            return res.status(500).json({ error: "Помилка доступу до Notion API" });
        }

        const data: any = await notionResponse.json();

        const projects = data.results.map((page: any) => {
            return {
                id: page.id,
                title: page.properties.Name?.title[0]?.plain_text || "Без назви",
                description: page.properties.Description?.rich_text[0]?.plain_text || "",
                techStack: page.properties.TechStack?.multi_select.map((tag: any) => tag.name) || [],
                liveUrl: page.properties.LiveUrl?.url || undefined,
                githubUrl: page.properties.githubUrl?.url || undefined,
            };
        });

        res.status(200).json(projects);
    } catch (error) {
        console.error("Помилка бекенду:", error);
        res.status(500).json({ error: "Помилка сервера" });
    }
}
