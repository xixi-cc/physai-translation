import type { Metadata } from 'next';
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import './globals.css';

const sans = Noto_Sans_SC({ variable: '--font-sans-cn', subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const serif = Noto_Serif_SC({ variable: '--font-serif-cn', subsets: ['latin'], weight: ['500', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://gewu-physics-translation.lezontbukercfdvs4.chatgpt.site'),
  title: '格物译研｜AI 辅助物理文章翻译',
  description: '面向物理学论文、专著与讲义的中文翻译：AI 辅助、物理审核、LaTeX 专业交付。',
  icons: { icon: '/gewu-logo.png' },
  openGraph: {
    title: '格物译研｜让物理文章，准确地说中文。',
    description: 'AI 辅助、物理审核、LaTeX 专业交付。',
    url: '/',
    siteName: '格物译研',
    locale: 'zh_CN',
    type: 'website',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: '格物译研' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '格物译研｜让物理文章，准确地说中文。',
    description: 'AI 辅助、物理审核、LaTeX 专业交付。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
