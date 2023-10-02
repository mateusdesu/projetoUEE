import { AlertText, GluestackUIProvider } from "@gluestack-ui/themed";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { Header } from "../../components/Header";
import { Image,} from "@gluestack-ui/themed";

import { NavigationProp } from "@react-navigation/native";

export const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <GluestackUIProvider>
      <Header>
        <Image
          ml="$4"
          size="md"
          alt="Logo Urna Eletrônica Escolar"
          source={require("../../assets/icon.png")}
        />
        <Image
          ml="$4"
          size="md"
          alt="Logo Urna Eletrônica Escolar"
          source={require("../../assets/uni.png")}
        />
      </Header>
      <BoxContainer alignItems={"center"}>
        <DButton
          text="CADASTRAR ELEIÇÃO"
          onPress={() => navigation.navigate("CadastrarEleicao")}
        />
        <DButton text="CADASTRAR CANDIDATOS" />
        <DButton text="REALIZAR ELEIÇÃO" />
        <DButton text="RESULTADO ELEIÇÃO" />
      </BoxContainer>
    </GluestackUIProvider>
  );
};
