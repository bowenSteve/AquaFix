import { useState } from "react";
import "../styles/login.css";
import LoginNavbar from "../components/LoginNavbar";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate()


  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleLogin = (e) => {
    e.preventDefault(); 

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), 
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            localStorage.setItem("token", data.access_token); 
            navigate('/')
            console.log(data)
          });
        } else {
          r.json().then((err) => {
            setError("Invalid email or password."); 
          });
        }
      })
      .catch((error) => {
        setError("An error occurred. Please try again."); 
      });
  };

  return (
    <div>
      <LoginNavbar />
      <div className="container mt-5">
        <h3 className="text-center mb-4">Welcome to AquaFix</h3>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card card-width p-4">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control form-width"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-width"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary form-width mb-3 button-g">
                  Login
                </button>
                <div className="d-flex">
                  <button type="button" className="btn btn-outline-danger form-width button-g">
                  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" className="google-icon">
                        <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                        <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                        <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                        <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </form>
              <span className="text-center mt-1 mb-1">
                Don't have an account?
                <a href="/signup" className="signup-link">
                  {" "}
                  Sign Up
                </a>
              </span>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
