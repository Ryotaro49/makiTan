"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function Terms() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          利用規約
        </Typography>
        <Typography paragraph>
          以下に、当サービスの利用に関する重要な事項を説明します。
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          1. サービスの利用
        </Typography>
        <Typography paragraph>
          サービスは、利用者が自己責任で使用することを前提とします。当方は、利用者によるサービスの使用に関していかなる保証も行いません。
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. 禁止事項
        </Typography>
        <Typography paragraph>利用者は、以下の行為を禁止します：</Typography>
        <List>
          <ListItem>・法令または公序良俗に反する行為</ListItem>
          <ListItem>・当サービスの運営を妨害する行為</ListItem>
          <ListItem>・他人の権利を侵害する行為</ListItem>
        </List>

        <Typography variant="h6" component="h2" gutterBottom>
          3. サービスの変更
        </Typography>
        <Typography paragraph>
          当方は、予告なくサービスの内容を変更する権利を留保します。利用者は、サービスの変更に同意したものとみなされます。
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          4. 免責事項
        </Typography>
        <Typography paragraph>
          当方は、利用者によるサービスの使用に関していかなる損害も責任を負いません。また、当方の過失による場合を除き、提供する情報の正確性や適時性について保証いたしません。
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. 利用規約の変更
        </Typography>
        <Typography paragraph>
          当方は、利用規約を随時変更する権利を留保します。変更された利用規約は、サービス内に掲載されます。
        </Typography>

        <Typography paragraph>
          以上の内容にご同意いただいた上で、当サービスをご利用いただけます。利用規約に関するご質問や懸念がある場合は、
          <a href="mailto:ryotaro200049@gmail.com">ryotaro200049@gmail.com</a>
          までご連絡ください。
        </Typography>
      </Box>
    </Container>
  );
}
