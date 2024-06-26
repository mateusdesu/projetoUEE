
import { Box, GluestackUIProvider, HStack, Text,ScrollView,Center } from "@gluestack-ui/themed";



import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import ElectionService from "../../services/ElectionService";
import { Election } from "../../models/Election";
import CandidateService from "../../services/CandidateService";
import { Candidate } from "../../models/Candidate";
import { Alert } from "react-native";
import { DInput } from "../../components/DInput";
import MasterService from "../../services/MasterService";


export const ExcluirCadastro = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [exclusao, setExclusao] = useState([
    { label: "Eleições", value: "1" },
    { label: "Candidatos", value: "2" },
  ]);

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [selectedElection, setSelectedElection] = useState(0);


  const [candidatos, setCandidatos] = useState([]);

  const[masterPassword, setMasterPassword] = useState("");
  const [masterCredential, setMasterCredential] = useState<Boolean>(false);
  const[elecToExclude, setElecToExclude] = useState(0);
  const [candToExclude, setCandToExclude] = useState<number | null>(0);

  var arrSetE: Array<{
    label: string;
    value: string | number;
  }> = [{ label: "", value: "" }];
  var arrSetE2: Array<{
    label: string;
    value: string | number;
  }> = [];
  var arrSetE3: Array<{
    label: string;
    value: string | number;
  }> = [];

  const [eleicao, setEleicao] = useState(arrSetE);
  const [electionList, setElectionList] = useState(arrSetE);
  const [canWasDeleted, setCanWasDeleted] = useState(false);
  const findAllElections = async () => {
    let i: number;
    await ElectionService.findAll().then((response: any) => {
      arrSetE2.push({
        label: "selecionar eleição",
        value: 0,
      });
      let elections: Array<Election> = response._array;
      for (i = 0; i < elections.length; i++) {
        arrSetE2.push({
          label: elections[i].name,
          value: elections[i].id,
        });
        arrSetE3.push({
          label: elections[i].name,
          value: elections[i].id,
        });
      }
      setEleicao(arrSetE2);
      setElectionList(arrSetE3);
    });
  };

  async function findAllCandidates() {
    let c = await CandidateService.findAll();
    setCandidates(c);
  }

  const checkMasterPass = async(pass:string)=>{
    let equal = await MasterService.checkMasterPass(pass);

    if(equal){
      if(elecToExclude != 0){
        deleteElection(elecToExclude);
      }
      else if(candToExclude != 0){
        deleteCandidate(candToExclude);
      }
    }else{
      Alert.alert("Senha incorreta!");               
    }   
  }

  const checkIfMasterWasCreated= async()=>{
    let master = await MasterService.findAll();

    if(master){
      setScreen(2); 
    }else{
      Alert.alert("SENHA MASTER NÃO FOI CADASTRADA!");
    }
  }

  const deleteCandidate = async (id: number | null) => {
    let del = false;

    if (id != null) {
      del = await CandidateService.deleteCandidate(id);
    }

    del ? Alert.alert("Candidato excluído com sucesso!") : Alert.alert("Falha ao excluir candidato!");
    navigation.navigate("ExcluirCadastro");
    setScreen(1);  
    setCandToExclude(0);
    navigation.navigate("Home");
  };

  

  const deleteElection = async (electionId: number) => {
    
      let hasCandidate = await CandidateService.findByElectionId(electionId);
      let hasWhiteVotes = await ElectionService.checkWhiteVotes(electionId);

      let delWv = false;
      let delCnd = false;
      let delElec = false;

      if (hasCandidate) {
        delCnd = await CandidateService.deleteCandidatesByElectionId(electionId);
      }

      if (hasWhiteVotes) {
        delWv = await ElectionService.deleteWhiteVotes(electionId);
      }

      if (!hasWhiteVotes && !hasCandidate) {
        delElec = await ElectionService.deleteElection(electionId);
        delElec ? Alert.alert("Eleição Excluída com sucesso!") : Alert.alert("Falha ao excluir eleição!");
      } else if (hasWhiteVotes && delWv && hasCandidate && delCnd) {
          delElec = await ElectionService.deleteElection(electionId);
          delElec ? Alert.alert("Eleição Excluída com sucesso!") : Alert.alert("Falha ao excluir eleição!");
      } else if ((hasWhiteVotes && delWv && !hasCandidate) || (hasCandidate && delCnd && !hasWhiteVotes)){
          delElec = await ElectionService.deleteElection(electionId);
          delElec ? Alert.alert("Eleição Excluída com sucesso!") : Alert.alert("Falha ao excluir eleição!");
      } else {
        Alert.alert("Falha ao excluir eleição!");
      }
    
      navigation.navigate("ExcluirCadastro");
      setScreen(1);   
      setElecToExclude(0);
      navigation.navigate("Home");
  };

  const [LoadSecondPicker, setLoadSecondPicker] = useState<boolean | void>(
    false
  );

  const [candidates, setCandidates] = useState<Array<Candidate>>([]);
  const [candidatesList, setCandidatesList] = useState<Array<Candidate>>([]);

  const [candidateId, setCandidateId] = useState<number | null>(null);
  const [screen, setScreen] = useState(1);

  useEffect(() => {
    findAllElections();

    findAllCandidates();
  }, []);

  useEffect(() => {
    findAllCandidates();
  }, [canWasDeleted]);

  useEffect(() => {
    let c = candidates.filter((c) => c.electionId == selectedElection);
    setCandidatesList(c);
  }, [selectedElection]);

  if (screen === 1) {
    return (
      <GluestackUIProvider>
        
        <BoxContainer alignItems={"flex-start"}>
        <ScrollView w={"100%"}>
          
            
          <Header title="Excluir Cadastro"></Header>
          <Text fontSize="$md" fontWeight="$bold">
            Qual tipo de dado deseja excluir?*
          </Text>
          <Picker
            style={{
              height: "10%",
              width: "100%",
              backgroundColor: "white",
              borderColor: "black",
              marginBottom: "1%",
            }}
            selectedValue={selectedOption}
            onValueChange={(itemValue) => {
              setSelectedOption(itemValue);
              setLoadSecondPicker(() =>
                LoadSecondPicker === false
                  ? setLoadSecondPicker(true)
                  : setLoadSecondPicker(false)
              );
            }}
          >
            {exclusao.map((item) => {
              return (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.label}
                />
              );
            })}
          </Picker>

          {LoadSecondPicker == true ? (
            <>
              <Picker
                style={{
                  height: "10%",
                  width: "100%",
                  backgroundColor: "white",
                  borderColor: "black",
                  marginBottom: "1%",
                }}
                selectedValue={selectedElection}
                onValueChange={(itemValue) => {
                  setSelectedElection(itemValue);
                }}
              >
                {eleicao.map((e) => {
                  return (
                    <Picker.Item
                      key={e.value}
                      label={e.label}
                      value={e.value}
                    />
                  );
                })}
              </Picker>
              {candidatesList.map((c) => {
                return (
                  <HStack bgColor="$white" key={c.id}>
                    <Box
                      w={"80%"}
                      alignItems="center"
                      borderRightWidth={"$1"}
                      borderLeftWidth={"$1"}
                      pt={"$1"}
                      borderTopWidth={"$1"}
                      borderBottomWidth={"$1"}
                    >
                      <Text fontSize={"$xl"} color="$blue900" fontWeight="bold">
                        {c.name}
                      </Text>
                    </Box>
                    <Box
                      w={"10%"}
                      alignItems="center"
                      borderTopWidth={"$1"}
                      borderRightWidth={"$1"}
                      borderBottomWidth={"$1"}
                    >
                      <Text fontSize={"$xl"} fontWeight="bold" pt={"$1"}>
                        {c.number}
                      </Text>
                    </Box>
                    <Box
                      w={"10%"}
                      alignItems="center"
                      borderTopWidth={"$1"}
                      borderRightWidth={"$1"}
                      borderBottomWidth={"$1"}
                    >
                      <Text
                        fontSize={"$xl"}
                        color="$amber700"
                        fontWeight="bold"
                        pt={"$1"}
                        onPress={() => {
                          setCandToExclude(c.id);
                          checkIfMasterWasCreated();
                          //setScreen(2);                                                                    
                        }}
                      >
                        X
                      </Text>
                    </Box>
                  </HStack>
                );
              })}
            </>
          ) : (
            <>
              {electionList.map((c) => {
                return (
                  <HStack bgColor="$white" key={c.value}>
                    <Box
                      w={"80%"}
                      alignItems="center"
                      borderRightWidth={"$1"}
                      borderLeftWidth={"$1"}
                      pt={"$1"}
                      borderTopWidth={"$1"}
                      borderBottomWidth={"$1"}
                    >
                      <Text fontSize={"$xl"} color="$blue900" fontWeight="bold">
                        {c.label}
                      </Text>
                    </Box>
                    <Box
                      w={"20%"}
                      alignItems="center"
                      borderTopWidth={"$1"}
                      borderRightWidth={"$1"}
                      borderBottomWidth={"$1"}
                    >
                      <Text
                        fontSize={"$xl"}
                        color="$amber700"
                        fontWeight="bold"
                        pt={"$1"}
                        onPress={() => {
                          //setScreen(2);
                          checkIfMasterWasCreated();
                          setElecToExclude(Number(c.value))                     
                        }/*deleteElection(Number(c.value))*/}
                      >
                        X
                      </Text>
                    </Box>
                  </HStack>
                );
              })}
            </>
          )}

          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            w={"95%"}
            mt={"12%"}
          >
            <FontAwesome
              name="chevron-left"
              size={28}
              color="black"
              onPress={() => navigation.navigate("MenuConfig")}
            />
            <FontAwesome name="check" size={32} color="green" />
          </Box>
          
          </ScrollView>
        </BoxContainer>
        
      
      </GluestackUIProvider>
    );
  } else {
    return (
      <BoxContainer>
        <Header title="Excluir Cadastro" />
        <DInput
          placeholder="Senha"
          type={"password"}
          width="$90%"
          onChange={setMasterPassword}
          text="Senha Master"
        />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          w={"95%"}
          mt={"10%"}
        >
          <FontAwesome
            name="chevron-left"
            size={28}
            color="black"
            onPress={() => setScreen(1)}
          />
          <FontAwesome name="check" size={32} color="green" 
            onPress={() => {
              checkMasterPass(masterPassword);
            }}
          />
        </Box>
      </BoxContainer>
    );
  }
};

