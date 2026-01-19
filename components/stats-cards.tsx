"use client"

import React from "react"

import { Card } from "@/components/ui/card"
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ListTodo 
} from "lucide-react"
import type { Deadline } from "@/lib/types"
import { getTimeRemaining } from "@/lib/deadline-utils"

interface StatsCardsProps {
  deadlines: Deadline[]
}

export function StatsCards({ deadlines }: StatsCardsProps) {
  const total = deadlines.length
  const completed = deadlines.filter(d => d.completed).length
  const pending = total - completed
  
  const overdue = deadlines.filter(d => {
    if (d.completed) return false
    const { isOverdue } = getTimeRemaining(d.dueDate, d.dueTime)
    return isOverdue
  }).length

  const urgent = deadlines.filter(d => {
    if (d.completed) return false
    const { isUrgent } = getTimeRemaining(d.dueDate, d.dueTime)
    return isUrgent
  }).length

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={<ListTodo className="h-5 w-5" />}
        label="Total Deadline"
        value={total}
        iconColor="text-primary"
        iconBg="bg-primary/10"
      />
      <StatCard
        icon={<Clock className="h-5 w-5" />}
        label="Menunggu"
        value={pending}
        iconColor="text-blue-600 dark:text-blue-400"
        iconBg="bg-blue-100 dark:bg-blue-900/30"
      />
      <StatCard
        icon={<AlertTriangle className="h-5 w-5" />}
        label="Segera/Terlambat"
        value={urgent + overdue}
        iconColor="text-amber-600 dark:text-amber-400"
        iconBg="bg-amber-100 dark:bg-amber-900/30"
        highlight={urgent + overdue > 0}
      />
      <StatCard
        icon={<CheckCircle2 className="h-5 w-5" />}
        label="Selesai"
        value={completed}
        iconColor="text-emerald-600 dark:text-emerald-400"
        iconBg="bg-emerald-100 dark:bg-emerald-900/30"
      />
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  iconColor,
  iconBg,
  highlight = false,
}: {
  icon: React.ReactNode
  label: string
  value: number
  iconColor: string
  iconBg: string
  highlight?: boolean
}) {
  return (
    <Card className={`p-4 ${highlight ? 'ring-2 ring-warning/50' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
        </div>
      </div>
    </Card>
  )
}
