import React, { useState, useEffect } from 'react';

function Profile() {
  // Sample data from API for user and plumber details
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "123-456-7890",
    location: "123 Main St",
    image: "/path-to-image",
  });

  const [plumberData, setPlumberData] = useState({
    idNumber: "123456789",
    yearsOfExperience: 5,
    servicesOffered: "Leak fixing, pipe installation",
    rates: 100,
  });

  const [isPlumber, setIsPlumber] = useState(false); // Assume we get this from backend based on user type
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPlumber, setIsEditingPlumber] = useState(false);

  const [formProfileData, setFormProfileData] = useState({ ...profileData });
  const [formPlumberData, setFormPlumberData] = useState({ ...plumberData });

  // Simulate data fetching from backend
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch("http://127.0.0.1:5000/current_user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch current user"))
        .then(data => {
            setProfileData(data)
            setPlumberData(data)
            setIsPlumber(data.is_plumber)
            console.log(data)
        })
        .catch(error => {
          console.error("Error fetching current user:", error);
        });
      }
      },[])

  useEffect(() => {
    // Fetch user and plumber data from API and set state here
    // setProfileData(fetchedProfileData);
    // setPlumberData(fetchedPlumberData);
    // setIsPlumber(fetchedIsPlumber);
  }, []);

  // Handle form changes for profile section
  const handleProfileInputChange = (e) => {
    setFormProfileData({
      ...formProfileData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form changes for plumber section
  const handlePlumberInputChange = (e) => {
    setFormPlumberData({
      ...formPlumberData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit profile form
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Here you would send formProfileData to your backend to update the user profile
    setProfileData(formProfileData);
    setIsEditingProfile(false);
  };

  // Submit plumber form
  const handlePlumberSubmit = (e) => {
    e.preventDefault();
    // Here you would send formPlumberData to your backend to update the plumber details
    setPlumberData(formPlumberData);
    setIsEditingPlumber(false);
  };

  return (
    <div className="container mt-4">
      <h2>Profile</h2>

      {/* Profile Section */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>User Profile</h5>
        </div>
        <div className="card-body">
          {isEditingProfile ? (
            <form onSubmit={handleProfileSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formProfileData.firstName}
                  onChange={handleProfileInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formProfileData.lastName}
                  onChange={handleProfileInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formProfileData.phoneNumber}
                  onChange={handleProfileInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={formProfileData.location}
                  onChange={handleProfileInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditingProfile(false)}>Cancel</button>
            </form>
          ) : (
            <div>
              <p><strong>First Name:</strong> {profileData.firstName}</p>
              <p><strong>Last Name:</strong> {profileData.lastName}</p>
              <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>
              <p><strong>Location:</strong> {profileData.location}</p>
              <button className="btn btn-primary" onClick={() => setIsEditingProfile(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>

      {/* Plumber Section (Visible if user is a plumber) */}
      {isPlumber && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>Plumber Profile</h5>
          </div>
          <div className="card-body">
            {isEditingPlumber ? (
              <form onSubmit={handlePlumberSubmit}>
                <div className="mb-3">
                  <label htmlFor="idNumber" className="form-label">ID Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="idNumber"
                    name="idNumber"
                    value={formPlumberData.idNumber}
                    onChange={handlePlumberInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="yearsOfExperience" className="form-label">Years of Experience</label>
                  <input
                    type="number"
                    className="form-control"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={formPlumberData.yearsOfExperience}
                    onChange={handlePlumberInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="servicesOffered" className="form-label">Services Offered</label>
                  <input
                    type="text"
                    className="form-control"
                    id="servicesOffered"
                    name="servicesOffered"
                    value={formPlumberData.servicesOffered}
                    onChange={handlePlumberInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rates" className="form-label">Rates</label>
                  <input
                    type="number"
                    className="form-control"
                    id="rates"
                    name="rates"
                    value={formPlumberData.rates}
                    onChange={handlePlumberInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditingPlumber(false)}>Cancel</button>
              </form>
            ) : (
              <div>
                <p><strong>ID Number:</strong> {plumberData.idNumber}</p>
                <p><strong>Years of Experience:</strong> {plumberData.yearsOfExperience}</p>
                <p><strong>Services Offered:</strong> {plumberData.servicesOffered}</p>
                <p><strong>Rates:</strong> ${plumberData.rates}</p>
                <button className="btn btn-primary" onClick={() => setIsEditingPlumber(true)}>Edit Plumber Profile</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
