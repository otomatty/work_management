import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import SectionContainer from "../../components/layout/SectionContainer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ResetPinPage: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleResetClick = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert(
        "パスワードリセットリンクが送信されました。メールを確認してください。"
      );
    } catch (error) {
      alert("エラーが発生しました。メールアドレスを確認してください。");
    }
  };

  return (
    <Container>
      <SectionContainer>
        <Title>PINコードリセット</Title>
        <Input
          type="email"
          placeholder="メールアドレスを入力してください"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleResetClick}>メールにリンクを送信</Button>
      </SectionContainer>
    </Container>
  );
};

export default ResetPinPage;
