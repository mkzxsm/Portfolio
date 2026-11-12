/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        const { NOTION_API_KEY, NOTION_SKILLS_DATABASE_ID } = process.env;

        if (!NOTION_API_KEY || !NOTION_SKILLS_DATABASE_ID) {
            console.error("Відсутні змінні середовища");
            return res.status(500).json({ error: "Не налаштовані змінні середовища" });
        }

        const results: any[] = [];
        let cursor: string | undefined;

        do {
            const notionResponse = await fetch(
                `https://api.notion.com/v1/databases/${NOTION_SKILLS_DATABASE_ID}/query`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${NOTION_API_KEY}`,
                        "Notion-Version": "2022-06-28",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        page_size: 100,
                        ...(cursor && { start_cursor: cursor }),
                    }),
                },
            );

            if (!notionResponse.ok) {
                const errorData = await notionResponse.text();
                console.error("Помилка Notion API для скілів:", notionResponse.status, errorData);
                return res.status(500).json({ error: "Помилка доступу до Notion API" });
            }

            const data: any = await notionResponse.json();
            results.push(...data.results);
            cursor = data.has_more ? data.next_cursor : undefined;
        } while (cursor);

        const skillsList = results.map((page: any) => ({
            id: page.id,
            name: page.properties.Name?.title?.[0]?.plain_text || "Без назви",
            category: page.properties.Category?.select?.name || "other",
            icon: page.properties.Icon?.rich_text?.[0]?.plain_text || "🔹",
        }));

        res.status(200).json(skillsList);
    } catch (error) {
        console.error("Помилка бекенду:", error);
        res.status(500).json({ error: "Помилка сервера" });
    }
}
