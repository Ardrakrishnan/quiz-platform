import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './slices/quizSlice'
import playQuizReducer from './slices/playQuizSlice'

export const store = configureStore({
  reducer: { quizzes: quizReducer, play: playQuizReducer }
})
