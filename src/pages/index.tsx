import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { StaticImage } from "gatsby-plugin-image"
import gsap from "gsap"
import { Tooltip as ReactTooltip } from "react-tooltip"
import { useMediaQuery } from "usehooks-ts"

import { SEO } from "@components"
import { mediumHaptic } from "@utils"

const IndexPage: React.FC = () => {
  const imgWrapperRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const aboutRef = useRef<HTMLElement | null>(null)
  const juggleRef = useRef<HTMLSpanElement | null>(null)

  const isDesktop = useMediaQuery("(min-width: 768px)")

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(imgWrapperRef.current, {
      scale: 1.12,
      x: isDesktop ? 24 : 0,
      y: isDesktop ? 0 : -24,
      opacity: 0,
      ease: "power2.out",
      duration: 0.8,
    }).from(
      headingRef.current,
      {
        y: 20,
        opacity: 0,
        ease: "power1.out",
        duration: 0.5,
      },
      "<0.15"
    )

    if (aboutRef.current) {
      tl.from(aboutRef.current.children, {
        y: 12,
        opacity: 0,
        ease: "power1.out",
        stagger: 0.25,
      })
    }

    // Subtle juggle animation
    if (juggleRef.current) {
      const el = juggleRef.current
      const tlJuggle = gsap.timeline({ paused: true, repeat: -1 })

      tlJuggle
        .to(el, { y: -6, rotation: -4, duration: 0.15 })
        .to(el, { y: -10, rotation: 0, duration: 0.15 })
        .to(el, { y: -6, rotation: 4, duration: 0.15 })
        .to(el, { y: 0, rotation: 0, duration: 0.15 })

      el.addEventListener("mouseenter", () => tlJuggle.play())
      el.addEventListener("mouseleave", () => {
        tlJuggle.pause()
        gsap.to(el, { y: 0, rotation: 0, duration: 0.2 })
      })
    }
  }, [])

  return (
    <>
      <SEO title="Home" />

      <ReactTooltip
        id="em-dash-tooltip"
        place="top"
        className="!rounded-lg !bg-slate-800 !text-slate-50 dark:!bg-slate-200 dark:!text-slate-900"
      />

      <main className="flex min-h-[calc(100vh-258px)] flex-col-reverse items-center justify-center gap-12 px-4 md:min-h-[calc(100vh-216px)] md:flex-row">
        {/* TEXT */}
        <div className="text-center md:w-2/3 md:text-left">
          <h1 ref={headingRef} className="mb-8 text-3xl font-bold">
            Hey there, I'm Harsh! 👋
          </h1>

          <section
            ref={aboutRef}
            className="mb-8 text-balance text-lg tracking-wide"
          >
            <p className="mb-3">
              I’m an MCA (AI/ML) student who enjoys building intelligent systems
              and solving real-world problems using data and code.
              <span
                data-tooltip-id="em-dash-tooltip"
                data-tooltip-content="written by me"
                className="cursor-help"
              >
                —
              </span>
            </p>

            <p className="mb-6">
              I actively work on hands-on projects in machine learning, NLP, and
              data-driven applications, focusing on clean implementation and
              practical impact. I enjoy{" "}
              <span ref={juggleRef} className="inline-block cursor-default">
                experimenting
              </span>{" "}
              with models, learning how things work under the hood, and turning
              ideas into usable solutions.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <OutboundLink
                href="/Harsh_Dubey_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={mediumHaptic}
                className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.04] hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                View Résumé
              </OutboundLink>
            </div>
          </section>
        </div>

        {/* IMAGE */}
        <div
  ref={imgWrapperRef}
  className="relative group"
>
  {/* glow */}
  <div className="absolute inset-0 rounded-full bg-blue-500/25 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

  <StaticImage
    src="../images/square.png"
    alt="Harsh Dubey"
    placeholder="blurred"
    layout="constrained"
    width={220}
    height={220}
    className="relative rounded-full transition-transform duration-300 group-hover:scale-[1.05] drop-shadow-xl"
  />
</div>

      </main>
    </>
  )
}

export default IndexPage
