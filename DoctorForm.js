import React, { useState, useEffect } from "react";
import "./App.css";
const DoctorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    city: "",
    company: "",
    chiefComplaints: "",
    physioExperience: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const rapidApiKey = "YOUR_RAPIDAPI_KEY";
    const apiUrl =
      "https://betterdoctor.p.rapidapi.com/api.betterdoctor.com/2016-03-01/practices";

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const mockData = [
          {
            name: "Dr. John Doe",
            expertise: "Physiotherapist",
            city: "New York",
            age: "41",
          },
          {
            name: "Dr. Jane ",
            expertise: "Orthopedic",
            city: "Los Angeles",
          },
          {
            name:"Dr.Ramya",
            expertise:"Nurology",
            city:"chicago",
          },{
            name:"Dr.srihari",
            expertise:"Radiology",
            city:"vargina",

          }
        ];

        setDoctors(mockData);
        setFilteredDoctors(mockData);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCityChange = (e) => {
    const urlParamCity = new URLSearchParams(window.location.search).get(
      "city"
    );
    setFormData({
      ...formData,
      city: urlParamCity || e.target.value,
    });
  };

  const filterDoctors = () => {
    setFilteredDoctors(
      doctors.filter((doctor) => doctor.city === formData.city)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  
  };
  

  return (
    <div
    className="landing-page"
      style={{ background: "#1a1a1a", color: "#fff" }}
    >    
      <section className="consultation-form">
        <form onSubmit={handleSubmit}>
          
          <div className="form-step">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-step">
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleCityChange}
                required
              />
            </label>
            <label>
              Company:
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-step">
            <label>
              Chief Complaints:
              <textarea
                name="chiefComplaints"
                value={formData.chiefComplaints}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          {formData.age >= 40 && (
            <div className="form-step">
              <label>
                Previous Experience with Physiotherapy:
                <textarea
                  name="physioExperience"
                  value={formData.physioExperience}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
          )}
          <button  type="submit">Submit</button>
        </form>
      </section>
      <section className="testimonials">
      </section>
      <section className="available-doctors">
        <button onClick={filterDoctors}>Show Available Doctors</button>
        {filteredDoctors.length > 0 && (
          <ul>
            {filteredDoctors.map((doctor, index) => (
              <li key={index}>
                {doctor.name} - {doctor.expertise} - {doctor.city}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DoctorForm;
