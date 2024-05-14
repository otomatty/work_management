import React from "react";
import styled from "styled-components";

const NotificationContainer = styled.div`
  padding: 15px;
  margin: 20px auto;
  text-align: center;
  max-width: 600px;
  border-radius: 5px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
`;

const Notifications: React.FC = () => {
  // 通知の有無に応じて表示を切り替えるロジックをここに実装
  return <NotificationContainer>新しい通知があります。</NotificationContainer>;
};

export default Notifications;
