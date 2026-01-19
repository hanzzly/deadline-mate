"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem("deadline-mate-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark)
    
    setIsDark(initialDark)
    if (initialDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("deadline-mate-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("deadline-mate-theme", "light")
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative h-9 w-9">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-transform" />
      ) : (
        <Moon className="h-5 w-5 transition-transform" />
      )}
    </Button>
  )
}
