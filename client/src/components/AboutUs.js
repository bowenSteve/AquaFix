import React from "react";
import Navbar from "./Navbar";
import { Container, Row, Col, Image } from 'react-bootstrap';
import "../styles/AboutUs.css";
import Footer from "./Footer";
import servicePlumbingRepairs from "../Assets/images/plumbing-repair.jpg";
import serviceBathroomInstallations from "../Assets/images/bathroom-installation.jpg";
import serviceEmergencyPlumbing from "../Assets/images/emergency-plumbing.jpg";
import teamMember1 from "../Assets/images/team-member1.jpg";
import teamMember2 from "../Assets/images/team-member2.jpg";
import teamMember3 from "../Assets/images/team-member3.jpg";

function About() {
    return (
        <div>
            <Navbar />
            {/* Adding Container around the sections */}
            <Container fluid>
                {/* Services Offered Section */}
                <Row className="services-section">
                    <Col md={12}>
                        <h3 className="services-title">Our Services</h3>
                        <Row>
                            <Col md={4} className="service">
                                <Image src={servicePlumbingRepairs} alt="Plumbing Repairs" fluid className="service-image" />
                                <h5>Plumbing Repairs</h5>
                                <p>From leaky faucets to pipe replacements, we handle it all.</p>
                            </Col>
                            <Col md={4} className="service">
                                <Image src={serviceBathroomInstallations} alt="Bathroom Installations" fluid className="service-image" />
                                <h5>Bathroom Installations</h5>
                                <p>Get a new, modern bathroom installed by our experts.</p>
                            </Col>
                            <Col md={4} className="service">
                                <Image src={serviceEmergencyPlumbing} alt="Emergency Plumbing" fluid className="service-image" />
                                <h5>Emergency Plumbing</h5>
                                <p>24/7 emergency plumbing services at your doorstep.</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="testimonials-section">
                    <Col md={12}>
                        <h3 className="testimonials-title">What Our Customers Say</h3>
                        <Row>
                            <Col md={4}>
                                <p className="testimonial">
                                    "AquaFix provided exceptional service. My plumbing issue was resolved 
                                    quickly and professionally!" - Jane D.
                                </p>
                            </Col>
                            <Col md={4}>
                                <p className="testimonial">
                                    "I highly recommend AquaFix. The plumber was punctual, friendly, 
                                    and very skilled." - John P.
                                </p>
                            </Col>
                            <Col md={4}>
                                <p className="testimonial">
                                    "Top-notch service at a great price. I will definitely use AquaFix 
                                    again for future needs." - Sarah M.
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="team-section">
                    <Col md={12}>
                        <h3 className="team-title">Meet Our Team</h3>
                        <Row>
                            <Col md={4} className="team-member">
                                <Image src={teamMember1} alt="Michael Smith" fluid />
                                <h5>Brian Juma</h5>
                                <p>Lead Plumber</p>
                            </Col>
                            <Col md={4} className="team-member">
                                <Image src={teamMember2} alt="Alice Johnson" fluid />
                                <h5>Alice Johnson</h5>
                                <p>Customer Support Manager</p>
                            </Col>
                            <Col md={4} className="team-member">
                                <Image src={teamMember3} alt="Chris Martin" fluid />
                                <h5>Steven Bowen</h5>
                                <p>Field Technician</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="cta-section">
                    <Col md={12} className="text-center">
                        <h4 className="cta-text">Need Immediate Help?</h4>
                        <a href="/contact" className="cta-button">Get in Touch</a>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default About;
