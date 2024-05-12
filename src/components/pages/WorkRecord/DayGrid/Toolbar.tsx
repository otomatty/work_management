import React, { useState } from "react";
import styled from "styled-components";
import { faKeyboard, faTrash } from "@fortawesome/free-solid-svg-icons";
import DateRangePicker from "../../../ui/DateRangePicker";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import ButtonGroup from "../../../ui/ButtonGroup";
import { deleteWorkRecords } from "../../../../firebase/firestoreFunctions"; // Firestore 関数をインポート
import LoadingScreen from "../../../ui/LoadingScreen"; // LoadingScreen をインポート

const ToolbarContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin-bottom: 20px;
  gap: 10px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.div<{ $isCloseButton?: boolean }>`
  cursor: pointer;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background-color: ${(props) =>
    props.$isCloseButton ? "#007bff" : "#f9f9f9"};
  color: ${(props) => (props.$isCloseButton ? "white" : "black")};
  text-align: ${(props) => (props.$isCloseButton ? "center" : "left")};
  &:hover {
    background-color: ${(props) =>
      props.$isCloseButton ? "#0056b3" : "#f1f1f1"};
  }
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
  const [showDateAlertModal, setShowDateAlertModal] = useState(false); // 新しい状態を追加
  const [isLoading, setIsLoading] = useState(false); // ローディング状態を追加

  const handleRangeDelete = (startDate: Date, endDate: Date) => {
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    onBulkDelete(startDay, endDay);
    setShowDeleteDropdown(false);
  };
  const [message, setMessage] = useState(""); // メッセージ表示用の状態を追加

  const handleConfirmBulkInsert = async () => {
    setIsLoading(true); // ローディング開始
    try {
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);
      await onBulkInsert(startOfMonth, endOfMonth); // 非同期処理をawaitで待つ
      setMessage("自動入力が完了しました"); // 成功メッセージを設定
    } catch (error) {
      console.error("一括入力エラー:", error);
      setMessage("一括入力に失敗しました"); // エラーメッセージを設定
    } finally {
      setIsLoading(false); // ローディング終了
      setShowConfirmModal(false); // モーダルを閉じる
    }
  };

  const handleDeleteAll = async () => {
    setIsLoading(true);
    try {
      await deleteWorkRecords(teacherId, year, month);
      setMessage("自動削除が完了しました");
    } catch (error) {
      console.error("削除エラー:", error);
      setMessage("自動削除に失敗しました");
    } finally {
      setIsLoading(false);
      setShowConfirmDeleteModal(false);
    }
  };

  const handlePeriodicInsert = (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) {
      setShowDateAlertModal(true); // 日付が選択されていない場合、警告モーダルを表示
      return;
    }
    onBulkInsert(startDate, endDate);
    alert("期間指定での登録が完了しました");
    setShowInsertDropdown(false);
  };

  return (
    <ToolbarContainer>
      {isLoading && <LoadingScreen />}
      {message && (
        <Modal isOpen={true} onClose={() => setMessage("")} message={message} />
      )}
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
          <DropdownMenu>
            <DropdownItem onClick={() => setShowConfirmModal(true)}>
              全日登録
            </DropdownItem>
            <DropdownItem onClick={() => setShowInsertDropdown(true)}>
              期間指定登録
            </DropdownItem>
            {showInsertDropdown && (
              <DateRangePicker onDateRangeSelect={handlePeriodicInsert} />
            )}
            <DropdownItem
              onClick={() => setShowInsertDropdown(false)}
              $isCloseButton
            >
              閉じる
            </DropdownItem>
          </DropdownMenu>
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
          <DropdownMenu>
            <DropdownItem onClick={() => setShowConfirmDeleteModal(true)}>
              全日削除
            </DropdownItem>
            <DropdownItem onClick={() => setShowDeleteDropdown(true)}>
              期間指定削除
            </DropdownItem>

            {showDeleteDropdown && (
              <DateRangePicker onDateRangeSelect={handleRangeDelete} />
            )}
            <DropdownItem
              onClick={() => setShowDeleteDropdown(false)}
              $isCloseButton
            >
              閉じる
            </DropdownItem>
          </DropdownMenu>
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
