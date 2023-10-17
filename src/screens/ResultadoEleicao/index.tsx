import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { GluestackUIProvider, Text } from "@gluestack-ui/themed";
export const ResultadoEleicao = () => {
  return (
    <GluestackUIProvider>
      <Header title="Resultado Eleição" />
      <BoxContainer alignItems={"flex-start"}>
        <Text fontSize="$md" fontWeight="$bold">
          Resultado da Eleição
        </Text>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
