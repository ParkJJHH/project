import React, { useState } from "react";
import Box from "@mui/material/Box";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Athentication() {
  // athView : true - signUp / false -signIn
  const [athView, setAthView] = useState<boolean>(true);

  return (
    <>
      <Box display="flex" height="100vh">
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        ></Box>
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {athView ? (
            <SignUp setAthView={setAthView} />
          ) : (
            <SignIn setAthView={setAthView} />
          )}
        </Box>
      </Box>
    </>
  );
}
