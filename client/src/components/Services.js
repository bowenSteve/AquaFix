import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';


import "../styles/services.css";

const Services = () => {
    const services = [
        {
            title: "Plumbing Installation",
            description: "We offer professional plumbing installation for residential and commercial properties. Our experts ensure that your systems are efficiently installed and maintained.",
            icon: "fas fa-wrench",
        },
        {
            title: "Leak Detection & Repair",
            description: "Our advanced leak detection technology helps in identifying and repairing leaks to prevent damage and water wastage.",
            icon: "fas fa-water",
        },
        {
            title: "Emergency Services",
            description: "Our emergency plumbing services are available 24/7 to help you in urgent situations like pipe bursts, blockages, and leaks.",
            icon: "fas fa-phone-alt",
        },
    ];

    return (
        <div>
          
            
        <Container className="services-container my-5">
            <h2 className="text-center mb-4">Our Services</h2>
            <p className="text-center mb-5">
                We provide a wide range of plumbing services to meet all your needs, from installations to emergency repairs.
            </p>
            <Row>
                {services.map((service, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body className="text-center">
                                <i className={`${service.icon} fa-3x mb-3`}></i>
                                <Card.Title>{service.title}</Card.Title>
                                <Card.Text>{service.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </div>
    );
};

export default Services;
