import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/problems"],
            disallow: ["/api/", "/admin/"],
        },
        sitemap: "https://code-quest-kappa.vercel.app/sitemap.xml",
    };
}
