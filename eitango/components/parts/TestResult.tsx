"use client";
import { Button, Stack, TextField, Typography } from "@mui/material";
import useSWR, { mutate } from "swr";
import { zPhrase, zPhrases } from "../../app/(loggedin)/phrases/type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
  initialState: zPhrase[];
};
const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    const data = await res.json();
    const phrases = zPhrases.parse(data);
    return phrases;
  });

const TestResult: React.FC<Props> = ({ initialState }) => {
  const { data } = useSWR("/api/phrase", fetcher, {
    suspense: true,
    fallbackData: initialState,
  });

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

export default TestResult;
