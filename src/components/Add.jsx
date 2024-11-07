import React, { useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import { saveVideoAPI } from "../services/allAPI";

const Add = ({setAddResponseFromHome}) => {
  const [invalidYoutubeLink, setInvalidYoutube] = useState(false);
  const [videoDetails, setVideosDetails] = useState({
    Caption: "",
    imgUrl: "",
    youtubeLink: "",
  });
  console.log(videoDetails);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const extractingEmbedLinkFromYoutubeLink = (userInputYoutubeLink) => {
    if (userInputYoutubeLink.includes("https://www.youtube.com/watch?v=")) {
      console.log(userInputYoutubeLink.split("v=")[1].slice(0, 11));
      const videoId = userInputYoutubeLink.split("v=")[1].slice(0, 11);
      setInvalidYoutube(false);
      setVideosDetails({
        ...videoDetails,
        youtubeLink: `https://www.youtube.com/embed/${videoId}`,
      });
    } else {
      // alert("")
      setInvalidYoutube(true);
      setVideosDetails({ ...videoDetails, youtubeLink: "" });
    }
  };

  const handleUploadVideo = async () => {
    // object destructure : const  {key1,key2...} = object-name
    const { Caption, imgUrl, youtubeLink } = videoDetails;
    if (Caption && imgUrl && youtubeLink) {
      // store video details permanently
      try {
        const result = await saveVideoAPI(videoDetails);
        console.log(result);
        if (result.status >= 200 && result.status < 300) {
          alert("video upload succesfully");
          handleClose();
          setAddResponseFromHome(result)

        } else {
          console.log(result);
        }
      } catch (err) {}
    } else {
      alert("Fill the form Completely!!!");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <h5>Upload New Video</h5>
        <button
          onClick={handleShow}
          className="rounded-circle btn btn-warning ms-3 fw-bolder fs-5"
        >
          +
        </button>

        <Modal
          centered
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Uploading Video Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="border rounded p-3">
              <FloatingLabel controlId="floatingCaption" label="Caption">
                <Form.Control
                  onChange={(e) =>
                    setVideosDetails({
                      ...videoDetails,
                      Caption: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="video Caption"
                />
              </FloatingLabel>
              <FloatingLabel
                className="mt-2"
                controlId="floatingUrl"
                label="Video Image Url"
              >
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setVideosDetails({
                      ...videoDetails,
                      imgUrl: e.target.value,
                    })
                  }
                  placeholder="Video Image URL"
                />
              </FloatingLabel>
              <FloatingLabel
                className="mt-2"
                controlId="floatingLink"
                label="video youtube Link"
              >
                <Form.Control
                  type="text"
                  placeholder="Video Youtube Link"
                  onChange={(e) =>
                    extractingEmbedLinkFromYoutubeLink(e.target.value)
                  }
                />
              </FloatingLabel>

              {invalidYoutubeLink && (
                <div className="text-danger fw-bolder mt-2">
                  Invalid youtube Link.. please try with other!!!
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleUploadVideo}
              className="btn btn-success"
              variant="primary"
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Add;
