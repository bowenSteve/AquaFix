import Navbar from "./Navbar";
import "../styles/main.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Main() {
  const [plumbers, setPlumbers] = useState([]);
  const [filteredPlumbers, setFilteredPlumbers] = useState([]);
  const [rateFilter, setRateFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of plumbers to show per page
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://aquafix.onrender.com/plumbers")
      .then((res) => res.json())
      .then((data) => {
        setPlumbers(data);
        setFilteredPlumbers(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    filterPlumbers();
  }, [rateFilter, locationFilter, serviceFilter]);

  function handleCard(id) {
    navigate(`/plumbcard/${id}`);
  }

  function filterPlumbers() {
    let filtered = plumbers;

    // Filter by rates
    if (rateFilter) {
      filtered = filtered.filter(
        (plumber) => plumber.plumber_details.rates <= rateFilter
      );
    }

    // Filter by location
    if (locationFilter) {
      filtered = filtered.filter((plumber) =>
        plumber.profile.location
          .toLowerCase()
          .includes(locationFilter.toLowerCase())
      );
    }

    // Filter by service
    if (serviceFilter) {
      filtered = filtered.filter((plumber) =>
        plumber.plumber_details.services_offered
          .toLowerCase()
          .includes(serviceFilter.toLowerCase())
      );
    }

    setFilteredPlumbers(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  }

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlumbers = filteredPlumbers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  function nextPage() {
    if (currentPage < Math.ceil(filteredPlumbers.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  return (
    <div>
      <Navbar />
      {/* Filters */}
      <div className="container my-4">
        <div className="row dropdown-margin">
          {/* Rate Filter */}
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={rateFilter}
              onChange={(e) => setRateFilter(e.target.value)}
            >
              <option value="">Select Rates</option>
              <option value="1000">Up to KES 1000</option>
              <option value="2000">Up to KES 2000</option>
              <option value="3000">Up to KES 3000</option>
              <option value="4000">Up to KES 4000</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>

          {/* Service Filter */}
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              <option value="">Select Service</option>
              <option value="pipe installation">Pipe Installation</option>
              <option value="repair">Repair</option>
              <option value="maintenance">Maintenance</option>
              <option value="inspection">Inspection</option>
            </select>
          </div>
        </div>

        <div className="row">
          {currentPlumbers.map((plumber, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card mb-4 plumb-card"
                onClick={() => {
                  handleCard(plumber.id);
                }}
              >
                <img
                  src={plumber.profile.image}
                  className="card-img-top profile-picture"
                  alt={plumber.profile.first_name}
                />
                <div className="card-body">
                  <h5 className="card-title">{plumber.profile.first_name}</h5>
                  <p className="card-text">
                    Skill: {plumber.plumber_details.services_offered}
                  </p>
                  <p className="card-text">
                    Rates: KES. {plumber.plumber_details.rates}
                  </p>
                  <p className="card-text">
                    Location: {plumber.profile.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="d-flex justify-content-center my-3">
          {currentPage > 1 && (
            <button
              className="btn btn-primary"
              onClick={prevPage}
            >
              Previous
            </button>
          )}
          {currentPage < Math.ceil(filteredPlumbers.length / itemsPerPage) && (
            <button
              className="btn btn-primary"
              onClick={nextPage}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
