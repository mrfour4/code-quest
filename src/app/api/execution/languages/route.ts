import { JUDGE0_LANGUAGE_ID_MAP } from "@/modules/code-editor/constants";
import { NextResponse } from "next/server";

const JUDGE0_IDS = Object.values(JUDGE0_LANGUAGE_ID_MAP);

export async function GET() {
    try {
        const res = await fetch("https://ce.judge0.com/languages/");
        const allLanguages = await res.json();

        const filtered = allLanguages.filter((lang: any) =>
            JUDGE0_IDS.includes(lang.id),
        );

        return NextResponse.json(filtered);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch languages" },
            { status: 500 },
        );
    }
}
