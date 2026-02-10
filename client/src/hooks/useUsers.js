import { useState, useCallback } from "react";
import { useAuth } from "../context/UserContext";
import {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
} from "../services/Api";
import toast from "react-hot-toast";

const useUsers = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const fetchUsers = useCallback(
        async (page = 1) => {
            if (!user?.token) return;
            setIsLoading(true);
            try {
                const response = await getRequest(`users?page=${page}`, user.token);
                if (response.success) {
                    setUsers(response.data);
                    setPagination(response.pagination);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to fetch users");
            } finally {
                setIsLoading(false);
            }
        },
        [user?.token]
    );

    const addUser = async (data) => {
        if (!user?.token) return;
        try {
            const response = await postRequest("users/", user.token, data);
            if (response?.success) {
                toast.success(response.message);
                setUsers((prev) => [...prev, response.data]);
                return true;
            } else {
                toast.error(response?.message);
                return false;
            }
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Failed to add user");
            return false;
        }
    };

    const updateUser = async (id, data) => {
        if (!user?.token) return;
        try {
            const response = await patchRequest("users/", user.token, data, id);
            if (response?.success) {
                toast.success(response.message);
                setUsers((prev) =>
                    prev.map((item) => (item._id === id ? response.data : item))
                );
                return true;
            } else {
                toast.error(response?.message);
                return false;
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user");
            return false;
        }
    };

    const deleteUser = async (id) => {
        if (!user?.token) return;
        try {
            const response = await deleteRequest("users/", user.token, id);
            if (response.success) {
                toast.success(response.message);
                setUsers((prev) =>
                    prev.map((curEle) => (curEle._id == id ? response.data : curEle))
                );
                return true;
            } else {
                toast.error(response.message);
                return false;
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");
            return false;
        }
    };

    return {
        users,
        isLoading,
        pagination,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
    };
};

export default useUsers;
