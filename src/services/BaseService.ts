import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import Http, {ResponseError} from "../utils/Http";


function useServiceListWithoutPagingBase<T>(path: string): {
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

function useServiceListBase<T>(path: string, pageSize = 20): {
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

function listServiceBase<T>(path: string): (page: number, pageSize?: number) => Promise<[
  { total: number, data: T[] },
  ResponseError | null,
  AxiosResponse
  ]> {
  return (page: number, pageSize = 20) => {
    return Http.get(path, {
      params: {page, pageSize}
    });
  }
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
  useServiceListWithoutPagingBase,
  useServiceListBase,
  listServiceBase,
  addServiceBase,
  updateServiceBase,
  deleteServiceBase,
}

export interface IBaseService<T> {
  listWithPaging: () => {
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
  };
  // list: (page: number, pageSize?: number) => Promise<[
  //   { total: number, data: T[] },
  //   ResponseError | null,
  //   AxiosResponse
  //   ]>,
  add: (body: T) => Promise<[
    any,
    ResponseError | null,
    AxiosResponse
    ]>;
  update: (id: number, body: T) => Promise<[
    any,
    ResponseError | null,
    AxiosResponse
    ]>;
  remove: (ids: number[]) => Promise<[
    any,
    ResponseError | null,
    AxiosResponse
    ]>;
}


export class NewBaseService<T> {
  path: string = '';

  listWithOutPaging() {
    const path = this.path;
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

  listWithPaging(pageSize = 20) {
    const path = this.path;
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
        const [data, err] = await Http.get(path + '/index', {
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
