import { FunctionComponent, ReactNode, useState } from "react";
import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import { Iconify } from "@/components/common/design-system/iconify/Iconify";
import { ModalContext } from "@/contexts/modalContext";

type Props = {
  children: ReactNode;
};

export const ModalProvider: FunctionComponent<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "96%",
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 24,
              p: 2.5,
            }}
          >
            {modalContent}
            <Button
              onClick={closeModal}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                padding: 0,
                minWidth: "fit-content",
              }}
            >
              <Iconify icon="mdi:close" />
            </Button>
          </Box>
        </Fade>
      </Modal>
    </ModalContext.Provider>
  );
};
