import React from "react";
import styled from "styled-components";

const MonthYearContainer = styled.div`
  text-align: center;
  padding: 10px 0;
  font-size: 20px;
  color: #007bff;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MonthYearDisplay: React.FC = () => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <MonthYearContainer>
      {year}年 {month}
    </MonthYearContainer>
  );
};

export default MonthYearDisplay;
