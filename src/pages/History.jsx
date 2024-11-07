import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteHistoryAPI, getAllHistoryAPI } from '../services/allAPI'; // Ensure this is correctly imported

const History = () => {
  const [allVideoHistory, setAllVideoHistory] = useState([]);

  useEffect(() => {
    getAllHistory();
  }, []);

  const getAllHistory = async () => {
    try {
      const history = await getAllHistoryAPI();
      if (history.status >= 200 && history.status < 300) {
        setAllVideoHistory(history.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

    const removeHistory = async (id)=>{
try{
    await deleteHistoryAPI(id)
    getAllHistory()
}catch(err){
console.log(err);

}
    }

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className="container d-flex justify-content-between">
        <h3>Watch History</h3>
        <Link to={'/home'}>Back to Home</Link>
      </div>
      <table className='container table my-5'>
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>Link</th>
            <th>Time Stamp</th>
            <th>....</th>
          </tr>
        </thead>
        <tbody>
          {allVideoHistory.length > 0 ? (
            allVideoHistory.map((videoDetails, index) => (
              <tr key={videoDetails?.id}>
                <td>{index + 1}</td>
                <td>{videoDetails?.Caption}</td>
                <td>
                  <a href={videoDetails?.youtubeLink} target="_blank" rel="noopener noreferrer">
                    {videoDetails?.youtubeLink}
                  </a>
                </td>
                <td>{videoDetails?.timeStamp}</td>
                <td>
                  <button className="btn" onClick={()=>removeHistory(videoDetails?.id)}>
                    <i className="fa-solid fa-trash text-danger"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nothing to show here!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
