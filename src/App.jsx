import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateQuiz from './pages/CreateQuiz'
import MyQuizzes from './pages/MyQuizzes'
import Authentication from './pages/Authentication'
import PlayQuiz from './pages/PlayQuiz'
import QuizResult from './pages/QuizResult'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/my-quizzes" element={<MyQuizzes />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/play-quiz" element={<PlayQuiz />} />
          <Route path="/result" element={<QuizResult />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}
