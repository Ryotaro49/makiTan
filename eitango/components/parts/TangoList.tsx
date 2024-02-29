"use client";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
import { zPhrase, zPhrases } from "../../app/phrases/type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

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
  const { data } = useSWR("/api/phrase", fetcher, {
    suspense: true,
    fallbackData: initialState,
  });
  const router = useRouter();

  const handleEditButtonClick = (Phrase: zPhrase) => {
    router.push(`/phrases/${Phrase.tango_id}`);
  };

  const columns: GridColDef[] = [
    { field: "tango_id", headerName: "ID", flex: 1 },
    { field: "phrase", headerName: "Phrase", flex: 1 },
    { field: "meaning", headerName: "Meaning", flex: 1 },
    {
      field: "edit",
      headerName: "Edit", // ヘッダーに表示されるテキスト
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
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection={false}
        getRowId={(row) => row.tango_id}
      />
    </div>
  );
};

export default TangoList;
