"use client";
import { ProgressProvider } from "@bprogress/next/app";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import useShowWindowSize from "use-show-window-size";
import env from "@/env";

const PWAPrompt = dynamic(async () => import("react-ios-pwa-prompt"), {
  ssr: false,
});

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const t = useTranslations("Layout");

  useShowWindowSize({
    disable: process.env.NODE_ENV === "production",
  });

  return (
    <>
      {children}
      <ProgressProvider
        color="#cce6ff"
        disableSameURL={false}
        height="2px"
        options={{ showSpinner: true }}
        shallowRouting={true}
        startOnLoad={true}
      />
      <PWAPrompt
        appIconPath="/apple-icon.png"
        copyAddToHomeScreenStep={t("copyAddToHomeScreenStep") || undefined}
        copyDescription={t("copyDescription") || undefined}
        copyShareStep={t("copyShareStep") || undefined}
        copyTitle={t("copyTitle") || undefined}
        isShown={env.NEXT_PUBLIC_IS_SHOWN_PWA_PROMPT}
        promptOnVisit={1}
        timesToShow={1}
      />
    </>
  );
}
