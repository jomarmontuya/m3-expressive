import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Material 3 Expressive React — Component Library & Design System",
  description:
    "A Material 3 Expressive React registry with 41 components, official design tokens, and spring-based expressive motion.",
  keywords: [
    "Material 3 Expressive",
    "Material Design 3",
    "React components",
    "design system",
    "M3 Expressive",
    "shadcn registry",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `try{
var c=localStorage.getItem('m3-color-theme');
if(c&&c!=='baseline'){document.documentElement.setAttribute('data-theme',c)}
var m=localStorage.getItem('m3-mode');
var d=m==='dark'||((!m||m==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);
if(d){document.documentElement.classList.add('dark')}
/* Custom Theme Builder scheme: persisted WITH its resolved var maps so the
   style tag can be rebuilt pre-paint without shipping the color engine. */
var cs=localStorage.getItem('m3-custom-scheme');
if(cs){var p=JSON.parse(cs);
if(p&&p.light&&p.dark){var f=function(r){var s='';for(var k in r){s+='--md-'+k+':'+r[k]+';'}return s};
var e=document.getElementById('m3-custom-scheme')||document.createElement('style');
e.id='m3-custom-scheme';
e.textContent=':root[data-theme="custom"]{'+f(p.light)+'}[data-theme="custom"].dark{'+f(p.dark)+'}';
document.head.appendChild(e);
document.documentElement.setAttribute('data-theme','custom')}
}
}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased bg-m3-surface text-m3-on-surface">{children}</body>
    </html>
  );
}
