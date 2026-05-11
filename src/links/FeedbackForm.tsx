import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Feedback = {
  feedbackId: string
  teacherName: string
  subject: string
  rating: 1 | 2 | 3 | 4 | 5
  comments: string
}

type Props = {
  addFeedback: (feedback: Omit<Feedback, 'feedbackId'>) => void
}

function FeedbackForm({ addFeedback }: Props) {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    teacherName: '',
    subject: '',
    rating: 3,
    comments: ''
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.teacherName || !formData.subject || !formData.comments) {
      alert('Please fill in all fields.')
      return
    }

    addFeedback({
      teacherName: formData.teacherName,
      subject: formData.subject,
      rating: formData.rating as 1 | 2 | 3 | 4 | 5,
      comments: formData.comments
    })

    navigate('/')
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4">Submit Feedback</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Teacher Name</label>
              <input
                type="text"
                className="form-control"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleChange}
                placeholder="Enter teacher name"
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
                placeholder="Enter subject"
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
                placeholder="Write your comments here"
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Submit Feedback
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default FeedbackForm