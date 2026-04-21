"use client"

const steps = [
  {
    number: "01",
    title: "Pick Your Style",
    description: "Browse our curated collection and find prompts that match the exact aesthetic you want to create.",
  },
  {
    number: "02", 
    title: "Copy & Customize",
    description: "Grab the prompt and tweak any details—swap colors, adjust lighting, or add your own creative spin.",
  },
  {
    number: "03",
    title: "Generate & Refine",
    description: "Paste into your favorite AI tool and watch the magic happen. Iterate until it's perfect.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-white/50">
            From prompt to portrait in minutes
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-[calc(50%+60px)] hidden h-px w-[calc(100%-60px)] bg-gradient-to-r from-white/20 to-transparent md:block" />
              )}
              
              <div className="relative rounded-3xl p-8 text-center transition-all duration-500 hover:bg-white/[0.02]">
                {/* Large number background */}
                <div className="relative mb-6 inline-flex">
                  <span 
                    className="text-8xl font-bold tracking-tighter"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {step.number}
                  </span>
                  {/* Glow on hover */}
                  <div 
                    className="absolute inset-0 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                    }}
                  />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
