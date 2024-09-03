import Navbar from "./Navbar";
import "../styles/main.css";
import { useState, useEffect } from "react";
import image1 from "../images/1.jpg"
import image2 from "../images/2.jpg"
import image3 from "../images/3.jpg"
import image4 from "../images/4.jpg"
import image5 from "../images/5.jpg"
import image6 from "../images/6.jpg"

function Main() {
  const [plumbers, setPlumbers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/plumbers")
      .then((res) => res.json())
      .then((data) => {
        setPlumbers(data);
        console.log(data)
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {plumbers.map((plumber, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4 plumb-card">
                <img
                  src={plumber.profile.image}
                  className="card-img-top profile-picture"
                  alt={plumber.profile.first_name}
                />
                <div className="card-body">
                  <h5 className="card-title">{plumber.profile.first_name}</h5>
                  <p className="card-text">Skill: {plumber.plumber_details.services_offered}</p>
                  <p className="card-text">Rates: KES. {plumber.plumber_details.rates}</p>
                </div>
              </div>
              
            </div>
          ))}
        </div>
        <button className="btn btn-primary next-btn">Next</button>
      </div>
    </div>
  );
}

export default Main;
