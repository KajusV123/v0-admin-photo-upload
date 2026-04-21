"use client"

import type React from "react"

import Image from "next/image"
import { useState, useRef, useCallback } from "react"
import VariableProximity from "@/components/variable-proximity"
import { AccessSection } from "@/components/access-section"
import { InfiniteCarousel } from "@/components/infinite-carousel"
import { WhatsInsideSection } from "@/components/whats-inside-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FaqSection } from "@/components/faq-section"
import { FinalCtaSection } from "@/components/final-cta-section"

const initialImages = [
  // Top left area
  {
    src: "/portrait-1.jpg",
    alt: "Fashion editorial portrait",
    top: 3,
    left: -2,
    rotate: -12,
    width: 220,
    height: 280,
  },
  {
    src: "/portrait-2.jpg",
    alt: "Dreamy ethereal portrait",
    top: 5,
    left: 16,
    rotate: 5,
    width: 180,
    height: 240,
  },
  {
    src: "/portrait-3.jpg",
    alt: "High fashion portrait",
    top: -3,
    left: 32,
    rotate: -3,
    width: 200,
    height: 260,
  },
  // Top right area
  {
    src: "/portrait-4.jpg",
    alt: "Natural light portrait",
    top: 2,
    left: 52,
    rotate: 8,
    width: 200,
    height: 250,
  },
  {
    src: "/portrait-5.jpg",
    alt: "Artistic floral portrait",
    top: 5,
    left: 72,
    rotate: -5,
    width: 180,
    height: 230,
  },
  {
    src: "/portrait-6.jpg",
    alt: "Beauty photography",
    top: 0,
    left: 88,
    rotate: 12,
    width: 180,
    height: 240,
  },
  // Left side middle
  {
    src: "/portrait-7.jpg",
    alt: "Golden hour portrait",
    top: 32,
    left: -5,
    rotate: 6,
    width: 200,
    height: 260,
  },
  {
    src: "/portrait-8.jpg",
    alt: "Cinematic portrait",
    top: 45,
    left: 10,
    rotate: -8,
    width: 160,
    height: 210,
  },
  // Right side middle
  {
    src: "/portrait-9.jpg",
    alt: "Fresh natural beauty",
    top: 28,
    left: 82,
    rotate: -6,
    width: 180,
    height: 230,
  },
  {
    src: "/portrait-10.jpg",
    alt: "Hollywood glamour",
    top: 48,
    left: 85,
    rotate: 10,
    width: 190,
    height: 250,
  },
  // Bottom left area
  {
    src: "/portrait-11.jpg",
    alt: "Bohemian style portrait",
    top: 68,
    left: -3,
    rotate: -4,
    width: 200,
    height: 260,
  },
  {
    src: "/portrait-12.jpg",
    alt: "Minimalist portrait",
    top: 72,
    left: 15,
    rotate: 7,
    width: 170,
    height: 220,
  },
  {
    src: "/portrait-13.jpg",
    alt: "Vintage inspired portrait",
    top: 78,
    left: 30,
    rotate: -2,
    width: 160,
    height: 200,
  },
  // Bottom center-right area
  {
    src: "/portrait-14.jpg",
    alt: "Urban chic portrait",
    top: 75,
    left: 46,
    rotate: 4,
    width: 180,
    height: 230,
  },
  {
    src: "/portrait-15.jpg",
    alt: "Fantasy portrait",
    top: 72,
    left: 62,
    rotate: -6,
    width: 190,
    height: 250,
  },
  {
    src: "/portrait-16.jpg",
    alt: "Professional headshot",
    top: 70,
    left: 78,
    rotate: 8,
    width: 180,
    height: 230,
  },
  {
    src: "/portrait-17.jpg",
    alt: "Beach lifestyle portrait",
    top: 65,
    left: 90,
    rotate: -10,
    width: 170,
    height: 220,
  },
]

export default function Home() {
  const [images, setImages] = useState(initialImages)
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const pendingPosition = useRef({ left: 0, top: 0 })
  const textContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    setDraggingIndex(index)
    const rect = (e.target as HTMLElement).closest(".draggable-image")?.getBoundingClientRect()
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }

  const updatePosition = useCallback(() => {
    if (draggingIndex === null) return

    setImages((prev) =>
      prev.map((img, i) =>
        i === draggingIndex ? { ...img, left: pendingPosition.current.left, top: pendingPosition.current.top } : img,
      ),
    )
    animationFrameRef.current = null
  }, [draggingIndex])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggingIndex === null || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      pendingPosition.current = {
        left: ((e.clientX - containerRect.left - dragOffset.current.x) / containerRect.width) * 100,
        top: ((e.clientY - containerRect.top - dragOffset.current.y) / containerRect.height) * 100,
      }

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updatePosition)
      }
    },
    [draggingIndex, updatePosition],
  )

  const handleMouseUp = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    setDraggingIndex(null)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
    <main
      ref={containerRef}
      className="relative h-screen overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,250,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,250,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scattered draggable images */}
      {images.map((image, index) => {
        const isDragging = draggingIndex === index
        const isHovered = hoveredIndex === index
        const isActive = isDragging || isHovered
        
        return (
          <div
            key={index}
            className={`draggable-image absolute select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              top: `${image.top}%`,
              left: `${image.left}%`,
              width: image.width,
              height: image.height,
              zIndex: isDragging ? 100 : isHovered ? 50 : index,
              transition: isDragging 
                ? "none" 
                : "top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), z-index 0s",
              willChange: isDragging ? "top, left" : "auto",
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div 
              className="relative h-full w-full overflow-hidden rounded-2xl"
              style={{
                transform: `rotate(${image.rotate}deg) scale(${isDragging ? 1.12 : isHovered ? 1.08 : 1}) translateY(${isHovered && !isDragging ? "-8px" : "0px"})`,
                transition: isDragging 
                  ? "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease-out"
                  : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease-out",
                boxShadow: isDragging
                  ? "0 35px 70px -12px rgba(0, 0, 0, 0.9), 0 0 50px rgba(236, 72, 153, 0.2)"
                  : isHovered 
                    ? "0 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(236, 72, 153, 0.15)"
                    : "0 10px 40px -10px rgba(0, 0, 0, 0.5)",
                willChange: "transform, box-shadow",
              }}
            >
              <div 
                className="absolute inset-0 rounded-2xl transition-all duration-400"
                style={{
                  boxShadow: isActive 
                    ? "inset 0 0 0 2px rgba(244, 114, 182, 0.4)" 
                    : "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                }}
              />
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="pointer-events-none object-cover"
                style={{
                  transform: `scale(${isHovered ? 1.1 : 1})`,
                  transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                draggable={false}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.4s ease-out",
                }}
              />
            </div>
          </div>
        )
      })}

      <div
        ref={textContainerRef}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      >
        <div className="text-center">
          <p
            className="relative z-10 text-5xl text-white/90 md:text-[90px]"
            style={{ fontFamily: "var(--font-corinthia), cursive", marginBottom: "-40px" }}
          >
            AI Portrait
          </p>
          <h1 className="text-6xl tracking-tight text-white md:text-8xl">
            <VariableProximity
              label="Prompt Bank"
              fromFontVariationSettings="'wght' 700"
              toFontVariationSettings="'wght' 900"
              containerRef={textContainerRef}
              radius={150}
              falloff="gaussian"
              className="pointer-events-auto"
              style={{
                fontFamily: '"Roboto Flex", sans-serif',
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            />
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
            Unlock stunning AI-generated portraits with my curated collection of premium prompts. 
            Each prompt is crafted to create the exact photo style you see.
          </p>
          <div
            className="pointer-events-auto mt-8 mb-8 inline-block rounded-full p-[2px]"
            style={{
              background: "linear-gradient(135deg, #f8b4d9 0%, #c084fc 25%, #f8b4d9 50%, #c084fc 75%, #f8b4d9 100%)",
            }}
          >
            <button className="rounded-full bg-[#0a0a0a] px-8 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black">
              Browse Prompts
            </button>
          </div>
        </div>
      </div>
    </main>
    
    <AccessSection />
    <InfiniteCarousel />
    <HowItWorksSection />
    <WhatsInsideSection />
    <FaqSection />
    <FinalCtaSection />
    </div>
  )
}
