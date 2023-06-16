import axios from "axios";
import React, { useEffect, useState } from "react";
import Athentication from "../../Athentication";
import Navigation from "../../Navigation";
import { useUserStore } from "../../stores";
import { useCookies } from "react-cookie";
import { error } from "console";

export default function MainLayout() {
  const [boardResponse, setBoardResponse] = useState<string>("");
  const [cookies] = useCookies();
  const { user } = useUserStore();

  const getBoard = async (token: string) => {
    const requestOption = {
      headers: {
        Athorization: `Bearer ${token}`,
      },
    };
    await axios
      .get("http://localhost:4000/api/board/", requestOption)
      .then((response) => {
        setBoardResponse(response.data);
      })
      .catch((error) => "");
  };

  useEffect(() => {
    const tokcen = cookies.token;
    if (token) getBoard(token);
    else setBoardResponse("");
  }, [cookies.token]);

  return (
    <>
      <Navigation />
      {user ? <BoardMain /> : <Athentication />}
    </>
  );
}
