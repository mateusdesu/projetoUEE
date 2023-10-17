import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import {Text, GluestackUIProvider } from "@gluestack-ui/themed";
export const MenuConfig = () => {
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"flex-start"}>
        <Text fontSize="$md" fontWeight="$bold">
          Menu Configurações
        </Text>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
