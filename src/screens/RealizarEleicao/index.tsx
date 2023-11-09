import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { Text, GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { DSelect } from "../../components/DSelect";
import { useState } from "react";
import { DInput } from "../../components/DInput";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";


export const RealizarEleicao = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [eleicao, setEleicao] = useState([
    {
      label: "Turma 901",
      value: "1",
      cargos: ["Presidente", "Professor Representante"],
    },
    {
      label: "Grêmio sala 204",
      value: "2",
      cargos: ["Representante", "Conselheiro"],
    },
  ]);
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"flex-start"}>
        <Header title="Realizar Eleição" />
        <Text fontSize="$md" fontWeight="$bold">
          Escolher eleição *
        </Text>
        <DSelect items={eleicao} />
        <DInput type={"password"} placeholder="Senha" showIcon={true} text="Senha"/>
        <Box
            flexDirection="row"
            alignItems="flex-end"
            justifyContent="space-between"
            w={"100%"}
            //mt={"$8"}
          >
            <FontAwesome
              name="chevron-left"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
            />

            <Text fontSize={"$md"} fontWeight="$bold">
              *Preenchimento Obrigatório
            </Text>

            <FontAwesome
              name="check"
              size={32}
              color="green"
              onPress={() => (console.log("aa"))}
            />
          </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
