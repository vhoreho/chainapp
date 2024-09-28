import React, { useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { ProgressContext } from "@/context/progressContext";

interface ProgressProviderProps {
  children: React.ReactNode;
}

export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  const [isShow, setIsShow] = useState(false);

  const handleShow = () => {
    setIsShow(true);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <ProgressContext.Provider value={{ handleStop: handleClose, handleStart: handleShow }}>
      {isShow && (
        <Box sx={{ width: "100%", position: "fixed", top: 0, zIndex: 1200 }}>
          <LinearProgress />
        </Box>
      )}
      {children}
    </ProgressContext.Provider>
  );
};
