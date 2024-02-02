import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import UserProvider from "@/context/UserContext";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SessionProvider>
  );
}
