import { Box, Text, GluestackUIProvider } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { Image } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React from "react";

export const Contato = ({navigation,}: {navigation: NavigationProp<any>;}) =>
{
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"center"}>
        <Header title="Contato"></Header>
      <Box flexDirection="row" justifyContent="space-between">
        <Box>
          <Text fontWeight="$bold">Adriana da Silva Lisboa Tomaz</Text>
          <Box flexDirection="column">
            <FontAwesome name="envelope" size={28} color={"black"}/>
            <Text>atomaz@unicarioca.edu.br</Text>
            <FontAwesome name="phone" size={28} color={"black"}/>
            <Text>(21) 97056-2595</Text>
          </Box>
        </Box>

        <Box>
          <Text fontWeight="$bold">Augusto Schwager de Carvalho</Text>
          <Box>
            <FontAwesome name="envelope" size={28} color={"black"}/>
            <Text>augustoschwager@yahoo.com.br</Text>
            <FontAwesome name="phone" size={28} color={"black"}/>
            <Text>(21) 98208-5344</Text>
          </Box>
        </Box>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" w={"95%"}>
          <FontAwesome name="chevron-left" size={28} color="black" onPress={() => navigation.navigate("MenuConfig")}/>
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};