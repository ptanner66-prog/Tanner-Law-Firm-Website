// Simple in-memory database for demo purposes
// In production, replace with a real database (PostgreSQL, MongoDB, etc.)

export interface User {
  id: string
  email: string
  name: string
  password: string
  company?: string
  plan?: string
  stripeCustomerId?: string
  subscriptionId?: string
  subscriptionStatus?: string
  createdAt: Date
}

// In-memory user storage (resets on server restart)
// For production, use a real database
export const users: User[] = []

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email)
}

export function findUserById(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

export function createUser(user: User): User {
  users.push(user)
  return user
}

export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) return undefined
  users[index] = { ...users[index], ...updates }
  return users[index]
}
