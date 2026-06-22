import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  createMetadata,
  localBusinessSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { SunLoader } from "@/components/shared/SunLoader";
import { SolarChatbot } from "@/components/shared/SolarChatbot";
import { SITE } from "@/lib/constants";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: "Capital Solar Energy — Premium Solar Canberra",
    description: SITE.description,
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={poppins.variable}>
      <head>
        <JsonLd
          data={[localBusinessSchema(), serviceSchema(), faqSchema()]}
        />
      </head>
      <body className="font-sans antialiased">
        <SunLoader />
        <Header />
        <main>{children}</main>
        <Footer />
        <SolarChatbot />
      </body>
    </html>
  );
}
