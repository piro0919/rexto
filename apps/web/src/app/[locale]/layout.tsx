// eslint-disable-next-line filenames/match-exported
import { routing } from "@/i18n/routing";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={openSans.className}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
