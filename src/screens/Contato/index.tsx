import { Box, GluestackUIProvider } from "@gluestack-ui/themed";
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
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" w={"95%"}>
          <FontAwesome name="chevron-left" size={28} color="black" onPress={() => navigation.navigate("MenuConfig")}/>
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};