import { Header } from "../../components/Header";
import { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
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
import { Election } from "../../models/Election";
import ElectionService from "../../services/ElectionService";
import { Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export const RealizarEleicao = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {

  const [firstNumberVoted, setFistNumberVoted] = useState<string | any>("");
  const [secondNumberVoted, setSecondNumberVoted] = useState<string | any>("");
  const [NumberVoted, setNumberVoted] = useState<string | any>("");

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  const [password,setPassword] = useState('');

  var arrSetE: Array<{
    label: string;
    value: string | number;
  }> = [{ label: "", value: ""}];
  var arrSetE2: Array<{
    label: string;
    value: string | number;
  }> = [];

  const [eleicao, setEleicao] = useState(arrSetE);


  const findAllElections = async () => {
    let i: number;
    await ElectionService.findAll().then((response: any) => {
      arrSetE2.push({
        label: "selecionar eleição",
        value: 0
      });
      let elections: Array<Election> = response._array;
      for (i = 0; i < elections.length; i++) {     
        arrSetE2.push({
          label: elections[i].name,
          value: elections[i].id
        });
      }
      setEleicao(arrSetE2);
      console.log("ArrSetE:" + eleicao);
      eleicao.map((e) => {
        console.log(e.label);
      });
    });
  };

const checkCrendentials = async(password:string, id:number)=>{
  let confirm = await ElectionService.checkElectionCredential(id, password);

  if(confirm){
    Alert.alert(password+"/"+id);
    SetScreen(2);
  }else{
    Alert.alert("Senha incorreta!");
  }
  
}

function handleVotes (num:string){
  if( firstNumberVoted === ""){
    setFistNumberVoted(num)
  }
  else if(firstNumberVoted != ""){
    setSecondNumberVoted(num)
    setNumberVoted(firstNumberVoted + secondNumberVoted)
  }
}

function clear(){
  setFistNumberVoted("");
  setSecondNumberVoted("");
  setNumberVoted("");
}

useEffect(() => {
  findAllElections();
}, []);


  const [screen, SetScreen] = useState(1);
  if (screen === 1) {
    return (
      <GluestackUIProvider>
        <BoxContainer alignItems={"flex-start"}>
          <Header title="Realizar Eleição" />
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
              onPress={() => checkCrendentials(password,Number(selectedOption))}
            />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
  }else if (screen === 2) {
    return (
      <BoxContainer alignItems={"center"} flexDirection={"row"} gap={"$2"}>
        <Box w={"50%"} h={"100%"} bg="#f0f0f0" flexDirection="column">
          <Box pl={"$2"} pt={"$2"} flexDirection={"row"} h={"40%"}>
            <Box w={"50%"}>
              <Text fontSize={"$2xl"} lineHeight={"$2xl"} fontWeight="$bold">
                Seu voto para
              </Text>
              <Text
                fontSize={"$xl"}
                lineHeight={"$xl"}
                fontWeight="$bold"
                color="$blueGray600"
              >
                Presidente
              </Text>
              <Box flexDirection="row" gap={"$1"}>
                <Box
                  borderColor="$black"
                  borderWidth={"$2"}
                  h={"$12"}
                  w={"$10"}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize={"$2xl"}
                    lineHeight={"$2xl"}
                    fontWeight="$bold"
                  >
                    {firstNumberVoted}
                  </Text>
                </Box>
                <Box
                  borderColor="$black"
                  borderWidth={"$2"}
                  h={"$12"}
                  w={"$10"}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize={"$2xl"}
                    lineHeight={"$2xl"}
                    fontWeight="$bold"
                  >
                    {secondNumberVoted}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box justifyContent="flex-start" alignItems="center" w={"50%"}>
              <Box borderColor="$black" borderWidth={"$2"} h={"90%"} w={"$24"}>
                <Text>Imagem</Text>
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box pl={"$2"} pt={"$2"} flexDirection={"column"} w={"50%"}>
              <Text fontSize={"$2xl"} lineHeight={"$2xl"} fontWeight="$bold">
                Nome
              </Text>
              <Text
                fontSize={"$xl"}
                lineHeight={"$xl"}
                fontWeight="$bold"
                color="$blueGray600"
              >
                Candidato
              </Text>
              <Text fontSize={"$2xl"} lineHeight={"$2xl"} fontWeight="$bold">
                Vice
              </Text>
              <Text
                fontSize={"$xl"}
                lineHeight={"$xl"}
                fontWeight="$bold"
                color="$blueGray600"
              >
                Vice Candidato
              </Text>
              <Text fontSize={"$2xl"} lineHeight={"$2xl"} fontWeight="$bold">
                Chapa
              </Text>
              <Text
                fontSize={"$xl"}
                lineHeight={"$xl"}
                fontWeight="$bold"
                color="$blueGray600"
              >
                Chapa 1
              </Text>
            </Box>
            <Box w={"50%"} alignItems="center" justifyContent="flex-end">
            <Ionicons name="exit-outline" size={60} color="black" />
            <Text fontSize={"$xl"} fontWeight="bold">Pressione a tecla</Text>
            <Text fontSize={"$lg"} fontWeight="bold" color="$emerald400">Verde <Text fontSize={"$lg"} fontWeight="bold">para </Text>confirmar</Text>
            <Text fontSize={"$lg"} fontWeight="bold" color="$amber500">Laranja <Text fontSize={"$lg"} fontWeight="bold">para </Text>corrigir</Text>
            </Box>
          </Box>
        </Box>
        <Box w={"50%"} bg="#f0f0f0" h={"100%"} bgColor="black">
          <HStack justifyContent="center" gap={"$2"} mt={"$1"} h={"18%"}>
            <Button
              bg="$coolGray300"
              w={"28%"}
              h={"100%"}
              onPress={() => handleVotes("1")}
            >
              <ButtonText
                color="black"
                fontSize={"$4xl"}
                fontWeight="bold"
                lineHeight={"$4xl"}
              >
                1
              </ButtonText>
            </Button>
            <Button
              bg="$coolGray300"
              w={"28%"}
              h={"100%"}
              onPress={() => handleVotes("2")}
            >
              <ButtonText
                color="black"
                fontSize={"$4xl"}
                fontWeight="bold"
                lineHeight={"$4xl"}
              >
                2
              </ButtonText>
            </Button>
            <Button
              bg="$coolGray300"
              w={"28%"}
              h={"100%"}
              onPress={() => handleVotes("3")}
            >
              <ButtonText
                color="black"
                fontSize={"$4xl"}
                fontWeight="bold"
                lineHeight={"$4xl"}
              >
                3
              </ButtonText>
            </Button>
          </HStack>
          <HStack justifyContent="center" gap={"$2"} mt={"$1"} h={"18%"}>
            <Button
              bg="$coolGray300"
              w={"28%"}
              h={"100%"}
              onPress={() => handleVotes("4")}
            >
              <ButtonText
                color="black"
                fontSize={"$4xl"}
                fontWeight="bold"
                lineHeight={"$4xl"}
              >
                4
              </ButtonText>
            </Button>
            <Button
              bg="$coolGray300"
              w={"28%"}
              h={"100%"}
              onPress={() => handleVotes("5")}
            >
              <ButtonText
                color="black"
                fontSize={"$4xl"}
                fontWeight="bold"
                lineHeight={"$4xl"}
              >
                5
              </ButtonText>
            </Button>
            <Button
              bg="$coolGray300"
              w={"28%"}
              h={"100%"}
              onPress={() => handleVotes("6")}
            >
              <ButtonText
                color="black"
                fontSize={"$4xl"}
                fontWeight="bold"
                lineHeight={"$4xl"}
              >
                6
              </ButtonText>
            </Button>
          </HStack>
          <HStack justifyContent="center" gap={"$2"} mt={"$1"} h={"18%"}>
            <Button
              bg="$coolGray300"
              w={"28%"}
              h={"100%"}
              onPress={() => handleVotes("7")}
            >
              <ButtonText
                color="black"
                fontSize={"$4xl"}
                fontWeight="bold"
                lineHeight={"$4xl"}
              >
                7
              </ButtonText>
            </Button>
            <Button
              bg="$coolGray300"
              w={"28%"}
              h={"100%"}
              onPress={() => handleVotes("8")}
            >
              <ButtonText
                color="black"
                fontSize={"$4xl"}
                fontWeight="bold"
                lineHeight={"$4xl"}
              >
                8
              </ButtonText>
            </Button>
            <Button
              bg="$coolGray300"
              w={"28%"}
              h={"100%"}
              onPress={() => handleVotes("9")}
            >
              <ButtonText
                color="black"
                fontSize={"$4xl"}
                fontWeight="bold"
                lineHeight={"$4xl"}
              >
                9
              </ButtonText>
            </Button>
          </HStack>
          <HStack justifyContent="center" gap={"$2"} mt={"$1"} h={"18%"}>
            <Button
              bg="$coolGray300"
              w={"28%"}
              h={"100%"}
              onPress={() => handleVotes("0")}
            >
              <ButtonText
                color="black"
                fontSize={"$4xl"}
                fontWeight="bold"
                lineHeight={"$4xl"}
              >
                0
              </ButtonText>
            </Button>
          </HStack>
          <HStack
            justifyContent="center"
            gap={"$1"}
            mt={"$1"}
            h={"18%"}
            alignItems="flex-end"
          >
            <Button bg="$white" w={"30%"} h={"90%"}>
              <ButtonText
                color="black"
                fontSize={"$2xl"}
                fontWeight="bold"
                lineHeight={"$2xl"}
              >
                Branco
              </ButtonText>
            </Button>
            <Button bg="$amber500" w={"30%"} h={"90%"} onPress={() => clear()}>
              <ButtonText
                color="black"
                fontSize={"$xl"}
                fontWeight="bold"
                lineHeight={"$xl"}
              >
                Corrige
              </ButtonText>
            </Button>
            <Button bg="$emerald400" w={"30%"} h={"100%"}>
              <ButtonText
                color="black"
                fontSize={"$lg"}
                fontWeight="bold"
                lineHeight={"$lg"}
              >
                Confirma
              </ButtonText>
            </Button>
          </HStack>
        </Box>
      </BoxContainer>
    );
  }
};
