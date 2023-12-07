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
import { View, StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

export const ExcluirCadastro = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [exclusao, setExclusao] = useState([
    { label: "Eleições", value: "1" },
    { label: "Candidatos", value: "2" },
  ]);

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const CargosEleicoes = [{ nome: "Eleição" }, { nome: "Candidato" }];
  const Eleicoes = ["Teste", "Turma 3001","Vaticano"];
  const Candidatos = ["Junin","CandTeste","AAAA"]
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"flex-start"}>
        <Header title="Excluir Cadastro"></Header>
        
        {selectedOption == "Candidato" ? (
          <>
          <Text fontSize="$md" fontWeight="$bold">
          Qual tipo de dado deseja excluir?*
        </Text>
        <Picker
          style={{
            height: "10%",
            width: "100%",
            backgroundColor: "white",
            borderColor: "black",
          }}
          selectedValue={selectedOption}
          onValueChange={(itemValue) => {
            setSelectedOption(itemValue);
          }}
        >
          {CargosEleicoes.map((item) => {
            return (
              <Picker.Item
                key={item.nome}
                label={item.nome}
                value={item.nome}
              />
            );
          })}
        </Picker>
        <Text fontSize="$md" fontWeight="$bold">
         Escolha a eleição de que quer excluir um candidato*
        </Text>
          <Picker
           style={{
             height: "10%",
             width: "100%",
             backgroundColor: "white",
             borderColor: "black",
           }}
           selectedValue={selectedOption}
           onValueChange={(itemValue: string) => {
             setSelectedOption(itemValue);
           }}
         >
           {Candidatos.map((item) => {
             return (
               <Picker.Item
                 key={item}
                 label={item}
                 value={item}
               />
             );
           })}
         </Picker>
           
         </>
        ):(
          <>
          <Text fontSize="$md" fontWeight="$bold">
          Qual tipo de dado deseja excluir?*
        </Text>
        <Picker
          style={{
            height: "10%",
            width: "100%",
            backgroundColor: "white",
            borderColor: "black",
          }}
          selectedValue={selectedOption}
          onValueChange={(itemValue) => {
            setSelectedOption(itemValue);
          }}
        >
          {CargosEleicoes.map((item) => {
            return (
              <Picker.Item
                key={item.nome}
                label={item.nome}
                value={item.nome}
              />
            );
          })}
        </Picker>
        <Text fontSize="$md" fontWeight="$bold">
         Escolha a eleição de que quer excluir um candidato*
        </Text>
          <Picker
           style={{
             height: "10%",
             width: "100%",
             backgroundColor: "white",
             borderColor: "black",
           }}
           selectedValue={selectedOption}
           onValueChange={(itemValue: string) => {
             setSelectedOption(itemValue);
           }}
         >
           {Candidatos.map((item) => {
             return (
               <Picker.Item
                 key={item}
                 label={item}
                 value={item}
               />
             );
           })}
         </Picker>
         </>
        )}

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          w={"95%"}
          mt={"12%"}
        >
          <FontAwesome
            name="chevron-left"
            size={28}
            color="black"
            onPress={() => navigation.navigate("MenuConfig")}
          />
          <FontAwesome name="check" size={32} color="green" />
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
