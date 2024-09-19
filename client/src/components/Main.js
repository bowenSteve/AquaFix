import Navbar from "./Navbar";
import "../styles/main.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Main() {
  const [plumbers, setPlumbers] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    fetch("https://aquafix.onrender.com/plumbers")
      .then((res) => res.json())
      .then((data) => {
        setPlumbers(data);
        console.log(data)
      });
  }, []);

  function handleCard(id){
    navigate(`/plumbcard/${id}`)
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {plumbers.map((plumber, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4 plumb-card" onClick={()=>{handleCard(plumber.id)}}>
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
      <Footer />
    </div>
  );
}

export default Main;
