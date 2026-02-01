import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-6 px-6 py-4 bg-gray-800">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/login" className="ml-auto">
        Login
      </Link>
    </nav>
  );
}
