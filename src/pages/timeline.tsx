import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import clsx from "clsx"
import gsap, { SteppedEase } from "gsap"
import TextPlugin from "gsap/TextPlugin"

import { SEO } from "@components"

gsap.registerPlugin(TextPlugin)

/* =======================
   TIMELINE DATA (HARSH)
   ======================= */

const commits = [
  {
    hash: "a1c9e2",
    type: "feat",
    scope: "career",
    message: "building AI & ML projects with real-world focus",
    details: [
      "+ Machine Learning & NLP",
      "+ Model experimentation",
      "+ Problem-solving mindset",
    ],
    date: "Current",
  },
  {
    hash: "b7d421",
    type: "ship",
    scope: "project",
    message: "fake job detection system using Python & ML",
    details: [
      "+ Data preprocessing",
      "+ Classification models",
      "+ Real vs fake job prediction",
    ],
    date: "2024",
  },
  {
    hash: "c92f10",
    type: "ship",
    scope: "project",
    message: "student performance prediction system",
    details: [
      "+ Regression models",
      "+ Data-driven insights",
      "+ Academic performance analysis",
    ],
    date: "2024",
  },
  {
    hash: "d3a77b",
    type: "learn",
    scope: "core",
    message: "strengthening foundations in Python, SQL, DSA & ML",
    details: [
      "+ Python programming",
      "+ SQL & databases",
      "+ Data structures & algorithms",
    ],
    date: "Learning Phase",
  },
  {
    hash: "e01b5a",
    type: "explore",
    scope: "interest",
    message: "exploring quantum mechanics, mathematics & chess",
    details: [
      "+ Quantum mechanics basics",
      "+ Mathematical thinking",
      "+ Strategic problem solving (chess)",
    ],
    date: "Ongoing",
  },
  {
    hash: "root00",
    type: "init",
    scope: "root",
    message: "started journey into computer science & AI",
    details: [
      "+ MCA (AI/ML) student",
      "+ Curious learner",
      "+ Building step by step",
    ],
    date: "Start",
  },
] as const

/* =======================
   PAGE
   ======================= */

const TimelinePage: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null)
  const cursorRef = useRef<HTMLSpanElement | null>(null)
  const subHeaderRef = useRef<HTMLParagraphElement | null>(null)
  const commitsRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to(headerRef.current, {
      text: { value: "$ git log --oneline --graph" },
      duration: 1,
      ease: "none",
    })
      .fromTo(
        cursorRef.current,
        { autoAlpha: 0, x: -20 },
        {
          autoAlpha: 1,
          duration: 1,
          repeat: -1,
          ease: SteppedEase.config(1),
        }
      )
      .from(
        subHeaderRef.current,
        { y: -10, opacity: 0, ease: "power1.out" },
        "<0.1"
      )

    if (commitsRef.current) {
      tl.from(commitsRef.current.children, {
        y: -12,
        opacity: 0,
        stagger: 0.04,
        ease: "power3.out",
        duration: 0.2,
      })
    }
  }, [])

  return (
    <>
      <SEO title="About" />

      <div className="min-h-[calc(100vh-216px)] p-4 font-mono text-zinc-800 dark:text-zinc-100 sm:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <header>
              <h2
                ref={headerRef}
                className="mb-2 inline-block h-7 text-lg font-bold"
              />
              <span ref={cursorRef}>█</span>
              <p ref={subHeaderRef} className="text-sm text-zinc-500">
                Timeline of my journey
              </p>
            </header>
          </div>

          <div ref={commitsRef} className="grid gap-2">
            {commits.map((commit) => (
              <AnimatedDetails key={commit.hash} commit={commit} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* =======================
   COMMIT ITEM
   ======================= */

interface AnimatedDetailsProps {
  commit: (typeof commits)[number]
}

const AnimatedDetails: React.FC<AnimatedDetailsProps> = ({ commit }) => {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const details = detailsRef.current
    const content = contentRef.current
    if (!details || !content || isAnimating.current) return

    isAnimating.current = true
    const isOpen = details.open

    if (!isOpen) {
      details.open = true
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => (isAnimating.current = false),
        }
      )
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          details.open = false
          isAnimating.current = false
        },
      })
    }
  }

  const blueTypes = commit.type === "learn" || commit.type === "explore"

  return (
    <details ref={detailsRef}>
      <summary
        onClick={handleToggle}
        className={clsx(
          "grid cursor-pointer items-center gap-x-2 rounded px-2 py-1 focus:outline-none md:grid-cols-[80px,10px,1fr,100px] grid-cols-[80px,10px,1fr]",
          {
            "focus-visible:ring-green-500": commit.type === "feat",
            "focus-visible:ring-yellow-500": commit.type === "ship",
            "focus-visible:ring-orange-500": commit.type === "chore",
            "focus-visible:ring-blue-500":
              commit.type === "fix" || blueTypes,
            "focus-visible:ring-purple-500": commit.type === "init",
          }
        )}
      >
        <span className="w-14 shrink-0 text-xs text-zinc-500 sm:w-20 sm:text-sm">
          {commit.hash}
        </span>

        <span
          className={clsx("text-lg", {
            "text-green-500": commit.type === "feat",
            "text-yellow-500": commit.type === "ship",
            "text-orange-500": commit.type === "chore",
            "text-blue-500": commit.type === "fix" || blueTypes,
            "text-purple-500": commit.type === "init",
          })}
        >
          ∗
        </span>

        <span className="flex flex-col md:flex-row md:gap-2">
          <span
            className={clsx("shrink-0", {
              "text-green-500": commit.type === "feat",
              "text-yellow-500": commit.type === "ship",
              "text-orange-500": commit.type === "chore",
              "text-blue-500": commit.type === "fix" || blueTypes,
              "text-purple-500": commit.type === "init",
            })}
          >
            {commit.type} ({commit.scope}):
          </span>
          <span>{commit.message}</span>
        </span>

        <span className="col-start-3 text-xs text-zinc-400 md:col-start-4 md:text-right">
          {commit.date}
        </span>
      </summary>

      <div
        ref={contentRef}
        className="grid grid-cols-[80px,10px,1fr] gap-2 overflow-hidden pt-1 md:grid-cols-[80px,10px,1fr,100px]"
      >
        <div className="col-start-3">
          {commit.details.map((detail) => (
            <p
              key={detail}
              className={clsx("text-sm", {
                "text-green-500": detail.startsWith("+"),
                "text-red-500": detail.startsWith("-"),
              })}
            >
              {detail}
            </p>
          ))}
        </div>
      </div>
    </details>
  )
}

export default TimelinePage
