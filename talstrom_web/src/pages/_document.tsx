import { Html, Head, Main, NextScript } from "next/document";
import { inter } from '@/ui/fonts';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: {
    template: '%s | Talstrom',
    default: 'TalStrom', // a default is required when creating a template
  },
}

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>TalStrom</title>
      <body className={`${inter.className} antialiased`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
