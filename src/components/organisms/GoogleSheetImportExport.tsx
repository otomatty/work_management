import React, { useState } from "react";
import { getSheetData } from "../../utils/googleSheets";
import SpreadsheetSettingsForm from "./SpreadsheetSettingsForm";

const GoogleSheetImportExport: React.FC = () => {
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [range, setRange] = useState("");
  const [data, setData] = useState<string[][]>([]);

  const handleImport = async () => {
    if (spreadsheetId && range) {
      const sheetData = await getSheetData(spreadsheetId, range);
      if (sheetData) {
        setData(sheetData);
      } else {
        alert("データの取得に失敗しました。");
      }
    } else {
      alert("スプレッドシートIDと範囲を設定してください。");
    }
  };

  const handleSaveSettings = (id: string, range: string) => {
    setSpreadsheetId(id);
    setRange(range);
  };

  return (
    <div>
      <SpreadsheetSettingsForm onSave={handleSaveSettings} />
      <button onClick={handleImport}>インポート</button>
      <div>
        {data.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <span key={cellIndex}>{cell} </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleSheetImportExport;
