import type { Metadata } from 'next';
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import './globals.css';

const sans = Noto_Sans_SC({ variable: '--font-sans-cn', subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const serif = Noto_Serif_SC({ variable: '--font-serif-cn', subsets: ['latin'], weight: ['500', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://gewu-physics-translation.lezontbukercfdvs4.chatgpt.site'),
  title: '物译｜PhysAI Translation',
  description: '独立维护的 AI 辅助物理文章、专著与讲义中文翻译资料库。',
  icons: { icon: '/wuyi-logo.svg' },
  openGraph: { title: '物译｜PhysAI Translation', description: '原著、译本、术语与制作指南。', url: '/', siteName: '物译', locale: 'zh_CN', type: 'website', images: [{ url: '/og.png', width: 1734, height: 907, alt: '物译' }] },
  twitter: { card: 'summary_large_image', title: '物译｜PhysAI Translation', description: '原著、译本、术语与制作指南。', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
