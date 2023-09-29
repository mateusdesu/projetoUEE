import { GluestackUIProvider } from "@gluestack-ui/themed";
import { MainButton } from "../../components/MainButton";
import { BoxContainer } from "../../components/BoxContainer";
import { Alert } from "react-native";

import { NavigationProp } from "@react-navigation/native";
const TestAlert = () => {
  Alert.alert("Funcionou!");
};
export const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <GluestackUIProvider>
      <BoxContainer>
        <MainButton
          text="CADASTRAR ELEIÇÃO"
          onPress={() => navigation.navigate("CadastrarEleicao")}
        />
        <MainButton text="CADASTRAR CANDIDATOS" />
        <MainButton text="REALIZAR ELEIÇÃO" />
        <MainButton text="RESULTADO ELEIÇÃO" />
      </BoxContainer>
    </GluestackUIProvider>
  );
};
