import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "../styles/contact.css";
import Navbar from './Navbar';

const Contact = () => {
    return (
        <div>
            <Navbar />
        <Container className="contact-container">
            <h2 className="text-center mb-4">Contact Us</h2>
            <p className="text-center mb-5">
                Have any questions or need assistance? Get in touch with us through any of the following methods.
            </p>
            <Row>
                {/* Contact Info Section */}
                <Col md={6}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <h4>Contact Information</h4>
                            <p><strong>Phone:</strong> +254-740-640-525</p>
                            <p><strong>Email:</strong> support@aquafix.com</p>
                            <p><strong>Office:</strong> AquaFix, Nairobi, Kenya</p>
                            <p><strong>Business Hours:</strong> Monday - Friday: 9:00 AM - 5:00 PM</p>
                        </Card.Body>
                    </Card>
                    {/* Social Media Links */}
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4>Follow Us</h4>
                            <p>Stay connected through our social media channels:</p>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="https://facebook.com/aquafix" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                        <i className="fab fa-facebook fa-2x"></i> Facebook
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="https://twitter.com/aquafix" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                        <i className="fab fa-twitter fa-2x"></i> Twitter
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="https://instagram.com/aquafix" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                        <i className="fab fa-instagram fa-2x"></i> Instagram
                                    </a>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Google Map Section */}
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4>Find Us on the Map</h4>
                            <div className="map-container">
                                <iframe
                                    title="Google Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508403!2d144.9537363155049!3d-37.81720974255673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d4b5bdbf91bc!2sEnvato!5e0!3m2!1sen!2sau!4v1612857325925!5m2!1sen!2sau"
                                    width="100%"
                                    height="300"
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default Contact;


