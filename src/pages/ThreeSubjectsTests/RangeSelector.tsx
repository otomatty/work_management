import React from "react";

interface RangeSelectorProps {
  selectedRange: string;
  onSelectRange: (range: string) => void;
}

const ranges = ["範囲1", "範囲2", "範囲3"];

const RangeSelector: React.FC<RangeSelectorProps> = ({
  selectedRange,
  onSelectRange,
}) => {
  return (
    <div>
      <h3>出題範囲を選択</h3>
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onSelectRange(range)}
          style={{
            backgroundColor: selectedRange === range ? "lightblue" : "white",
            margin: "5px",
            padding: "10px",
          }}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default RangeSelector;
