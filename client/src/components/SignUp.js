import { useState } from "react";
import "../styles/signup.css";
import plumber_img from "../images/plumber.jpeg";
import user from "../images/use.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import LoginNavbar from "../components/LoginNavbar";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSelect = (type) => {
    setSelected(type);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      is_plumber: selected === 'plumber'
    };

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSubmit)
    })
    .then(response => response.json())
    .then(data => {
      alert("Your account has been created successfully")
      navigate('/login')
    })
    .catch(error => {
      console.error('Error:', error);
      alert(error.message || 'An error occurred. Please try again.');
    });
  };

  return (
    <div>
      <LoginNavbar />
      <div className="signup-container">
        <h5 className="text-center">Choose account type</h5>
        <div className="image-container">
          <div onClick={() => handleSelect("plumber")} className="image-box">
            <img
              src={plumber_img}
              alt="Plumber"
              className="left-image"
              style={{ border: selected === "plumber" ? "2px solid blue" : "none" }}
            />
            {selected === "plumber" && (
              <FontAwesomeIcon icon={faCheckCircle} className="tick-icon" />
            )}
            <span className="mt-2">Plumber</span>
          </div>
          <div onClick={() => handleSelect("user")} className="image-box">
            <img
              src={user}
              alt="User"
              className="right-image"
              style={{ border: selected === "user" ? "2px solid blue" : "none" }}
            />
            {selected === "user" && (
              <FontAwesomeIcon icon={faCheckCircle} className="tick-icon" />
            )}
            <span className="mt-2">User</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control form-width"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control form-width"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control form-width"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control form-width"
              id="confirmPassword"
              placeholder="Enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 button-g mb-3">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
