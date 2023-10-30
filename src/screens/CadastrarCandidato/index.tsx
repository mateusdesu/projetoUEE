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

export const CadastrarCandidato = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const cadastrarCandidato = () => {
    if (selectedOption === null || selectedCargoItem === null) {
      Alert.alert("Erro ⚠️", "Escolha uma opção");
    } else {
      Alert.alert(
        "Sucesso ✅",
        `Eleição: ${selectedOption} | Cargo: ${selectedCargoItem}`
      );
      // navigation.navigate("CadastrarCandidato2");
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
    let candidate = new Candidate(name, number, electionId, party, picture_path, vice_name, null);
    let inserido = await CandidateService.addCandidate(candidate);
    CandidateService.findAll(0);
    
    if(inserido){
      Alert.alert("Sucesso ✅", "Candidato Cadastrado");
    }else{
      Alert.alert("Erro ⚠️","Falha ao cadastrar candidato! \nTente novamente!");
    }
    

  };

  var arrSetE:Array<{label:string, value:string|number, cargos:string[]}> = [];
  const [eleicao, setEleicao] = useState(
    arrSetE);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedCargo, setSelectedCargo] = useState<string[]>([]);
  const [selectedCargoItem, setSelectedCargoItem] = useState<string | null>(
    null
  ); // Novo estado
  const [loadSecondScreen, setLoadSecondScreen] = useState(false);

  const handleElectionChange = (value: string | null) => {
    setSelectedOption(value);
    // Encontrar a opção selecionada para obter os cargos.
    const selected = eleicao.find((item) => item.value === value);
    if (selected) {
      setSelectedCargo(selected.cargos || []);
      setSelectedCargoItem(null); // Limpar o cargo selecionado quando a eleição muda
    } else {
      setSelectedCargo([]);
      setSelectedCargoItem(null);
    }
  };

  const handleCargoChange = (value: string | null) => {
    setSelectedCargoItem(value); // Atualizar o estado do cargo selecionado
  };

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

  //var arrSetE:Array<{label:string, value:number|null, cargos:string[]}> = [];
  const findAllElections = async() =>{
    let elections:Array<Election> = await ElectionService.findAll();
    let e:any;
    let i:number;
    console.log("Eleições: "+elections);
    
    /*for(i = 0; i<elections.length; i++){
      let positions = elections[i].positions.split(",");
      arrSetE.push({label:elections[i].name, value: elections[i].id, cargos: positions});
    }*/

    for(e in elections){
      let positions = e.positions.split(",");
      arrSetE.push({label:e.name, value: e.id, cargos: positions});
    }


    console.log("ArrSetE: "+arrSetE);

    
  }
  useEffect(()=>{
    findAllElections();
  })
  
  
  
  

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
              <DInput placeholder="Ex: João" text="Nome*"/>
              <DInput placeholder="Ex: Chapa Verde" text="Chapa"/>
            </Box>
            <Box w={"50%"} alignItems="flex-start" justifyContent="center">
              <DInput placeholder="Ex: 55" keyType={"numeric"} maxLength={2} text="Número*"/>
              <DInput placeholder="Ex: Maria" text="Vice"/>
            </Box>
          </Box>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent={"center"}
            gap={"$2"}
            mt={"$3"}
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
    return (
      <GluestackUIProvider>
        <BoxContainer alignItems={"flex-start"}>
          <Header title="Cadastrar Candidato" />
          <Text fontSize="$md" fontWeight="$bold">
            Escolher eleição *
          </Text>
          <DSelect
            items={eleicao.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            onChangeValue={handleElectionChange}
            zIndex={10000}
          />

          <Text fontSize="$md" fontWeight="$bold" mt={"$3"}>
            Escolher cargo *
          </Text>
          <DSelect
            items={selectedCargo.map((cargo) => ({
              label: cargo,
              value: cargo,
            }))}
            onChangeValue={handleCargoChange} // Adicionado para lidar com a seleção do cargo
          />
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
