
import { useState, useEffect } from "react";
//import { useOktaAuth } from "@okta/okta-react";

export function useFetchApi(url: string, bodyPayload: object, method: string, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //const { oktaAuth } = useOktaAuth();
 
  const headers = {
    'Content-Type': 'application/json', //  'Content-Type': 'application/x-www-form-urlencoded'
   // Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
  }
  const body = method != "GET" ? JSON.stringify(bodyPayload): null // body data type must match "Content-Type" header


  useEffect(() => {
    const fetchData = async() => {
    const abortController = new AbortController();
  
    setIsLoading(true);
  
    fetch(url, {
      method: method,
     // headers : headers,
     // body: body,
  
      signal: abortController.signal,
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else
      throw new Error("Error " + response.status + " " + response.statusText);
    })
      //.then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request Cancelled");
        } else {
          setError(error);
          console.log(error);
        }
      })
      .finally(() => setIsLoading(false));
  
    return () => abortController.abort();
    }
    fetchData();
  }, dependencies);
  
  return { data, isLoading, error};
}