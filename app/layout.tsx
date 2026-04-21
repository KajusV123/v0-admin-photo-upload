import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

import { Corinthia, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const corinthia = Corinthia({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-corinthia" })

export const metadata: Metadata = {
  title: "AI Portrait Prompt Bank | Premium AI Image Prompts",
  description: "Unlock stunning AI-generated portraits with curated premium prompts. Each prompt creates the exact photo style you see.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-sans antialiased ${corinthia.variable}`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
