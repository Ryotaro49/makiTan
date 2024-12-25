import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function Privacy() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          プライバシーポリシー
        </Typography>
        <Typography paragraph>
          以下に、当方が収集する情報の種類とその目的、ならびにその管理方法について説明します。
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          1. 個人情報の収集
        </Typography>
        <Typography paragraph>
          当サービスでは、次のような情報を収集することがあります：
        </Typography>
        <List>
          <ListItem>
            ・サービスの提供に必要な第三者サービスプロバイダー
          </ListItem>
          <ListItem>・法的要件を満たすための情報開示</ListItem>
        </List>
        <Typography variant="h6" component="h2" gutterBottom>
          2. 収集した情報の利用目的
        </Typography>
        <Typography paragraph>
          収集した個人情報は、以下の目的で利用されます：
        </Typography>
        <List>
          <ListItem>・サービスの最適化と改善</ListItem>
          <ListItem>・お客様からのサポートやお問い合わせへの対応</ListItem>
          <ListItem>・サービスの利用状況の分析</ListItem>
          <ListItem>・マーケティング情報の送信</ListItem>
        </List>

        <Typography variant="h6" component="h2" gutterBottom>
          3. 情報の共有
        </Typography>
        <Typography paragraph>
          当方は、法的義務がある場合を除き、個人情報を第三者に売却、譲渡、または貸与することはありません。ただし、次の場合に情報を共有することがあります：
        </Typography>
        <List>
          <ListItem>
            ・サービスの提供に必要な第三者サービスプロバイダー
          </ListItem>
          <ListItem>・法的要件を満たすための情報開示</ListItem>
        </List>

        <Typography variant="h6" component="h2" gutterBottom>
          4. クッキーの使用
        </Typography>
        <Typography paragraph>
          当方は、サービスの利用を改善するためにクッキーを使用することがあります。クッキーの管理は、ブラウザの設定で制御することができます。
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. セキュリティ
        </Typography>
        <Typography paragraph>
          当方は、お客様の個人情報を保護するために適切なセキュリティ対策を講じています。ただし、インターネットを通じた情報の送信は完全には安全ではないことをご了承ください。
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          6. 個人情報の管理
        </Typography>
        <Typography paragraph>
          お客様は、自身の個人情報を確認、修正、または削除する権利を有します。必要な場合は、問い合わせフォームを利用してご連絡いただくか、直接
          <a href="mailto:ryotaro200049@gmail.com">ryotaro200049@gmail.com</a>
          までメールでご連絡ください。
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          7. 改訂
        </Typography>
        <Typography paragraph>
          当方は、プライバシーポリシーを随時変更する権利を留保しています。変更内容は、サービス内に掲載されます。
        </Typography>

        <Typography paragraph>
          以上の内容にご同意いただいた上で、当サービスをご利用いただけます。プライバシーポリシーに関するご質問や懸念がある場合は、
          <a href="mailto:ryotaro200049@gmail.com">ryotaro200049@gmail.com</a>
          までご連絡ください。
        </Typography>
      </Box>
    </Container>
  );
}
