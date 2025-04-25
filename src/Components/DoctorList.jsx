import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';  
import { IoIosArrowForward } from "react-icons/io";
import female from '../asserts/femail.jpg';
import { Button } from "react-bootstrap";

const DoctorList = ({ doctors }) => {
  return (
    <Grid container spacing={3}>
      {doctors.map((doctor) => (
        <Grid item xs={12} sm={6} md={4} key={doctor.id}>
          <Card
            className="doctor-card"
            sx={{
                width: 380, 
                height: 350, 
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              alt={doctor.name}
              height="140"
              image={doctor.photo || female} 
              title={doctor.name}
              className="doctor-photo"
            />
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography
                className="doctor-name d-flex"
                variant="h6"
                sx={{ fontWeight: "bold", flex: 1 }}
              >
                {doctor.name}
                <Typography
                  style={{ fontSize: "10px", fontStyle: "italic" }}
                  className="doctor-specialty mt-2 mx-1"
                >
                  ({doctor.specialities.map((sp) => sp.name).join(", ")})
                </Typography>

              </Typography>
              <Typography className=" d-flex gap-1" style={{fontSize:'10px'}}>
  {doctor.languages.map((data, index) => (
    <p key={index} className=" rounded-4 px-3 pt-1 fw-bold pb-1 " style={{background:'#50C878',border:'#228B22' }}>{data}</p>
  ))}
</Typography>
      <Typography variant="body2" className="doctor-clinic">
                {doctor.clinic.name}
              </Typography>
              <Typography
                variant="body2"
                className="doctor-experience"
                sx={{ marginTop: 1 }}
              >
                {doctor.experience}  
              </Typography>

              <Typography
                variant="body2"
                className="doctor-fee"
                sx={{
                  marginTop: 1,
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                {doctor.fees}
              </Typography>
              <div className="">
                <Button className="float-end fs-6" variant="sucess">Book Appointment <IoIosArrowForward /></Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DoctorList;
