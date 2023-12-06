import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { Box, GluestackUIProvider, Text, HStack } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { DInput } from "../../components/DInput";
import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";
import ElectionService from "../../services/ElectionService";
import { FontAwesome } from "@expo/vector-icons";
import { Election } from "../../models/Election";
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


  

  const findAllElections = async () => {
    let i: number;
    await ElectionService.findAll().then((response: any) => {
      arrSetE2.push({
        label: "selecionar eleição",
        value: 0,
      });
      let elections: Array<Election> = response._array;
      for (i = 0; i < elections.length; i++) {
        if(elections[i].closed){
          arrSetE2.push({
            label: elections[i].name,
            value: elections[i].id,
          });
        }  
      }
      setEleicao(arrSetE2);
      console.log("ArrSetE:" + eleicao);
      eleicao.map((e) => {
        console.log(e.label);
      });
    });
  };


  const checkCrendentials = async (password: string, id: number) => {
    let confirm = await ElectionService.checkElectionCredential(id, password);

    if (confirm) {
      Alert.alert(password + "/" + id);
      await getResult(Number(selectedOption),"");
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
  const TempArr = [
    { nome: "Candidato1", votos: "50" },
    { nome: "Candidato2", votos: "38" },
    { nome: "Bolsonaro", votos: "69" },
  ];


  const cMdl:Array<{name:string,votes:number,position:string,key:number | null}> = [];
  const candidates:Array<{name:string,votes:number,position:string,key:number | null}> = [];
  const [finalResult, setFinalResult] = useState(cMdl);

  const getResult = async(electionId:number,position:string)=>{
    let result = await ElectionService.result(electionId);
    console.log("Result length: "+result.length);
    console.log("id da eleição: "+electionId);

    if(result.length > 0){
      result.forEach((c)=>{
        candidates.push({name:c.name, votes:c.votes, position:c.position, key:c.id})
      })
    }

    setFinalResult(candidates);
    console.log("Array candidates: "+candidates);
  }

  useEffect(()=>{
    findAllElections();
  },[])

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
                checkCrendentials(password, Number(selectedOption))
                
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
        <Box
          backgroundColor="white"
          w={"90%"}
          mt={"$1"}
          flexDirection="column"
          borderColor="$emerald900"
          borderWidth={"$1"}
        >
          <HStack bgColor="$emerald400">
            <Box w={"20%"} alignItems="center">
              <Text fontSize={"$xl"} color="white" fontWeight="bold">
                Votos
              </Text>
            </Box>
            <Box w={"80%"} alignItems="center" borderLeftWidth={"$1"}>
              <Text fontSize={"$xl"} color="white" fontWeight="bold">
                Nome do Candidato
              </Text>
            </Box>
          </HStack>
          {finalResult.map((c) => {
            return (
              <HStack bgColor="$white" key={c.key}>
                <Box w={"20%"} alignItems="center" borderTopWidth={"$1"}>
                  <Text
                    fontSize={"$xl"}
                    color="$blue900"
                    fontWeight="bold"
                    pt={"$1"}
                  >
                    {c.votes}
                  </Text>
                </Box>
                <Box
                  w={"80%"}
                  alignItems="center"
                  borderLeftWidth={"$1"}
                  pt={"$1"}
                  borderTopWidth={"$1"}
                >
                  <Text fontSize={"$xl"} color="$blue900" fontWeight="bold">
                    {c.name}
                  </Text>
                </Box>
              </HStack>
            );
          })}
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
