import React, { useState } from "react";
import styled from "styled-components";
import BulkInsert from "./ui/BulkInsert";
import BulkDelete from "./ui/BulkDelete";
import LoadingScreen from "../../../components/atoms/LoadingScreen";

const ToolbarContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin-bottom: 20px;
  gap: 10px;
`;

interface ToolbarProps {
  year: number;
  month: number;
}

const Toolbar: React.FC<ToolbarProps> = ({ year, month }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ToolbarContainer>
      {isLoading && <LoadingScreen />}
      <BulkInsert isLoading={isLoading} year={year} month={month} />
      <BulkDelete isLoading={isLoading} year={year} month={month} />
    </ToolbarContainer>
  );
};

export default Toolbar;
