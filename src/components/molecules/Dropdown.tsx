import React from "react";
import { DropdownMenu } from "../atoms/DropdownMenu";
import { DropdownItem } from "../atoms/DropdownItem";

interface DropdownProps {
  items: { label: string; onClick: () => void; isCloseButton?: boolean }[];
  onClose: () => void;
  children?: React.ReactNode; // children プロパティを追加
}

const Dropdown: React.FC<DropdownProps> = ({ items, onClose, children }) => {
  return (
    <DropdownMenu>
      {items.map((item, index) => (
        <DropdownItem
          key={index}
          onClick={item.onClick}
          $isCloseButton={item.isCloseButton}
        >
          {item.label}
        </DropdownItem>
      ))}
      {children}
      <DropdownItem onClick={onClose} $isCloseButton>
        閉じる
      </DropdownItem>
    </DropdownMenu>
  );
};

export default Dropdown;
