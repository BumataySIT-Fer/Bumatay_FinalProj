import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
         Teacher Feedback
      </Link>
      <Link className="btn btn-outline-light btn-sm" to="/feedback/new">
         New Feedback
      </Link>
    </nav>
  )
}

export default Navbar