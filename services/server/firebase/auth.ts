import { TFirebaseAuthItem, TFirebaseAuthType } from "@/types/firebase";
import { v4 as uuid } from "uuid";
import { firestore } from ".";

export const createAuthItem = async (
  type: TFirebaseAuthType,
  data: Omit<TFirebaseAuthItem, "authCode" | "ts">
): Promise<string> => {
  const id = uuid();
  try {
    await firestore(`auth_${type}`)
      .doc(id)
      .set({ ...data, authCode: null, ts: Date.now() });
  } catch (err: any) {
    console.error(err);
    throw new Error("Error when create new auth item for " + type);
  }

  return id;
};

export const getAuthItem = async (
  type: TFirebaseAuthType,
  id: string
): Promise<TFirebaseAuthItem | null> => {
  try {
    const res = await firestore(`auth_${type}`).doc(id).get();
    if (!res.exists) return null;

    return res.data() as TFirebaseAuthItem;
  } catch (err: any) {
    console.error(err);
    throw new Error("Error when get an auth item by ID#" + id);
  }
};

export const updateAuthItem = async (
  type: TFirebaseAuthType,
  id: string,
  authCode: string
) => {
  const current = await getAuthItem(type, id);
  if (!current) throw new Error("Auth Item not existed!");
  try {
    await firestore(`auth_${type}`).doc(id).set({ authCode }, { merge: true });
  } catch (err: any) {
    console.error(err);
    throw new Error("Error when update an auth item by ID#" + id);
  }
};
