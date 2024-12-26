import { apiUrl } from "@/constants/api";
import { zPhrases } from "../phrases/type";
import { cookies } from "next/headers";

export const getPhrases = async (
  unPassedOnlyChecked: string,
  questionsCount: string,
  category: string,
) => {
  const res = await fetch(`${apiUrl}/phrases`, {
    cache: "no-store",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
      unPassedOnlyChecked,
      questionsCount,
      category,
    },
  });
  const data = await res.json();
  return zPhrases.parse(data);
};
