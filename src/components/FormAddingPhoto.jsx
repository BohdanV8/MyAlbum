import React, { useContext, useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database"; // Імпорт функцій Realtime Database
import { storage } from "../Firebase/firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { UserContext } from "../context";
import { fetchPhotos } from "../Firebase/fetchingPhotos";
const FormAddingPhoto = ({ setVisible, setUserPhotos }) => {
  const [titleValue, handleTitleChange] = useState("");
  const [descriptionValue, handleDescriptionChange] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { emailOfUser } = useContext(UserContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const urlOfPhoto = `images/${emailOfUser}/${selectedFile.name}`;
      const storage_Ref = storageRef(storage, urlOfPhoto);
      try {
        // Завантаження фотографії у Firebase Storage
        await uploadBytes(storage_Ref, selectedFile);

        // Отримайте URL фотографії після завантаження
        const downloadURL = await getDownloadURL(storage_Ref);

        // Додавайте дані до бази даних Realtime, включаючи URL
        const database = getDatabase();
        const newDataRef = push(
          ref(database, `images/${emailOfUser}`.replace(/\./g, "_"))
        );
        const data = {
          title: titleValue,
          description: descriptionValue,
          imageURL: downloadURL,
        };
        await set(newDataRef, data);
        fetchPhotos(setUserPhotos, emailOfUser);
        // Успішне завантаження та додавання даних
      } catch (error) {
        console.error("Помилка завантаження фотографії:", error);
      }
      setVisible(false);
    }
  };

  return (
    <form
      className="formForAddingPhoto container"
      onSubmit={(e) => {
        e.preventDefault();
        handleUpload();
      }}
    >
      <input
        type="text"
        value={titleValue}
        className="form-control mt-3"
        onChange={(e) => {
          handleTitleChange(e.target.value);
        }}
        placeholder="Заголовок:"
        required
      />
      <textarea
        value={descriptionValue}
        className="form-control mt-3"
        onChange={(e) => {
          handleDescriptionChange(e.target.value);
        }}
        placeholder="Опис:"
      ></textarea>
      <input
        type="file"
        accept="image/*"
        className="form-control mt-3"
        onChange={handleFileChange}
        required
      />
      <button type="submit" className="btn btn-primary mt-3 form-control">
        Enter
      </button>
    </form>
  );
};

export default FormAddingPhoto;
