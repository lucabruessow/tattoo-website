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
                variants : [
                    {
                        weight: "100 900",
                        style: "normal",
                        src: ["src/assets/fonts/InterVariable.woff2"]

                    }
                ]
            }
        },
        {
            provider: fontProviders.local(),
            name: "Nunito",
            cssVariable: "--font-nunito",
            options: {
                variants: [
                    {
                        weight: "100 900",
                        style: "normal",
                        src: ["./src/assets/fonts/Nunito-VariableFont_wght.woff2"]
                    }
                ]
            }

        }
    ]
});
