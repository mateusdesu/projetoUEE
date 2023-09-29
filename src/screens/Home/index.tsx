import { GluestackUIProvider } from "@gluestack-ui/themed";
import { MainButton } from "../../components/MainButton";
import { BoxContainer } from "../../components/BoxContainer";
import { Alert } from "react-native";

const TestAlert = () => {
  Alert.alert("Funcionou!")
}
export const Home = () => {
  return (
    <GluestackUIProvider>
        <BoxContainer>
      <MainButton text="CADASTRAR ELEIÇÃO" onPress={TestAlert} />
      <MainButton text="CADASTRAR CANDIDATOS" />
      <MainButton text="REALIZAR ELEIÇÃO" />
      <MainButton text="RESULTADO ELEIÇÃO" />
      </BoxContainer>
    </GluestackUIProvider>
    
    
  );
};
