import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "@/components/Providers";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <main className="flex flex-col h-screen">
        <PageNavbar></PageNavbar>
        <div className="flex-grow h-full">
          <Component {...pageProps} />
        </div>
        <PageFooter></PageFooter>
        <Toaster></Toaster>
      </main>
    </Providers>
  );
}
