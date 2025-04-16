"use client";


import { Fetch } from "@/lib/Fetch";
import { useEffect, useState } from "react";
import { useToken } from "./useToken";

interface UseDataFetchProps {
  page?: number;
  limit?: number;
  url?:string
}

export function useDataFetch({url, page = 1, limit = 10 }: UseDataFetchProps) {
  const { token } = useToken();

  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const _config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };

        const urls = `${url}?page=${page}&limit=${limit}`;
        const response = await Fetch.get(urls, _config);
        const result = response?.data;

        setData(result?.data || []);
         if(url =="/users/all"){ setCount(result?.pagination?.total || 0);}else{

           setCount(result?.pagination?.totalData || 0);
         }
        setError(null);
      } catch (err: any) {
        setError(err?.message || "Something went wrong while fetching data");
        setData([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, page, limit]);

  return {
    data,
    count,
    loading,
    error,
  };
}
