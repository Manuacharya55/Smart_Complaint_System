import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";

export const getRequest = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postRequest = async (url, token, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error)
    return (error.response?.data);
  }
};

export const patchRequest = async (url, token, data, id) => {
  try {
    const response = await axios.patch(url + id, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return (response.data);
  } catch (error) {
    console.log(error);
    return error.response?.data
  }
};

export const deleteRequest = async (url, token, id) => {
  try {
    const response = await axios.delete(url + id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
