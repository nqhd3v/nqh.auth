import { TFirebaseAuthType } from "@/types/firebase";

export const NQH_APP_MAPPING = {
  roommate: (type: TFirebaseAuthType, stateCode: string) =>
    `https://roomate.nqhuy.dev/auth?method=${type}&state=${stateCode}`,
};
