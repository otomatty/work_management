import React, { useState } from "react";
import styled from "styled-components";
import { faKeyboard, faTrash } from "@fortawesome/free-solid-svg-icons";
import DateRangePicker from "../../../components/molecules/DateRangePicker";
import Modal from "../../../components/molecules/Modal";
import Button from "../../../components/atoms/Button";
import ButtonGroup from "../../../components/layout/ButtonGroup";
import { deleteWorkRecords } from "../../../firebase";
import LoadingScreen from "../../../components/atoms/LoadingScreen";
import { useDispatch } from "react-redux";
import {
  incrementDataVersion,
  clearWorkRecords,
  setClassroom,
} from "../../../store/workRecordSlice";
import { fetchClassroom } from "../../../firebase/classroomOperations";
import Dropdown from "../../../components/molecules/Dropdown";

const ToolbarContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin-bottom: 20px;
  gap: 10px;
`;

interface ToolbarProps {
  onBulkInsert: (startDate: Date, endDate: Date) => void;
  onBulkDelete: (startDay?: number, endDay?: number) => void;
  teacherId: string;
  year: number;
  month: number;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onBulkInsert,
  onBulkDelete,
  teacherId,
  year,
  month,
}) => {
  const [showInsertDropdown, setShowInsertDropdown] = useState(false);
  const [showDeleteDropdown, setShowDeleteDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showDateAlertModal, setShowDateAlertModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRangeDelete = (startDate: Date, endDate: Date) => {
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    onBulkDelete(startDay, endDay);
    setShowDeleteDropdown(false);
  };

  const handleConfirmBulkInsert = async () => {
    setIsLoading(true);
    try {
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = endOfMonth.getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        try {
          const classroom = await fetchClassroom(teacherId, dayOfWeek);
          dispatch(setClassroom(classroom));
        } catch (innerError) {
          const error = innerError as Error;
          console.error(`Error fetching classroom for day ${day}:`, error);
          throw new Error(
            `Failed to fetch classroom for day ${day}: ${error.message}`
          );
        }
      }

      await onBulkInsert(startOfMonth, endOfMonth);
    } catch (error) {
      const typedError = error as Error;
      console.error("一括入力エラー:", typedError);
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
      setShowInsertDropdown(false);
    }
  };

  const handleDeleteAll = async () => {
    setIsLoading(true);
    try {
      await deleteWorkRecords(teacherId, year, month);
      dispatch(incrementDataVersion());
      dispatch(clearWorkRecords());
    } catch (error) {
      console.error("削除エラー:", error);
    } finally {
      setIsLoading(false);
      setShowConfirmDeleteModal(false);
      setShowDeleteDropdown(false);
    }
  };

  const handlePeriodicInsert = (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) {
      setShowDateAlertModal(true);
      return;
    }
    onBulkInsert(startDate, endDate);
    alert("期間指定での登録が完了しました");
    setShowInsertDropdown(false);
  };

  return (
    <ToolbarContainer>
      {isLoading && <LoadingScreen />}
      <div>
        <Button
          onClick={() => {
            setShowInsertDropdown(!showInsertDropdown);
            setShowDeleteDropdown(false);
          }}
          label="一括入力"
          disabled={isLoading}
          icon={faKeyboard}
        />
        {showInsertDropdown && (
          <Dropdown
            items={[
              { label: "全日登録", onClick: () => setShowConfirmModal(true) },
              {
                label: "期間指定登録",
                onClick: () => setShowInsertDropdown(true),
              },
            ]}
            onClose={() => setShowInsertDropdown(false)}
          >
            {showInsertDropdown && (
              <DateRangePicker onDateRangeSelect={handlePeriodicInsert} />
            )}
          </Dropdown>
        )}
      </div>
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        message="すべての日に入力して良いですか？"
        showCloseButton={false}
      >
        <ButtonGroup $gap={10}>
          <Button
            label="はい"
            onClick={handleConfirmBulkInsert}
            backgroundColor="#2ecc71"
          />
          <Button
            label="いいえ"
            onClick={() => setShowConfirmModal(false)}
            backgroundColor="#e74c3c"
          />
        </ButtonGroup>
      </Modal>
      <div>
        <Button
          onClick={() => {
            setShowDeleteDropdown(!showDeleteDropdown);
            setShowInsertDropdown(false);
          }}
          label="一括削除"
          icon={faTrash}
        />
        {showDeleteDropdown && (
          <Dropdown
            items={[
              {
                label: "全日削除",
                onClick: () => setShowConfirmDeleteModal(true),
              },
              {
                label: "期間指定削除",
                onClick: () => setShowDeleteDropdown(true),
              },
            ]}
            onClose={() => setShowDeleteDropdown(false)}
          >
            {showDeleteDropdown && (
              <DateRangePicker onDateRangeSelect={handleRangeDelete} />
            )}
          </Dropdown>
        )}
      </div>
      <Modal
        isOpen={showConfirmDeleteModal}
        onClose={() => setShowConfirmDeleteModal(false)}
        message="全ての記録を削除してもよいですか？"
        showCloseButton={false}
      >
        <ButtonGroup $gap={10}>
          <Button
            label="はい"
            onClick={handleDeleteAll}
            backgroundColor="#2ecc71"
          />
          <Button
            label="いいえ"
            onClick={() => setShowConfirmDeleteModal(false)}
            backgroundColor="#e74c3c"
          />
        </ButtonGroup>
      </Modal>
      <Modal
        isOpen={showDateAlertModal}
        onClose={() => setShowDateAlertModal(false)}
        message="日付範囲を選択してください。"
      />
    </ToolbarContainer>
  );
};

export default Toolbar;
