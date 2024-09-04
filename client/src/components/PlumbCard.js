import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "../styles/plumbcard.css"
import Navbar from './Navbar';
import Footer from './Footer';

function PlumbCard(){
    const { id } = useParams();
    const [plumber, setPlumber] = useState(null);

    useEffect(() => {
      fetch(`http://localhost:5000/plumber/${id}`)
          .then(res => res.json())
          .then(data => {
              setPlumber(data);
              console.log(data)
          })
          .catch(error => {
              console.error('Error fetching job:', error);
          });
  }, [id]);

  if (!plumber) {
      return <div className="alert alert-danger" role="alert">plumber not found</div>;
  }
    return(
      <div>
        <Navbar />
        <div className='container main-card'>
               <div className="col-md-12" >
              <div className="card mb-4 ">
                <img
                  src={plumber.profile.image}
                  className="card-img-top profile-picture card-image"
                  alt={plumber.name}
                />
                <div className="card-body">
                 <h5 className="card-title">{plumber.profile.first_name}</h5>
                  <p className="card-text"><strong>Skill</strong> : {plumber.plumber_details.services_offered}</p>
                  <p className="card-text"><strong>Rates </strong>: KES. {plumber.plumber_details.rates}</p>
                  <p className="card-text"><strong>Location</strong>: {plumber.profile.location}</p>
                  <p className="card-text"><strong>Phone Number</strong>: {plumber.profile.phone_number}</p>
                </div>
              </div>
              
            </div>
        </div>
        <Footer />
        </div>
    )
}
export default PlumbCard;