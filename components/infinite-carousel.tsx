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
    <div className="flex-shrink-0 px-2 md:px-3 group">
      <div className={`relative w-48 h-60 md:w-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 ${hoverColor} md:group-hover:scale-105`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          priority={preload}
          loading={preload ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-medium text-sm md:text-lg">{image.title}</p>
          <p className="text-white/60 text-xs md:text-sm">Prompt included</p>
        </div>
      </div>
    </div>
  )
}

export function InfiniteCarousel() {
  const reversedImages = [...carouselImages].reverse()

  return (
    <section className="relative bg-[#0a0a0a] py-12 md:py-20 overflow-hidden">
      {/* Velvet texture background */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url('/images/velvet-texture.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[#0a0a0a]/95" />
      <div className="relative z-10 mb-8 md:mb-12 text-center px-4">
        <p
          className="text-2xl text-white/80 md:text-5xl mb-1 md:mb-2"
          style={{ fontFamily: "var(--font-corinthia), cursive" }}
        >
          Preview Gallery
        </p>
        <h2 className="text-xl font-bold text-white md:text-4xl tracking-tight">
          Prompt Styles You&apos;ll Unlock
        </h2>
        <p className="mt-3 md:mt-4 text-white/50 max-w-md mx-auto text-xs md:text-base">
          Each card represents a unique prompt style included in your access
        </p>
      </div>

      {/* First row - scrolling left */}
      <div className="relative z-10 mb-4 md:mb-6 group/row">
        <div 
          className="flex w-max animate-scroll-left group-hover/row:[animation-play-state:paused]"
        >
          {/* First set - preloaded */}
          {carouselImages.map((image, index) => (
            <CarouselCard key={`row1-a-${index}`} image={image} hoverColor="hover:border-[#C74D64]/50" preload />
          ))}
          {/* Duplicate set for seamless loop */}
          {carouselImages.map((image, index) => (
            <CarouselCard key={`row1-b-${index}`} image={image} hoverColor="hover:border-[#C74D64]/50" />
          ))}
        </div>
      </div>

      {/* Second row - scrolling right */}
      <div className="relative z-10 group/row">
        <div 
          className="flex w-max animate-scroll-right group-hover/row:[animation-play-state:paused]"
        >
          {/* First set - preloaded */}
          {reversedImages.map((image, index) => (
            <CarouselCard key={`row2-a-${index}`} image={image} hoverColor="hover:border-[#9E3248]/50" preload />
          ))}
          {/* Duplicate set for seamless loop */}
          {reversedImages.map((image, index) => (
            <CarouselCard key={`row2-b-${index}`} image={image} hoverColor="hover:border-[#9E3248]/50" />
          ))}
        </div>
      </div>
    </section>
  )
}
