import { describe, expect, it } from 'vitest'
import { validateFullName, validateQuizTitle, validateQuestion } from './validation'

describe('form validation', () => {
  it('requires a full name between 5 and 50 characters', () => {
    expect(validateFullName('Joe')).toMatch(/between 5 and 50/)
    expect(validateFullName('Jordan Smith')).toBe('')
  })
  it('validates quiz title length', () => {
    expect(validateQuizTitle('Quiz')).toMatch(/between 10 and 30/)
    expect(validateQuizTitle('Geography Quiz')).toBe('')
  })
  it('validates question length', () => {
    expect(validateQuestion('Capital?')).toMatch(/between 10 and 200/)
    expect(validateQuestion('What is the capital of India?')).toBe('')
  })
})
