import type { Deadline } from './types'

export function getTimeRemaining(dueDate: string, dueTime?: string): {
  days: number
  hours: number
  minutes: number
  isOverdue: boolean
  isUrgent: boolean
  isSoon: boolean
} {
  const now = new Date()
  const due = new Date(dueDate)
  
  if (dueTime) {
    const [hours, minutes] = dueTime.split(':').map(Number)
    due.setHours(hours, minutes, 0, 0)
  } else {
    due.setHours(23, 59, 59, 999)
  }
  
  const diff = due.getTime() - now.getTime()
  const isOverdue = diff < 0
  
  const absDiff = Math.abs(diff)
  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60))
  
  // Urgent: less than 24 hours
  const isUrgent = !isOverdue && diff < 24 * 60 * 60 * 1000
  // Soon: less than 3 days
  const isSoon = !isOverdue && !isUrgent && diff < 3 * 24 * 60 * 60 * 1000
  
  return { days, hours, minutes, isOverdue, isUrgent, isSoon }
}

export function formatTimeRemaining(dueDate: string, dueTime?: string): string {
  const { days, hours, minutes, isOverdue } = getTimeRemaining(dueDate, dueTime)
  
  if (isOverdue) {
    if (days > 0) return `Terlambat ${days} hari`
    if (hours > 0) return `Terlambat ${hours} jam`
    return `Terlambat ${minutes} menit`
  }
  
  if (days > 0) return `${days} hari lagi`
  if (hours > 0) return `${hours} jam lagi`
  return `${minutes} menit lagi`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  })
}

export function sortDeadlines(deadlines: Deadline[]): Deadline[] {
  return [...deadlines].sort((a, b) => {
    // Completed items go to the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    
    // Sort by due date
    const dateA = new Date(a.dueDate)
    const dateB = new Date(b.dueDate)
    
    return dateA.getTime() - dateB.getTime()
  })
}

export function getCategoryLabel(category: Deadline['category']): string {
  const labels = {
    work: 'Kerja',
    study: 'Belajar',
    personal: 'Pribadi',
    other: 'Lainnya',
  }
  return labels[category]
}

export function getPriorityLabel(priority: Deadline['priority']): string {
  const labels = {
    low: 'Rendah',
    medium: 'Sedang',
    high: 'Tinggi',
  }
  return labels[priority]
}
