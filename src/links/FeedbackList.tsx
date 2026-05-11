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
    <div>
      <h1>Teacher Feedback</h1>

      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <table>
          <thead>
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
                <td>{feedback.rating} / 5</td>
                <td>
                  <button onClick={() => navigate(`/feedback/${feedback.feedbackId}`)}>
                    View
                  </button>
                  <button onClick={() => handleDelete(feedback.feedbackId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default FeedbackList