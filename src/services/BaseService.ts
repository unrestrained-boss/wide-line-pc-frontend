import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import Http, {ResponseError} from "../utils/Http";


function useListBase<T>(path: string): {
  total: number,
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
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);


  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      const [data, err] = await Http.get(path);
      if (!mounted) {
        return;
      }
      setIsLoading(false);
      if (err) {
        setIsError(true);
        return;
      }
      if (data) {
        setData(data);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [page, count, path]);
  return {
    total: data.length,
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

function useListWithPagingBase<T>(path: string, pageSize = 20): {
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

export default {
  useListBase,
  useListWithPagingBase,
}

export class NewBaseService<T> {
  path: string = '';
  useList() {
    const path = this.path;
    return useListBase<T>(path + '/all');
  }

  useListWithPaging(pageSize = 20) {
    const path = this.path;
    return useListWithPagingBase<T>(path + '/index', pageSize);
  }

  add(body: T): Promise<[
    any,
    ResponseError | null,
    AxiosResponse
    ]> {
    return Http.post(this.path + '/add', body);
  }

  update(id: number, body: T): Promise<[
    any,
    ResponseError | null,
    AxiosResponse
    ]> {
    return Http.post(this.path + '/edit', {
      id,
      ...body,
    });
  }

  remove(ids: number[]): Promise<[
    any,
    ResponseError | null,
    AxiosResponse
    ]> {
    return Http.get(this.path + '/delete', {
      params: {
        ids: ids.join(','),
      }
    });
  }
}
