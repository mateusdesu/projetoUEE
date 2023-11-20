import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { DInput } from "../../components/DInput";
import { Image } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { DSelect } from "../../components/DSelect";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import React from "react";

export const ExcluirCadastro = ({ navigation }: { navigation: NavigationProp<any>; }) =>
{
    const [senhaMaster, setSenhaMaster] = useState<string>("");
  return (
    <GluestackUIProvider>
      <Header title="Senha Master"></Header>
      <BoxContainer alignItems={"flex-start"}>
      <Text fontSize="$md" fontWeight="$bold">Qual tipo de dado deseja excluir?*</Text>
        <DSelect items={eleicao.map((option) => ({label: option.label, value: option.value,}))} onChangeValue={handleElectionChange} zIndex={10000}/>
        <Box flexDirection="row" justifyContent="flex-start" alignItems="center" w={"95%"}>
            <FontAwesome name="chevron-left" size={28} color="black" onPress={() => navigation.navigate("MenuConfig")}/>
            <FontAwesome name="check" size={32} color="green"/>
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};