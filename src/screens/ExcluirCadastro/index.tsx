import { Box, GluestackUIProvider, HStack, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { DInput } from "../../components/DInput";
import { Image } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { DSelect } from "../../components/DSelect";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import React from "react";

export const ExcluirCadastro = ({navigation,}: {navigation: NavigationProp<any>;}) =>
{
  const [exclusao, setExclusao] = useState([{ label: "Eleições", value: "1" },{ label: "Candidatos", value: "2" },]);

  return(
    <GluestackUIProvider>
      <BoxContainer alignItems={"flex-start"}>
        <Header title="Excluir Cadastro"></Header>
        <Text fontSize="$md" fontWeight="$bold">Qual tipo de dado deseja excluir?*</Text>
        <DSelect items={exclusao.map((option) => ({label: option.label, value: option.value,}))}/>
        
        <Box backgroundColor="white" w={"100%"} mt={"$1"} flexDirection="column" borderColor="$emerald900" borderWidth={"$1"}>
          <HStack bgColor="$emerald400">
            <Box w={"50%"} alignItems="center">
              <Text fontSize={"$xl"} color="white" fontWeight="bold">Nome da Eleição</Text>
            </Box>
            <Box w={"50%"} alignItems="center" borderLeftWidth={"$1"}>
              <Text fontSize={"$xl"} color="white" fontWeight="bold">Nome do Candidato</Text>
            </Box>
          </HStack>
          <HStack bgColor="$white">
            <Box w={"40%"} alignItems="center" borderTopWidth={"$1"}>
              <Text fontSize={"$xl"} color="$blue900" fontWeight="bold" pt={"$1"}>exemplo 1</Text>
            </Box>
            <Box w={"40%"} alignItems="center" borderLeftWidth={"$1"} pt={"$1"} borderTopWidth={"$1"}>
              <Text fontSize={"$xl"} color="$blue900" fontWeight="bold">exemplo 2</Text>
            </Box>
            <Box w={"20%"} alignItems="center" borderLeftWidth={"$1"} pt={"$1"} borderTopWidth={"$1"}>
              <Text fontSize={"$xl"} color="$red" fontWeight="bold">X</Text>
            </Box>
          </HStack>
        </Box>
        
        <Box backgroundColor="white" w={"100%"} mt={"$1"} flexDirection="column" borderColor="$emerald900" borderWidth={"$1"}>
          <HStack bgColor="$emerald400">
            <Box w={"100%"} alignItems="center">
              <Text fontSize={"$xl"} color="white" fontWeight="bold">Nome da Eleição</Text>
            </Box>
          </HStack>
          <HStack bgColor="$white">
            <Box w={"80%"} alignItems="center" borderTopWidth={"$1"}>
              <Text fontSize={"$xl"} color="$blue900" fontWeight="bold" pt={"$1"}>exemplo 1</Text>
            </Box>
            <Box w={"20%"} alignItems="center" borderLeftWidth={"$1"} pt={"$1"} borderTopWidth={"$1"}>
              <Text fontSize={"$xl"} color="$red" fontWeight="bold">X</Text>
            </Box>
          </HStack>
        </Box>
          
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" w={"95%"}mt={"12%"}>
          <FontAwesome name="chevron-left" size={28} color="black" onPress={() => navigation.navigate("MenuConfig")}/>
          <FontAwesome name="check" size={32} color="green" />
        </Box>
      </BoxContainer>
      </GluestackUIProvider>
    );
};