# Firestore Database Structure

## 1. Database Overview

- **Database Name**: WorkRecordAppDB
- **Type**: NoSQL Database (Firestore)

## 2. Collections List

- **teachers**: 講師ごとのデータを保存するところ

## 3. Collection Details

### teachers Collection

| Field Name  | Data Type | Description                |
| ----------- | --------- | -------------------------- |
| id          | STRING    | 講師ID                     |
| teacherName | STRING    | 講師名                     |
| email       | STRING    | User's email address       |
| password    | STRING    | Password                   |
| created_at  | TIMESTAMP | Account creation timestamp |

### schedules Sub-Collection

(teacersコレクションの中に存在するサブコレクション)
| Field Name | Data Type | Description |
|-------------|------------|-------------------------------------|
| id | STRING | Comment ID |
| user_id | STRING | User ID of the comment author |
| content | STRING | Comment content |
| created_at | TIMESTAMP | Comment creation timestamp |

## 4. Relations

- **Users Collection and Posts Collection**: Each document in the Posts collection references a user in the Users collection via the `user_id` field.
- **Posts Collection and Comments Sub-Collection**: Each Post document contains a Comments sub-collection holding comments related to that post.
- **Users Collection and Comments Sub-Collection**: Each document in the Comments sub-collection references a user in the Users collection via the `user_id` field.
