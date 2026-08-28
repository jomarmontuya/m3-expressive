import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Material 3 Expressive React — Component Library & Design System",
  description:
    "A complete Material 3 Expressive React component library: 40+ components built on official M3 design tokens, spring-based expressive motion, and agentic-compatible APIs.",
  keywords: [
    "Material 3 Expressive",
    "Material Design 3",
    "React components",
    "design system",
    "M3 Expressive",
    "agentic UI",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Self-hosted Roboto Flex (official M3E typeface) + Material Symbols Rounded (official icon font) */}
        <link rel="stylesheet" href="/fonts/fonts.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{
var c=localStorage.getItem('m3-color-theme');
if(c&&c!=='baseline'){document.documentElement.setAttribute('data-theme',c)}
var m=localStorage.getItem('m3-mode');
var d=m==='dark'||((!m||m==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);
if(d){document.documentElement.classList.add('dark')}
}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased bg-m3-surface text-m3-on-surface">{children}</body>
    </html>
  );
}
