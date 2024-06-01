import React, { useState } from "react";

interface SpreadsheetSettingsFormProps {
  onSave: (spreadsheetId: string, range: string) => void;
}

const SpreadsheetSettingsForm: React.FC<SpreadsheetSettingsFormProps> = ({
  onSave,
}) => {
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [range, setRange] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(spreadsheetId, range);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>スプレッドシートID:</label>
        <input
          type="text"
          value={spreadsheetId}
          onChange={(e) => setSpreadsheetId(e.target.value)}
          placeholder="スプレッドシートIDを入力"
        />
      </div>
      <div>
        <label>範囲 (例: Sheet1!A1:D10):</label>
        <input
          type="text"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          placeholder="範囲を入力"
        />
      </div>
      <button type="submit">保存</button>
    </form>
  );
};

export default SpreadsheetSettingsForm;
