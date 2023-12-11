import { Box, GluestackUIProvider, HStack, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
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
  const [selectedCandidate, setSelectedCandidate] = useState<string[] | undefined>(
    undefined
  );

  const [eleicoes, setEleicoes] = useState(["1", "2", "3"]);
  const [candidatos, setCandidatos] = useState(["a","b"]);

  const [LoadSecondPicker, setLoadSecondPicker] = useState<boolean | void>(
    false
  );
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"flex-start"}>
        <Header title="Excluir Cadastro"></Header>
        <Text fontSize="$md" fontWeight="$bold">
          Qual tipo de dado deseja excluir?*
        </Text>
        <Picker
          style={{
            height: "10%",
            width: "100%",
            backgroundColor: "white",
            borderColor: "black",
            marginBottom: "1%"
          }}
          selectedValue={selectedOption}
          onValueChange={(itemValue) => {
            setSelectedOption(itemValue);
            setLoadSecondPicker(() =>
              LoadSecondPicker === false
                ? setLoadSecondPicker(true)
                : setLoadSecondPicker(false)
            );
          }}
        >
          {exclusao.map((item) => {
            return (
              <Picker.Item
                key={item.label}
                label={item.label}
                value={item.label}
              />
            );
          })}
        </Picker>

        {LoadSecondPicker == false ? (
          <>
            <Picker
          style={{
            height: "10%",
            width: "100%",
            backgroundColor: "white",
            borderColor: "black",
            marginBottom: "1%"
          }}
          selectedValue={selectedCandidate}
          onValueChange={(itemValue) => {
            setSelectedCandidate(itemValue);
          }}
        >
          {eleicoes.map((candidato) => {
            return (
              <Picker.Item
                key={candidato}
                label={candidato}
                value={candidato}
              />
              
            );
          })}
        </Picker>
        {eleicoes.map((c) => {
              return (
                <HStack bgColor="$white" key={c}>
                  <Box
                    w={"80%"}
                    alignItems="center"
                    borderRightWidth={"$1"}
                    borderLeftWidth={"$1"}
                    pt={"$1"}
                    borderTopWidth={"$1"}
                    borderBottomWidth={"$1"}
                  >
                    <Text fontSize={"$xl"} color="$blue900" fontWeight="bold">
                      {c}
                    </Text>
                  </Box>
                  <Box w={"20%"} alignItems="center" borderTopWidth={"$1"} borderRightWidth = {"$1"} borderBottomWidth={"$1"}>
                    <Text
                      fontSize={"$xl"}
                      color="$amber700"
                      fontWeight="bold"
                      pt={"$1"}
                    >
                      X
                    </Text>
                  </Box>
                </HStack>
              );
            })}
          </>
        ) : (
          <>
            {eleicoes.map((c) => {
              return (
                <HStack bgColor="$white" key={c}>
                  <Box
                    w={"80%"}
                    alignItems="center"
                    borderRightWidth={"$1"}
                    borderLeftWidth={"$1"}
                    pt={"$1"}
                    borderTopWidth={"$1"}
                    borderBottomWidth={"$1"}
                  >
                    <Text fontSize={"$xl"} color="$blue900" fontWeight="bold">
                      {c}
                    </Text>
                  </Box>
                  <Box w={"20%"} alignItems="center" borderTopWidth={"$1"} borderRightWidth = {"$1"} borderBottomWidth={"$1"}>
                    <Text
                      fontSize={"$xl"}
                      color="$amber700"
                      fontWeight="bold"
                      pt={"$1"}
                    >
                      X
                    </Text>
                  </Box>
                </HStack>
              );
            })}
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
