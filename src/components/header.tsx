import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import gsap from "gsap"

import { lightHaptic } from "@utils"

const Header: React.FC = () => {
  const location = useLocation()

  const navRef = useRef<HTMLElement | null>(null)
  const navLinksRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    const delay = location.pathname === "/" ? 1.5 : 0.25

    tl.from(navRef.current, {
      opacity: 0,
      y: -40,
      duration: 0.6,
      ease: "power2.out",
      delay,
    })

    if (navLinksRef.current) {
      tl.from(navLinksRef.current.children, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.05,
      })
    }
  }, [])

  return (
    <header className="py-4">
      <nav
        ref={navRef}
        className="flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={lightHaptic}
          className="relative inline text-center font-mono text-2xl font-bold text-blue-600 no-underline transition-colors duration-200
            before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-current before:transition-all before:content-['']
            hover:text-blue-700 hover:no-underline hover:before:w-full
            focus:outline-none focus-visible:before:w-full
            dark:text-blue-400 dark:hover:text-blue-300"
        >
          harshcode.dev
        </Link>

        {/* Navigation */}
        <div
          ref={navLinksRef}
          className="flex flex-row flex-wrap items-center justify-center gap-4 px-2 sm:justify-end sm:gap-6"
        >
          <Link
            to="/timeline"
            onClick={lightHaptic}
            className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200
              before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-['']
              hover:text-blue-700 hover:no-underline hover:before:w-full
              focus:outline-none focus-visible:before:w-full
              dark:text-blue-400 dark:hover:text-blue-300"
          >
            About
          </Link>

          <Link
            to="/work"
            onClick={lightHaptic}
            className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200
              before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-['']
              hover:text-blue-700 hover:no-underline hover:before:w-full
              focus:outline-none focus-visible:before:w-full
              dark:text-blue-400 dark:hover:text-blue-300"
          >
            Projects
          </Link>

          <Link
            to="/uses"
            onClick={lightHaptic}
            className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200
              before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-['']
              hover:text-blue-700 hover:no-underline hover:before:w-full
              focus:outline-none focus-visible:before:w-full
              dark:text-blue-400 dark:hover:text-blue-300"
          >
            Uses
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
