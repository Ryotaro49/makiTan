"use client";
import * as React from "react";
import { zPhrase } from "@/app/phrases/type";
import { Button, Box, Modal, Grid } from "@mui/material";
import TestConfigModal from "./TestConfigModal";

type Props = {
  initialState: zPhrase[];
};

const Test: React.FC<Props> = ({ initialState }) => {
  const [phrases, setPhrases] = React.useState(initialState);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showMeaning, setShowMeaning] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [rememberedCount, setRememberedCount] = React.useState(0);

  const handleTestConfigSubmit = async (
    selectedValue: string,
    isPassed: boolean
  ) => {
    // TestConfigModal からの値を受け取る
    alert(selectedValue);
    alert(isPassed);
  };

  const handleRememberedClick = (value: Boolean) => {
    if (value) {
      setRememberedCount((prevCount) => prevCount + 1);
    }
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
      <TestConfigModal onSubmit={handleTestConfigSubmit} />
      <Box
        boxShadow={8}
        border={1}
        p={4}
        fontSize={30}
        width={300}
        onClick={handleBoxClick}
        sx={{ cursor: "pointer" }} // カーソルをポインターに変更してクリック可能であることを示す
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
    </Grid>
  );
};

export default Test;
