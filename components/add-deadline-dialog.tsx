"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { DeadlineCard } from "@/components/deadline-card"
import { AddDeadlineDialog } from "@/components/add-deadline-dialog"
import { EmptyState } from "@/components/empty-state"
import { StatsCards } from "@/components/stats-cards"
import { FilterTabs, type FilterOption } from "@/components/filter-tabs"
import { Clock, ArrowLeft, Plus } from "lucide-react"
import type { Deadline } from "@/lib/types"
import { 
  getDeadlines, 
  addDeadline, 
  deleteDeadline, 
  toggleDeadlineComplete 
} from "@/lib/deadline-store"
import { sortDeadlines, getTimeRemaining } from "@/lib/deadline-utils"

export default function AppPage() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([])
  const [filter, setFilter] = useState<FilterOption>("all")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Load deadlines from localStorage on mount
  useEffect(() => {
    const stored = getDeadlines()
    setDeadlines(stored)
    setIsLoaded(true)

    // Store current session start time in sessionStorage
    sessionStorage.setItem('deadline-mate-session', new Date().toISOString())
  }, [])

  const handleAddDeadline = (newDeadline: Omit<Deadline, 'id' | 'createdAt'>) => {
    const deadline = addDeadline(newDeadline)
    setDeadlines(prev => [...prev, deadline])
  }

  const handleToggleComplete = (id: string) => {
    toggleDeadlineComplete(id)
    setDeadlines(prev => 
      prev.map(d => d.id === id ? { ...d, completed: !d.completed } : d)
    )
  }

  const handleDeleteDeadline = (id: string) => {
    deleteDeadline(id)
    setDeadlines(prev => prev.filter(d => d.id !== id))
  }

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true)
  }

  // Calculate filter counts
  const counts = {
    all: deadlines.length,
    pending: deadlines.filter(d => !d.completed).length,
    completed: deadlines.filter(d => d.completed).length,
    overdue: deadlines.filter(d => {
      if (d.completed) return false
      const { isOverdue } = getTimeRemaining(d.dueDate, d.dueTime)
      return isOverdue
    }).length,
  }

  // Filter and sort deadlines
  const filteredDeadlines = sortDeadlines(
    deadlines.filter(d => {
      switch (filter) {
        case "pending":
          return !d.completed
        case "completed":
          return d.completed
        case "overdue":
          if (d.completed) return false
          const { isOverdue } = getTimeRemaining(d.dueDate, d.dueTime)
          return isOverdue
        default:
          return true
      }
    })
  )

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-5 w-5 animate-pulse" />
          <span>Memuat...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Kembali</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Clock className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">Deadline Mate</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <AddDeadlineDialog 
                onAdd={handleAddDeadline} 
                open={isAddDialogOpen} 
                onOpenChange={setIsAddDialogOpen} 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats */}
        <StatsCards deadlines={deadlines} />

        {/* Filter & Actions */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
        </div>

        {/* Deadline List */}
        <div className="mt-6">
          {deadlines.length === 0 ? (
            <EmptyState onAddClick={handleOpenAddDialog} />
          ) : filteredDeadlines.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                Tidak ada deadline di kategori ini.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filteredDeadlines.map((deadline) => (
                <DeadlineCard
                  key={deadline.id}
                  deadline={deadline}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteDeadline}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile FAB */}
        <div className="fixed bottom-6 right-6 sm:hidden">
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg"
            onClick={handleOpenAddDialog}
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">Tambah Deadline</span>
          </Button>
        </div>
      </main>
    </div>
  )
}
