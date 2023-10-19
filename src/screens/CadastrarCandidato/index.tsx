import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { DSelect } from "../../components/DSelect";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";
import { useState } from "react";

export const CadastrarCandidato = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const cadastrarCandidato = () => {
    if (selectedOption === null || selectedCargo.length === 0) {
      Alert.alert("Erro ⚠️", "Escolha uma opção");
    } else {
      Alert.alert(selectedOption + " | " + selectedCargo);
    }
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

  const handleElectionChange = (value: string | null) => {
    setSelectedOption(value);
    // Find the selected option to get cargos
    const selected = eleicao.find((item) => item.value === value);
    if (selected) {
      setSelectedCargo(selected.cargos || []);
    } else {
      setSelectedCargo([]);
    }
  };

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
          items={selectedCargo.map((cargo) => ({ label: cargo, value: cargo }))}
        />
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          w={"100%"}
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
};
