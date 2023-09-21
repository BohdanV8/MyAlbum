import { getDatabase, ref, get } from "firebase/database";

export const fetchPhotos = async (setUserPhotos, emailOfUser) => {
  try {
    const database = getDatabase();
    const urlOfUserPhotos = `images/${emailOfUser}`;
    const userPhotosRef = ref(database, urlOfUserPhotos.replace(/\./g, "_"));

    const snapshot = await get(userPhotosRef);
    if (snapshot.exists()) {
      const photosData = snapshot.val();
      const arrayOfPhotos = await Promise.all(
        Object.values(photosData).map(async (photo) => {
          return photo;
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
