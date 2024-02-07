import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import UserProvider from "@/context/UserContext";
import "../styles/global.css";
import { ToDoProvider } from "@/context/TodoContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider>
        <ToDoProvider>
        <Component {...pageProps} />
        </ToDoProvider>
      </UserProvider>
    </SessionProvider>
  );
}
