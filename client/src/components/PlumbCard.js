import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/plumbcard.css";
import Navbar from './Navbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

function PlumbCard() {
    const { id } = useParams();
    const [plumber, setPlumber] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [rating, setRating] = useState(3); // Hardcoded rating for testing

    useEffect(() => {
        fetch(`https://aquafix.onrender.com/plumber/${id}`)
            .then(res => res.json())
            .then(data => {
                setPlumber(data);
                // Comment out the line below to keep the hardcoded rating
                // setRating(data.average_rating || 4.5); // This was overwriting the hardcoded rating
            })
            .catch(error => {
                console.error('Error fetching plumber:', error);
            });

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

    // Function to render stars based on the rating value
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);   // Full stars
        const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Half star if the rating has 0.5
        const emptyStars = 5 - fullStars - halfStars; // Remaining empty stars
        // Create an array of full, half, and placeholder stars
        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} style={{ color: "gold" }} />
                ))}
                {halfStars === 1 && <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "gold" }} />}
                {[...Array(emptyStars)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} style={{ color: "lightgray" }} />
                ))}
            </>
        );
    };

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
                            {isLoggedIn ? (
                                <span><strong>Contact: </strong>{plumber.profile.phone_number}</span>
                            ) : (
                                <span><Link to={"/login"} className='plumb-link text-warning'>Log in to view Contact</Link></span>
                            )}
                        </div>
                        <div className='card bg-color'>
                            <p>Average User Rating</p>
                            <div className='star-rating'>
                                {renderStars(rating)}
                                <p className='mt-1'>{rating}/5</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PlumbCard;
