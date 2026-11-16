import { Card, CardContent, Grid, Typography, Box } from '@mui/material'
import { AddCircleOutline, QuizOutlined, PlayCircleOutline, ArrowForward } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const cards = [
  { title: 'Create New Quiz', description: 'Build a quiz with your own questions and answers.', to: '/create-quiz', icon: <AddCircleOutline sx={{ fontSize: 34 }} />, bg: '#eaf1ff', color: '#1769ff' },
  { title: 'My Quizzes', description: 'Manage, edit and organize the quizzes you created.', to: '/my-quizzes', icon: <QuizOutlined sx={{ fontSize: 34 }} />, bg: '#fff0ef', color: '#ed6a62' },
  { title: 'Play Quiz', description: 'Challenge yourself with an active quiz.', to: '/authentication', icon: <PlayCircleOutline sx={{ fontSize: 34 }} />, bg: '#e9faf5', color: '#0ba889' }
]
export default function Home() {
  const navigate = useNavigate()
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>Welcome to AlmaBetter Quiz</Typography>
        <Typography color="text.secondary">Create quizzes, manage your questions and test your knowledge.</Typography>
      </Box>
      <Grid container spacing={3}>
        {cards.map(card => (
          <Grid item xs={12} md={4} key={card.title}>
            <Card className="home-card" onClick={() => navigate(card.to)} sx={{ bgcolor: card.bg, border: '1px solid rgba(30,50,90,.04)' }}>
              <CardContent>
                <Box className="home-icon" sx={{ color: card.color }}>{card.icon}</Box>
                <Box>
                  <Typography variant="h5" fontWeight={800} gutterBottom>{card.title}</Typography>
                  <Typography color="text.secondary" sx={{ maxWidth: 270 }}>{card.description}</Typography>
                  <Typography sx={{ mt: 2, color: card.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: .5 }}>Get started <ArrowForward fontSize="small" /></Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
