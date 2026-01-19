export interface Deadline {
  id: string
  title: string
  description?: string
  dueDate: string
  dueTime?: string
  category: 'work' | 'study' | 'personal' | 'other'
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  createdAt: string
}

export type DeadlineCategory = Deadline['category']
export type DeadlinePriority = Deadline['priority']
