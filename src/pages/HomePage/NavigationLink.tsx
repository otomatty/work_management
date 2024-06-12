import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Modal from "../../components/molecules/Modal";
import PinInput from "../../components/molecules/PinInput";
import bcrypt from "bcryptjs";

const StyledLink = styled.div`
  display: inline-block;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  margin: 0 auto 0 20px;
  padding: 10px 20px;
  border: 2px solid #007bff;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const ResetLink = styled.div`
  margin-top: 20px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;

const NavigationLink: React.FC = () => {
  const { t } = useTranslation("homePage");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setModalOpen(true);
  };

  const handlePinSubmit = async (pin: string) => {
    const savedPin = localStorage.getItem("userPin");
    if (savedPin && (await bcrypt.compare(pin, savedPin))) {
      setModalOpen(false);
      navigate("/admin-dashboard");
    } else {
      alert("PINコードが間違っています");
    }
  };

  const handleResetLinkClick = () => {
    setModalOpen(false);
    navigate("/reset-pin");
  };

  return (
    <>
      <StyledLink onClick={handleLinkClick}>{t("adminDashboard")}</StyledLink>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <PinInput onSubmit={handlePinSubmit} />
        <ResetLink onClick={handleResetLinkClick}>
          パスコードを忘れましたか？
        </ResetLink>
      </Modal>
    </>
  );
};

export default NavigationLink;
