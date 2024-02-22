"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { zPhrase } from "../type";

type Props = {
  item: zPhrase;
};

const Phrase: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const deletePhrase = useCallback(async () => {
    const res = await fetch(`/api/phrases/${item.tango_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("単語を削除しました。");
      router.push(`/phrases`);
      router.refresh();
    } else {
      alert("Note failed to delete");
    }
  }, [item.tango_id, router]);

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg relative p-5 gap-2.5">
      <h3 className="text-pink-500 text-lg md:text-xl font-semibold break-all">
        {item.phrase}
      </h3>
      <p className="text-gray-500 break-all">{item.meaning}</p>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-2.5">
        <button
          onClick={deletePhrase}
          className="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-pink-300 text-red-500 active:text-red-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Phrase;
