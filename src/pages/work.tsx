import React, { useEffect, useState } from "react"

import GitHubCalendar from "react-github-calendar"
import { Tooltip as ReactTooltip } from "react-tooltip"

import { Projects, SEO } from "@components"

const WorkPage: React.FC = () => {
  const [monthsToShow, setMonthsToShow] = useState(12)

  useEffect(() => {
    const calculateMonths = () => {
      const width = window.innerWidth
      const padding = 32
      const availableWidth = width - padding
      const monthWidth = 90
      const months = Math.floor(availableWidth / monthWidth)
      return Math.min(Math.max(months, 1), 12)
    }

    const updateMonths = () => setMonthsToShow(calculateMonths())

    updateMonths()
    window.addEventListener("resize", updateMonths)
    return () => window.removeEventListener("resize", updateMonths)
  }, [])

  return (
    <>
      <SEO title="Work & Projects" />

      <div className="my-8 flex justify-center text-center">
        <GitHubCalendar
          username="harshlostagainn"
          fontSize={16}
          blockSize={14}
          hideColorLegend
          hideTotalCount
          colorTheme={{
            dark: ["#0f172a", "#1e293b", "#2563eb", "#3b82f6", "#60a5fa"],
            light: ["#ebedf0", "#c7d2fe", "#818cf8", "#6366f1", "#4338ca"],
          }}
          transformData={(data) => {
            if (monthsToShow < 12) {
              const today = new Date()
              const cutoffDate = new Date()
              cutoffDate.setMonth(cutoffDate.getMonth() - monthsToShow)

              const startSunday = new Date(cutoffDate)
              startSunday.setDate(cutoffDate.getDate() - cutoffDate.getDay())

              const endSaturday = new Date(today)
              endSaturday.setDate(today.getDate() + (6 - today.getDay()))

              return data.filter((day) => {
                const date = new Date(day.date)
                return date >= startSunday && date <= endSaturday
              })
            }
            return data
          }}
        >
          <ReactTooltip delayShow={10} className="custom-tooltip" />
        </GitHubCalendar>
      </div>

      <Projects />
    </>
  )
}

export default WorkPage
