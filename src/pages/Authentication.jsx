import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/myAlbum");
    } catch (error) {}
  };
  return (
    <div className="text-center mt-3">
      <h1 className="shrikhandText">Authentication</h1>
      <div className="mt-3">
        <input
          type="email"
          placeholder="Електронна пошта"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleLogin}>Увійти</button>
      </div>
      <button
        type="button"
        className="btn btn-link"
        onClick={() => {
          navigate("registration");
        }}
      >
        Не маєте акаунту? Зареєструйтеся!!!
      </button>
    </div>
  );
};

export default Authentication;
