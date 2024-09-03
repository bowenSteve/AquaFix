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
  const [plumbers, setPlumbers] = useState([

    {
        "image": image1,
        "name": "John",
        "skill": "pipe installation",
        "rates": "$10"
    },
    {
        "image": image2,
        "name": "Alice",
        "skill": "welding",
        "rates": "$15"
    },
    {
        "image": image3,
        "name": "Bob",
        "skill": "carpentry",
        "rates": "$12"
    },
    {
        "image": image4,
        "name": "Carol",
        "skill": "electrical wiring",
        "rates": "$18"
    },
    {
        "image": image5,
        "name": "Dave",
        "skill": "plumbing",
        "rates": "$11"
    },
    {
        "image": image6,
        "name": "Eve",
        "skill": "painting",
        "rates": "$14"
    },
    {
        "image": image1,
        "name": "John",
        "skill": "pipe installation",
        "rates": "$10"
    },
    {
        "image": image2,
        "name": "Alice",
        "skill": "welding",
        "rates": "$15"
    },
    {
        "image": image3,
        "name": "Bob",
        "skill": "carpentry",
        "rates": "$12"
    }

  ]);

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.json())
      .then((data) => {
        //setPlumbers(data);
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
                  src={plumber.image}
                  className="card-img-top profile-picture"
                  alt={plumber.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{plumber.name}</h5>
                  <p className="card-text">Skill: {plumber.skill}</p>
                  <p className="card-text">Rates: {plumber.rates}</p>
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
