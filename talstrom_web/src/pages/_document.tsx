import { Html, Head, Main, NextScript } from "next/document";
import { inter } from '@/ui/fonts';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`${inter.className} antialiased`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}