import { createSlice } from '@reduxjs/toolkit'

const initialState = { participant: '', quizId: null, answers: {}, result: null }
const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    startSession(state, action) {
      state.participant = action.payload.name
      state.quizId = action.payload.quizId
      state.answers = {}
      state.result = null
    },
    saveAnswer(state, action) {
      state.answers[action.payload.questionId] = action.payload.answer
    },
    finishSession(state, action) { state.result = action.payload },
    resetSession: () => initialState
  }
})
export const { startSession, saveAnswer, finishSession, resetSession } = playSlice.actions
export default playSlice.reducer
