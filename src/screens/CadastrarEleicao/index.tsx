import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import { Alert } from "react-native";
import { DInput } from "../../components/DInput";
import { BoxContainer } from "../../components/BoxContainer";
import { Header } from "../../components/Header";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

export const CadastrarEleicao = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [nomeEleicao, setNomeEleicao] = useState<string>("");
  const [senhaEleicao, setSenhaEleicao] = useState<string>("");
  const [cargos, setCargos] = useState<string[]>([]);

  const cadastrarEleicao = () => {
    if (nomeEleicao === "" || senhaEleicao === "" || cargos.length === 0) {
      Alert.alert("Erro ⚠️", "Preencha todos os campos");
    } else {
      Alert.alert(
        "Sucesso ✅",
        "Eleição cadastrada com sucesso\nDados: " +
          nomeEleicao +
          " | Senha: " +
          senhaEleicao +
          " | Cargos: " +
          cargos
      );
    }
  };
  return (
    <GluestackUIProvider>
      <Header title="Cadastrar Eleição"></Header>
      <BoxContainer alignItems={"flex-start"}>
        <Text fontSize="$md" fontWeight="$bold">
          Nome da Eleição*
        </Text>
        <DInput
          placeholder="Ex: Representante da sala 901"
          onChange={setNomeEleicao}
          width="$90%"
        />
        <Text fontSize="$md" fontWeight="$bold">
          Senha para acesso*
        </Text>
        <DInput
          placeholder="Ex: 123456"
          onChange={setSenhaEleicao}
          width="$90%"
        />
        <Text fontSize="$md" fontWeight="$bold">
          Cargos*
        </Text>
        <DInput
          placeholder="(Insira os cargos por virgula) Ex: Presidente, Vice-Presidente"
          onChange={setCargos}
          width="$90%"
        />
        <Box flexDirection="row" alignItems="center" justifyContent="space-between" w={"100%"}>
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
            onPress={cadastrarEleicao}
          />
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
