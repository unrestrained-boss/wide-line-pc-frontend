type TList = (page: number, pageSize?: number) => Promise<{
  total: number;
  data: IBanner[];
}>;
export const getBannerList: TList = (page: number, pageSize: number = 20) => {
  console.log('getBannerList', page, pageSize);
  return new Promise((resolve) => {
    const result: IBanner[] = new Array(pageSize).fill(1).map((item, index) => {
      const i = ((page - 1) * pageSize) + index + 1;
      return {
        id: i,
        name: '好酒' + i,
        image: 'https://img13.360buyimg.com/img/jfs/t1/79625/4/7282/87331/5d53a2b0E0a73c40e/394aff7e452ab18a.jpg',
        link: 'https://www.baidu.com/s?wd=' + i,
        enable: i % 2 === 0,
        sort: i
      };
    });
    setTimeout(() => {
      resolve({
        total: 381,
        data: result
      });
    }, 1000);
  });
};

export const toggleBannerStatus: (id: number, status: boolean) => Promise<void> = (id: number, status: boolean) =>  {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
};
export interface IBanner {
  id: number;
  name: string,
  image: string,
  link: string,
  enable: boolean,
  sort: number
}
