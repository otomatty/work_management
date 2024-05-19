import React from "react";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { DropdownItem } from "../DropdownItem/DropdownItem";

interface DropdownProps {
  items: { label: string; onClick: () => void; isCloseButton?: boolean }[];
  onClose: () => void;
  children?: React.ReactNode;
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
