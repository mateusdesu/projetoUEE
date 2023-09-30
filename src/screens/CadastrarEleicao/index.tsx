import { GluestackUIProvider } from "@gluestack-ui/themed";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";


export const CadastrarEleicao = () => {
  return (
    <GluestackUIProvider>
        <BoxContainer>
      <DButton text="Cadastrar Eleição" />
      </BoxContainer>
    </GluestackUIProvider>
    
    
  );
};
