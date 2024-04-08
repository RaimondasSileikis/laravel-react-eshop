// import axios from "axios";
// import router from "./router";
// const userAxiosClient = ''
// const adminAxiosClient = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
// });

// adminAxiosClient.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('ADMIN_TOKEN')}`;
//   return config;
// });

// adminAxiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('ADMIN_TOKEN')
//       router.navigate("/admin");
//       return error;
//     }
//     throw error;
//   }
// );

// export {userAxiosClient, adminAxiosClient};





import axios from "axios";
import router from "./router";

const adminAxiosClient = createAxiosClient(
  "ADMIN_TOKEN",
  "/adminlogin"
);
const userAxiosClient = createAxiosClient(
  "USER_TOKEN",
  "/"
);

function createAxiosClient(tokenType, loginRoute) {
  const client = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  });

  if (tokenType) {
    client.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem(tokenType)}`;
      return config;
    });
  }

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem(tokenType)
        router.navigate(loginRoute);
      }
      // return Promise.reject(error);
      throw error;
    }
  );

  return client;
}

export { adminAxiosClient, userAxiosClient };
