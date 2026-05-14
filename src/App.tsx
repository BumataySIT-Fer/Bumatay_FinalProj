import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './links/Navbar'
import FeedbackList from './links/FeedbackList'
import FeedbackForm from './links/FeedbackForm'
import FeedbackDetail from './links/FeedbackDetail'
import HomePage from './links/Homepage'


type Feedback = {
  feedbackId: string
  teacherName: string
  subject: string
  rating: 1 | 2 | 3 | 4 | 5
  comments: string
}

const BASE_URL = 'https://bumatayfinalproj-production.up.railway.app'

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // GET all feedbacks on mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${BASE_URL}/api/feedbacks`)
        const data = await res.json()
        // map _id to feedbackId
        const mapped = data.map((f: any) => ({
          feedbackId: f._id,
          teacherName: f.teacherName,
          subject: f.subject,
          rating: f.rating,
          comments: f.comments
        }))
        setFeedbacks(mapped)
      } catch (err) {
        setError('Failed to fetch feedbacks')
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  // POST create feedback
  const addFeedback = async (feedback: Omit<Feedback, 'feedbackId'>) => {
    try {
      const res = await fetch(`${BASE_URL}/api/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
      })
      const data = await res.json()
      const newFeedback: Feedback = {
        feedbackId: data._id,
        teacherName: data.teacherName,
        subject: data.subject,
        rating: data.rating,
        comments: data.comments
      }
      setFeedbacks([...feedbacks, newFeedback])
    } catch (err) {
      setError('Failed to create feedback')
    }
  }

  // PUT update feedback
  const updateFeedback = async (updated: Feedback) => {
    try {
      const res = await fetch(`${BASE_URL}/api/feedbacks/${updated.feedbackId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherName: updated.teacherName,
          subject: updated.subject,
          rating: updated.rating,
          comments: updated.comments
        })
      })
      const data = await res.json()
      const updatedFeedback: Feedback = {
        feedbackId: data._id,
        teacherName: data.teacherName,
        subject: data.subject,
        rating: data.rating,
        comments: data.comments
      }
      setFeedbacks(feedbacks.map(f =>
        f.feedbackId === updated.feedbackId ? updatedFeedback : f
      ))
    } catch (err) {
      setError('Failed to update feedback')
    }
  }

  // DELETE feedback
  const deleteFeedback = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/api/feedbacks/${id}`, {
        method: 'DELETE'
      })
      setFeedbacks(feedbacks.filter(f => f.feedbackId !== id))
    } catch (err) {
      setError('Failed to delete feedback')
    }
  }

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status" />
      <p className="mt-2">Loading feedbacks...</p>
    </div>
  )

  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger">{error}</div>
    </div>
  )

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/feedbacks" element={
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