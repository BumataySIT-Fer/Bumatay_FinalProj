import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">

          <div className="card shadow-sm p-5">
            <div className="mb-4">
              <span style={{ fontSize: '4rem' }}></span>
            </div>

            <h1 className="fw-bold mb-3">
              Teacher Feedback System
            </h1>

            <p className="text-muted mb-4">
              A platform for students to submit structured feedback
              about their teachers per subject. Help improve the
              quality of education by sharing your honest experience.
            </p>

            <div className="d-flex gap-3 justify-content-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/feedbacks')}
              >
                View Feedbacks
              </button>
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={() => navigate('/feedback/new')}
              >
                 Submit Feedback
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage