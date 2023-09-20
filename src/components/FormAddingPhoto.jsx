import React, { useContext, useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database"; // Імпорт функцій Realtime Database
import { storage } from "../Firebase/firebase";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { UserContext } from "../context";

const FormAddingPhoto = () => {
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
      // Створення посилання на зберігання у Firebase Storage
      const urlOfPhoto = `images/${emailOfUser}/${selectedFile.name}`;
      const storage_Ref = storageRef(storage, urlOfPhoto);
      try {
        // Завантаження фотографії у Firebase Storage

        await uploadBytes(storage_Ref, selectedFile);
        // Успішне завантаження, ви можете виконати додаткові дії тут
      } catch (error) {
        console.error("Помилка завантаження фотографії:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (titleValue && selectedFile) {
      handleUpload();
      try {
        // Отримуємо посилання на вашу базу даних Realtime
        const database = getDatabase();

        // Додаємо новий запис у базу даних Realtime
        const newDataRef = push(
          ref(database, `images/${emailOfUser}`.replace(/\./g, "_"))
        );
        const url_of_image = `images/${emailOfUser}/${selectedFile.name}`;
        // Дані для додавання
        const data = {
          title: titleValue,
          description: descriptionValue,
          imageURL: url_of_image, // Посилання на фотографію у Storage
        };

        // Додавання даних до Realtime Database
        await set(newDataRef, data);

        // Успішне додавання, ви можете виконати додаткові дії тут
      } catch (error) {
        console.error("Помилка додавання даних до Realtime Database:", error);
      }
    }
  };

  return (
    <form
      className="formForAddingPhoto container"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
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
