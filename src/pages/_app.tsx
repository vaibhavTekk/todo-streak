import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "@/components/Providers";
import PageFooter from "@/components/PageFooter";
import PageNavbar from "@/components/PageNavbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <PageNavbar></PageNavbar>
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
        <PageFooter></PageFooter>
      </div>
    </Providers>
  );
}
