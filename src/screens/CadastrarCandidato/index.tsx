import React, { useEffect, useState } from "react";
import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { DSelect } from "../../components/DSelect";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { DInput } from "../../components/DInput";
import CandidateService from "../../services/CandidateService";
import { Candidate } from "../../models/Candidate";
import ElectionService from "../../services/ElectionService";
import { Election } from "../../models/Election";
import ImageService from "../../services/ImageService";
import { Picker } from "@react-native-picker/picker";

export const CadastrarCandidato = ({
   navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const cadastrarCandidato = () => {
    if (selectedOption === undefined || selectedOption === "selecionar eleição" || selectedCargo === null || selectedCargo === "selecionar cargo") {
      Alert.alert("Erro ⚠️", "Escolha uma opção");
    } else {
      Alert.alert(
        "Sucesso ✅",
        `Eleição: ${selectedOption} | Cargo: ${selectedCargo}`
      );
      setLoadSecondScreen(true);
    }
  };

  const [name, setName] = useState('');
  const [vice_name, setViceName] = useState('');
  const [number, setNumber] = useState(0);
  let [picture_path, setPicturePath] = useState('');
  const [party, setParty] = useState('');
  const [electionId, setElectionId] = useState(0);


  const realizarCadastro = async() => {
    let inserido;
    

    const election = eleicao.find((e)=> e.value === electionId);
    const eName = election != undefined ? election.label : '';

    if(eName != ''){
      let realPicPath = await ImageService.uploadPic(picture_path,eName,number);
      let candidate = new Candidate(name, number, Number(selectedOption), selectedCargo, party, realPicPath, vice_name, null);  
      inserido = await CandidateService.addCandidate(candidate);
    }
     
    if(inserido){
      Alert.alert("Sucesso ✅", "Candidato Cadastrado");
    }else{
      Alert.alert("Erro ⚠️","Falha ao cadastrar candidato! \nTente novamente!");
    }
    

  };

  var arrSetE:Array<{label:string, value:string|number, cargos:string[]}> = [{label:"", value:"",cargos:[""]}];
  var arrSetE2:Array<{label:string, value:string|number, cargos:string[]}> = [];
  const [eleicao, setEleicao] = useState(arrSetE);
  

  const findAllElections = async() =>{
     let i:number;
    await ElectionService.findAll().then((response: any)=>{
      arrSetE2.push({
        label:"selecionar eleição", 
        value:0,
        cargos: [""]})
      let elections:Array<Election> = response._array;
      for(i = 0; i<elections.length; i++){
        let positions = elections[i].positions.split(",");
        arrSetE2.push({
          label:elections[i].name, 
          value:elections[i].id,
          cargos: positions});
  
      }
        setEleicao(arrSetE2);
      console.log("ArrSetE:"+eleicao);
      eleicao.map(e=>{
        console.log(e.label);
      })
      

    })
  }

  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const [selectedCargo, setSelectedCargo] = useState("");
  const [cargos, setCargos] = useState([""]);
  // Novo estado
  const [loadSecondScreen, setLoadSecondScreen] = useState(false);
   
  const findSelectedElection =(value:number)=>{
    
    let e:{label:string, value:string|number, cargos:string[]} | undefined;
    e = eleicao.find(e => e.value === value);
    let c = ["selecionar cargo"];
    let fc= [""];
    if(e !== undefined){
       fc = c.concat(e.cargos);
      setCargos(fc);
    }
    
  }

  const [selectedImage, setSelectedImage] = useState("");
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPicturePath(result.assets[0].uri);
      Alert.alert("✅ Imagem selecionada com sucesso!");
    } else {
      Alert.alert("⚠️ Nenhuma imagem foi selecionada!");
    }
  };

  useEffect(()=>{
    findAllElections();
  },[]);

  const electionOptions=()=>{
    eleicao.map(e=>{
      return{
        
      }
    })
  }

  if (loadSecondScreen) {
    return (
      <GluestackUIProvider>
        <BoxContainer alignItems={"center"}>
          <Header title="Cadastrar Candidato" headerWidth={"100%"}/>
          <Box
            alignItems="baseline"
            justifyContent="flex-start"
            flexDirection="row"
            w={"100%"}
            gap={"$2"}
          >
            <Box w={"50%"} alignItems="flex-start" justifyContent="center">
              <DInput placeholder="Ex: João" text="Nome*" onChange={setName}/>
              <DInput placeholder="Ex: Chapa Verde" text="Chapa" onChange={setParty}/>
            </Box>
            <Box w={"50%"} alignItems="flex-start" justifyContent="center">
              <DInput placeholder="Ex: 55" keyType={"numeric"} maxLength={2} text="Número*" onChange={setNumber}/>
              <DInput placeholder="Ex: Maria" text="Vice" onChange={setViceName}/>
            </Box>
          </Box>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent={"center"}
            gap={"$2"}
          >
            <Text fontWeight="$bold">Escolher foto</Text>
            <Entypo
              name="upload-to-cloud"
              size={40}
              color="black"
              onPress={pickImageAsync}
            />
          </Box>
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
              onPress={realizarCadastro}
            />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
  } else {
    
    return  (
      <GluestackUIProvider>
        <BoxContainer alignItems={"flex-start"}>
          <Header title="Cadastrar Candidato" />
          
          <Picker 
          
          style={{ height: "10%", width: "100%",backgroundColor:"white", borderColor:"black" }}
           selectedValue = {selectedOption}
           onValueChange={(itemValue:string) => {
            setSelectedOption(itemValue);
            findSelectedElection(Number(itemValue));
            console.log("Eleição Selecionada: "+itemValue);         
          }} 

          
          >
           {eleicao.map(item => {
            return <Picker.Item key={item.label} label={item.label} value={item.value} />
          })}
            
          </Picker>

          <Text fontSize="$md" fontWeight="$bold" mt={"$3"}>
            Escolher cargo *
          </Text>

          <Picker 
          
          style={{ height: "10%", width: "100%",backgroundColor:"white", borderColor:"black" }}
           selectedValue = {selectedCargo}
           onValueChange={(itemValue:string) => {
            setSelectedCargo(itemValue);
            console.log("Cargo Selecionado: "+itemValue);         
          }} 

          
          >
           {cargos.map(item => {
            return <Picker.Item key={item}  label={item} value={item} />
          })}
            
          </Picker>
          
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
              onPress={cadastrarCandidato}
            />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
  }
};
