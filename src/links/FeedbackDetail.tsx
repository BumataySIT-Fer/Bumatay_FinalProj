import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

type Feedback = {
  feedbackId: string
  teacherName: string
  subject: string
  rating: 1 | 2 | 3 | 4 | 5
  comments: string
}

type Props = {
  feedbacks: Feedback[]
  updateFeedback: (updated: Feedback) => Promise<void>
  deleteFeedback: (id: string) => Promise<void>
}

function FeedbackDetail({ feedbacks, updateFeedback, deleteFeedback }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()

  const feedback = feedbacks.find(f => f.feedbackId === id)

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Feedback | null>(feedback || null)

  if (!feedback || !formData) {
    return (
      <div className="container mt-4">
        <p className="text-danger">Feedback not found.</p>
      </div>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'rating'
        ? Number(e.target.value)
        : e.target.value
    })
  }

  const handleSave = async () => {
    if (!formData.teacherName || !formData.subject || !formData.comments) {
      alert('Please fill in all fields.')
      return
    }

    await updateFeedback({
      ...formData,
      rating: formData.rating as 1 | 2 | 3 | 4 | 5
    })

    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      await deleteFeedback(feedback.feedbackId)
      navigate('/')
    }
  }

  const handleCancel = () => {
    setFormData(feedback)
    setIsEditing(false)
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4">
            {isEditing ? 'Edit Feedback' : 'Feedback Detail'}
          </h4>

          {isEditing ? (
            <div>
              <div className="mb-3">
                <label className="form-label">Teacher Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                >
                  <option value={1}>1 - Poor</option>
                  <option value={2}>2 - Fair</option>
                  <option value={3}>3 - Good</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={5}>5 - Excellent</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Comments</label>
                <textarea
                  className="form-control"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p><strong>Teacher:</strong> {feedback.teacherName}</p>
              <p><strong>Subject:</strong> {feedback.subject}</p>
              <p><strong>Rating:</strong> {feedback.rating} / 5</p>
              <p><strong>Comments:</strong> {feedback.comments}</p>

              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                  Back
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default FeedbackDetail