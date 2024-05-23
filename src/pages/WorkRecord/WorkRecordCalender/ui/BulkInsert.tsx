import React, { useState } from 'react';
import { WorkRecord } from '../../../../types';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import DateRangePicker from '../../../../components/molecules/DateRangePicker';
import Modal from '../../../../components/molecules/Modal';
import Button from '../../../../components/atoms/Button';
import ButtonGroup from '../../../../components/layout/ButtonGroup';
import Dropdown from '../../../../components/molecules/Dropdown';
import LoadingScreen from '../../../../components/atoms/LoadingScreen';
import { useSelector } from 'react-redux'; // ReduxからteacherIdを取得するためのimport
import { workRecordsService } from '../../../../services/teachers/workRecordsService';

import { useLoadingAndReload } from '../../../../hooks/useLoadingAndReload'; // カスタムフックをインポート

interface BulkInsertProps {
  year: number;
  month: number;
}

const BulkInsert: React.FC<BulkInsertProps> = ({ year, month }) => {
  const [showInsertDropdown, setShowInsertDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const { isLoading, startLoading, stopLoading, reloadPage } =
    useLoadingAndReload(); // カスタムフックを使用

  const teacherId = useSelector((state: any) => state.teacher.teacherId); // stateの型をanyに指定

  const handleDateRangeSelect = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleRangeInsert = async (startDate: Date, endDate: Date) => {
    startLoading(); // ローディング状態を開始
    await workRecordsService.insertWorkRecordsByDateRange(
      teacherId,
      year,
      month,
      startDate,
      endDate
    );
    stopLoading(); // ローディング状態を終了
    reloadPage(); // ページをリロード
  };

  const handleInsertAll = async () => {
    startLoading(); // ローディング状態を開始
    await workRecordsService.insertAllWorkRecordsForMonth(
      teacherId,
      year,
      month
    );
    stopLoading(); // ローディング状態を終了
    reloadPage(); // ページをリロード
  };

  return (
    <div>
      {isLoading && <LoadingScreen />} {/* ローディング画面を表示 */}
      <Button
        onClick={() => {
          setShowInsertDropdown(!showInsertDropdown);
        }}
        label="一括入力"
        disabled={isLoading} // ローディング中はボタンを無効化
        icon={faKeyboard}
      />
      {showInsertDropdown && (
        <Dropdown
          items={[
            { label: '全日登録', onClick: () => setShowConfirmModal(true) },
            {
              label: '期間指定登録',
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
            onClick={() =>
              handleRangeInsert(selectedStartDate!, selectedEndDate!)
            }
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
