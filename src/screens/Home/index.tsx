import { Box, GluestackUIProvider } from "@gluestack-ui/themed";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { Image } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";

import { NavigationProp } from "@react-navigation/native";

export const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <GluestackUIProvider>
      
      <BoxContainer alignItems={"center"}>
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
        <DButton
          text="CADASTRAR ELEIÇÃO"
          onPress={() => navigation.navigate("CadastrarEleicao")}
        />
        <DButton
          text="CADASTRAR CANDIDATOS"
          onPress={() => navigation.navigate("CadastrarCandidato")}
        />
        <DButton
          text="REALIZAR ELEIÇÃO"
          onPress={() => navigation.navigate("RealizarEleicao")}
        />
        <DButton text="RESULTADO ELEIÇÃO" onPress={() => navigation.navigate("ResultadoEleicao")} />
        <Box
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          w={"95%"}
        >
          <FontAwesome name="gear" size={32} color="black" onPress={() => navigation.navigate("MenuConfig")} />
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
