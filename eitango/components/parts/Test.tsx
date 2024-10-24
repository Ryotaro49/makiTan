"use client";
import * as React from "react";
import { zPhrase } from "@/app/(loggedin)/phrases/type";
import { Button, Box, Modal, Grid, Stack } from "@mui/material";
import TestResult from "./TestResult";

type Props = {
  initialState: zPhrase[];
};

const Test: React.FC<Props> = ({ initialState }) => {
  const [phrases, setPhrases] = React.useState(initialState);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showMeaning, setShowMeaning] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [rememberedCount, setRememberedCount] = React.useState(0);
  const [resultMessage, setResultMessage] = React.useState("");
  const percentage = (rememberedCount / phrases.length) * 100;

  // コンポーネントがマウントされたときにメッセージを設定
  React.useEffect(() => {
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
  }, [percentage]);

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
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setShowMeaning(false); // 次のフレーズを表示する際に意味を非表示にリセットする
    }
  };
  const handleBoxClick = () => {
    setShowMeaning((prev) => !prev); // 意味の表示状態をトグルする
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentIndex(0); // モーダルを閉じたら最初の単語から再開する
    setRememberedCount(0); // 覚えた単語のカウントをリセットする
    window.location.reload(); // ページをリフレッシュ
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
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
      gap={10}
    >
      <React.Fragment>
        <Box
          boxShadow={8}
          border={1}
          p={4}
          fontSize={30}
          width={300}
          onClick={handleBoxClick}
          sx={{ cursor: "pointer" }}
        >
          {showMeaning
            ? phrases[currentIndex].meaning
            : phrases[currentIndex].phrase}
        </Box>
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
              <Box fontSize={30} id="modal-title">
                テスト終了
              </Box>
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
