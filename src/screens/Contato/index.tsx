import { Box, GluestackUIProvider } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { Image } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React from "react";

export const Contato = ({ navigation }: { navigation: NavigationProp<any> }) =>
{
    return (
      <GluestackUIProvider>
        <Header title="Contato"></Header>
        <BoxContainer alignItems={"center"}>
          
          <Box flexDirection="row" justifyContent="flex-start" alignItems="center" w={"95%"}>
            <FontAwesome name="chevron-left" size={28} color="black" onPress={() => navigation.navigate("Home")} />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
};