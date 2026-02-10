import { useState } from 'react';
import { useAuth } from '../context/UserContext';
import { getRequest, postRequest, patchRequest } from '../services/Api';
import toast from 'react-hot-toast';

const useComplaint = () => {
    const [complaints, setComplaints] = useState([]);
    const [complaint, setComplaint] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const fetchComplaints = async (page = 1, type = "my") => {
        setIsLoading(true);
        try {
            if (!user?.token) return;
            const endpoint = type === "all" ? `complaint/all-complaints?page=${page}` : `complaint?page=${page}`;
            const response = await getRequest(endpoint, user.token);
            if (response.success) {
                setComplaints(response.data);
                setPagination(response.pagination);
            } else {
                setError(response.message);
                toast.error(response.message);
            }
        } catch (err) {
            setError(err.message);
            console.error("Error fetching complaints:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchComplaint = async (id) => {
        setIsLoading(true);
        try {
            if (!user?.token) return;
            const response = await getRequest(`complaint/${id}`, user.token);
            if (response.success) {
                setComplaint(response.data);
            } else {
                setError(response.message);
                toast.error(response.message);
            }
        } catch (err) {
            setError(err.message);
            console.error("Error fetching complaint:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const createComplaint = async (data) => {
        setIsLoading(true);
        try {
            if (!user?.token) return;
            const response = await postRequest('complaint/', user.token, data);
            if (response.success) {
                toast.success(response.message);
                return response;
            } else {
                toast.error(response.message);
                return response;
            }
        } catch (err) {
            setError(err.message);
            console.error("Error creating complaint:", err);
            return { success: false, message: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const updateComplaintStatus = async (id, status) => {
        if (!user?.token) return;

        try {
            const promise = patchRequest(
                "complaint/",
                user.token,
                { status },
                id
            );

            const response = await toast.promise(
                promise,
                {
                    loading: "Updating complaint status...",
                    success: (res) => {
                        setComplaint(res.data);
                        return res.message || "Status updated successfully";
                    },
                    error: (err) => {
                        return err?.message || "Failed to update status";
                    },
                }
            );

            return response;
        } catch (err) {
            setError(err.message);
            console.error("Error updating complaint status:", err);
            return { success: false, message: err.message };
        }
    };

    return {
        complaints,
        complaint,
        isLoading,
        error,
        fetchComplaints,
        fetchComplaint,
        createComplaint,
        updateComplaintStatus,
        setComplaint, // Exposing this in case manual updates are needed without API call
        pagination
    };
};

export default useComplaint;
