import { useNavigate } from 'react-router-dom'

type Feedback = {
  feedbackId: string
  teacherName: string
  subject: string
  rating: 1 | 2 | 3 | 4 | 5
  comments: string
}

type Props = {
  feedbacks: Feedback[]
  deleteFeedback: (id: string) => void
}

function FeedbackList({ feedbacks, deleteFeedback }: Props) {
  const navigate = useNavigate()

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      deleteFeedback(id)
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Teacher Feedback List</h4>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate('/feedback/new')}
        >
          + New Feedback
        </button>
      </div>

      {feedbacks.length === 0 ? (
        <div className="alert alert-info">
          No feedback submitted yet.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Teacher</th>
                  <th>Subject</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map(feedback => (
                  <tr key={feedback.feedbackId}>
                    <td>{feedback.teacherName}</td>
                    <td>{feedback.subject}</td>
                    <td>
                      <span className="badge bg-success">
                        {feedback.rating} / 5
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => navigate(`/feedback/${feedback.feedbackId}`)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(feedback.feedbackId)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedbackList