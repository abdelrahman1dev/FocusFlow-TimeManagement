import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";



export const metadata: Metadata = {
  title: "FocusFlow",
  description: "time organization tool for students.",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <meta name="google-adsense-account" content="ca-pub-5943665143606369"></meta>
      <html lang="en">

      <body
        className={` antialiased px-5 bg-white`}
      >
  <main>{children}</main>
  <Footer />
      </body>
    </html>
    </>
  );
}
