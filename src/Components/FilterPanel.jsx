import React, { useState, useEffect } from "react";
import './App.css';

const FilterPanel = ({ updateQueryParams, currentParams }) => {
  const [consultationType, setConsultationType] = useState("video");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [specialties, setSpecialties] = useState([]); // State to store fetched specialties
  const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";
 
  // Fetch specialties from the API
  useEffect(() => {
    const fetchSpecialties = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          console.log(data);  // Log the data to check the structure
          setSpecialties(data);
        } catch (error) {
          console.error("Error fetching specialties:", error);
        }
      };
    fetchSpecialties();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Update search params based on selected filters
  useEffect(() => {
    let params = new URLSearchParams(currentParams);
    params.set("mode", consultationType);

    // If there are selected specialties, append them, otherwise clear the specialty filter
    if (selectedSpecialties.length > 0) {
      selectedSpecialties.forEach((specialty) => params.append("specialty", specialty));
    } else {
      params.delete("specialty"); // Clear specialties if none are selected
    }

    if (sortOption) {
      params.set("sort", sortOption);
    } else {
      params.delete("sort"); // Clear the sort option if it's not selected
    }

    updateQueryParams(params);
  }, [consultationType, selectedSpecialties, sortOption, currentParams, updateQueryParams]);

  return (
    <div className="filter-panel">
      <h4>Consultation Type</h4>
      <label>
        <input
          type="radio"
          name="consultation"
          value="video"
          checked={consultationType === "video"}
          onChange={() => setConsultationType("video")}
          data-testid="filter-video-consult"
        />
        Video Consult
      </label>
      <label>
        <input
          type="radio"
          name="consultation"
          value="clinic"
          checked={consultationType === "clinic"}
          onChange={() => setConsultationType("clinic")}
          data-testid="filter-in-clinic"
        />
        In Clinic
      </label>

      <h4>Specialty</h4>
      <div className="specialties" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {specialties.length > 0 ? (
          specialties.map((specialty) => (
            <label key={specialty.id}>
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty.specialities.name)}
                onChange={() =>
                  setSelectedSpecialties((prev) =>
                    prev.includes(specialty.specialities.name)
                      ? prev.filter((item) => item !== specialty.specialities.name)
                      : [...prev, specialty.specialities.name]
                  )
                }
                data-testid={`filter-specialty-${specialty.specialities.name}`}
              />
              <small>{specialty.name}</small>
            </label>
          ))
        ) : (
          <p>Loading specialties...</p>
        )}
      </div>

      <h4>Sort By</h4>
      <div className="sort-options">
        <label>
          <input
            type="radio"
            name="sort"
            value="fees"
            checked={sortOption === "fees"}
            onChange={() => setSortOption("fees")}
            data-testid="sort-fees"
          />
          Fees
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="experience"
            checked={sortOption === "experience"}
            onChange={() => setSortOption("experience")}
            data-testid="sort-experience"
          />
          Experience
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;
