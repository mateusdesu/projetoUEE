import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import {
  Text,
  GluestackUIProvider,
  Box,
  Image,
  HStack,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { DSelect } from "../../components/DSelect";
import { useState } from "react";
import { DInput } from "../../components/DInput";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

export const RealizarEleicao = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
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

  const [screen, SetScreen] = useState(1);
  if (screen === 1) {
    return (
      <GluestackUIProvider>
        <BoxContainer alignItems={"flex-start"}>
          <Header title="Realizar Eleição" />
          <DSelect items={eleicao} text="Escolher eleição*" />
          <DInput
            placeholder="Senha"
            showIcon={true}
            text="Senha da eleição*"
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
              onPress={() => SetScreen(3)}
            />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
  } else if (screen === 2) {
    return <BoxContainer><Button></Button></BoxContainer>;
  } else if (screen === 3) {
    return (
      <BoxContainer alignItems={"center"} flexDirection={"row"}>
        <Box w={"50%"}>
          <Text>Area dados</Text>
        </Box>
        <Box w={"50%"} bg="#f0f0f0" h={"100%"} bgColor="black">
          <HStack justifyContent="center" gap={"$1"} mt={"$1"} h={"18%"}>
            <Button bg="$coolGray300" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$4xl"} fontWeight="bold" lineHeight={"$4xl"}>1</ButtonText>
            </Button>
            <Button bg="$coolGray300" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$4xl"} fontWeight="bold" lineHeight={"$4xl"}>2</ButtonText>
            </Button>
            <Button bg="$coolGray300" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$4xl"} fontWeight="bold" lineHeight={"$4xl"}>3</ButtonText>
            </Button>
          </HStack>
          <HStack justifyContent="center" gap={"$1"} mt={"$1"} h={"18%"}>
          <Button bg="$coolGray300" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$4xl"} fontWeight="bold" lineHeight={"$4xl"}>4</ButtonText>
            </Button>
            <Button bg="$coolGray300" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$4xl"} fontWeight="bold" lineHeight={"$4xl"}>5</ButtonText>
            </Button>
            <Button bg="$coolGray300" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$4xl"} fontWeight="bold" lineHeight={"$4xl"}>6</ButtonText>
            </Button>
          </HStack>
          <HStack justifyContent="center" gap={"$1"} mt={"$1"} h={"18%"}>
          <Button bg="$coolGray300" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$4xl"} fontWeight="bold" lineHeight={"$4xl"}>7</ButtonText>
            </Button>
            <Button bg="$coolGray300" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$4xl"} fontWeight="bold" lineHeight={"$4xl"}>8</ButtonText>
            </Button>
            <Button bg="$coolGray300" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$4xl"} fontWeight="bold" lineHeight={"$4xl"}>9</ButtonText>
            </Button>
          </HStack>
          <HStack justifyContent="center" gap={"$1"} mt={"$1"} h={"18%"}>
          <Button bg="$coolGray300" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$4xl"} fontWeight="bold" lineHeight={"$4xl"}>0</ButtonText>
            </Button>
          
          </HStack>
          <HStack justifyContent="center" gap={"$1"} mt={"$1"} h={"18%"} alignItems="center">
          <Button bg="$white" w={"30%"} h={"90%"}>
              <ButtonText color="black" fontSize={"$2xl"} fontWeight="bold" lineHeight={"$2xl"}>Branco</ButtonText>
            </Button>
            <Button bg="$amber500" w={"30%"} h={"90%"}>
              <ButtonText color="black" fontSize={"$xl"} fontWeight="bold" lineHeight={"$xl"}>Corrige</ButtonText>
            </Button>
            <Button bg="$emerald400" w={"30%"} h={"100%"}>
              <ButtonText color="black" fontSize={"$lg"} fontWeight="bold" lineHeight={"$lg"}>Confirma</ButtonText>
            </Button>
          </HStack>
         
        </Box>
      </BoxContainer>
    );
  }
};
