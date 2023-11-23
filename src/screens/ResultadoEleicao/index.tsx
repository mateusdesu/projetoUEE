import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { Box, GluestackUIProvider, Text, HStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { DInput } from "../../components/DInput";
import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";
import ElectionService from "../../services/ElectionService";
import { FontAwesome } from "@expo/vector-icons";
export const ResultadoEleicao = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  var arrSetE: Array<{
    label: string;
    value: string | number;
  }> = [{ label: "", value: "" }];
  var arrSetE2: Array<{
    label: string;
    value: string | number;
  }> = [];
  const checkCrendentials = async (password: string, id: number) => {
    let confirm = await ElectionService.checkElectionCredential(id, password);

    if (confirm) {
      Alert.alert(password + "/" + id);
      SetScreen(2);
    } else {
      Alert.alert("Senha incorreta!");
    }
  };
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [password, setPassword] = useState("");
  const [eleicao, setEleicao] = useState(arrSetE);
  const [screen, SetScreen] = useState(1);

  if (screen == 1) {
    return (
      <GluestackUIProvider>
        <BoxContainer alignItems={"flex-start"}>
          <Header title="Resultado Eleição" />
          <Picker
            style={{
              height: "10%",
              width: "100%",
              backgroundColor: "white",
              borderColor: "black",
            }}
            selectedValue={selectedOption}
            onValueChange={(itemValue: string) => {
              setSelectedOption(itemValue);
            }}
          >
            {eleicao.map((item) => {
              return (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
          <DInput
            placeholder="Senha"
            showIcon={true}
            text="Senha da eleição*"
            onChange={setPassword}
          />
          <Box
            flexDirection="row"
            alignItems="flex-end"
            justifyContent="space-between"
            w={"100%"}
            mt={"8%"}
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
              onPress={() =>
                //checkCrendentials(password, Number(selectedOption))
                SetScreen(2)
              }
            />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
  } else if (screen == 2) {
    return (
      <BoxContainer>
        <Header title={"Resultado Eleição"} />
        <Text
          color="$blue900"
          fontWeight="bold"
          fontSize={"$2xl"}
          lineHeight={"$2xl"}
          mr={"10%"}
        >
          Nome eleição
        </Text>
        <Box backgroundColor="white" w={"90%"} mt={"$1"} flexDirection="column" borderColor="$emerald900" borderWidth={"$1"}>
          <HStack bgColor="$emerald400" >
            <Box w={"20%"} alignItems="center">
              <Text fontSize={"$xl"} color="white" fontWeight="bold">Votos</Text>
            </Box>
            <Box w={"80%"} alignItems="center" borderLeftWidth={"$1"}>
              <Text fontSize={"$xl"} color="white" fontWeight="bold">Nome do Candidato</Text>
            </Box>
          </HStack>
          <HStack bgColor="$white">
            <Box w={"20%"} alignItems="center">
              <Text fontSize={"$xl"} color="$blue900" fontWeight="bold" pt={"$1"}>800</Text>
            </Box>
            <Box w={"80%"} alignItems="center" borderLeftWidth={"$1"} pt={"$1"}>
              <Text fontSize={"$xl"} color="$blue900" fontWeight="bold">Candidato 1</Text>
            </Box>
          </HStack>
          
          
        </Box>
        <Box
            flexDirection="row"
            alignItems="flex-end"
            justifyContent="space-between"
            w={"100%"}
            mt={"8%"}
          >
            <FontAwesome
              name="chevron-left"
              size={28}
              color="black"
              onPress={() => SetScreen(1)}
            />
            <FontAwesome
              name="check"
              size={32}
              color="green"
              onPress={() => console.log("aa")}
            />
          </Box>
      </BoxContainer>
    );
  }
};
