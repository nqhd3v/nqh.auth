import { requestSearch } from "@/helper/request-search";
import { isChallengeCodeOK } from "@/helper/zalo-code";
import { getAuthItem, updateAuthItem } from "@/services/server/firebase/auth";
import { NQH_APP_MAPPING } from "@/utils/constants";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const queryParams = requestSearch(request.url);
  const code = queryParams.get("code") as string;
  const state = queryParams.get("state") as string;
  const codeChallenge = queryParams.get("code_challenge") as string;

  if (!code || !state || !codeChallenge) {
    return Response.json({
      message: 'Missed "code", "state" or "code_challenge"!',
    });
  }

  // verify data with state
  const data = await getAuthItem("zalo", state);
  if (!data) return Response.json({ message: "Auth-item is not existed!" });

  // verify with challenge code
  if (!isChallengeCodeOK(data.verifyCode, codeChallenge.replace(/ /g, "+"))) {
    return Response.json({ message: "Invalid challenge code" });
  }

  // update auth code
  await updateAuthItem("zalo", state, code);

  redirect(NQH_APP_MAPPING[data.app]("zalo", state));
}
