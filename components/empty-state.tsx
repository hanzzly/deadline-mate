"use client"

import { CalendarCheck, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onAddClick: () => void
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/20 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <CalendarCheck className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        Belum ada deadline
      </h3>
      <p className="mt-2 max-w-sm text-muted-foreground">
        Yuk tambahkan deadline pertamamu dan mulai tracking progress-mu!
      </p>
      <Button onClick={onAddClick} className="mt-6 gap-2">
        <Plus className="h-4 w-4" />
        Tambah Deadline Pertama
      </Button>
    </div>
  )
}
