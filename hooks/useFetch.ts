import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        if (error instanceof AxiosError) setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    loading,
    error,
    data,
  };
};
