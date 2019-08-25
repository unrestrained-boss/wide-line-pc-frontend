import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import Http, {ResponseError} from "../utils/Http";

function useServiceListBase<T>(path: string,  pageSize = 20): {
  total: number;
  data: T[],
  setData: Dispatch<SetStateAction<T[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  refresh: () => void;
} {
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
      const [data, err] = await Http.get(path, {
        params: {page, pageSize}
      });
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
  }, [page, count, path, pageSize]);
  return {
    total,
    data,
    setData,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    page,
    setPage,
    refresh() {
      setCount(count + 1);
    }
  };
}

function addServiceBase<T>(path: string): (body: T) => Promise<[
  any,
  ResponseError | null,
  AxiosResponse
  ]> {
  return (body: T) => {
    return Http.post(path, body);
  }
}

function updateServiceBase<T>(path: string): (id: number, body: T) => Promise<[
  any,
  ResponseError | null,
  AxiosResponse
  ]> {
  return (id: number, body: T) => {
    return Http.post(path, {
      id,
      ...body,
    });
  }
}

function deleteServiceBase(path: string): (ids: number[]) => Promise<[
  any,
  ResponseError | null,
  AxiosResponse
  ]> {
  return (ids: number[]) => {
    return Http.get(path, {
      params: {
        ids: ids.join(','),
      }
    });
  }
}

export default {
  useServiceListBase,
  addServiceBase,
  updateServiceBase,
  deleteServiceBase,
}
