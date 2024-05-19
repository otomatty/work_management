import React, { useState } from "react";
import styled from "styled-components";
import BulkInsert from "./ui/BulkInsert";
import BulkDelete from "./ui/BulkDelete";
import Modal from "../../../components/molecules/Modal";
import LoadingScreen from "../../../components/atoms/LodingScreen/LoadingScreen";
import { useDispatch } from "react-redux";
import {
  deleteWorkRecordsRequest,
  insertWorkRecordsRequest,
} from "../../../redux/actions";

const ToolbarContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin-bottom: 20px;
  gap: 10px;
`;

interface ToolbarProps {
  year: number;
  month: number;
}

const Toolbar: React.FC<ToolbarProps> = ({ year, month }) => {
  const [showDateAlertModal, setShowDateAlertModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRangeInsert = async (startDate: Date, endDate: Date) => {
    setIsLoading(true);
    try {
      await dispatch(insertWorkRecordsRequest(startDate, endDate, year, month));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInsertAll = () => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    handleRangeInsert(startDate, endDate);
  };

  const handleRangeDelete = async (startDate: Date, endDate: Date) => {
    setIsLoading(true);
    try {
      await dispatch(deleteWorkRecordsRequest(startDate, endDate, year, month));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAll = () => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    handleRangeDelete(startDate, endDate);
  };

  return (
    <ToolbarContainer>
      {isLoading && <LoadingScreen />}
      <BulkInsert
        isLoading={isLoading}
        handleRangeInsert={handleRangeInsert}
        handleInsertAll={handleInsertAll}
      />
      <BulkDelete
        isLoading={isLoading}
        handleRangeDelete={handleRangeDelete}
        handleDeleteAll={handleDeleteAll}
      />
      <Modal
        isOpen={showDateAlertModal}
        onClose={() => setShowDateAlertModal(false)}
        message="日付範囲を選択してください。"
      />
    </ToolbarContainer>
  );
};

export default Toolbar;
