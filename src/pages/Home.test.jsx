import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import quizReducer from '../redux/slices/quizSlice'
import playReducer from '../redux/slices/playQuizSlice'
import Home from './Home'

describe('Home page', () => {
  it('shows the three main quiz actions', () => {
    const store = configureStore({ reducer: { quizzes: quizReducer, play: playReducer } })
    render(<Provider store={store}><MemoryRouter><Home /></MemoryRouter></Provider>)
    expect(screen.getByText('Create New Quiz')).toBeInTheDocument()
    expect(screen.getByText('My Quizzes')).toBeInTheDocument()
    expect(screen.getByText('Play Quiz')).toBeInTheDocument()
  })
})
