import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { HomeOutlined, ReplayOutlined } from '@mui/icons-material'

export default function QuizResult() {
  const result = useSelector(state => state.play.result)
  const participant = useSelector(state => state.play.participant)
  const navigate = useNavigate()
  if (!result) return <Box textAlign="center"><Typography variant="h5" fontWeight={700}>No result available</Typography><Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/authentication')}>Play a quiz</Button></Box>
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Card><CardContent className="panel" sx={{ textAlign: 'center' }}>
        <Typography color="text.secondary" fontWeight={700}>QUIZ COMPLETED</Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mt: 1 }}>Well done, {participant}!</Typography>
        <Typography color="text.secondary">{result.quizTitle}</Typography>
        <div className="result-score">{result.percentage}%</div>
        <Typography variant="h6" fontWeight={800}>Your score: {result.correct} / {result.total}</Typography>
        <Grid container spacing={2} sx={{ my: 3 }}>
          <Grid item xs={6}><Box sx={{ bgcolor: '#e9faf4', p: 2, borderRadius: 2 }}><Typography color="success.main" variant="h4" fontWeight={800}>{result.correct}</Typography><Typography color="text.secondary">Correct</Typography></Box></Grid>
          <Grid item xs={6}><Box sx={{ bgcolor: '#fff0ef', p: 2, borderRadius: 2 }}><Typography color="error.main" variant="h4" fontWeight={800}>{result.incorrect}</Typography><Typography color="text.secondary">Incorrect</Typography></Box></Grid>
        </Grid>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" spacing={1}>
          <Button variant="outlined" startIcon={<HomeOutlined />} onClick={() => navigate('/')}>Home</Button>
          <Button variant="contained" startIcon={<ReplayOutlined />} onClick={() => navigate('/authentication')}>Play Again</Button>
        </Stack>
      </CardContent></Card>
    </Box>
  )
}
