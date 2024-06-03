import React from 'react';
import {
  StudentCollection,
  ContactInfo,
  SiblingInfo,
  NotificationInfo,
} from '../../../types';
import styled from 'styled-components';

interface StudentTableProps {
  students: StudentCollection[];
  contacts: ContactInfo[];
  siblings: SiblingInfo[];
  notifications: NotificationInfo[];
  onDelete: (studentId: string) => void;
  onEdit: (student: StudentCollection) => void;
  deleteMode: boolean;
  editMode: boolean;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
`;

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  contacts,
  siblings,
  notifications,
  onDelete,
  onEdit,
  deleteMode,
  editMode,
}) => {
  const contactMap = contacts.reduce(
    (acc, contact) => {
      acc[contact.studentId] = contact;
      return acc;
    },
    {} as { [key: string]: ContactInfo }
  );

  const siblingMap = siblings.reduce(
    (acc, sibling) => {
      acc[sibling.studentId] = sibling;
      return acc;
    },
    {} as { [key: string]: SiblingInfo }
  );

  const notificationMap = notifications.reduce(
    (acc, notification) => {
      acc[notification.studentId] = notification;
      return acc;
    },
    {} as { [key: string]: NotificationInfo }
  );

  return (
    <Table>
      <thead>
        <tr>
          <th>学年</th>
          <th>生徒名</th>
          <th>兄弟</th>
          <th>LINE登録</th>
          <th>かっぱぱっち配信</th>
          <th>かっぱぱっち送付</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.studentId}>
            <td>{student.grade}</td>
            <td>{student.studentName}</td>
            <td>{siblingMap[student.studentId]?.siblingNames.join(', ')}</td>
            <td>
              {contactMap[student.studentId]?.lineRegisteredBy
                ? '登録済み'
                : '未登録'}
            </td>
            <td>
              {notificationMap[student.studentId]?.notificationSent
                ? '購読中'
                : '未購読'}
            </td>
            <td>
              {notificationMap[student.studentId]?.notificationReceived
                ? '送付済み'
                : '未送付'}
            </td>
            <td>
              {deleteMode && (
                <button onClick={() => onDelete(student.studentId)}>
                  削除
                </button>
              )}
              {editMode && (
                <button onClick={() => onEdit(student)}>編集</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentTable;
