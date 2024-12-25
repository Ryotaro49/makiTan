"use client";
import * as React from "react";
import { zPhrase } from "@/app/(loggedin)/phrases/type";
import {
  Button,
  Box,
  Modal,
  Grid,
  Stack,
  CardContent,
  Typography,
  Card,
} from "@mui/material";
import TestResult from "./TestResult";
import { useRouter } from "next/navigation";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

type Props = {
  initialState: zPhrase[];
};

const Test: React.FC<Props> = ({ initialState }) => {
  const initialWordSpoken = React.useRef(false);
  const [phrases, setPhrases] = React.useState(initialState);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showMeaning, setShowMeaning] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [rememberedCount, setRememberedCount] = React.useState(0);
  const [resultMessage, setResultMessage] = React.useState("");
  const percentage = (rememberedCount / phrases.length) * 100;
  const router = useRouter();

  // コンポーネントがマウントされたときにメッセージを設定
  React.useEffect(() => {
    if (phrases.length > 0 && !initialWordSpoken.current) {
      handleSpeak(phrases[0].phrase);
      initialWordSpoken.current = true;
    }
    // メッセージを設定する関数
    const setMessageBasedOnPercentage = () => {
      if (percentage >= 80) {
        setResultMessage("Excellent! すばらしい成績です！");
      } else if (percentage >= 60) {
        setResultMessage("Good job! よくできました！");
      } else {
        setResultMessage("Keep going! 頑張ってください！");
      }
    };

    setMessageBasedOnPercentage();
  }, [percentage, phrases]);

  const handleRememberedClick = async (value: boolean) => {
    setPhrases((prevPhrases) => {
      prevPhrases[currentIndex] = {
        ...prevPhrases[currentIndex],
        is_passed: value,
      };
      return [...prevPhrases];
    });
    const res = await fetch(`/api/phrases/${phrases[currentIndex].tango_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: phrases[currentIndex].user_id,
        phrase: phrases[currentIndex].phrase,
        meaning: phrases[currentIndex].meaning,
        category: phrases[currentIndex].category,
        is_passed: value,
      }),
    });

    value ? setRememberedCount((prev) => prev + 1) : null;
    if (currentIndex === phrases.length - 1) {
      setOpenModal(true); // 最後の単語が表示されたらモーダルを開く
    } else {
      handleSpeak(phrases[currentIndex + 1].phrase); // 次の単語を読み上げる
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setShowMeaning(false); // 次のフレーズを表示する際に意味を非表示にリセットする
    }
  };
  const handleBoxClick = () => {
    setShowMeaning((prev) => !prev); // 意味の表示状態をトグルする
  };

  const handleCloseModal = () => {
    router.push("/test/config");
  };

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // 英語を設定
      window.speechSynthesis.speak(utterance);
    } else {
      alert("このブラウザは音声読み上げ機能に対応していません。");
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      container
      direction="column"
      gap={2}
      sx={{ minHeight: "50vh" }} // 画面全体の高さを指定
    >
      <React.Fragment>
        <Box
          component={Card}
          border={1}
          p={4}
          fontSize={30}
          width={300}
          onClick={handleBoxClick}
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {showMeaning
                ? phrases[currentIndex].meaning
                : phrases[currentIndex].phrase}
            </Typography>
          </CardContent>
        </Box>
        <Button
          onClick={() => handleSpeak(phrases[currentIndex].phrase)} // 音声読み上げ処理
          startIcon={<VolumeUpIcon />} // 音声アイコンを追加
          size="large"
          sx={{ width: 300, height: 50 }}
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRememberedClick(true)}
            sx={{ mr: 10 }}
            size="large"
          >
            覚えた
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRememberedClick(false)}
            size="large"
          >
            覚えてない
          </Button>
        </Box>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={2}>
              <Box>{resultMessage}</Box>
              <Box id="modal-description">
                {phrases.length}単語中{rememberedCount}単語覚えました！
              </Box>
              <TestResult initialState={phrases}></TestResult>
              <Button onClick={handleCloseModal}>閉じる</Button>
            </Stack>
          </Box>
        </Modal>
      </React.Fragment>
    </Grid>
  );
};
export default Test;
