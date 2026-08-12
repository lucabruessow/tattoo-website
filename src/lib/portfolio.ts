import type { ImageMetadata } from "astro";

export interface PortfolioImage {
    src: ImageMetadata;
    alt: string;
}

export interface PortfolioCategory {
    slug: string;
    title: string;
    cover: ImageMetadata | undefined;
    images: PortfolioImage[];
}

/* Alle Bilder aus allen Kategorie-Ordnern einlesen.
   Der Pfad muss ein Literal sein - Variablen funktionieren hier nicht. */
const files = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/portfolio/*/*.{jpg,jpeg,png,webp,avif}",
    { eager: true },
);

const altFiles = import.meta.glob<{ default: Record<string, string> }>(
    "/src/assets/portfolio/*/alt.json",
    { eager: true },
);

const fileNameOf = (path: string) => path.split("/").pop() ?? path;

/** "02-roter-fuchs.jpg" -> "Roter fuchs" */
function altFromFileName(fileName: string): string {
    const base = fileName
        .replace(/\.[^.]+$/, "")      // Endung weg
        .replace(/^\d+[-_\s]*/, "")   // führende Nummer weg
        .replace(/[-_]+/g, " ")
        .trim();

    if (!base) return "Tattoo-Motiv";
    return base.charAt(0).toUpperCase() + base.slice(1);
}

export function getCategory(slug: string, title: string): PortfolioCategory {
    const prefix = `/src/assets/portfolio/${slug}/`;
    const alts = altFiles[`${prefix}alt.json`]?.default ?? {};

    const entries = Object.entries(files)
        .filter(([path]) => path.startsWith(prefix))
        .sort(([a], [b]) => a.localeCompare(b, "de", { numeric: true }));

    const coverEntry = entries.find(([path]) => /\/cover\.[a-z]+$/i.test(path));

    const ordered = coverEntry
        ? [coverEntry, ...entries.filter((entry) => entry !== coverEntry)]
        : entries;

    return {
        slug,
        title,
        cover: coverEntry?.[1].default ?? ordered[0]?.[1].default,
        images: ordered.map(([path, mod]) => {
            const fileName = fileNameOf(path);
            return {
                src: mod.default,
                alt: alts[fileName] ?? altFromFileName(fileName),
            };
        }),
    }
}