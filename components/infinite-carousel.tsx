"use client"

import Image from "next/image"

const carouselImages = [
  { src: "/carousel-1.jpg", alt: "Elegant studio portrait", title: "Studio Elegance" },
  { src: "/carousel-2.jpg", alt: "Romantic rose portrait", title: "Rose Garden" },
  { src: "/carousel-3.jpg", alt: "Golden hour portrait", title: "Golden Hour" },
  { src: "/carousel-4.jpg", alt: "Dramatic artistic portrait", title: "Dramatic Mood" },
  { src: "/carousel-5.jpg", alt: "Natural beauty portrait", title: "Natural Glow" },
  { src: "/carousel-6.jpg", alt: "Hollywood glamour portrait", title: "Hollywood Glam" },
  { src: "/carousel-7.jpg", alt: "Ethereal fantasy portrait", title: "Ethereal Dream" },
  { src: "/carousel-8.jpg", alt: "Urban street style portrait", title: "Urban Chic" },
]

function CarouselCard({ image, hoverColor, preload }: { image: typeof carouselImages[0]; hoverColor: string; preload?: boolean }) {
  return (
    <div className="flex-shrink-0 px-3 group">
      <div className={`relative w-64 h-80 rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 ${hoverColor} group-hover:scale-105`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          priority={preload}
          loading={preload ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-medium text-lg">{image.title}</p>
          <p className="text-white/60 text-sm">Prompt included</p>
        </div>
      </div>
    </div>
  )
}

export function InfiniteCarousel() {
  const reversedImages = [...carouselImages].reverse()

  return (
    <section className="bg-[#0a0a0a] py-20 overflow-hidden">
      <div className="mb-12 text-center">
        <p
          className="text-3xl text-white/80 md:text-5xl mb-2"
          style={{ fontFamily: "var(--font-corinthia), cursive" }}
        >
          Preview Gallery
        </p>
        <h2 className="text-2xl font-bold text-white md:text-4xl tracking-tight">
          Prompt Styles You&apos;ll Unlock
        </h2>
        <p className="mt-4 text-white/50 max-w-md mx-auto text-sm md:text-base">
          Each card represents a unique prompt style included in your access
        </p>
      </div>

      {/* First row - scrolling left */}
      <div className="relative mb-6 group/row">
        <div 
          className="flex w-max animate-scroll-left group-hover/row:[animation-play-state:paused]"
        >
          {/* First set - preloaded */}
          {carouselImages.map((image, index) => (
            <CarouselCard key={`row1-a-${index}`} image={image} hoverColor="hover:border-pink-400/50" preload />
          ))}
          {/* Duplicate set for seamless loop */}
          {carouselImages.map((image, index) => (
            <CarouselCard key={`row1-b-${index}`} image={image} hoverColor="hover:border-pink-400/50" />
          ))}
        </div>
      </div>

      {/* Second row - scrolling right */}
      <div className="relative group/row">
        <div 
          className="flex w-max animate-scroll-right group-hover/row:[animation-play-state:paused]"
        >
          {/* First set - preloaded */}
          {reversedImages.map((image, index) => (
            <CarouselCard key={`row2-a-${index}`} image={image} hoverColor="hover:border-purple-400/50" preload />
          ))}
          {/* Duplicate set for seamless loop */}
          {reversedImages.map((image, index) => (
            <CarouselCard key={`row2-b-${index}`} image={image} hoverColor="hover:border-purple-400/50" />
          ))}
        </div>
      </div>
    </section>
  )
}
