import React, { useEffect, useState } from "react";
import { Modal, Form, FloatingLabel, Button } from "react-bootstrap";
import {
  saveCategoryAPI,
  getAllCategoriesAPI,
  deleteCategoriesAPI,
  updateCategoryAPI,
  deleteVideoAPI
} from "../services/allAPI";
import VideoCart from "./VideoCart";

const Category = ({ setDeleteResponseFromCategory,deleteResponseFromView }) => {
  const [categoryName, setCategoryName] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllCategories();
  }, [deleteResponseFromView]);

  const handleSaveCategory = async () => {
    if (categoryName) {
      const categoryDetails = { categoryName, allVideos: [] };
      try {
        const result = await saveCategoryAPI(categoryDetails);
        if (result.status >= 200 && result.status < 300) {
          alert("Category added");
          getAllCategories();
          handleClose();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please provide a name for your category!");
    }
  };

  const getAllCategories = async () => {
    try {
      const result = await getAllCategoriesAPI();
      if (result.status >= 200 && result.status < 300) {
        setAllCategories(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeCategory = async (id) => {
    try {
      await deleteCategoriesAPI(id);
      getAllCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const videoCartDropOverCategory = async (e, categoryDetails) => {
    e.preventDefault();
    console.log("Inside videoCartDropOverCategory");

    const videoDetails = JSON.parse(e.dataTransfer.getData("videoDetails"));
    console.log(videoDetails);

    categoryDetails.allVideos.push(videoDetails);

    await updateCategoryAPI(categoryDetails);
    getAllCategories();

    const result = await deleteVideoAPI(videoDetails.id);
    setDeleteResponseFromCategory(result);
  };
  const categoryVideoDragStarted = (e,dragVideoDetails,categoryDetails)=>{
    console.log("Inside categoryVideoDragStarted");
    let dragData = {video:dragVideoDetails,categoryDetails}
    e.dataTransfer.setData("dragData",JSON.stringify(dragData))
    
  }

  return (
    <>
      <div className="d-flex justify-content-around align-items-center">
        <h3>All Categories</h3>
        <button onClick={handleShow} className="btn btn-warning ms-3 rounded-circle fw-bolder fs-5">
          +
        </button>
      </div>

      {/* Display all categories */}
      <div className="container-fluid mt-3">
        {allCategories?.length > 0 ? (
          allCategories.map((categoryDetails) => (
            <div
              key={categoryDetails?.id}
              className="border rounded p-3 mb-3"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => videoCartDropOverCategory(e, categoryDetails)}
            >
              <div className="d-flex justify-content-between">
                <h5>{categoryDetails?.categoryName}</h5>
       <button className="btn" onClick={() => removeCategory(categoryDetails?.id)}>
                  <i className="fa-solid fa-trash text-danger"></i>
                </button>
        
              </div>

              {/* Display category videos */}
              <div className="row mt-2">
                {categoryDetails?.allVideos?.length > 0 &&
                  categoryDetails.allVideos.map((video) => (
                    <div draggable={true} onDragStart={e=>categoryVideoDragStarted(e,video,categoryDetails)} key={video?.id} className="col-lg-4">
                      <VideoCart insideCategory={true} displayData={video} />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="fw-bolder text-danger fs-5">No categories added yet!</div>
        )}
      </div>

      {/* Add Category Modal */}
      <Modal centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingCategoryName" label="Category Name">
            <Form.Control
              onChange={(e) => setCategoryName(e.target.value)}
              type="text"
              placeholder="Category Name"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSaveCategory} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Category;
