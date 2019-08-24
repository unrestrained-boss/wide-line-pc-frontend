import Http from '../utils/Http';

const loginUser = (body: any) => {
  return Http.post('/login', body)
};

// function useLoginUser() {
//   const [body, setBody] = useState<any>();
//   const [data, setData] = useState<any>();
//   const [error, setError] = useState<Error | null>(null);
//   useEffect(() => {
//     function fetchData() {
//       Http.post('/login', body).then(({data}: AxiosResponse) => {
//         setData(data);
//       })
//         .catch((error: AxiosError) => {
//           setError(error);
//         });
//     }
//     // fetchData();
//   }, [body]);
//   return {
//     data,
//     error,
//     setBody,
//   }
// }

export default {
  loginUser,
  // useLoginUser,
}
