import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Chip, IconButton, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Add, DeleteOutline, EditOutlined, VisibilityOutlined } from '@mui/icons-material'
import ConfirmDialog from '../components/ConfirmDialog'
import { deleteQuiz, toggleQuizStatus } from '../redux/slices/quizSlice'

export default function MyQuizzes() {
  const quizzes = useSelector(state => state.quizzes.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState(null)
  const selected = quizzes.find(q => q.id === deleteId)
  return (
    <Box>
      <div className="page-heading">
        <Box><Typography variant="h4" fontWeight={800}>My Quizzes</Typography><Typography color="text.secondary">Manage your quizzes and their availability.</Typography></Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/create-quiz')}>Create New Quiz</Button>
      </div>
      {!quizzes.length ? <Paper className="panel" sx={{ textAlign: 'center' }}><Typography variant="h6" fontWeight={700}>No quizzes yet</Typography><Typography color="text.secondary" sx={{ my: 1 }}>Create your first quiz to see it here.</Typography><Button variant="contained" onClick={() => navigate('/create-quiz')}>Create a quiz</Button></Paper> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead><TableRow sx={{ bgcolor: '#f8faff' }}><TableCell>Quiz No.</TableCell><TableCell>Title</TableCell><TableCell>Questions</TableCell><TableCell>Status</TableCell><TableCell>Created on</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
            <TableBody>{quizzes.map((quiz, index) => (
              <TableRow hover key={quiz.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell><Button color="inherit" sx={{ fontWeight: 700 }} onClick={() => navigate('/create-quiz', { state: { quiz } })}>{quiz.title}</Button></TableCell>
                <TableCell>{quiz.questions.length}</TableCell>
                <TableCell><Chip size="small" label={quiz.status === 'active' ? 'Active' : 'Inactive'} color={quiz.status === 'active' ? 'success' : 'default'} /><Switch size="small" checked={quiz.status === 'active'} onChange={() => dispatch(toggleQuizStatus(quiz.id))} inputProps={{ 'aria-label': `Toggle ${quiz.title} status` }} /></TableCell>
                <TableCell>{new Date(quiz.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label={`Edit ${quiz.title}`} onClick={() => navigate('/create-quiz', { state: { quiz } })}><EditOutlined /></IconButton>
                  <IconButton aria-label={`Delete ${quiz.title}`} color="error" onClick={() => setDeleteId(quiz.id)}><DeleteOutline /></IconButton>
                  <IconButton aria-label={`Preview ${quiz.title}`} onClick={() => navigate('/authentication')}><VisibilityOutlined /></IconButton>
                </TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        </TableContainer>
      )}
      <ConfirmDialog open={Boolean(selected)} title="Are you sure you want to delete?" message="Deleting this quiz will permanently remove it from this browser." onCancel={() => setDeleteId(null)} onConfirm={() => { dispatch(deleteQuiz(deleteId)); setDeleteId(null) }} />
    </Box>
  )
}
