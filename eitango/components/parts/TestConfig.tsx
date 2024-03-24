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
import { useRouter } from "next/navigation";
import Link from "next/link";

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

const TestConfig: React.FC = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("10");
  const [checked, setChecked] = React.useState(false);
  const router = useRouter();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          テスト設定
        </Typography>
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
        <Link href={`/test?checked=${checked}&selectedValue=${selectedValue}`}>
          <Button variant="contained" color="primary">
            テスト開始
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default TestConfig;
