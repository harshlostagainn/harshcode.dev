import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import gsap from "gsap"

import { SEO } from "@components"

interface Item {
  name: string
  description: string | React.ReactNode
  link?: string
}

const sections: Array<{ title: string; items: Item[] }> = [
  {
    title: "💻 Editor & Terminal",
    items: [
      {
        name: "VS Code",
        description: "Primary code editor for Python, ML, and full-stack work",
        link: "https://code.visualstudio.com/",
      },
      {
        name: "iTerm2",
        description: (
          <>
            Terminal emulator for macOS with tmux & custom theming ➜{" "}
            <OutboundLink
              href="https://github.com/harshlostagainn"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
            >
              my setup
            </OutboundLink>
          </>
        ),
      },
      {
        name: "Warp",
        description:
          "Modern terminal — gradually moving my daily workflows here",
        link: "https://www.warp.dev/",
      },
    ],
  },
  {
    title: "🖥️ Hardware",
    items: [
      {
        name: "MacBook Air (M4-series)",
        description:
          "Primary development machine for coding, ML experiments, and content",
      },
    ],
  },
  {
    title: "📱 Devices",
    items: [
      {
        name: "Android Phone",
        description: "Clean Android experience with focus on productivity",
      },
      {
        name: "Wireless Earbuds",
        description: "Noise-isolated audio for focus sessions",
      },
    ],
  },
  {
    title: "🛠️ Development Tools",
    items: [
      {
        name: "Docker",
        description: "Containerized dev environments",
        link: "https://www.docker.com/",
      },
      {
        name: "Postman",
        description: "API testing & debugging",
        link: "https://www.postman.com/",
      },
      {
        name: "Chrome DevTools",
        description: "Frontend debugging & performance profiling",
        link: "https://developer.chrome.com/docs/devtools/",
      },
    ],
  },
  {
    title: "⚡ Productivity",
    items: [
      {
        name: "Raycast",
        description: "Launcher + workflow automation",
        link: "https://www.raycast.com/",
      },
      {
        name: "Notion / Obsidian",
        description: "Notes, planning, and learning management",
      },
    ],
  },
  {
    title: "🪑 Desk Setup",
    items: [
      {
        name: "Minimal Desk",
        description:
          "Laptop-only setup — distraction-free and portable workflow",
      },
    ],
  },
]

const UsesPage: React.FC = () => {
  const usesRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const subHeadingRef = useRef<HTMLParagraphElement | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(headingRef.current, {
      y: -12,
      opacity: 0,
      ease: "power3.out",
      duration: 0.25,
    })
      .from(subHeadingRef.current, {
        y: -12,
        opacity: 0,
        ease: "power2.out",
        duration: 0.2,
      })
      .from(usesRef.current?.querySelectorAll(".section")!, {
        y: -8,
        opacity: 0,
        stagger: 0.02,
        duration: 0.2,
      })
      .from(
        usesRef.current?.querySelectorAll(".section-item")!,
        {
          y: -8,
          opacity: 0,
          stagger: 0.02,
          duration: 0.2,
        },
        "<0.1"
      )
  }, [])

  return (
    <>
      <SEO title="Uses" />
      <div ref={usesRef} className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-12">
          <h1 ref={headingRef} className="mb-4 text-4xl font-bold">
            Uses
          </h1>
          <p ref={subHeadingRef} className="text-lg leading-relaxed opacity-90">
            Tools, apps, and hardware I use daily while building projects,
            learning AI/ML, and writing code.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="section mb-6 text-2xl font-bold">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="section-item">
                    <div className="border-l-2 py-2 pl-4 transition-all duration-100 hover:border-l-4 border-blue-600 dark:border-blue-400">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mb-1 relative text-xl font-semibold inline text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:before:w-full dark:text-blue-400"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <h3 className="mb-1 text-xl font-semibold">
                          {item.name}
                        </h3>
                      )}
                      <p className="opacity-80">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="text-center pt-8 border-t mt-8 text-sm opacity-30">
          This page evolves as my workflow evolves.
        </p>
      </div>
    </>
  )
}

export default UsesPage
