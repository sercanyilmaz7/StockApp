import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  const axiosPublic = axios.create({
    baseURL: "https://12176.fullstack.clarusway.com/"
  });
  const axiosWithToken = axios.create({
    baseURL: "https://12176.fullstack.clarusway.com/",
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosWithToken,axiosPublic};
};

export default useAxios;

//? Axios işlemlerini kısaltmak için ve içinde hooklar kullanacağım için ayrı bir CustomHook yapıyorum ve içinde instance larımı tanımlıyorum.
