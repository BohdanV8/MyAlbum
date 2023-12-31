import React, { useState, useContext, useEffect } from "react";
import MyModal from "../components/UI/MyModal/MyModal";
import { fetchPhotos } from "../Firebase/fetchingPhotos";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import FormAddingPhoto from "../components/FormAddingPhoto";
import { UserContext } from "../context";
const Album = () => {
  const [modal, setModal] = useState(false);
  const { emailOfUser } = useContext(UserContext);
  const [userPhotos, setUserPhotos] = useState([]);
  useEffect(() => {
    fetchPhotos(setUserPhotos, emailOfUser);
  }, [emailOfUser]);
  return (
    <div className="mt-3 text-center">
      <h1 className="shrikhandText">My Album</h1>
      <MdOutlineAddPhotoAlternate
        className="iconAdd"
        onClick={() => {
          setModal(true);
        }}
      />
      <MyModal visible={modal} setVisible={setModal}>
        <FormAddingPhoto setVisible={setModal} setUserPhotos={setUserPhotos} />
      </MyModal>
      <div className="container text-center mt-5">
        <div className="row">
          {userPhotos.map((photo, index) => (
            <div className="text-center mt-5" key={index}>
              <p className="RalewayText">{photo.title}</p>
              <img
                className="img-fluid max-width-100"
                src={photo.imageURL}
                alt={`Фото ${index + 1}`}
              />
              <p className="WorkSansText">{photo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Album;
