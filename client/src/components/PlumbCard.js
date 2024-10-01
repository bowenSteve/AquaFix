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
    const [showChat, setShowChat] = useState(false); // State to toggle chat window
    const [message, setMessage] = useState(""); // State to handle the message text
    const [chatroomId, setChatroomId] = useState(null); // Initialize as null
    const [messages, setMessages] = useState([])
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        fetch(`https://aquafix.onrender.com/plumber/${id}`)
            .then(res => res.json())
            .then(data => {
                setPlumber(data);
                // Fetch chatroom after getting plumber data
                if (data.plumber_details) {
                    fetchChatroom(id); // Assuming the plumber's id is available in plumber_details
                    fetchMessages()
                }
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
                        setCurrentUser(data)
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
    console.log(messages)
    //function to create chatroom

    const createChatroom = () =>{
        const token = localStorage.getItem('token');
        fetch('https://aquafix.onrender.com/chatroom',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({plumber_id:id})
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
        })
    }
useEffect((()=>{
    createChatroom()
}),[])
    // Function to handle chat toggling
    const handleChatToggle = () => {
        setShowChat(!showChat);
    };

    // Function to handle chatroom ID
    const fetchChatroom = (id) => {
        const token = localStorage.getItem('token');

        fetch(`https://aquafix.onrender.com/chatroom/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            setChatroomId(data.chatroom_id); // Store chatroom ID
            console.log('Chatroom ID:', data.chatroom_id);
        })
        .catch(error => {
            console.error('Error fetching chatroom:', error);
        });
    };
    //Function to handle fetching messages
    const fetchMessages = () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error("No token found");
            return;
        }
    
        fetch(`https://aquafix.onrender.com/chatroom/${id}/messages`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            setMessages(data);
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
    };
    
    
    // Call this function whenever you need to fetch messages, e.g., when the chat window is opened.
    

    // Function to handle sending message
    const handleSendMessage = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to send a message');
            return;
        }

        fetch(`https://aquafix.onrender.com/chatroom/${chatroomId}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message, plumber_id: id })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Message sent:', data);
                setMessage("");  // Clear the message input
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
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
                        {/* Send Message Button */}
                        <button
                            className="btn btn-primary"
                            style={{ position: "absolute", top: "10px", right: "10px" }}
                            onClick={handleChatToggle}
                        >
                            Chat with {plumber.profile.first_name}
                        </button>

                        {/* Chat Area (Visible when Send Message is clicked) */}
                        {showChat && (
                            <div className="card chat-card mt-4" style={{ position: "absolute", top: "50px", right: "10px", width: "300px" }}>
                                <div className="card-body">
                                    <p>Start a conversation with {plumber.profile.first_name}</p>
                                    <div className="messages-container">
    {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender_id === currentUser.id ? 'sent' : 'received'}`}>
            {/* Display the name of the message sender */}
            <p className="message-sender">
                {msg.sender_id === currentUser.id
                    ? currentUser.profile.first_name  // If the logged-in user is the sender
                    : plumber.profile.first_name       // If the plumber is the sender
                }
            </p>
            <p>{msg.message}</p>
            <span>{new Date(msg.timestamp).toLocaleString()}</span>
        </div>
    ))}
</div>




                                    <textarea
                                        className="form-control mb-3"
                                        rows="3"
                                        placeholder="Type your message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                    <button className="btn btn-primary" onClick={handleSendMessage}>Send Message</button>
                                </div>
                            </div>
                        )}

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
