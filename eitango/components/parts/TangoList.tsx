"use client";

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import EditIcon from "@mui/icons-material/Edit";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { zPhrase, zPhrases } from "../../app/(loggedin)/phrases/type";

type Props = {
  initialState: zPhrase[];
};

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    const data = await res.json();
    return data as zPhrases;
  });

const TangoList: React.FC<Props> = ({ initialState }) => {
  const { data } = useSWR<zPhrases>("/api/phrases", fetcher, {
    suspense: true,
    fallbackData: initialState,
  });

  const router = useRouter();

  const handleEditButtonClick = (phrase: zPhrase) => {
    router.push(`/phrases/${phrase.tango_id}`);
    router.refresh();
  };

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("このブラウザは音声読み上げ機能に対応していません。");
    }
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <Box sx={{ height: "calc(100vh - 130px)", overflow: "auto", padding: 2 }}>
      <Grid container spacing={2}>
        {data.map((phrase) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={phrase.tango_id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {phrase.phrase}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {phrase.meaning}
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => handleSpeak(phrase.phrase)}
                    startIcon={<VolumeUpIcon />}
                  >
                    読み上げ
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleEditButtonClick(phrase)}
                    startIcon={<EditIcon />}
                  >
                    編集
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TangoList;
