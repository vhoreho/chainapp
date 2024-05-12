import * as React from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import Fade from "@mui/material/Fade";
import Slide, { SlideProps } from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { SnackBarContext } from "@/contexts/snackBarContext";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

interface SnackBarProviderProps {
  children: React.ReactNode;
}

export const SnackBarProvider = ({ children }: SnackBarProviderProps) => {
  const [state, setState] = React.useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    message: "",
    severity: "success",
    Transition: Fade,
  });

  const handleShow = (message: string, severity: AlertColor) => {
    setState({
      open: true,
      message,
      severity,
      Transition: SlideTransition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <SnackBarContext.Provider value={{ handleClose, handleShow }}>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={state.message}
        key={state.Transition.name}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};
