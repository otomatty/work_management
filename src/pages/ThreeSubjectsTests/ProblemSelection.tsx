import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RangeSelector from "./RangeSelector";

const ProblemSelection: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedRange, setSelectedRange] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate("/category-selector");
    }
  }, [category, navigate]);

  return (
    <div>
      <h2>問題を選択</h2>
      {category && (
        <>
          <h3>選択されたカテゴリ: {category}</h3>
          <RangeSelector
            selectedRange={selectedRange}
            onSelectRange={setSelectedRange}
          />
        </>
      )}
      {category && selectedRange && (
        <div>
          <h3>選択された範囲: {selectedRange}</h3>
        </div>
      )}
    </div>
  );
};

export default ProblemSelection;
