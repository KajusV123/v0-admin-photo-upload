"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What exactly do I get when I purchase?",
    answer: "You get instant access to our full library of 500+ premium AI portrait prompts, organized by style and category. Each prompt includes detailed parameters, style modifiers, and tips for the best results across any AI image generator.",
  },
  {
    question: "Which AI tools work with these prompts?",
    answer: "Our prompts are optimized for all major AI image generators including Midjourney, DALL-E 3, Stable Diffusion, Leonardo AI, and more. We include format variations so you can use them anywhere.",
  },
  {
    question: "Are updates really free forever?",
    answer: "Yes. When you purchase, you get lifetime access to all current prompts plus every new prompt we add in the future. We drop fresh prompts weekly based on trending styles and techniques.",
  },
  {
    question: "Can I use these for commercial projects?",
    answer: "Absolutely. All prompts come with a full commercial license. Use them for client work, social media, marketing campaigns, or any project you want.",
  },
  {
    question: "What if the prompts don't work for me?",
    answer: "We offer a 30-day money-back guarantee. If you're not seeing the results you want, reach out and we'll make it right—no questions asked.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,250,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,250,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Common Questions
          </h2>
          <p className="mt-4 text-white/50">
            Everything you need to know before getting started
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors hover:border-white/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-white/50 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-white/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
