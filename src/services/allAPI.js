// uploadvideoAPI - post http called Add Component

import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";

export const saveVideoAPI = async (videoDetails) => {
  return await commonAPI("POST", `${SERVERURL}/uploadVideos`, videoDetails);
};
// getAllVideosAPI: get http request called view component when component displayed in browser inside its useffect
export const getAllVideosAPI = async () => {
  return await commonAPI("GET", `${SERVERURL}/uploadVideos`, "");
};
// saveHistoryAPI - post http request to http://localhost:3000/history called by videocart component when we play video
export const saveHistoryAPI = async (historyDetails) => {
  return await commonAPI("POST", `${SERVERURL}/history`, historyDetails);
};

// getAllHistoryAPI - get http rquest to http://localhost:3000/history called by history component when it open in browser
export const getAllHistoryAPI = async () => {
  return await commonAPI("GET", `${SERVERURL}/history`, "");
};

// deleteHistoryAPI - delete http rqst to http://localhost:3000/history/id called by history component when user click on delete button

export const deleteHistoryAPI = async (id) => {
  return await commonAPI("DELETE", `${SERVERURL}/history/${id}`, {});
};

// deleteVideoAPI - delete http rqst to videocart  component when user click on delete button

export const deleteVideoAPI = async (id) => {
  return await commonAPI("DELETE", `${SERVERURL}/uploadVideos/${id}`, {});
};

// saveCategoryAPI - post http://localhost:3000/categories called by Category component when user click on add btn

export const saveCategoryAPI = async (categoryDetails)=>{
  return await commonAPI("POST",`${SERVERURL}/categories`,categoryDetails)
}


// get
export const getAllCategoriesAPI = async ()=>{
  return await commonAPI("GET",`${SERVERURL}/categories`,{})
}


export const deleteCategoriesAPI = async (id)=>{
  return await commonAPI("DELETE",`${SERVERURL}/categories/${id}`,{})
}

// updateCategoryAPI - put  http rqst  to http://localhost:3000/categories/id called by category component when video drop over the category
export const updateCategoryAPI = async(categoryDetails)=>{
  return await commonAPI("PUT",`${SERVERURL}/categories/${categoryDetails.id}`,categoryDetails)
} 