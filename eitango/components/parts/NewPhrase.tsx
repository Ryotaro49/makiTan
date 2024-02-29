'use client'
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { z } from "zod";
import { Button } from "@mui/material";

const NewPhrase: React.FC = () => {
  const router = useRouter();
  // 1. フォームの入力値を管理するためのstate
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // 2. 作成APIを呼び出す関数
  const createPhrase = useCallback(async () => {
    const res = await fetch(`/api/phrases`, {
      method: 'POST',
      body: JSON.stringify({ phrase, meaning }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (res.ok) {
      const id = z.number().parse(await res.json());
      alert('Prase created');
      // 詳細ページが実装されたら、詳細ページに遷移するようにする
      router.push(`/notes`);
      // 3. 現在のページのデータをサーバーから再取得する
      router.refresh();
    } else {
      alert('単語が追加できませんでした。');
    }
  }, [body, router, title]);

  return (<div>
    <h2>単語追加</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      createPhrase();
    }}>
      <div>
        <label>
          単語
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          意味
          <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
      </div>
      <div>
        <button type="submit">追加</button>
      </div>
    </form>
    <Link href="/phrases">
      <Button variant="outlined" size="large" >← back</Button>
    </Link>
  </div>);
}

export default NewPhrase;