import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-scroll custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h2 className="brand m-0 main-text">AquaFix</h2>
        <div className="collapse navbar-collapse justify-content-center" id="navbarExample01">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item active">
           <a className="nav-link navbar-text" aria-current="page" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link navbar-text" aria-current="page" href="#about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link navbar-text" aria-current="page" href="#services">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link navbar-text" aria-current="page" href="#contact">Contact</a>
            </li>
          </ul>
        </div>
         <button className="btn btn-outline-light me-0 login-btn" >
          Login/Register
        </button>
      </div>
      </nav>
  );
}

export default Navbar;
