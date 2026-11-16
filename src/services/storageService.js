export const STORAGE_KEY = 'question'

export function readQuizzes() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    const parsed = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeQuizzes(quizzes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes))
}
