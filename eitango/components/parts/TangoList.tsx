"use client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import { zPhrase, zPhrases } from "../../app/(loggedin)/phrases/type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../Loading";

type Props = {
  initialState: zPhrase[];
};
const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    const data = await res.json();
    const phrases = zPhrases.parse(data);
    return phrases;
  });

const TangoList: React.FC<Props> = ({ initialState }) => {
  const { data } = useSWR("/api/phrases", fetcher, {
    suspense: true,
    fallbackData: initialState,
  });

  const router = useRouter();

  const handleEditButtonClick = (Phrase: zPhrase) => {
    router.push(`/phrases/${Phrase.tango_id}`);
    router.refresh();
  };

  const columns: GridColDef[] = [
    { field: "phrase", headerName: "単語", flex: 1 },
    { field: "meaning", headerName: "意味", flex: 1 },
    { field: "category", headerName: "品詞", flex: 1 },
    {
      field: "is_passed",
      headerName: "覚えた",
      flex: 1,
      renderCell: (params) => (
        <Typography>{params.value ? "〇" : ""}</Typography>
      ),
    },
    {
      field: "edit",
      headerName: "編集", // ヘッダーに表示されるテキスト
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditButtonClick(params.row as zPhrase)} // 編集ボタンがクリックされたときの処理
        >
          Edit
        </Button>
      ),
    },
  ];
  if (!data) {
    // Data is still loading
    return <Loading />;
  }

  return (
    <Box sx={{ height: "calc(100vh - 250px)", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection={false}
        getRowId={(row) => row.tango_id}
      />
    </Box>
  );
};

export default TangoList;
