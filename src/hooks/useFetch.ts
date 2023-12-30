import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react"


const useFetch = (url: string, initialPage: number = 1, loadCount: number = 5) => {
    const [data, setData] = useState();
    const [page, setPage] = useState(initialPage);
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = useCallback(() => {
        setIsLoading(true)
        axios.get(url+`?_page=${initialPage}&_limit=${loadCount}`)
            .then((res: AxiosResponse) => {
                setData(res.data)
            })
            .catch((err:AxiosError)=>{
                setError(err.message)
            })
            .finally(()=>{
                setIsLoading(false)
            })

    }, [url,page])

    useEffect(()=>{
        fetchData()
    }, [fetchData])

    return { data, error, isLoading, page, setPage }
}

export default useFetch
