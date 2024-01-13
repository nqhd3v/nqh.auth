import { TNqhApp } from ".";

export type TFirebaseAuthType = "zalo";

export type TFirebaseAuthItem = {
  verifyCode: string;
  challengeCode: string;
  ts: number;
  authCode: string | null;
  app: TNqhApp;
};
