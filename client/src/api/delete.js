import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:5000/api/";

const handleDeleteRequest = async (url, token, id, stateFunction) => {
  try {
    const response = axios.delete(url + id, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    toast.promise(response, {
      loading: "Loading Please Wait",
      success: "Data Deleted Successfully",
      error: "Failed To Load Data",
    });

    const responsedata = await response;
    stateFunction((prev) =>
      prev.map((curEle) =>
        curEle._id == id ? responsedata.data.data : curEle
      )
    );
    console.log(responsedata.data.data);
  } catch (error) {
    console.log(error);
  }
};

export default handleDeleteRequest;
