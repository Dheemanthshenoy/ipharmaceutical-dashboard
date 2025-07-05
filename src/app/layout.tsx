import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const font = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pharmaceutical Dashboard",
  description: "Monitor drug inventory, track expiry, analyze sales, and ensure compliance with a powerful and intuitive pharmaceutical dashboard.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <QueryProvider>
          <div className="container mx-auto py-4 lg:py-16">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
