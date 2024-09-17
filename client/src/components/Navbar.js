import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({}); // Initialize as an empty object
  const [showNotification, setShowNotification] = useState(false); // State for notification
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      fetch("http://127.0.0.1:5000/current_user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) =>
          response.ok ? response.json() : Promise.reject("Failed to fetch current user")
        )
        .then((data) => {
          if (data.id) {
            setIsLoggedIn(true);
            setUser(data);
            console.log(data)

            // Check if the user is a plumber and has not completed the profile
            if (data.is_plumber && !data.completed_profile) {
              setShowNotification(true);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
        });
    }
  }, []);

  function logout() {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:5000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  function handleLogin() {
    isLoggedIn ? logout() : navigate("/login");
  }
 
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-scroll custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h2 className="brand m-0 main-text ">
          <Link to={"/"} className="link-style">
            AquaFix
          </Link>
        </h2>
        <div className="collapse navbar-collapse justify-content-center" id="navbarExample01">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item active">
              <a className="nav-link navbar-text" aria-current="page">
                <Link to={"/"} className="link-style">
                  Home
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link navbar-text" aria-current="page">
                <Link to={"/aboutus"} className="link-style">
                  About Us
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link navbar-text" aria-current="page" href="#services">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link navbar-text" aria-current="page" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {isLoggedIn && (
          <Link to={"/profile"}>
            <span className="navbar-text me-3 main-text link-color profile-btn">
              <FontAwesomeIcon icon={faUserCircle} size="lg" className="me-2 main-text" id="svg" />
              <span>{user.username}</span>
              {showNotification && (
                <span className="notification ms-2 text-warning">
                  {/* Add notification message */}
                  Complete your profile
                </span>
              )}
            </span>
          </Link>
        )}
        <button className="btn btn-outline-light me-0 login-btn" onClick={handleLogin}>
          <span>{isLoggedIn ? "Logout" : "Login/Register"}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
