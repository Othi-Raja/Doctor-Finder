import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import SearchBar from "./SearchBar";
import DoctorList from "./DoctorList";
import FilterPanel from "./FilterPanel";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

const DoctorListingPage = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
 
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setAllDoctors(data);
      });
  }, []);

 
  useEffect(() => {
    if (!allDoctors.length) return;

    const name = searchParams.get("name")?.toLowerCase() || "";
    const mode = searchParams.get("mode");
    const specialties = searchParams.getAll("specialty");
    const sort = searchParams.get("sort");

    let filtered = [...allDoctors];

    // Name filter
    if (name) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(name)
      );
    }

    // Mode filter (video_consult / in_clinic)
    if (mode === "video") {
      filtered = filtered.filter((doc) => doc.video_consult);
    } else if (mode === "clinic") {
      filtered = filtered.filter((doc) => doc.in_clinic);
    }

    // Specialties filter
    if (specialties.length) {
      filtered = filtered.filter((doc) =>
        specialties.some((s) =>
          doc.specialities?.some((sp) => sp.name === s)
        )
      );
    }

    // Sorting
    if (sort === "fees") {
      filtered.sort((a, b) =>
        parseInt(a.fees.replace(/[^\d]/g, "")) -
        parseInt(b.fees.replace(/[^\d]/g, ""))
      );
    } else if (sort === "experience") {
      filtered.sort((a, b) =>
        parseInt(b.experience) - parseInt(a.experience)
      );
    }

    setFilteredDoctors(filtered);
  }, [searchParams, allDoctors]);

  const updateQueryParams = (params) => {
    setSearchParams(params);
  };

  return (
    <div className="page-container">
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#">Doctor Finder</Navbar.Brand>
          <Nav className="ms-auto">
            <SearchBar
              allDoctors={allDoctors}
              updateQueryParams={updateQueryParams}
            />
          </Nav>
        </Container>
      </Navbar>

      <div className="sidebar">
        <FilterPanel
          updateQueryParams={updateQueryParams}
          currentParams={searchParams}
        />
      </div>

      <div className="main-content">
        <div className="doctor-list-container">
          <DoctorList doctors={filteredDoctors} />
        </div>
      </div>
    </div>
  );
};

export default DoctorListingPage;
