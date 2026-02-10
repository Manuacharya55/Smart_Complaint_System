import { useState, useCallback } from "react";
import { useAuth } from "../context/UserContext";
import {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
} from "../services/Api";
import toast from "react-hot-toast";

const usePlace = () => {
    const { user } = useAuth();
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const fetchPlaces = useCallback(
        async (page = 1) => {
            if (!user?.token) return;
            setIsLoading(true);
            try {
                const response = await getRequest(`place?page=${page}`, user.token);
                if (response.success) {
                    setPlaces(response.data);
                    setPagination(response.pagination);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching places:", error);
                toast.error("Failed to fetch places");
            } finally {
                setIsLoading(false);
            }
        },
        [user?.token]
    );

    const addPlace = async (data) => {
        if (!user?.token) return;
        try {
            const response = await postRequest("place/", user.token, data);
            if (response?.success) {
                toast.success(response.message);
                setPlaces((prev) => [...prev, response.data]);
                return true;
            } else {
                toast.error(response?.message);
                return false;
            }
        } catch (error) {
            console.error("Error adding place:", error);
            toast.error("Failed to add place");
            return false;
        }
    };

    const updatePlace = async (id, data) => {
        if (!user?.token) return;
        try {
            const response = await patchRequest("place/", user.token, data, id);
            if (response?.success) {
                toast.success(response.message);
                setPlaces((prev) =>
                    prev.map((item) => (item._id === (response.data?._id || id) ? response.data : item))
                );
                return true;
            } else {
                toast.error(response?.message);
                return false;
            }
        } catch (error) {
            console.error("Error updating place:", error);
            toast.error("Failed to update place");
            return false;
        }
    };

    const deletePlace = async (id) => {
        if (!user?.token) return;
        try {
            const response = await deleteRequest("place/", user.token, id);
            if (response.success) {
                toast.success(response.message);
                setPlaces((prev) =>
                    prev.map((curEle) => (curEle._id == id ? response.data : curEle))
                );
                return true;
            } else {
                toast.error(response.message);
                return false;
            }
        } catch (error) {
            console.error("Error deleting place:", error);
            toast.error("Failed to delete place");
            return false;
        }
    };

    return {
        places,
        isLoading,
        pagination,
        fetchPlaces,
        addPlace,
        updatePlace,
        deletePlace,
    };
};

export default usePlace;
