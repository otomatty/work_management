import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const TOKEN_PATH = "token.json";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// 認証URLを生成
export const getAuthUrl = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
};

// トークンを取得して保存
export const getToken = async (code: string) => {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  // トークンを保存するロジックを追加
};

// 認証済みクライアントを取得
export const getAuthenticatedClient = (): OAuth2Client => {
  return oAuth2Client;
};

// スプレッドシートからデータを取得
export const getSheetData = async (
  spreadsheetId: string,
  range: string
): Promise<string[][] | null> => {
  const sheets = google.sheets({
    version: "v4",
    auth: getAuthenticatedClient(),
  });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values || null;
};
