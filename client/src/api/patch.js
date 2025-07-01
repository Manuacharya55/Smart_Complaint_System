import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:5000/api/";

const handlePatchRequest = async (url, data, id, token, stateFunction) => {
  try {
    const response = axios.patch(url + id, data, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    toast.promise(response, {
      loading: "Loading Please Wait",
      success: "Data Updated Successfully",
      error: "Failed To Load Data",
    });

    const responsedata = await response;
    stateFunction((prev) =>
      prev.map((curEle) => (curEle._id == id ? responsedata.data.data : curEle))
    );
  } catch (error) {
    console.log(error);
  }
};

export default handlePatchRequest;
