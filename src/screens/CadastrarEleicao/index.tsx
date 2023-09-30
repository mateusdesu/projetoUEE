import { GluestackUIProvider } from "@gluestack-ui/themed";
import { DInput } from "../../components/DInput";
import { BoxContainer } from "../../components/BoxContainer";


export const CadastrarEleicao = () => {
  return (
    <GluestackUIProvider>
        <BoxContainer>
        <DInput text="Ex: Representante da sala 901" />
      </BoxContainer>
    </GluestackUIProvider>
    
    
  );
};
