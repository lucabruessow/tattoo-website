// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://lucabruessow.github.io',
    base: '/tattoo-website',
    fonts: [
        {
            provider: fontProviders.local(),
            name: "Inter",
            cssVariable: "--font-inter",
            options: {
                variants: [
                    {
                        weight: "100 900",
                        style: "normal",
                        src: ["./src/assets/fonts/Inter-Regular.woff2"],
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: "Mrs Sheppards",
            cssVariable: "--font-mrs-sheppard",
            options: {
                variants: [
                    {
                        weight: "400",
                        style: "normal",
                        src: ["./src/assets/fonts/MrsSheppards-Regular.woff2"]
                    }
                ]
            }

        }
    ]
});
