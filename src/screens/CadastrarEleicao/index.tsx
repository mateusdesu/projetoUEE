import { GluestackUIProvider, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { DInput } from "../../components/DInput";
import { BoxContainer } from "../../components/BoxContainer";
import {Feather} from "@expo/vector-icons";

export const CadastrarEleicao = () => {
  const [nomeEleicao, setNomeEleicao] = useState<string>("");
  const [senhaEleicao, setSenhaEleicao] = useState<string>("");
  const [cargos, setCargos] = useState<string[]>([]);
  return (
    <GluestackUIProvider>
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
        <VStack flexDirection="row" alignItems="center">
          <DInput
            placeholder="Ex: Presidente, Vice-Presidente"
            onChange={setCargos}
            width="$80%"
          />
          <Feather name="plus" size={24} color="black"/>
        </VStack>
        <Text>
          Eleição: {nomeEleicao} | Senha: {senhaEleicao} | Cargos: {cargos}
        </Text>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
