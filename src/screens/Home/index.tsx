import { GluestackUIProvider } from "@gluestack-ui/themed";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { DInput } from "../../components/DInput";

import { NavigationProp } from "@react-navigation/native";

export const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <GluestackUIProvider>
      <BoxContainer>
        <DButton
          text="CADASTRAR ELEIÇÃO"
          onPress={() => navigation.navigate("CadastrarEleicao")}
        />
        <DButton text="CADASTRAR CANDIDATOS" />
        <DButton text="REALIZAR ELEIÇÃO" />
        <DButton text="RESULTADO ELEIÇÃO" />
        <DInput text="Teste" />
      </BoxContainer>
    </GluestackUIProvider>
  );
};
