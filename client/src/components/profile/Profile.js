import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from "./ProfileNavbar";
import EditProfile from './EditProfile';
import './styles/profile.css';  // Add a CSS file for styling
import { FaUser, FaCog, FaListAlt, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

function Profile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('editprofile');
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    

    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token) {
        fetch("/current_user", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch current user"))
          .then(data => {
            setUser(data)

          })
          .catch(error => {
            console.error("Error fetching current user:", error);
          });
        }
        },[])

        function logout(){
          const token = localStorage.getItem('token');
          fetch('https://aquafix.onrender.com/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
            .then(res => res.json())
            .then(res => {
              if (res.success) {
                localStorage.removeItem('token');
                navigate('/login');
              } else {
                console.log("Something went wrong");
              }
            })
            .catch(error => {
              console.error("Error logging out:", error);
            });
        };  

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const renderContent = ()=>{
        switch(activeSection){
          case 'editprofile':
              return <EditProfile plumber={user}/>
          
          default:
            return <EditProfile plumber={user}/>
        }
    }
    
    return (
        <div className="profile-container">
            <ProfileNavbar user={user} />

            <div className={`sidebar sidebar-bg p-3 sidebar-margin ${isMenuOpen ? 'open' : ''}`} id="sidebar" style={{ width: isMenuOpen ? '200px' : '80px' }}>
                <button className="btn btn-bg mb-3" id="menuButton" onClick={toggleMenu}>
                    ☰
                </button>
                <div className={`canvas-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                            <button
                                className={`btn ${activeSection === 'Overview' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setActiveSection('editprofile')}
                            >
                                <FaUser />
                                {isMenuOpen && <span className="menu-text">Edit Profile</span>}
                            </button>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <button
                                className={`btn ${activeSection === 'Settings' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setActiveSection('Settings')}
                            >
                                <FaCog />
                                {isMenuOpen && <span className="menu-text">Settings</span>}
                            </button>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <button
                                className={`btn ${activeSection === 'Activity' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setActiveSection('Activity')}
                            >
                                <FaListAlt />
                                {isMenuOpen && <span className="menu-text">Activity</span>}
                            </button>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <button
                                className={`btn ${activeSection === 'Logout' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={logout}
                            >
                                <FaSignOutAlt />
                                {isMenuOpen && <span className="menu-text">Logout</span>}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="profile-content" style={{ marginLeft: isMenuOpen ? '200px' : '80px' }}>
                <h1>{activeSection} Section</h1>
                {renderContent()}
            </div>
        </div>
    );
}

export default Profile;
