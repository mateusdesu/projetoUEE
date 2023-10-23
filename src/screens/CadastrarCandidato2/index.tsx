import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";

export const CadastrarCandidato2 = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const realizarCadastro = () => {
    Alert.alert("Sucesso ✅", "Candidato Cadastrado");
  };

  return (
    <GluestackUIProvider>
      <Header title="Cadastrar Candidato" />
      <BoxContainer alignItems={"flex-start"}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          w={"100%"}
          mt={"$8"}
        >
          <FontAwesome
            name="chevron-left"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />

          <FontAwesome
            name="check"
            size={32}
            color="green"
            onPress={() => realizarCadastro}
          />
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
