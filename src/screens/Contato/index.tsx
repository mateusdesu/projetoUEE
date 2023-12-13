import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { Image } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React from "react";

export const Contato = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"center"}>
        <Header title="Contato"></Header>
        <Box bgColor="white" p={"$2"}>
          <Text>
            Adriana da Silva Lisboa Tomaz E-mail: atomaz@unicarioca.edu.br 
            Telefone: 21 97056-2595 
          </Text>
          <Text>
            Augusto Schwager de Carvalho E-mail: augustoschwager@yahoo.com.br 
            Telefone: 21 98208-5344 
          </Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          w={"95%"}
        >
          <FontAwesome
            name="chevron-left"
            size={28}
            color="black"
            onPress={() => navigation.navigate("MenuConfig")}
          />
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
