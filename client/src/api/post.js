import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:5000/api/";

const handlePostRequest = async (url, data, token, stateFunction) => {
  try {
    const response = axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    toast.promise(response, {
      loading: "Loading Please Wait",
      success: "Data Uploaded Successfully",
      error: "Failed To Load Data",
    });

    const responsedata = await response;
    stateFunction((prev)=> [...prev,responsedata.data.data]);
  } catch (error) {
    console.log(error);
  }
};

export default handlePostRequest;
