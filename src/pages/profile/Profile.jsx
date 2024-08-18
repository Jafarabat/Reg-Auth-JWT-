import React, { useContext, useEffect, useRef, useState } from "react";
import "./Profile.css";
import { GetProfileData, refreshToken } from "../../Services";
import { AuthContext } from "../../context";
import { UploadProfilePicture } from "../../Services";

const Profile = () => {
  const { setIsAuth } = useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await UploadProfilePicture(formData);

      const token = localStorage.getItem("token");
      const updatedData = await GetProfileData(token);
      setProfileInfo(updatedData);

      alert("Изображение успешно загружено!");
    } catch (error) {
      console.error("Ошибка при загрузке изображения: ", error);
    }
  };

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
            {profileInfo.profileImage && (
              <img
                src={`data:image/jpeg;base64,${profileInfo.profileImage}`}
                alt="Фото профиля"
              />
            )}
            <input
              type="file"
              id="file-upload"
              className="file-input"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <span
              className="edit-icon"
              onClick={() => fileInputRef.current.click()} // имитируем клик по input
            >
              ✏️
            </span>
          </div>
        </div>
        <div className="username-div">
          <span className="username">{profileInfo.username}</span>
        </div>
        <div className="profile-bio">
          <span className="email">{profileInfo.email}</span>
          <button onClick={() => setIsAuth(false)} className="edit-email-icon">
            ✏️
          </button>
          <button onClick={() => refreshToken()}>
            ✏️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
