import { apiUrl } from "@/constants/api";
import "server-only";
import { zPhrase } from "../type";

export const getPhrase = async (tango_id: number) => {
  const res = await fetch(`${apiUrl}/phrases/${tango_id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const tango = zPhrase.parse(data);
  return tango;
};
