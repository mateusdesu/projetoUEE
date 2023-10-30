import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { Text, GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { DSelect } from "../../components/DSelect";
import { useState } from "react";
import { DInput } from "../../components/DInput";
export const RealizarEleicao = () => {
  const [eleicao, setEleicao] = useState([
    {
      label: "Turma 901",
      value: "1",
      cargos: ["Presidente", "Professor Representante"],
    },
    {
      label: "Grêmio sala 204",
      value: "2",
      cargos: ["Representante", "Conselheiro"],
    },
  ]);
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"flex-start"}>
        <Header title="Realizar Eleição" />
        <Text fontSize="$md" fontWeight="$bold">
          Escolher eleição *
        </Text>
        <DSelect items={eleicao} />
        <Text>Senha</Text>
        <DInput type={"password"} placeholder="Senha" showIcon={true} />
      </BoxContainer>
    </GluestackUIProvider>
  );
};
