import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import { saveHistoryAPI, deleteVideoAPI } from '../services/allAPI';

const VideoCart = ({ displayData, setDeleteVideoResponseFromVideoCard,insideCategory}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    const { Caption, youtubeLink } = displayData;
    const sysDateTime = new Date();
    const timeStamp = sysDateTime.toLocaleString('en-US', { timeZoneName: 'short' });
    const historyDetails = { Caption, youtubeLink, timeStamp };
    try {
      await saveHistoryAPI(historyDetails);
    } catch (err) {
      console.log(err);
    }
  };

  const removeVideo = async (id) => {
    try {
      const result = await deleteVideoAPI(id);
      setDeleteVideoResponseFromVideoCard(result);
    } catch (err) {
      console.log(err);
    }
  };

  const videoCardDragStarted = (e, dragVideoDetails) => {
    console.log("Inside videoCardDragStarted with videoID:", dragVideoDetails?.id);
    e.dataTransfer.setData("videoDetails", JSON.stringify(dragVideoDetails));
  };

  return (
    <>
      <Card
        draggable="true"
        onDragStart={(e) => videoCardDragStarted(e, displayData)}
        style={{ height: "330px" }}
      >
        <Card.Img style={{height:"250px"}} onClick={handleShow} variant="top" height="150px" src={displayData?.imgUrl} />
        <Card.Body>
          <Card.Text className="d-flex justify-content-between">
            <p>{displayData?.Caption}</p>
            {
                 !insideCategory && <button className="btn" onClick={() => removeVideo(displayData?.id)}><i className="fa-solid fa-trash text-danger"></i></button>
            }
          </Card.Text>
        </Card.Body>
      </Card>

   

      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            className="rounded"
            height="400px"
            src={`${displayData?.youtubeLink}?autoplay=1`}
            title="Video Preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoCart;
