import React, { useState } from "react";
import { ContentCopy } from "@mui/icons-material";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProfileQuery } from "@/api/profile";
import { KeysResM, useGenerateKeysMutation } from "@/api/users";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { UserRole } from "@/types";
import { EmulatorContent } from "./components/emulator-content/EmulatorContent";

export const Emulator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<KeysResM | null>(null);
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const generateKeysMutation = useGenerateKeysMutation();
  const queryClient = useQueryClient();

  const handleGenerate = async () => {
    try {
      const response = await generateKeysMutation.mutateAsync();
      setGeneratedData(response);
    } catch (error) {}
  };

  const handleGoToCreatingBlocks = () => {
    queryClient.invalidateQueries({ queryKey: [USE_QUERY_KEYS.PROFILE.QUERY.GET] });
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (isError || !profile) {
    return <Container>Error: Unable to fetch profile data</Container>;
  }

  if (profile.role === UserRole.BLOCK_CREATOR && !profile.publicKey) {
    return (
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="GrayText" gutterBottom textAlign="center">
          Для использования эмулятора необходимо сгенерировать ключ и адрес кошелька. Это необходимо
          для создания цифровой подписи транзакций в блокчейне. Ключ и адрес кошелька используются
          для идентификации пользователя в сети блокчейн и обеспечивают безопасность его транзакций.
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setIsGenerating(true);
            handleGenerate();
          }}
        >
          Генерировать ключ и адрес
        </Button>

        {isGenerating && (
          <Container>
            <Typography variant="h6" gutterBottom>
              Ключ и адрес кошелька успешно сгенерированы:
            </Typography>

            <Text>
              <Typography variant="subtitle1">Адрес кошелька:</Typography>
              <Typography variant="body1">{generatedData?.wallet}</Typography>
            </Text>

            <Text>
              <Typography variant="subtitle1">Приватный ключ:</Typography>
              <Typography variant="body1">{generatedData?.privateKey}</Typography>

              <ContentCopy
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(generatedData?.privateKey!);
                  alert("Приватный ключ скопирован!");
                }}
              />
            </Text>

            <Typography variant="body2" color={"error"} sx={{ marginTop: 2 }}>
              Сохраните приватный ключ в безопасном месте. Он используется для аутентификации и
              подписи ваших транзакций.
            </Typography>

            <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleGoToCreatingBlocks}>
              Перейти к созданию транзакций
            </Button>
          </Container>
        )}
      </Container>
    );
  }

  return <EmulatorContent profile={profile} />;
};

const Text = styled(Box)`
  display: flex;
  gap: 8px;
`;
