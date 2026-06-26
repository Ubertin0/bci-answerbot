import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://balandin-cloud.ru'),
  title: 'BCI — 100% On-Premise ИИ-агент для первой линии поддержки (RAG)',
  description: 'Локальный ИИ-агент с RAG. Air-Gap, 152-ФЗ, интеграция с n8n/Qdrant/Ollama. Закрывает до 60% тикетов L1 без облаков.',
  keywords: ['ИИ-агент', 'RAG', 'On-Premise', 'L1-поддержка', 'Air-Gap', '152-ФЗ', 'n8n', 'Qdrant', 'Ollama'],
  authors: [{ name: 'Eugene Balandin', url: 'https://www.linkedin.com/in/eugene-balandin' }],
  alternates: {
    canonical: 'https://balandin-cloud.ru/',
  },
  icons: {
    icon: '/bci-favicon.svg',
    shortcut: '/bci-favicon.svg',
  },
  openGraph: {
    title: 'BCI — 100% On-Premise ИИ-агент для L1-поддержки',
    description: 'Локальный ИИ-агент с RAG. Air-Gap, 152-ФЗ. Закрывает до 60% тикетов L1.',
    url: 'https://balandin-cloud.ru/',
    siteName: 'Balandin Cloud Intelligence',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BCI — On-Premise ИИ-агент',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCI — 100% On-Premise ИИ-агент',
    description: 'Локальный ИИ-агент с RAG. Air-Gap, 152-ФЗ.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400&family=Playfair+Display:ital,wght@1,400&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TTT5QVPC');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'BCI (Balandin Cloud Intelligence)',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Linux, Windows',
              description: 'Локальный ИИ-агент (RAG) для автоматизации первой линии технической поддержки. Работает на 100% On-Premise без передачи данных в сторонние облака.',
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
              },
              creator: {
                '@type': 'Person',
                name: 'Eugene Balandin',
                url: 'https://www.linkedin.com/in/eugene-balandin',
              },
            }),
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TTT5QVPC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
