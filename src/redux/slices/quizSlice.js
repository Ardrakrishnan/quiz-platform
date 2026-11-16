import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { readQuizzes, writeQuizzes } from '../../services/storageService'

export const loadQuizzes = createAsyncThunk('quizzes/load', async () => readQuizzes())
export const persistQuizzes = createAsyncThunk('quizzes/persist', async (quizzes) => {
  writeQuizzes(quizzes)
  return quizzes
})

const quizSlice = createSlice({
  name: 'quizzes',
  initialState: { items: readQuizzes(), loading: false },
  reducers: {
    addQuiz(state, action) {
      state.items.push(action.payload)
      writeQuizzes(state.items)
    },
    updateQuiz(state, action) {
      const index = state.items.findIndex(q => q.id === action.payload.id)
      if (index !== -1) state.items[index] = action.payload
      writeQuizzes(state.items)
    },
    deleteQuiz(state, action) {
      state.items = state.items.filter(q => q.id !== action.payload)
      writeQuizzes(state.items)
    },
    toggleQuizStatus(state, action) {
      const quiz = state.items.find(q => q.id === action.payload)
      if (quiz) quiz.status = quiz.status === 'active' ? 'inactive' : 'active'
      writeQuizzes(state.items)
    }
  },
  extraReducers: builder => {
    builder.addCase(loadQuizzes.fulfilled, (state, action) => { state.items = action.payload })
    builder.addCase(persistQuizzes.fulfilled, (state, action) => { state.items = action.payload })
  }
})

export const { addQuiz, updateQuiz, deleteQuiz, toggleQuizStatus } = quizSlice.actions
export default quizSlice.reducer
