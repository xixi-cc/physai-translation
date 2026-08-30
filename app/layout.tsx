import type { Metadata } from 'next';
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import './globals.css';

const sans = Noto_Sans_SC({ variable: '--font-sans-cn', subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const serif = Noto_Serif_SC({ variable: '--font-serif-cn', subsets: ['latin'], weight: ['500', '600', '700'] });

export const metadata: Metadata = {
  title: '格物译研｜AI 辅助物理文章翻译',
  description: '面向物理学论文、专著与讲义的中文翻译：AI 辅助、物理审核、LaTeX 专业交付。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
