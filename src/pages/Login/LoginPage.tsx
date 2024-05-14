import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next"; // i18nextのフックをインポート
import Header from "../../components/organisms/Header";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f9;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 60px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #5051db;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  margin-top: 10px;
  background-color: #5051db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #3938c1;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation(); // 翻訳関数の取得

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("ログインエラー:", error);
      alert("ログインに失敗しました: " + (error as Error).message);
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      navigate("/");
    } catch (error) {
      console.error("ログインエラー:", error);
      alert("ログインに失敗しました: " + (error as Error).message);
    }
  };

  return (
    <LoginContainer>
      <Header disableLink={true} />
      <LoginForm onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder={t("emailAddress")} // プレースホルダーを翻訳
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder={t("password")} // プレースホルダーを翻訳
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">{t("login")}</Button>
        <Button onClick={googleLogin}>
          <Icon>
            <FcGoogle />
          </Icon>
          {t("loginWithGoogle")}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
