import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import { useUserStore } from "../../../stores";
import { signInApi } from "../../../apis";

interface Props {
  setAthView: (athenView: boolean) => void;
}

export default function SignIn(props: Props) {
  const [userEmail, setEmail] = useState<string>("");
  const [userPassword, setPassword] = useState<string>("");
  const [cookies, setCookies] = useCookies();

  const { user, setUser } = useUserStore();

  const { setAthView } = props;

  const signUpHandler = async () => {
    if (userEmail.length === 0 || userPassword.length === 0) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const data = {
      userEmail,
      userPassword,
    };

    const signInResponse = await signInApi(data);

    if (!signInResponse) {
      alert("로그인에 실패했습니다.");
      return;
    }
    if (!signInResponse.result) {
      alert("로그인에 실패했습니다.");
      return;
    }
    const { toekn, exprTime, user } = signInResponse.data;
    const expires = new Date();
    expires.setMilliseconds(expires.getMilliseconds() + exprTime);

    setCookies("token", token, { expires });
    setUser(user);

    axios
      .post("http://localhost:4000/api/auth/signIn", data)
      .then((response) => {
        const responseData = response.data;
      })
      .catch((error) => {
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: "50vw", padding: 5 }}>
      <Box>
        <Typography variant="h3">로그인</Typography>
      </Box>
      <Box height={"50vh"}>
        <TextField
          fullWidth
          label="이메일"
          type="email"
          vatiant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="비밀번호"
          type="password"
          vatiant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Box component="div">
        <Button onClick={() => signUpHandler()} variant="contained">
          로그인
        </Button>
      </Box>
      <Box component="div" diplay="flex" mt={2}>
        <Typography>신규 사용자이신가요?</Typography>
        <Typography fontWeight={800} ml={1} onClick={() => setAthView(true)}>
          회원가입
        </Typography>
      </Box>
    </Card>
  );
}
