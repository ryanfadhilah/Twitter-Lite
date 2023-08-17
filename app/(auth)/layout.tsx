import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "Better Twitter",
  description: "Better than X - Twitter",
};

const inter = Inter({ subsets: ["latin"] });

type TypeRootLayout = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: TypeRootLayout) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
