import { GluestackUIProvider, Box, VStack } from "@gluestack-ui/themed";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { Image } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";

import { NavigationProp } from "@react-navigation/native";

export const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <GluestackUIProvider>
      <Box
        px={"$2"}
        pt={"$6"}
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="row"
      >
        <Image
          ml="$4"
          size="sm"
          alt="Logo Urna Eletrônica Escolar"
          source={require("../../assets/icon.png")}
        />
        <Image
          ml="$4"
          size="sm"
          alt="Logo Urna Eletrônica Escolar"
          source={require("../../assets/uni.png")}
        />
      </Box>
      <BoxContainer alignItems={"center"}>
        <DButton
          text="CADASTRAR ELEIÇÃO"
          onPress={() => navigation.navigate("CadastrarEleicao")}
        />
        <DButton
          text="CADASTRAR CANDIDATOS"
          onPress={() => navigation.navigate("CadastrarCandidato")}
        />
        <DButton text="REALIZAR ELEIÇÃO" />
        <DButton text="RESULTADO ELEIÇÃO" width={"80%"} />
        <Box flexDirection="row" justifyContent="flex-start" alignItems="center" w={"95%"}>
          <FontAwesome name="gear" size={32} color="black" />
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
