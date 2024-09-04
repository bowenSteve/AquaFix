import { useState } from "react";
import "../styles/signup.css";
import plumber_img from "../images/plumber.jpeg";
import user from "../images/use.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import LoginNavbar from "../components/LoginNavbar";

function SignUp() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (type) => {
    setSelected(type);
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
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control form-width"
              id="username"
              placeholder="Enter your username"
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
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control form-width"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
