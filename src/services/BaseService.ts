import {useEffect, useState} from "react";

const useServiceBaseList = <T>(handler: (page: number, pageSize?: number) => Promise<{
  total: number,
  data: T[],
}>) => {
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      const result = await handler(page);
      setTotal(result.total);
      setData(result.data);
      // setIsError(false);
      setIsLoading(false);
    };
    fetchData();
  }, [handler, page]);
  return {
    total,
    data,
    setData,
    isLoading,
    isError,
    page,
    setPage,
  };
};

export default {
  useServiceBaseList
}
