import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { GetProfileData } from "../../Services";
import { AuthContext } from "../../context";

const Profile = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState("");


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Токен отсутствует!");
          return;
        }
        const data = await GetProfileData(token);
        setProfileInfo(data);
      } catch (error) {
        console.error("Ошибка получения данных: ", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="main-profile">
      <div className="profile-window">
        <div className="avatar-div">
          <div className="ava">
            {/* <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsvdRzKoEjwgVvs63b0io78eFsTeN1qZ-zg&s"
              alt="Фото профиля"
            /> */}
            <input
              type="file"
              id="file-upload"
              className="file-input"
              accept="image/*"
            />
            <span className="edit-icon">✏️</span>
          </div>
        </div>
        <div className="username-div">
          <span className="username">{profileInfo.username}</span>
        </div>
        <div className="profile-bio">
          <span className="email">{profileInfo.email}</span>
          <button
            onClick={() => setIsAuth(false)}
            className="edit-email-icon"
          >
            ✏️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
