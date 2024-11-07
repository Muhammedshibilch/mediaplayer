import React from "react";
import { Link } from "react-router-dom";
import LandingImg from "../assets/f3-removebg-preview.png";
import features1 from "../assets/v1.webp";
import features2 from "../assets/v2.jpg";
import features3 from "../assets/v3.jpg";
import { Card } from "react-bootstrap";

const Landing = () => {
  return (
    <div style={{ padding: "100px" }} className="container">
      <div className="row align-items-center">
        <div className="col-lg-5">
          <h3 className="animate__animated animate__backInLeft">
            Welcome to <span className="text-warning">Media Player</span>
          </h3>
          <p style={{ textAlign: "justify" }}>
            Media Player App will allow user to add or remove their uploaded
            videos from youTube and also allow them to arrange it in different
            categories by drag and drop. User can also have the provision to
            manage their watch history as well. What are you waiting for, let
            starts exploring our site!!!
          </p>
          <Link to={"/home"} className="btn btn-info">
            Get started
          </Link>
        </div>
        <div className="col"></div>
        <div className="col-lg-6">
          <img className="img-fluid ms-5" src={LandingImg} alt="" />
        </div>
      </div>
      {/* Features Part */}
      <div className="my-5">
        <h3 className="text-center"></h3>
        <div className="row mt-5">
          <div className="col-lg-4">
            <Card style={{ width: "20rem" }}>
              <Card.Img variant="top" height={"250px"} src={features1} />
              <Card.Body>
                <Card.Title>Managing Videos</Card.Title>
                <Card.Text>
                  Users can upload, view and remove the videos.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card style={{ width: "20rem" }}>
              <Card.Img variant="top" height={"250px"} src={features2} />
              <Card.Body>
                <Card.Title>Categorise Videos</Card.Title>
                <Card.Text>
                  Users can categorise the videos by drag and drop feature
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card style={{ width: "20rem" }}>
              <Card.Img variant="top" height={"250px"} src={features3} />
              <Card.Body>
                <Card.Title>Managing Videos </Card.Title>
                <Card.Text>
                  Users can manage the watch history of all videos.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      {/* last */}
      <div className="my-5 row align-items-center border rounded-p-5">
        <div className="col-lg-5">
          <h3 className="text-warning">Simple,Fast and powerfull</h3>
          <p style={{ textAlign: "justify" }}>
            <span className="fs-5 fw-bolder">Play Everthing</span>: Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Tenetur.
          </p>
          <h3 className="text-warning">Categorise Videos</h3>
          <p style={{ textAlign: "justify" }}>
            <span className="fs-5 fw-bolder">Play Everthing</span>: Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Tenetur.
          </p>
          <h3 className="text-warning">Manging History </h3>
          <p style={{ textAlign: "justify" }}>
            <span className="fs-5 fw-bolder">Play Everthing</span>: Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Tenetur.
          </p>
        </div>
        <div className="col"></div>
        <div className="col-lg-6">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/5dy3azady4w?si=CFEe-eL5sujCCJmD"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Landing;
