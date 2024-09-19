import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "../styles/plumbcard.css";
import Navbar from './Navbar';
import Footer from './Footer';

function PlumbCard() {
    const { id } = useParams();
    const [plumber, setPlumber] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Fetch the plumber details
        fetch(`https://aquafix.onrender.com/plumber/${id}`)
            .then(res => res.json())
            .then(data => {
                setPlumber(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching plumber:', error);
            });

        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            fetch("https://aquafix.onrender.com/current_user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch current user"))
                .then(data => {
                    if (data.id) {
                        setIsLoggedIn(true);
                    }
                })
                .catch(error => {
                    console.error("Error fetching current user:", error);
                });
        }
    }, [id]);

    if (!plumber) {
        return <div className="alert alert-danger" role="alert">Plumber not found</div>;
    }

    return (
        <div>
            <Navbar />
            <div className='container main-card'>
                <div className="col-md-12">
                    <div className="card mb-4">
                        <img
                            src={plumber.profile.image}
                            className="card-img-top profile-picture card-image"
                            alt={plumber.profile.first_name}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{plumber.profile.first_name}</h5>
                            <p>{plumber.plumber_details.about_me}</p>
                            <p className="card-text"><strong>Skill</strong>: {plumber.plumber_details.services_offered}</p>
                            <p className="card-text"><strong>Rates</strong>: KES. {plumber.plumber_details.rates}</p>
                            <p className="card-text"><strong>Location</strong>: {plumber.profile.location}</p>
                            {isLoggedIn ? <span><strong>Contact: </strong>{plumber.profile.phone_number}</span> : <span className='text-warning'>Log in to view Contact</span>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PlumbCard;
