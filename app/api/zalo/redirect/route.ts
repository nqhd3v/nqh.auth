import { requestSearch } from "@/helper/request-search";
import { generateCodes } from "@/helper/zalo-code";
import { createAuthItem } from "@/services/server/firebase/auth";
import { TNqhApp } from "@/types";
import { NQH_APP_MAPPING } from "@/utils/constants";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const queryParams = requestSearch(request.url);
  const app = queryParams.get("app") as TNqhApp;

  if (!app || !NQH_APP_MAPPING[app]) {
    return Response.json({ message: "App is INVALID!" });
  }

  const [verifyCode, challengeCode] = generateCodes();
  const state = await createAuthItem("zalo", {
    verifyCode,
    challengeCode,
    app,
  });

  redirect(
    `https://oauth.zaloapp.com/v4/permission?app_id=${process.env.ZALO_APP_ID}&redirect_uri=${process.env.ZALO_REDIRECT_URL}&code_challenge=${challengeCode}&state=${state}`
  );
}
