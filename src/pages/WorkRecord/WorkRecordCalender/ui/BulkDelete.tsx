import React, { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DateRangePicker from "../../../../components/molecules/DateRangePicker";
import Modal from "../../../../components/molecules/Modal";
import Button from "../../../../components/atoms/Button";
import ButtonGroup from "../../../../components/layout/ButtonGroup";
import Dropdown from "../../../../components/molecules/Dropdown";
import LoadingScreen from "../../../../components/atoms/LoadingScreen";

interface BulkDeleteProps {
  isLoading: boolean;
  handleRangeDelete: (startDate: Date, endDate: Date) => void;
  handleDeleteAll: () => void;
}

const BulkDelete: React.FC<BulkDeleteProps> = ({
  isLoading,
  handleRangeDelete,
  handleDeleteAll,
}) => {
  const [showDeleteDropdown, setShowDeleteDropdown] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleDateRangeSelect = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleDelete = () => {
    if (selectedStartDate && selectedEndDate) {
      handleRangeDelete(selectedStartDate, selectedEndDate);
      setShowDateRangeModal(false);
    }
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <Button
        onClick={() => {
          setShowDeleteDropdown(!showDeleteDropdown);
        }}
        label="一括削除"
        disabled={isLoading}
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
              onClick: () => setShowDateRangeModal(true),
            },
          ]}
          onClose={() => setShowDeleteDropdown(false)}
        />
      )}
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
        isOpen={showDateRangeModal}
        onClose={() => setShowDateRangeModal(false)}
        message="期間を指定して削除を押してください"
        showCloseButton={false}
      >
        <DateRangePicker onDateRangeSelect={handleDateRangeSelect} />
        <ButtonGroup $gap={10}>
          <Button
            label="削除"
            onClick={handleDelete}
            backgroundColor="#e74c3c"
          />
          <Button
            label="戻る"
            onClick={() => setShowDateRangeModal(false)}
            backgroundColor="#95a5a6"
          />
        </ButtonGroup>
      </Modal>
    </div>
  );
};

export default BulkDelete;
