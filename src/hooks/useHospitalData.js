import { useEffect, useState } from "react";
import API from "../services/api";

function useHospitalData(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await API.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return {
    data,
    setData,
    loading,
    error,
    refresh: fetchData,
  };
}

export default useHospitalData;
