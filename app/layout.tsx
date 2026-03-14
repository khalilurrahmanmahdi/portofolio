import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import "./globals.css"
import MusicPlayer from "@/components/MusicPlayer"

const font = Work_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "Coding with Khalil | %s",
    default: "Coding with Khalil | Full Stack Developer",
  },
  description:
    "A seasoned frontend web developer with a passion for creating engaging and interactive websites.",
  metadataBase: new URL("https://khalilproject.my.id"),
  openGraph: {
    title: {
      template: "Coding with Khalil | %s",
      default: "Coding with Khalil | Full Stack Developer",
    },
    description:
      "A seasoned frontend web developer with a passion for creating engaging and interactive websites.",
    url: "https://khalilproject.my.id",
    siteName: "Coding with Khalil",
    images: [
      {
        url: "/images/og-images.jpg",
        width: 1000,
        height: 1200,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  keywords: [
    "khalilurrahman mahdi",
    "khalil",
    "coding with khalil",
    "full stack web developer",
    "full stack developer",
    "react",
    "nextjs",
    "portfolio",
  ],
  twitter: {
    card: "summary_large_image",
    title: {
      template: "Coding with Khalil | %s",
      default: "Coding with Khalil | Full Stack Developer",
    },
    description:
      "A seasoned frontend web developer with a passion for creating engaging and interactive websites.",
    creator: "@khalilurrahman",
    images: [
      {
        url: "/images/og-images.jpg",
        width: 1000,
        height: 1200,
      },
    ],
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-zinc-50 text-zinc-800 antialiased dark:bg-neutral-900 dark:text-zinc-50",
          font.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme-mode"
        >
          <SmoothScrollProvider
            options={{
              smooth: true,
              mobile: {
                smooth: true,
              },
              tablet: {
                smooth: true,
              },
            }}
          >
            {children}

            {/* Music Player Floating */}
            <MusicPlayer />

          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}