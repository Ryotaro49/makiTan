"use client";
import { Box, Button, Typography } from "@mui/material";
import useSWR from "swr";
import { zPhrase, zPhrases } from "../../app/(loggedin)/phrases/type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import EditIcon from "@mui/icons-material/Edit";

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
    {
      field: "category",
      headerName: "品詞",
      flex: 1,
      renderCell: (params) => {
        const categoryLabel: { [key: string]: string } = {
          noun: "名詞",
          pronoun: "代名詞",
          verb: "動詞",
          adjective: "形容詞",
          adverb: "副詞",
          auxiliary: "助動詞",
          article: "冠詞",
          preposition: "前置詞",
          conjunction: "接続詞",
          interjection: "間投詞",
        };

        return (
          <Typography>{categoryLabel[params.value] || params.value}</Typography>
        );
      },
    },
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
          onClick={() => handleEditButtonClick(params.row as zPhrase)} // 編集ボタンがクリックされたときの処理
          startIcon={<EditIcon />} // アイコンを追加
        >
          編集
        </Button>
      ),
    },
  ];
  if (!data) {
    // Data is still loading
    return <Loading />;
  }

  return (
    <Box
      sx={{
        height: "calc(100vh - 250px)",
        overflow: "auto",
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection={false}
        getRowId={(row) => row.tango_id}
        sx={{ minWidth: "600px" }}
      />
    </Box>
  );
};

export default TangoList;
