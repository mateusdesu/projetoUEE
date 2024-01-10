import { Box, GluestackUIProvider } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

export const MenuConfig = ({ navigation }: { navigation: NavigationProp<any> }) =>
{
    return (
      <GluestackUIProvider>
        <BoxContainer alignItems={"center"}>
        <Header title="Configuração"></Header>
          <DButton text="SENHA MASTER" onPress={() => navigation.navigate("SenhaMaster")}/>
          <DButton text="EXCLUIR CADASTRO" onPress={() => navigation.navigate("ExcluirCadastro")}/>
          <DButton text="TERMOS" onPress={() => navigation.navigate("Termos")}/>
          <DButton text="CONTATO" onPress={() => navigation.navigate("Contato")} />
          <Box flexDirection="row" justifyContent="flex-start" alignItems="center" w={"95%"}>
            <FontAwesome name="chevron-left" size={28} color="black" onPress={() => navigation.navigate("Home")} />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
};