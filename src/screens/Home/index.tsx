import { GluestackUIProvider } from "@gluestack-ui/themed";
import { MainButton } from "../../components/MainButton";
import { BoxContainer } from "../../components/BoxContainer";
import { DefaultInput } from "../../components/DefaultInput";

import { NavigationProp } from "@react-navigation/native";

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
        <DefaultInput text="Teste" />
      </BoxContainer>
    </GluestackUIProvider>
  );
};
