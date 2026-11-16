export function validateFullName(value) {
  const name = value.trim()
  if (name.length < 5 || name.length > 50) return 'Full name must be between 5 and 50 characters.'
  return ''
}

export function validateQuizTitle(value) {
  const title = value.trim()
  if (title.length < 10 || title.length > 30) return 'Quiz title must be between 10 and 30 characters.'
  return ''
}

export function validateQuestion(value) {
  const question = value.trim()
  if (question.length < 10 || question.length > 200) return 'Question must be between 10 and 200 characters.'
  return ''
}
