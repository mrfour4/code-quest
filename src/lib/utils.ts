import { User } from "@clerk/nextjs/server";
import { clsx, type ClassValue } from "clsx";
import { marked } from "marked";
import stc from "string-to-color";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getUserInfo(user: User) {
    const name =
        user.fullName || user.emailAddresses[0].emailAddress || "Anonymous";
    const color = stc(`light-${user.id}`);
    const avatar = user.imageUrl;

    return {
        id: user.id,
        name,
        avatar,
        color,
    };
}

export function parseMarkdownIntoBlocks(markdown: string) {
    const tokens = marked.lexer(markdown);
    return tokens.map((token) => token.raw);
}
