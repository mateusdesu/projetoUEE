import { GluestackUIProvider } from "@gluestack-ui/themed";
import { MainButton } from "../../components/MainButton";
import { BoxContainer } from "../../components/BoxContainer";


export const CadastrarEleicao = () => {
  return (
    <GluestackUIProvider>
        <BoxContainer>
      <MainButton text="Cadastrar Eleição" />
      </BoxContainer>
    </GluestackUIProvider>
    
    
  );
};
