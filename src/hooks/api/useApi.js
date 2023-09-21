import axios from "axios";
import { useState } from "react";

function useApi(url, options) {
  const [apiResponse, setApiResponse] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async () => {
    setApiResponse({ ...apiResponse, loading: true });
    try {
      const response = await axios(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4",
        },
      });
      setApiResponse({ ...apiResponse, data: response.data, loading: false });
      return response;
    } catch (err) {
      setApiResponse({
        ...apiResponse,
        error: err.message || "An error occurred",
        loading: false,
      });
      return err;
    }
  };

  return [fetchData, apiResponse];
}

export default useApi;
