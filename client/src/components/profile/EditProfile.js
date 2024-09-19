import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

function EditProfile({ plumber }) {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    location: '',
    image: '',
    completed_profile: false
  });
  
  const [userDetails, setUserDetails] = useState({
    id_number: '',
    years_of_experience: '',
    services_offered: '',
    rates: ''
  });

  const [isEditing, setIsEditing] = useState({
    first_name: false,
    last_name: false,
    phone_number: false,
    location: false,
    image: false,
    id_number: false,
    years_of_experience: false,
    services_offered: false,
    rates: false
  });

  useEffect(() => {
    if (plumber && plumber.profile && plumber.plumber_details) {
      setProfile({
        first_name: plumber.profile.first_name || '',
        last_name: plumber.profile.last_name || '',
        phone_number: plumber.profile.phone_number || '',
        location: plumber.profile.location || '',
        image: plumber.profile.image || '',
        completed_profile: plumber.completed_profile || false
      });

      setUserDetails({
        id_number: plumber.plumber_details.id_number || '',
        years_of_experience: plumber.plumber_details.years_of_experience || '',
        services_offered: plumber.plumber_details.services_offered || '',
        rates: plumber.plumber_details.rates || ''
      });
    }
  }, [plumber]);

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleUserDetailsChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleEditToggle = (field) => {
    setIsEditing({
      ...isEditing,
      [field]: !isEditing[field]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    fetch(`https://aquafix.onrender.com/update_profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: plumber.id,
        profile: profile,
        plumber_details: userDetails
      }),
    })
    .then(response => response.json())
    .then(data => {
      alert("Profile updated successfully!");
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      alert("An error occurred while updating the profile.");
    });
  };

  return (
    <div className="container mt-4 edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Profile Section */}
        <div className="profile-section">
          <h4>Profile Information</h4>

          {/* Profile Picture */}
          <div className="row mb-3">
            <div className="col-md-8">
              <label className="form-label">Profile Picture</label>
              {isEditing['image'] ? (
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={profile['image']}
                  onChange={handleProfileChange}
                  placeholder="Enter image URL"
                />
              ) : (
                <div className="profile-picture-container">
                  
                  <img 
                    src={profile['image'] || '/default-profile.png'} 
                    alt="Profile" 
                    className="profile-picture" 
                  />
                </div>
              )}
            </div>
            <div className="col-md-4">
              <FaEdit
                className="edit-icon"
                onClick={() => handleEditToggle('image')}
              />
            </div>
          </div>

          {/* Other Profile Fields */}
          {Object.keys(profile).map((key) => (
            key !== 'image' && key !== 'completed_profile' && (
              <div className="row mb-3" key={key}>
                <div className="col-md-8">
                  <label className="form-label">{key.replace('_', ' ').toUpperCase()}</label>
                  {isEditing[key] ? (
                    <input
                      type="text"
                      className="form-control"
                      name={key}
                      value={profile[key] || ''}
                      onChange={handleProfileChange}
                    />
                  ) : (
                    <p>{profile[key] || 'N/A'}</p>
                  )}
                </div>
                <div className="col-md-4">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEditToggle(key)}
                  />
                </div>
              </div>
            )
          ))}
        </div>

        {/* Plumber Details Section */}
        {plumber.is_plumber && (
          <div className="plumber-details-section">
            <h4 className="mt-4">Plumber Details</h4>
            {Object.keys(userDetails).map((key) => (
              <div className="row mb-3" key={key}>
                <div className="col-md-8">
                  <label className="form-label">{key.replace('_', ' ').toUpperCase()}</label>
                  {isEditing[key] ? (
                    <input
                      type={key === 'years_of_experience' || key === 'rates' ? 'number' : 'text'}
                      className="form-control"
                      name={key}
                      value={userDetails[key] || ''}
                      onChange={handleUserDetailsChange}
                    />
                  ) : (
                    <p>{userDetails[key] || 'N/A'}</p>
                  )}
                </div>
                <div className="col-md-4">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEditToggle(key)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Save Changes Button */}
        <button type="submit" className="btn btn-primary save-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
