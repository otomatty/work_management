import React, { useState, useEffect } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DateRangePicker from '../../../../components/molecules/DateRangePicker';
import Modal from '../../../../components/molecules/Modal';
import Button from '../../../../components/atoms/Button';
import ButtonGroup from '../../../../components/layout/ButtonGroup';
import Dropdown from '../../../../components/molecules/Dropdown';
import LoadingScreen from '../../../../components/atoms/LoadingScreen';
import { useSelector } from 'react-redux'; // ReduxからteacherIdを取得するためのimport
import { workRecordsService } from '../../../../services/teachers/workRecordsService';
import { useLoadingAndReload } from '../../../../hooks/useLoadingAndReload'; // カスタムフックをインポート

interface BulkDeleteProps {
  year: number;
  month: number;
}

const BulkDelete: React.FC<BulkDeleteProps> = ({ year, month }) => {
  const [showDeleteDropdown, setShowDeleteDropdown] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const { isLoading, startLoading, stopLoading, reloadPage } =
    useLoadingAndReload(); // カスタムフックを使用

  // ReduxからteacherIdを取得
  const teacherId = useSelector((state: any) => state.teacher.teacherId); // stateの型をanyに指定

  useEffect(() => {
    // console.log('BulkDelete month value:', month); // monthの値を表示
  }, [month]);

  const handleDateRangeSelect = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleRangeDelete = async (startDate: Date, endDate: Date) => {
    startLoading(); // ローディング状態を開始

    console.log('Deleting records for month:', month); // Added console.log to display month
    await workRecordsService.deleteWorkRecordsByDateRange(
      teacherId,
      year,
      month,
      startDate,
      endDate
    );
    stopLoading(); // ローディング状態を終了
    reloadPage(); // ページをリロード
  };

  const handleDeleteAll = async () => {
    startLoading(); // ローディング状態を開始
    await workRecordsService.deleteAllWorkRecordsForMonth(
      teacherId,
      year,
      month
    ); // Example with teacher ID and year/month specified
    stopLoading(); // ローディング状態を終了
    setShowConfirmDeleteModal(false);
    reloadPage(); // ページをリロード
  };

  return (
    <div>
      {isLoading && <LoadingScreen />} {/* ローディング画面を表示 */}
      <Button
        onClick={() => {
          setShowDeleteDropdown(!showDeleteDropdown);
        }}
        label="一括削除"
        disabled={isLoading} // ローディング中はボタンを無効化
        icon={faTrash}
      />
      {showDeleteDropdown && (
        <Dropdown
          items={[
            {
              label: '全日削除',
              onClick: () => setShowConfirmDeleteModal(true),
            },
            {
              label: '期間指定削除',
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
            onClick={() =>
              handleRangeDelete(selectedStartDate!, selectedEndDate!)
            }
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
