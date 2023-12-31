import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import { Alert } from "react-native";
import { DInput } from "../../components/DInput";
import { BoxContainer } from "../../components/BoxContainer";
import { Header } from "../../components/Header";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import ElectionService from "../../services/ElectionService";
import { Election } from "../../models/Election";

export const CadastrarEleicao = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [nomeEleicao, setNomeEleicao] = useState<string>("");
  const [senhaEleicao, setSenhaEleicao] = useState<string>("");
  const [cargos, setCargos] = useState("");//useState<string[]>([]);

  const cadastrarEleicao = async() => {
    if (nomeEleicao === "" || senhaEleicao === "" || cargos.length === 0) {
      Alert.alert("Erro ⚠️", "Preencha todos os campos");  
    } else {
      let election = new Election(nomeEleicao,senhaEleicao,cargos,0);
      let inserido = false;
      
      inserido = await ElectionService.addElection(election);
    
      if(inserido){       
        Alert.alert(
          "Sucesso ✅",
          "Eleição cadastrada com sucesso\nDados: " +
            nomeEleicao +
            " | Senha: " +
            senhaEleicao +
            " | Cargos: " +
            cargos
        );
          navigation.goBack();      
      }else{
        Alert.alert("Erro ⚠️","Falha ao cadastrar eleição! \nTente novamente!");
      }
    }
  };
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"center"}>
        <Header title="Cadastrar Eleição"></Header>

        <DInput
          text="Nome da Eleição*"
          placeholder="Ex: Representante da sala 901"
          onChange={setNomeEleicao}
          type={"text"}
          width="$90%"
        />
        <DInput
          text="Senha para acesso*"
          placeholder="Ex: 123456"
          onChange={setSenhaEleicao}
          showIcon={true}
          width="$90%"
        />
        <DInput
          text="Cargos*"
          placeholder="(Insira os cargos por virgula) Ex: Presidente, Vice-Presidente"
          onChange={setCargos}
          width="$90%"
          type={"text"}
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
          <Text fontSize={"$md"} fontWeight="$bold">
              *Preenchimento Obrigatório
            </Text>

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
