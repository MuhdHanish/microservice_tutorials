import { useState } from "react";
import axios from "axios";

export const useRequest = (url, method = "get", body = null, config = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const makeRequest = async (overrideBody = null, overrideConfig = {}) => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios({
                url,
                method,
                data: overrideBody || body,
                ...config,
                ...overrideConfig,
            });
            setData(response?.data);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, makeRequest };
};
