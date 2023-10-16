import { GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import {DSelect} from "../../components/DSelect";

export const CadastrarCandidato = () => {
  let eleicoes = ["Turma 901", "Diretor"]
  return (

    <GluestackUIProvider>
      <Header title="Cadastrar Candidato"/>
      <BoxContainer alignItems={"flex-start"}>
        <Text fontSize="$md" fontWeight="$bold">
          Escolher eleição
        </Text>
        <DSelect item={eleicoes}/>
        </BoxContainer>
    </GluestackUIProvider>
  );
};
