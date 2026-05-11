import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './links/Navbar'
import FeedbackList from './links/FeedbackList'
import FeedbackForm from './links/FeedbackForm'
import FeedbackDetail from './links/FeedbackDetail'

type Feedback = {
  feedbackId: string
  teacherName: string
  subject: string
  rating: 1 | 2 | 3 | 4 | 5
  comments: string
}

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    const stored = localStorage.getItem('feedbacks')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks))
  }, [feedbacks])

  const addFeedback = (feedback: Omit<Feedback, 'feedbackId'>) => {
    const newFeedback: Feedback = {
      feedbackId: Date.now().toString(),
      ...feedback
    }
    setFeedbacks([...feedbacks, newFeedback])
  }

  const updateFeedback = (updated: Feedback) => {
    setFeedbacks(feedbacks.map(f =>
      f.feedbackId === updated.feedbackId ? updated : f
    ))
  }

  const deleteFeedback = (id: string) => {
    setFeedbacks(feedbacks.filter(f => f.feedbackId !== id))
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <FeedbackList
              feedbacks={feedbacks}
              deleteFeedback={deleteFeedback}
            />}
          />
          <Route path="/feedback/new" element={
            <FeedbackForm addFeedback={addFeedback} />}
          />
          <Route path="/feedback/:id" element={
            <FeedbackDetail
              feedbacks={feedbacks}
              updateFeedback={updateFeedback}
              deleteFeedback={deleteFeedback}
            />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App