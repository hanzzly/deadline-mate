import type { Deadline } from './types'

const STORAGE_KEY = 'deadline-mate-deadlines'

export function getDeadlines(): Deadline[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function saveDeadlines(deadlines: Deadline[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deadlines))
}

export function addDeadline(deadline: Omit<Deadline, 'id' | 'createdAt'>): Deadline {
  const newDeadline: Deadline = {
    ...deadline,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  
  const deadlines = getDeadlines()
  deadlines.push(newDeadline)
  saveDeadlines(deadlines)
  
  return newDeadline
}

export function updateDeadline(id: string, updates: Partial<Deadline>): Deadline | null {
  const deadlines = getDeadlines()
  const index = deadlines.findIndex(d => d.id === id)
  
  if (index === -1) return null
  
  deadlines[index] = { ...deadlines[index], ...updates }
  saveDeadlines(deadlines)
  
  return deadlines[index]
}

export function deleteDeadline(id: string): boolean {
  const deadlines = getDeadlines()
  const filtered = deadlines.filter(d => d.id !== id)
  
  if (filtered.length === deadlines.length) return false
  
  saveDeadlines(filtered)
  return true
}

export function toggleDeadlineComplete(id: string): Deadline | null {
  const deadlines = getDeadlines()
  const deadline = deadlines.find(d => d.id === id)
  
  if (!deadline) return null
  
  return updateDeadline(id, { completed: !deadline.completed })
}
