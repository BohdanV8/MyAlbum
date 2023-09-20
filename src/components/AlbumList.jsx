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
      const storageRef = storage_Ref(storage, imagePath); // Передаємо шлях до зображення
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Помилка отримання URL завантаження:", error);
      return null;
    }
  };

  useEffect(() => {
    const database = getDatabase();
    const urlOfUserPhotos = `images/${emailOfUser}`;
    const userPhotosRef = ref(database, urlOfUserPhotos.replace(/\./g, "_"));
    get(userPhotosRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const photosData = snapshot.val();
          // photosData містить дані фотографій користувача
          var arrayOfPhotos = [];
          Object.values(photosData).map(async (photo, index) => {
            let url = await getDownloadUrlForImage(photo.imageURL);
            console.log(url);
            arrayOfPhotos.push({
              ...photo,
              imageURL: url,
            });
          });
          setUserPhotos(arrayOfPhotos);
          console.log(arrayOfPhotos);
          console.log(userPhotos);
        } else {
          // Якщо дані не знайдено
          console.log("Дані фотографій користувача не знайдено");
        }
      })
      .catch((error) => {
        console.error("Помилка отримання фотографій:", error);
      });
  }, []);

  return (
    <div className="container text-center mt-3">
      <div className="row">
        {userPhotos.map((photo, index) => (
          <div className="col-md-4" key={index}>
            <img src={photo.imageURL} alt={photo.imageURL} />
            <p>{photo.title}</p>
            <p>{photo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
