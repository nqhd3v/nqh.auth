import * as crypto from "node:crypto";
import * as randomStr from "randomstring";

const createVerifyCode = () => {
  return randomStr.generate({
    length: 43,
    charset: "alphanumeric",
  });
};
const createChallengeCode = (verifyCode: string): string => {
  let asciiVerifyCode = "";

  for (let i = 0; i < verifyCode.length; i++) {
    asciiVerifyCode += verifyCode.charCodeAt(i);
  }

  const hash = crypto.createHash("sha256").update(asciiVerifyCode).digest();

  // Base64 encode the hash output (no padding)
  return Buffer.from(hash).toString("base64").replace(/=+$/, "");
};

export const generateCodes = (): [string, string] => {
  const verify = createVerifyCode();
  const challenge = createChallengeCode(verify);

  return [verify, challenge];
};
export const isChallengeCodeOK = (
  verifyCode: string,
  challengeCode: string
): boolean => {
  const rightChallenge = createChallengeCode(verifyCode);

  return challengeCode === rightChallenge;
};
