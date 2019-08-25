import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import {ResponseError} from "../utils/Http";

const useServiceBaseList = <T>(handler: (page: number, pageSize?: number) => Promise<[
  {
    total: number,
    data: T[],
  } | null,
  ResponseError | null,
  AxiosResponse
  ]>) => {
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);


  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      const [data, err] = await handler(page);
      if (!mounted) {
        return;
      }
      setIsLoading(false);
      if (err) {
        setIsError(true);
        return;
      }
      if (data) {
        setTotal(data.total);
        setData(data.data);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [handler, page, count]);
  return {
    total,
    data,
    setData,
    isLoading,
    isError,
    page,
    setPage,
    refresh() {
      setCount(count + 1 );
    }
  };
};

export default {
  useServiceBaseList
}
