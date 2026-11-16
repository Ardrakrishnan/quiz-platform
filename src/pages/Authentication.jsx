import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Card, CardContent, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { startSession } from '../redux/slices/playQuizSlice'
import { validateFullName } from '../utils/validation'

export default function Authentication() {
  const quizzes = useSelector(state => state.quizzes.items.filter(q => q.status === 'active' && q.questions.length))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [quizId, setQuizId] = useState(quizzes[0]?.id || '')
  const [error, setError] = useState('')
  const start = () => {
    const validation = validateFullName(name)
    if (validation) return setError(validation)
    if (!quizId) return setError('There are no active quizzes available. Please create or activate a quiz first.')
    dispatch(startSession({ name: name.trim(), quizId }))
    navigate('/play-quiz')
  }
  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <Card><CardContent className="panel">
        <Typography variant="h4" fontWeight={800} gutterBottom>Ready to play?</Typography>
        <Typography color="text.secondary" mb={3}>Enter your name and choose an active quiz to begin.</Typography>
        <Stack spacing={2}>
          <TextField label="Full name" name="fullName" value={name} onChange={e => setName(e.target.value)} inputProps={{ minLength: 5, maxLength: 50 }} helperText="Minimum 5 and maximum 50 characters" fullWidth />
          <TextField select label="Choose quiz" value={quizId} onChange={e => setQuizId(e.target.value)} fullWidth>
            {quizzes.map(q => <MenuItem key={q.id} value={q.id}>{q.title}</MenuItem>)}
          </TextField>
          {!quizzes.length && <Alert severity="info">No active quizzes are available yet.</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Button variant="contained" size="large" onClick={start}>Start Quiz</Button>
        </Stack>
      </CardContent></Card>
    </Box>
  )
}
