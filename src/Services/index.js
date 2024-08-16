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
    localStorage.setItem("token", token);
    return response;
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
};

export const GetProfileData = async (token) => {
  try {
    const response = await axios.get("http://localhost:5244/User/Profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка получения данных: ", error);
    throw error;
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


