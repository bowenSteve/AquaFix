import React from "react";
import Navbar from "./Navbar";
import { Container, Row, Col, Image } from 'react-bootstrap';
import aboutImage from "../Assets/images/Plumber.jpg";  
import "../styles/AboutUs.css"

function About() {
    return (
        <div>
            <Navbar />  
            <Container fluid className="about-us-section">
                <Row className="align-items-center">
                    <Col md={6}>
                        <Image src={aboutImage} alt="About Us" fluid className="about-image" />
                    </Col>
                    <Col md={6}>
                        <h2 className="about-title">About Us</h2>
                        <p className="about-text">
                        At AquaFix, we are committed to connecting you with the most skilled 
                        and reliable plumbers in your area. We ensure top-quality service for 
                        all your residential and commercial plumbing needs. From minor repairs 
                        to major installations, our trusted professionals are ready to tackle 
                        any job with efficiency and care, giving you peace of mind every step 
                        of the way.

                        </p>
                        <p className="about-text">
                            Whether you need emergency services, guaranteed workmanship, or a free quote,
                            we are here to meet all your plumbing needs. Trust us to keep your plumbing system running smoothly.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default About;
