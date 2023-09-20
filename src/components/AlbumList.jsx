import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { getDatabase, ref, get } from "firebase/database";
import { ref as storage_Ref, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase";

const AlbumList = () => {
  const { emailOfUser } = useContext(UserContext);
  const [userPhotos, setUserPhotos] = useState([]);

  const getDownloadUrlForImage = async (imagePath) => {
    try {
      const storageRef = storage_Ref(storage, imagePath);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Помилка отримання URL завантаження:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const database = getDatabase();
        const urlOfUserPhotos = `images/${emailOfUser}`;
        const userPhotosRef = ref(
          database,
          urlOfUserPhotos.replace(/\./g, "_")
        );

        const snapshot = await get(userPhotosRef);
        if (snapshot.exists()) {
          const photosData = snapshot.val();
          const arrayOfPhotos = await Promise.all(
            Object.values(photosData).map(async (photo) => {
              const imageURL = await getDownloadUrlForImage(photo.imageURL);
              return {
                ...photo,
                imageURL: imageURL,
              };
            })
          );
          setUserPhotos(arrayOfPhotos);
        } else {
          console.log("Дані фотографій користувача не знайдено");
        }
      } catch (error) {
        console.error("Помилка отримання фотографій:", error);
      }
    };

    fetchPhotos();
  }, [emailOfUser]);

  return (
    <div className="container-fluid text-center mt-5">
      <div className="row">
        {userPhotos.map((photo, index) => (
          <div className="text-center" key={index}>
            <p className="shrikhandText">{photo.title}</p>
            <img src={photo.imageURL} alt={`Фото ${index + 1}`} />
            <p>{photo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
