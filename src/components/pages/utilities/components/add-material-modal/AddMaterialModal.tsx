import React, { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { invalidateMaterials, useCreateMaterial } from "@/api/material";
import { ProfileResM } from "@/api/profile/type";
import { MaterialCategory } from "@/constants/material";
import { useSnackBarContext } from "@/hooks/context";
import { UserRole } from "@/types";
import { IFormInput } from "./types";

type Props = {
  onClose: () => void;
  profile: ProfileResM;
};

export const AddMaterialModal: FunctionComponent<Props> = ({ profile, onClose }) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { mutate, isPending } = useCreateMaterial();
  const { handleShow } = useSnackBarContext();

  const handleSubmitTransaction: SubmitHandler<IFormInput> = async (data) => {
    await mutate(
      { ...data, category: MaterialCategory.Blockchain },
      {
        onSuccess: async () => {
          await invalidateMaterials();
          onClose();
        },
        onError: (error) => {
          handleShow(error.message, "error");
        },
      },
    );
  };

  return (
    <ModalContainer>
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Добавить новый материал
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitTransaction)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            marginTop: 1.5,
          }}
        >
          <TextField
            label="Введите заголовок"
            fullWidth
            variant="outlined"
            size="small"
            maxRows={4}
            {...register("title", { required: true })}
          />
        </Box>
        <TextField
          size="small"
          sx={{ marginTop: 1.5 }}
          label="Вставьте ссылку на материал"
          fullWidth
          maxRows={4}
          {...register("link", { required: true })}
        />
        <TextField
          size="small"
          sx={{ marginTop: 1.5 }}
          label="Источник"
          fullWidth
          maxRows={4}
          {...register("source", { required: true })}
        />
        <TextField
          size="small"
          sx={{ marginTop: 1.5 }}
          label="Введите краткое описание"
          multiline
          fullWidth
          maxRows={8}
          {...register("summary", { required: true })}
        />
        <ButtonGroup>
          <Button variant="contained" type="submit">
            {isPending ? (
              <CircularProgress
                sx={{ width: "20px !important", height: "20px !important" }}
                color="inherit"
              />
            ) : profile.role === UserRole.ADMINISTRATOR ? (
              <>Добавить материал</>
            ) : (
              <>Отправить на модерацию</>
            )}
          </Button>
          <Button variant="outlined" onClick={onClose} style={{ marginLeft: 10 }}>
            Отмена
          </Button>
        </ButtonGroup>
      </form>
    </ModalContainer>
  );
};

const ModalContainer = styled(Box)`
  position: relative;
  max-width: 90vw;

  @media (min-width: 600px) {
    width: 400px;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-top: 16px;
`;
