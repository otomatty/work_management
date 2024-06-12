import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート
import PinInput from "../../components/molecules/PinInput";
import Modal from "../../components/molecules/Modal"; // モーダルをインポート
import StepperDisplay from "../../components/atoms/StepperDisplay/StepperDisplay";
import Header from "../../components/organisms/Header";
import SectionContainer from "../../components/layout/SectionContainer";
import bcrypt from "bcryptjs";

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

const Text = styled.p`
  font-weight: bold;

  span {
    font-size: 1.6rem;
  }
`;

const StepMessage = styled.p`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.2em;
  color: #555;
`;

const ChangePinPage: React.FC = () => {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [step, setStep] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [pinInputKey, setPinInputKey] = useState(0); // PinInputのキーを管理
  const navigate = useNavigate(); // useNavigateフックを使用

  useEffect(() => {
    const savedPin = localStorage.getItem("userPin");
    if (!savedPin) {
      setIsFirstTime(true);
      setStep(2); // 初めての場合は新しいパスコードの設定ステップに進む
    }
  }, []);

  const handleCurrentPinSubmit = async (enteredPin: string) => {
    const savedPin = localStorage.getItem("userPin");
    if (savedPin && (await bcrypt.compare(enteredPin, savedPin))) {
      setCurrentPin(enteredPin);
      setStep(2);
      setPinInputKey((prevKey) => prevKey + 1); // PinInputのキーを更新してリセット
    } else {
      alert("現在のPINコードが間違っています");
    }
  };

  const handleNewPinSubmit = async (enteredPin: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(enteredPin, salt);
    localStorage.setItem("userPin", hashedPin);
    setNewPin(enteredPin);
    setModalOpen(true); // モーダルを開く
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/admin-dashboard"); // 管理画面にリダイレクト
  };

  return (
    <Container>
      <SectionContainer>
        <Header></Header>
      </SectionContainer>
      <SectionContainer>
        <Title>{isFirstTime ? "PINコードを設定" : "PINコードを変更"}</Title>
        <StepperDisplay
          steps={["現在のPINコード", "新しいPINコード"]}
          currentStep={step}
        />
        {step === 1 ? (
          <>
            <StepMessage>現在のPINコードを入力してください</StepMessage>
            <PinInput key={pinInputKey} onSubmit={handleCurrentPinSubmit} />
          </>
        ) : (
          <>
            <StepMessage>新しいPINコードを入力してください</StepMessage>
            <PinInput key={pinInputKey} onSubmit={handleNewPinSubmit} />
          </>
        )}
      </SectionContainer>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <Text>
          新しいPINコード：<span>{newPin}</span>
        </Text>
      </Modal>
    </Container>
  );
};

export default ChangePinPage;
