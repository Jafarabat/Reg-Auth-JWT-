import axios from "axios";

export const registration = async (userRegInfo) => {
  return await axios.post("http://localhost:5244/User/SignUp", userRegInfo);
};

export const login = async (userLogInfo) => {
  try {
    const response = await axios.post(
      "http://localhost:5244/User/SignIn",
      userLogInfo
    );
    const token = response.data.token;
    const refreshToken = response.data.refreshToken;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    return response;
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.post(
      "http://localhost:5244/User/RefreshToken",
      {
        token: token,
        refreshToken: refreshToken,
      }
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    console.log(response.data.token, response.data.refreshToken);
    return response.data.token;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    console.log("Проверка");
    const Request = error.config;
    console.log(Request);

    if (error.response.status === 401 && !Request._retry) {
      Request._retry = true;
      try {
        const newToken = await refreshToken();

        Request.headers["Authorization"] = `Bearer ${newToken}`;

        return axios(Request);
      } catch (refreshError) {
        console.error(refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const GetProfileData = async () => {
  try {
    const response = await axios.get("http://localhost:5244/User/Profile");
    return response.data;
  } catch (error) {
    console.error("Ошибка получения данных: ", error);
    throw error;
  }
};

export const UploadProfilePicture = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5244/User/UploadPicture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
