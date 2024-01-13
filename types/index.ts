import { TFirebaseAuthType } from "./firebase";

export type TNqhAppMapping = Record<
  "roommate",
  (type: TFirebaseAuthType, ...params: string[]) => string
>;
export type TNqhApp = keyof TNqhAppMapping;
