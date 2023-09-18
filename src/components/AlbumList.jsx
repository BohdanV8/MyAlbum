import React, { useContext, useEffect } from "react";
import { UserContext } from "../context";
import { getDatabase, ref, get, child } from "firebase/database";
const AlbumList = () => {
  const { emailOfUser } = useContext(UserContext);
  useEffect(() => {
    const database = getDatabase();
    const userPhotosRef = ref(database, `userPhotos/${emailOfUser}`);
  }, []);
  const fetchPhotos = () => {};
  return <div className="container text-center mt-3"></div>;
};

export default AlbumList;
