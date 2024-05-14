import React, { useState, useRef, useEffect } from "react";

interface InlineEditProps {
  value: string;
  onCommit: (value: string) => void; // 値が確定したときに呼ばれる関数
}

const InlineEdit: React.FC<InlineEditProps> = ({ value, onCommit }) => {
  const [isEditing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setEditing(false);
    onCommit(inputValue);
  };

  return (
    <div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBlur();
            }
          }}
        />
      ) : (
        <div onClick={() => setEditing(true)}>{value}</div>
      )}
    </div>
  );
};

export default InlineEdit;
