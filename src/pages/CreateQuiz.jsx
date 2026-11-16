import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import { Add, DeleteOutline, Save } from '@mui/icons-material'
import QuestionTypeDialog from '../components/QuestionTypeDialog'
import { addQuiz, updateQuiz } from '../redux/slices/quizSlice'
import { validateQuizTitle, validateQuestion } from '../utils/validation'

const makeQuestion = type => ({ id: crypto.randomUUID(), type, prompt: '', options: type.startsWith('MCQ') ? [{ id: crypto.randomUUID(), text: '' }, { id: crypto.randomUUID(), text: '' }] : [], correctAnswer: '', correctAnswers: [], answer: '' })

export default function CreateQuiz() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const existing = location.state?.quiz
  const [dialogOpen, setDialogOpen] = useState(!existing)
  const [title, setTitle] = useState(existing?.title || '')
  const [description, setDescription] = useState(existing?.description || '')
  const [questions, setQuestions] = useState(existing?.questions || [])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const questionType = questions[0]?.type || 'MCQ_SINGLE'

  const updateQuestion = (id, patch) => setQuestions(current => current.map(q => q.id === id ? { ...q, ...patch } : q))
  const addQuestion = type => { setQuestions(current => [...current, makeQuestion(type)]); setDialogOpen(false); setError('') }
  const updateOption = (qid, oid, text) => setQuestions(current => current.map(q => q.id === qid ? { ...q, options: q.options.map(o => o.id === oid ? { ...o, text } : o) } : q))
  const addOption = qid => setQuestions(current => current.map(q => q.id === qid ? { ...q, options: [...q.options, { id: crypto.randomUUID(), text: '' }] } : q))
  const removeOption = (qid, oid) => setQuestions(current => current.map(q => q.id === qid ? { ...q, options: q.options.filter(o => o.id !== oid), correctAnswer: q.correctAnswer === oid ? '' : q.correctAnswer, correctAnswers: q.correctAnswers.filter(id => id !== oid) } : q))

  const handleSave = () => {
    const titleError = validateQuizTitle(title)
    if (titleError) return setError(titleError)
    if (!questions.length) return setError('Add at least one question before saving.')
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      const qError = validateQuestion(q.prompt)
      if (qError) return setError(`Question ${i + 1}: ${qError}`)
      if (q.type.startsWith('MCQ')) {
        const validOptions = q.options.filter(o => o.text.trim())
        if (validOptions.length < 2) return setError('Atleast two option required to save question')
        if (q.type === 'MCQ_SINGLE' && !q.correctAnswer) return setError(`Select the correct answer for question ${i + 1}.`)
        if (q.type === 'MCQ_MULTI' && !q.correctAnswers.length) return setError(`Select at least one correct answer for question ${i + 1}.`)
      } else if (!q.answer.trim()) return setError(`Add an expected answer for question ${i + 1}.`)
    }
    const quiz = { ...(existing || {}), id: existing?.id || crypto.randomUUID(), title: title.trim(), description: description.trim(), status: existing?.status || 'active', createdAt: existing?.createdAt || new Date().toISOString(), questions }
    if (existing) dispatch(updateQuiz(quiz)); else dispatch(addQuiz(quiz))
    setError('')
    setSuccess(true)
  }

  return (
    <Box>
      <div className="page-heading"><Box><Typography variant="h4" fontWeight={800}>{existing ? 'Edit Quiz' : 'Create New Quiz'}</Typography><Typography color="text.secondary">Add questions and define the correct answers.</Typography></Box></div>
      <Card><CardContent className="panel">
        <Stack spacing={2}>
          <TextField label="Quiz title" value={title} onChange={e => setTitle(e.target.value)} inputProps={{ maxLength: 30 }} helperText={`${title.length}/30 characters (minimum 10)`} fullWidth />
          <TextField label="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} multiline minRows={2} fullWidth />
        </Stack>
        <Divider sx={{ my: 3 }} />
        {questions.map((q, index) => (
          <Box className="question-panel" key={q.id}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography fontWeight={800}>Question {index + 1}</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="caption" color="text.secondary">{q.type.replaceAll('_', ' ')}</Typography>
                <IconButton aria-label={`Delete question ${index + 1}`} color="error" onClick={() => setQuestions(current => current.filter(item => item.id !== q.id))}><DeleteOutline /></IconButton>
              </Stack>
            </Stack>
            <TextField fullWidth label="Enter your question" value={q.prompt} onChange={e => updateQuestion(q.id, { prompt: e.target.value })} inputProps={{ maxLength: 200 }} helperText={`${q.prompt.length}/200 characters (minimum 10)`} />
            {q.type.startsWith('MCQ') ? <>
              <Typography fontWeight={700} sx={{ mt: 2, mb: 1 }}>Answer options</Typography>
              {q.options.map((option, optionIndex) => (
                <div className="option-row" key={option.id}>
                  <TextField size="small" label={`Option ${optionIndex + 1}`} value={option.text} onChange={e => updateOption(q.id, option.id, e.target.value)} />
                  <IconButton aria-label={`Delete option ${optionIndex + 1}`} color="error" onClick={() => removeOption(q.id, option.id)}><DeleteOutline /></IconButton>
                </div>
              ))}
              <Button startIcon={<Add />} onClick={() => addOption(q.id)} sx={{ mt: 1 }}>Add option</Button>
              {q.type === 'MCQ_SINGLE' ? <FormControl fullWidth sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight={700} mb={1}>Correct answer</Typography>
                <Select displayEmpty value={q.correctAnswer} onChange={e => updateQuestion(q.id, { correctAnswer: e.target.value })}>
                  <MenuItem value="" disabled>Select correct option</MenuItem>
                  {q.options.filter(o => o.text.trim()).map((o, i) => <MenuItem key={o.id} value={o.id}>{`Option ${i + 1}: ${o.text}`}</MenuItem>)}
                </Select>
              </FormControl> : <FormControl sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight={700}>Select all correct options</Typography>
                {q.options.map((o, i) => <FormControlLabel key={o.id} control={<Radio checked={q.correctAnswers.includes(o.id)} onClick={() => updateQuestion(q.id, { correctAnswers: q.correctAnswers.includes(o.id) ? q.correctAnswers.filter(id => id !== o.id) : [...q.correctAnswers, o.id] })} />} label={o.text || `Option ${i + 1}`} />)}
              </FormControl>}
            </> : <TextField fullWidth sx={{ mt: 2 }} label={q.type === 'SHORT_ANSWER' ? 'Expected answer (up to 2 words)' : 'Expected answer / evaluation guide'} value={q.answer} onChange={e => updateQuestion(q.id, { answer: e.target.value })} />}
          </Box>
        ))}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
          <Button variant="outlined" startIcon={<Add />} onClick={() => setDialogOpen(true)}>Add Question</Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSave}>{existing ? 'Update Quiz' : 'Save Quiz'}</Button>
        </Stack>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </CardContent></Card>
      <QuestionTypeDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSelect={addQuestion} />
      {success && (
        <Box sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(20,30,50,.35)', display: 'grid', placeItems: 'center', zIndex: 1300, p: 2 }}>
          <Card sx={{ width: '100%', maxWidth: 420, p: 3 }}>
            <Typography variant="h6" fontWeight={800} gutterBottom>Quiz created successfully</Typography>
            <Typography color="text.secondary" mb={3}>Your quiz has been saved to this browser.</Typography>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button onClick={() => setSuccess(false)}>Close</Button>
              <Button variant="contained" onClick={() => navigate('/my-quizzes')}>View all quizzes</Button>
            </Stack>
          </Card>
        </Box>
      )}
    </Box>
  )
}
