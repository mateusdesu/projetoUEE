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
        <VStack flexDirection="row" justifyContent="flex-end">
          <DButton text="RESULTADO ELEIÇÃO" width={"80%"} />
          <FontAwesome
            name="gear"
            size={32}
            color="black"
            style={{ marginRight: "4%" }}
          />
        </VStack>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
