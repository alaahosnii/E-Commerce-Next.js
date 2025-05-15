import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { Public_Sans } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";
import NavComponent from "./_components/NavComponent/NavComponent";
import Spacer from "./_components/Spacer/Spacer";
import { ToastContainer } from "react-toastify";

const bebas = Public_Sans({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce app with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.className}`}>
        <Providers>
          <Header />
          <div className="md:container md:mx-auto ml-5 mr-5">
            <NavComponent />
          </div>
          <Spacer direaction="horizontal" />
          <div className="">
            {children}
            <ToastContainer />
          </div>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
