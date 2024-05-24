import React from "react";
import styled from "styled-components";

interface WorkHoursDisplayProps {
  teachHour: number;
  officeHour: number;
}

const Container = styled.div`
  margin-bottom: 8px;
`;

const Title = styled.span`
  display: block;
  text-align: left;
  font-size: 0.8rem;
`;

const Time = styled.time`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: bold;
  margin: 4px 0;
  height: 2.4rem;
`;

const WorkHoursDisplay: React.FC<WorkHoursDisplayProps> = ({
  teachHour,
  officeHour,
}) => {
  return (
    <Container>
      <div>
        <Title>教務時間</Title>
        <Time>{teachHour} 分</Time>
      </div>
      <div>
        <Title>事務時間</Title>
        <Time>{officeHour} 分</Time>
      </div>
    </Container>
  );
};

export default WorkHoursDisplay;
