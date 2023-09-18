import React, { useState } from "react";
import MyModal from "../components/UI/MyModal/MyModal";

import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import FormAddingPhoto from "../components/FormAddingPhoto";
import AlbumList from "../components/AlbumList";
const Album = () => {
  const albumObjects = [];
  const [modal, setModal] = useState(false);
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
        <FormAddingPhoto />
      </MyModal>
      {albumObjects.length === 0 ? (
        <h1 className="mt-4">Not photos or videos found</h1>
      ) : (
        <AlbumList />
      )}
    </div>
  );
};
export default Album;
