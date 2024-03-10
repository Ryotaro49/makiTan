"use client";
import * as React from "react";
import {
  Button,
  Typography,
  Radio,
  Box,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type TestProps = {
  onSubmit: (selectedValue: string, checked: boolean) => void;
};

const TestConfig: React.FC<TestProps> = ({ onSubmit }) => {
  const [selectedValue, setSelectedValue] = React.useState<string>("");
  const [checked, setChecked] = React.useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 選択されたラジオボタンの値とチェックボックスの状態を返す
    onSubmit(selectedValue, checked);
  };

  return (
    <div>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          テスト設定
        </Typography>
        <form onSubmit={handleSubmit}>
          <RadioGroup value={selectedValue} onChange={handleRadioChange} row>
            <FormControlLabel value="10" control={<Radio />} label="10問" />
            <FormControlLabel value="20" control={<Radio />} label="20問" />
            <FormControlLabel value="30" control={<Radio />} label="30問" />
          </RadioGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  value="True"
                />
              }
              label="覚えていないものだけ"
            />
          </FormGroup>
          <Button type="submit" variant="contained" color="primary">
            テスト開始
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default TestConfig;
