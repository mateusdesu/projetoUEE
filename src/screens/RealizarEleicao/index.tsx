import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import {Text, GluestackUIProvider } from "@gluestack-ui/themed";
export const RealizarEleicao = () => {
  return (
    <GluestackUIProvider>
      <Header title="Realizar Eleição" />
      <BoxContainer alignItems={"flex-start"}>
        <Text fontSize="$md" fontWeight="$bold">
          Escolher eleição *
        </Text>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
