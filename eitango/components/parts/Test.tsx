"use client";
import * as React from "react";
import { zPhrase } from "@/app/phrases/type";
import { Button, Box, Modal, Grid } from "@mui/material";

type Props = {
  initialState: zPhrase[];
};

const Test: React.FC<Props> = ({ initialState }) => {
  const [phrases, setPhrases] = React.useState(initialState);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showMeaning, setShowMeaning] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [rememberedCount, setRememberedCount] = React.useState(0);

  const handleRememberedClick = async (value: Boolean) => {
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
            <h2 id="modal-title">テスト終了</h2>
            <p id="modal-description">{rememberedCount}単語覚えました。</p>
            <Button onClick={handleCloseModal}>閉じる</Button>
          </Box>
        </Modal>
      </React.Fragment>
    </Grid>
  );
};
export default Test;
