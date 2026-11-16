import { describe, expect, it } from 'vitest'
import { readQuizzes, writeQuizzes, STORAGE_KEY } from './storageService'

describe('quiz LocalStorage service', () => {
  it('stores and reads an array under the required question key', () => {
    const quizzes = [{ id: '1', title: 'Geography Quiz', questions: [] }]
    writeQuizzes(quizzes)
    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(quizzes))
    expect(readQuizzes()).toEqual(quizzes)
  })
  it('returns an empty array for invalid stored JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{bad json')
    expect(readQuizzes()).toEqual([])
  })
})
