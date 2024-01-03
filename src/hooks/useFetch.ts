import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

const useFetch = <T>(url: string, initialPage: number = 1, limit: number = 5) => {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(initialPage);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState(true)

    const fetchData = useCallback(() => {
        setIsLoading(true);
        setError('');
        axios.get<T[]>(`${url}?_page=${page}&_limit=${limit}`)
            .then((res: AxiosResponse<T[]>) => {
                setData(prevData => {
                    let tempData = [...prevData]
                    const start = (page - 1) * limit;
                    if (res.data.length == limit) tempData.splice(start, limit, ...res.data);
                    else {
                        tempData.splice(start, res.data.length, ...res.data)
                        setHasMore(false)
                    }
                    return tempData;
                });
            })
            .catch((err: AxiosError) => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url, page, limit]);



    useEffect(() => {
        if (hasMore) fetchData();
    }, [fetchData]);

    return { data, error, isLoading, page, hasMore, setPage };
}

export default useFetch;
