import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

/**
 * TWK Lausanne — the site's default sans. Only 400 and 500 are shipped.
 */
export const lausanne = localFont({
  variable: "--font-lausanne",
  display: "swap",
  src: [
    { path: "../../public/fonts/TWKLausanne_400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/TWKLausanne_500.woff2", weight: "500", style: "normal" },
  ],
  // NOTE: the ascent/descent/size-adjust overrides orchid.ai ships belong to its
  // *fallback* face, not to Lausanne itself. Passing them through `declarations`
  // would apply them to the real font and scale every glyph (2% too wide).
  fallback: ["Arial"],
  adjustFontFallback: false,
});

/**
 * Louize — the serif used for every headline.
 *
 * NOTE: orchid.ai ships the *trial* cut of this commercial typeface. The files
 * mirrored into `public/fonts/` are those same trial files. Replace them with a
 * licensed copy (or a serif substitute) before deploying anywhere public.
 */
export const louize = localFont({
  variable: "--font-louize",
  display: "swap",
  src: [
    { path: "../../public/fonts/Louize_Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Louize_Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/Louize_Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Louize_MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/fonts/Louize_Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Louize_BoldItalic.otf", weight: "700", style: "italic" },
  ],
  // Same caveat as Lausanne — these overrides describe the fallback face only.
  fallback: ["Arial"],
  adjustFontFallback: false,
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const fontVariables = `${lausanne.variable} ${louize.variable} ${jetbrainsMono.variable}`;
