import React, { useState } from "react";
import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { DSelect } from "../../components/DSelect";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const CadastrarCandidato = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const cadastrarCandidato = () => {
    if (selectedOption === null || selectedCargoItem === null) {
      Alert.alert("Erro ⚠️", "Escolha uma opção");
    } else {
      Alert.alert(
        "Sucesso ✅",
        `Eleição: ${selectedOption} | Cargo: ${selectedCargoItem}`
      );
      // navigation.navigate("CadastrarCandidato2");
      setLoadSecondScreen(true);
    }
  };

  const realizarCadastro = () => {
    Alert.alert("Sucesso ✅", "Candidato Cadastrado");
  };

  const [eleicao, setEleicao] = useState([
    {
      label: "Turma 901",
      value: "1",
      cargos: ["Presidente", "Professor Representante"],
    },
    {
      label: "Grêmio sala 204",
      value: "2",
      cargos: ["Representante", "Conselheiro"],
    },
  ]);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedCargo, setSelectedCargo] = useState<string[]>([]);
  const [selectedCargoItem, setSelectedCargoItem] = useState<string | null>(
    null
  ); // Novo estado
  const [loadSecondScreen, setLoadSecondScreen] = useState(false);

  const handleElectionChange = (value: string | null) => {
    setSelectedOption(value);
    // Encontrar a opção selecionada para obter os cargos.
    const selected = eleicao.find((item) => item.value === value);
    if (selected) {
      setSelectedCargo(selected.cargos || []);
      setSelectedCargoItem(null); // Limpar o cargo selecionado quando a eleição muda
    } else {
      setSelectedCargo([]);
      setSelectedCargoItem(null);
    }
  };

  const handleCargoChange = (value: string | null) => {
    setSelectedCargoItem(value); // Atualizar o estado do cargo selecionado
  };

  const [selectedImage, setSelectedImage] = useState("");
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      Alert.alert("✅ Imagem selecionada com sucesso!");
    } else {
      Alert.alert("⚠️ Nenhuma imagem foi selecionada!");
    }
  };

  if (loadSecondScreen) {
    return (
      <GluestackUIProvider>
        <Header title="Cadastrar Candidato" />
        <BoxContainer alignItems={"flex-start"}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            w={"100%"}
            mt={"$8"}
          >
            <Entypo
              name="upload-to-cloud"
              size={24}
              color="black"
              onPress={pickImageAsync}
            />
            <FontAwesome
              name="chevron-left"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
            />

            <FontAwesome
              name="check"
              size={32}
              color="green"
              onPress={() => realizarCadastro}
            />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
  } else {
    return (
      <GluestackUIProvider>
        <Header title="Cadastrar Candidato" />
        <BoxContainer alignItems={"flex-start"}>
          <Text fontSize="$md" fontWeight="$bold">
            Escolher eleição *
          </Text>
          <DSelect
            items={eleicao.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            onChangeValue={handleElectionChange}
            zIndex={10000}
          />

          <Text fontSize="$md" fontWeight="$bold" mt={"$3"}>
            Escolher cargo *
          </Text>
          <DSelect
            items={selectedCargo.map((cargo) => ({
              label: cargo,
              value: cargo,
            }))}
            onChangeValue={handleCargoChange} // Adicionado para lidar com a seleção do cargo
          />
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            w={"100%"}
            mt={"$8"}
          >
            <FontAwesome
              name="chevron-left"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
            />

            <FontAwesome
              name="check"
              size={32}
              color="green"
              onPress={cadastrarCandidato}
            />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
  }
};
