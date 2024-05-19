import React, { useState } from "react";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import DateRangePicker from "../../../../components/molecules/DateRangePicker";
import Modal from "../../../../components/molecules/Modal";
import Button from "../../../../components/atoms/Button/Button";
import ButtonGroup from "../../../../components/layout/ButtonGroup";
import Dropdown from "../../../../components/molecules/Dropdown";
import LoadingScreen from "../../../../components/atoms/LodingScreen/LoadingScreen";

interface BulkInsertProps {
  isLoading: boolean;
  handleRangeInsert: (startDate: Date, endDate: Date) => void;
  handleInsertAll: () => void;
}

const BulkInsert: React.FC<BulkInsertProps> = ({
  isLoading,
  handleRangeInsert,
  handleInsertAll,
}) => {
  const [showInsertDropdown, setShowInsertDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleDateRangeSelect = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleRegister = () => {
    if (selectedStartDate && selectedEndDate) {
      handleRangeInsert(selectedStartDate, selectedEndDate);
      setShowDateRangeModal(false);
    }
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <Button
        onClick={() => {
          setShowInsertDropdown(!showInsertDropdown);
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
              onClick: () => setShowDateRangeModal(true),
            },
          ]}
          onClose={() => setShowInsertDropdown(false)}
        />
      )}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        message="すべての日に入力して良いですか？"
        showCloseButton={false}
      >
        <ButtonGroup $gap={10}>
          <Button
            label="はい"
            onClick={handleInsertAll}
            backgroundColor="#2ecc71"
          />
          <Button
            label="いいえ"
            onClick={() => setShowConfirmModal(false)}
            backgroundColor="#e74c3c"
          />
        </ButtonGroup>
      </Modal>
      <Modal
        isOpen={showDateRangeModal}
        onClose={() => setShowDateRangeModal(false)}
        message="期間を指定して登録を押してください"
        showCloseButton={false}
      >
        <DateRangePicker onDateRangeSelect={handleDateRangeSelect} />
        <ButtonGroup $gap={10}>
          <Button
            label="登録"
            onClick={handleRegister}
            backgroundColor="#2ecc71"
          />
          <Button
            label="戻る"
            onClick={() => setShowDateRangeModal(false)}
            backgroundColor="#e74c3c"
          />
        </ButtonGroup>
      </Modal>
    </div>
  );
};

export default BulkInsert;
