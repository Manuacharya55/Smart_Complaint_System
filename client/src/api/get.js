import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:5000/api/";

const handleGetRequest = async (url, token, stateFunction) => {
  try {
    const response = axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    toast.promise(response, {
      loading: "Loading Please Wait",
      success: "Data Fetched Successfully",
      error: "Failed To Load Data",
    });

    const data = await response;
    stateFunction(data.data.data);
    console.log(data.data.data)
  } catch (error) {
    console.log(error);
  }
};

export default handleGetRequest;
