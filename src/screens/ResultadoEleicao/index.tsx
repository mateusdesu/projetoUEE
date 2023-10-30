import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { GluestackUIProvider, Text } from "@gluestack-ui/themed";
export const ResultadoEleicao = () => {
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"flex-start"}>
        <Header title="Resultado Eleição" />
        <Text fontSize="$md" fontWeight="$bold">
          Resultado da Eleição
        </Text>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
