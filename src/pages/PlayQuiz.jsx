import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Card, CardContent, FormControlLabel, Radio, RadioGroup, Checkbox, Stack, Typography } from '@mui/material'
import { ArrowBack, ArrowForward, Send } from '@mui/icons-material'
import { finishSession, saveAnswer } from '../redux/slices/playQuizSlice'

export default function PlayQuiz() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { quizId, participant, answers } = useSelector(state => state.play)
  const quiz = useSelector(state => state.quizzes.items.find(q => q.id === quizId))
  const questions = useMemo(() => (quiz?.questions || []).slice(0, 10), [quiz])
  const [index, setIndex] = useState(0)
  if (!quiz || !participant || !questions.length) return <Alert severity="warning" action={<Button onClick={() => navigate('/authentication')}>Start again</Button>}>No quiz session found. Please select a quiz first.</Alert>
  const question = questions[index]
  const currentAnswer = answers[question.id]
  const answered = Array.isArray(currentAnswer) ? currentAnswer.length > 0 : Boolean(currentAnswer)
  const submit = () => {
    const correct = questions.filter(q => {
      if (q.type === 'MCQ_SINGLE') return answers[q.id] === q.correctAnswer
      if (q.type === 'MCQ_MULTI') return [...(answers[q.id] || [])].sort().join('|') === [...q.correctAnswers].sort().join('|')
      return String(answers[q.id] || '').trim().toLowerCase() === String(q.answer || '').trim().toLowerCase()
    }).length
    const result = { quizTitle: quiz.title, total: questions.length, correct, incorrect: questions.length - correct, percentage: Math.round((correct / questions.length) * 100) }
    dispatch(finishSession(result))
    navigate('/result')
  }
  return (
    <Box sx={{ maxWidth: 760, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" mb={2}><Typography color="text.secondary">Participant: <b>{participant}</b></Typography><Typography color="text.secondary">Question {index + 1} of {questions.length}</Typography></Stack>
      <div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      <Card sx={{ mt: 3 }}><CardContent className="panel">
        <Typography color="primary" fontWeight={700} variant="overline">{quiz.title}</Typography>
        <Typography variant="h5" fontWeight={800} sx={{ my: 2 }}>{question.prompt}</Typography>
        {question.type === 'MCQ_SINGLE' && <RadioGroup value={currentAnswer || ''} onChange={e => dispatch(saveAnswer({ questionId: question.id, answer: e.target.value }))}>
          {question.options.map((o, i) => <FormControlLabel key={o.id} value={o.id} control={<Radio />} label={o.text || `Option ${i + 1}`} sx={{ border: '1px solid #e6eaf1', borderRadius: 2, p: 1, my: .5, ml: 0 }} />)}
        </RadioGroup>}
        {question.type === 'MCQ_MULTI' && question.options.map((o, i) => <FormControlLabel key={o.id} control={<Checkbox checked={(currentAnswer || []).includes(o.id)} onChange={e => {
          const next = e.target.checked ? [...(currentAnswer || []), o.id] : (currentAnswer || []).filter(id => id !== o.id)
          dispatch(saveAnswer({ questionId: question.id, answer: next }))
        }} />} label={o.text || `Option ${i + 1}`} sx={{ display: 'flex' }} />)}
        {(question.type === 'SHORT_ANSWER' || question.type === 'DESCRIPTION') && <Box component="textarea" aria-label="Your answer" value={currentAnswer || ''} onChange={e => dispatch(saveAnswer({ questionId: question.id, answer: e.target.value }))} rows={question.type === 'DESCRIPTION' ? 4 : 2} style={{ width: '100%', padding: 12, border: '1px solid #cbd5e1', borderRadius: 9, font: 'inherit' }} />}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
          <Button startIcon={<ArrowBack />} disabled={index === 0} onClick={() => setIndex(i => i - 1)}>Previous</Button>
          {index < questions.length - 1
            ? <Button variant="contained" endIcon={<ArrowForward />} disabled={!answered} onClick={() => setIndex(i => i + 1)}>Next Question</Button>
            : <Button variant="contained" color="success" endIcon={<Send />} disabled={!answered} onClick={submit}>Submit Quiz</Button>}
        </Stack>
      </CardContent></Card>
      <Typography color="text.secondary" textAlign="center" mt={2} variant="body2">Your answers are kept until you submit the quiz.</Typography>
    </Box>
  )
}
