"use client"

import Image from "next/image"

interface TornPaperDividerProps {
  className?: string
  flip?: boolean
}

export function TornPaperDivider({ className = "", flip = false }: TornPaperDividerProps) {
  return (
    <div className={`relative w-full h-24 md:h-32 overflow-hidden ${className}`}>
      {/* Torn paper effect with mountain/landscape image */}
      <div 
        className={`absolute inset-0 ${flip ? "scale-y-[-1]" : ""}`}
        style={{
          maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,50 Q50,20 100,45 T200,40 T300,55 T400,35 T500,50 T600,30 T700,45 T800,40 T900,55 T1000,35 T1100,50 T1200,40 L1200,100 L0,100 Z' fill='white'/%3E%3C/svg%3E\")",
          WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,50 Q50,20 100,45 T200,40 T300,55 T400,35 T500,50 T600,30 T700,45 T800,40 T900,55 T1000,35 T1100,50 T1200,40 L1200,100 L0,100 Z' fill='white'/%3E%3C/svg%3E\")",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      >
        <Image
          src="/images/mountain-landscape.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "brightness(0.7) saturate(1.2)" }}
        />
        {/* Teal/green tint overlay */}
        <div className="absolute inset-0 bg-teal-700/40 mix-blend-overlay" />
      </div>
    </div>
  )
}
