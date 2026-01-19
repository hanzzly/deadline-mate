"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  MoreVertical, 
  Trash2, 
  Clock, 
  Calendar,
  Briefcase,
  GraduationCap,
  User,
  MoreHorizontal,
  AlertTriangle
} from "lucide-react"
import type { Deadline } from "@/lib/types"
import { 
  getTimeRemaining, 
  formatTimeRemaining, 
  formatShortDate,
  getCategoryLabel 
} from "@/lib/deadline-utils"
import { cn } from "@/lib/utils"

interface DeadlineCardProps {
  deadline: Deadline
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
}

const categoryIcons = {
  work: Briefcase,
  study: GraduationCap,
  personal: User,
  other: MoreHorizontal,
}

export function DeadlineCard({ deadline, onToggleComplete, onDelete }: DeadlineCardProps) {
  const [timeInfo, setTimeInfo] = useState(() => 
    getTimeRemaining(deadline.dueDate, deadline.dueTime)
  )

  useEffect(() => {
    // Update every minute
    const interval = setInterval(() => {
      setTimeInfo(getTimeRemaining(deadline.dueDate, deadline.dueTime))
    }, 60000)

    return () => clearInterval(interval)
  }, [deadline.dueDate, deadline.dueTime])

  const CategoryIcon = categoryIcons[deadline.category]

  const getPriorityColor = () => {
    if (deadline.completed) return "bg-muted text-muted-foreground"
    if (timeInfo.isOverdue) return "bg-destructive text-destructive-foreground"
    if (timeInfo.isUrgent) return "bg-warning text-warning-foreground"
    
    switch (deadline.priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "medium":
        return "bg-warning/10 text-warning-foreground border-warning/20"
      default:
        return "bg-success/10 text-success border-success/20"
    }
  }

  const getCardStyle = () => {
    if (deadline.completed) return "opacity-60"
    if (timeInfo.isOverdue) return "border-destructive/50 bg-destructive/5"
    if (timeInfo.isUrgent) return "border-warning/50 bg-warning/5"
    return ""
  }

  return (
    <Card className={cn(
      "group relative overflow-hidden p-4 transition-all hover:shadow-md",
      getCardStyle()
    )}>
      {/* Priority indicator line */}
      <div className={cn(
        "absolute left-0 top-0 h-full w-1 transition-all",
        deadline.completed ? "bg-muted" :
        timeInfo.isOverdue ? "bg-destructive" :
        timeInfo.isUrgent ? "bg-warning" :
        deadline.priority === "high" ? "bg-destructive" :
        deadline.priority === "medium" ? "bg-warning" :
        "bg-success"
      )} />

      <div className="flex items-start gap-3 pl-2">
        <Checkbox
          checked={deadline.completed}
          onCheckedChange={() => onToggleComplete(deadline.id)}
          className="mt-1 h-5 w-5"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className={cn(
                "font-medium text-card-foreground truncate",
                deadline.completed && "line-through text-muted-foreground"
              )}>
                {deadline.title}
              </h3>
              
              {deadline.description && (
                <p className={cn(
                  "mt-1 text-sm text-muted-foreground line-clamp-2",
                  deadline.completed && "line-through"
                )}>
                  {deadline.description}
                </p>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => onDelete(deadline.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Category badge */}
            <Badge variant="secondary" className="gap-1">
              <CategoryIcon className="h-3 w-3" />
              {getCategoryLabel(deadline.category)}
            </Badge>

            {/* Date */}
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3 w-3" />
              {formatShortDate(deadline.dueDate)}
              {deadline.dueTime && ` ${deadline.dueTime}`}
            </Badge>

            {/* Time remaining */}
            {!deadline.completed && (
              <Badge className={cn("gap-1", getPriorityColor())}>
                {timeInfo.isOverdue ? (
                  <AlertTriangle className="h-3 w-3" />
                ) : (
                  <Clock className="h-3 w-3" />
                )}
                {formatTimeRemaining(deadline.dueDate, deadline.dueTime)}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
