import React from "react";
import { useState } from "react";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegistration = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigate("/myAlbum");
    } catch (error) {
      //console.error("Registration error:", error);
    }
  };

  return (
    <div className="text-center mt-3">
      <h1 className="shrikhandText">Registration</h1>
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
        <button onClick={handleRegistration}>Зареєструватися</button>
      </div>
    </div>
  );
};

export default Registration;
