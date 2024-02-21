import axios from "axios";

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const jsonApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(
  async function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      console.log("토큰 확인용", accessToken);
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (
      error.response.data.message ===
      "토큰이 만료되었습니다. 다시 로그인 해주세요."
    ) {
      return;
    }
    return Promise.reject(error);
  }
);

// jsonApi.interceptors.request.use(
//   async function (config) {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },

//   function (error) {
//     console.log("인터셉터 요청 오류, error");
//     return Promise.reject(error);
//   }
// );

// const formData = new FormData();
// // avatar와 nickname 중 하나 또느 모두 변경 가능
// formData.append("avatar", imgFile);
// formData.append("nickname", nickname);

// // 요청 시 Content-Type에 유의
// const response = await axios.patch(`${BASE_URL}/profile`, formData, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//     Authorization: `Bearer ${accessToken}`,
//   },
// });
