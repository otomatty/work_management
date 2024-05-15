import React from "react";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "./ToggleSwitch"; // Import ToggleSwitch component

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleToggle = (isChecked: boolean) => {
    i18n.changeLanguage(isChecked ? "ja" : "en");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <ToggleSwitch
        label={i18n.language === "ja" ? "Switch Language" : "言語を切り替える"}
        isChecked={i18n.language === "ja"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleToggle(e.target.checked)
        }
        checkedColor="#FF6347"
        uncheckedColor="#4169E1"
      />
    </div>
  );
};

export default LanguageSwitcher;
