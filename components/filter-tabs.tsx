"use client"

import { cn } from "@/lib/utils"

export type FilterOption = "all" | "pending" | "completed" | "overdue"

interface FilterTabsProps {
  activeFilter: FilterOption
  onFilterChange: (filter: FilterOption) => void
  counts: {
    all: number
    pending: number
    completed: number
    overdue: number
  }
}

export function FilterTabs({ activeFilter, onFilterChange, counts }: FilterTabsProps) {
  const filters: { value: FilterOption; label: string }[] = [
    { value: "all", label: "Semua" },
    { value: "pending", label: "Menunggu" },
    { value: "overdue", label: "Terlambat" },
    { value: "completed", label: "Selesai" },
  ]

  return (
    <div className="flex gap-1 rounded-lg bg-secondary/50 p-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            activeFilter === filter.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {filter.label}
          <span className={cn(
            "text-xs tabular-nums",
            activeFilter === filter.value
              ? "text-muted-foreground"
              : "text-muted-foreground/60"
          )}>
            {counts[filter.value]}
          </span>
        </button>
      ))}
    </div>
  )
}
