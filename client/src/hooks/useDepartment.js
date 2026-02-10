import { useState, useCallback } from "react";
import { useAuth } from "../context/UserContext";
import {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
} from "../services/Api";
import toast from "react-hot-toast";

const useDepartment = () => {
    const { user } = useAuth();
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const fetchDepartments = useCallback(
        async (page = 1) => {
            if (!user?.token) return;
            setIsLoading(true);
            try {
                const response = await getRequest(`department?page=${page}`, user.token);
                if (response.success) {
                    setDepartments(response.data);
                    setPagination(response.pagination);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
                toast.error("Failed to fetch departments");
            } finally {
                setIsLoading(false);
            }
        },
        [user?.token]
    );

    const addDepartment = async (data) => {
        if (!user?.token) return;
        try {
            const response = await postRequest("department/", user.token, data);
            if (response?.success) {
                toast.success(response.message);
                setDepartments((prev) => [...prev, response.data]);
                return true;
            } else {
                toast.error(response?.message);
                return false;
            }
        } catch (error) {
            console.error("Error adding department:", error);
            toast.error("Failed to add department");
            return false;
        }
    };

    const updateDepartment = async (id, data) => {
        if (!user?.token) return;
        try {
            const response = await patchRequest("department/", user.token, data, id);
            if (response?.success) {
                toast.success(response.message);
                setDepartments((prev) =>
                    prev.map((item) => (item._id === id ? response.data : item))
                );
                return true;
            } else {
                toast.error(response?.message);
                return false;
            }
        } catch (error) {
            console.error("Error updating department:", error);
            toast.error("Failed to update department");
            return false;
        }
    };

    const deleteDepartment = async (id) => {
        if (!user?.token) return;
        try {
            const response = await deleteRequest("department/", user.token, id);
            if (response.success) {
                toast.success(response.message);
                setDepartments((prev) =>
                    prev.map((curEle) => (curEle._id == id ? response.data : curEle))
                );
                return true;
            } else {
                toast.error(response.message);
                return false;
            }
        } catch (error) {
            console.error("Error deleting department:", error);
            toast.error("Failed to delete department");
            return false;
        }
    };

    return {
        departments,
        isLoading,
        pagination,
        fetchDepartments,
        addDepartment,
        updateDepartment,
        deleteDepartment,
    };
};

export default useDepartment;
