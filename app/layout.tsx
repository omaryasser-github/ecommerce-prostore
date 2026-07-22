import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME , API_URL } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {template: `%s | ${APP_NAME}`, default: APP_NAME},
  description: APP_DESCRIPTION,
  metadataBase: new URL(API_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
