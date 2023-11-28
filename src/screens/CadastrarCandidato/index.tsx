import React, { useEffect, useState } from "react";
import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
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
import Checkbox from "expo-checkbox";
export const CadastrarCandidato = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const cadastrarCandidato = () => {
    if (
      selectedOption === undefined ||
      selectedOption === "selecionar eleição" ||
      selectedCargo === null ||
      selectedCargo === "selecionar cargo"
    ) {
      Alert.alert("Erro ⚠️", "Escolha uma opção");
    } else {
      Alert.alert(
        "Sucesso ✅",
        `Eleição: ${selectedOption} | Cargo: ${selectedCargo}`
      );
      setLoadSecondScreen(true);
    }
  };

  const [name, setName] = useState("");
  const [vice_name, setViceName] = useState("");
  const [number, setNumber] = useState("");
  let [picture_path, setPicturePath] = useState("");
  const [party, setParty] = useState("");
  const [electionId, setElectionId] = useState(0);
  const [hasImage, setHasImage] = useState(false);
  const [hasParty, setHasParty] = useState(false);
  const [hasVice, setHasVice] = useState(false);

  const realizarCadastro = async () => {
    let inserido = false;
    let realPicPath = "";

    const election = eleicao.find((e) => e.value === electionId);
    const eName = election != undefined ? election.label : "";

    if (picture_path != "") {
      realPicPath = await ImageService.uploadPic(picture_path, eName, number);
    }

    let candidate = new Candidate(
      name,
      number,
      Number(selectedOption),
      selectedCargo,
      party,
      realPicPath,
      vice_name,
      null
    );

    if (eName != "") {
      inserido = await CandidateService.addCandidate(candidate);
      console.log("valor de inserido: " + inserido);
    }

    if (inserido) {
      Alert.alert("Sucesso ✅", "Candidato Cadastrado");
    } else {
      Alert.alert(
        "Erro ⚠️",
        "Falha ao cadastrar candidato! \nTente novamente!"
      );
    }
  };

  var arrSetE: Array<{
    label: string;
    value: string | number;
    cargos: string[];
  }> = [{ label: "", value: "", cargos: [""] }];
  var arrSetE2: Array<{
    label: string;
    value: string | number;
    cargos: string[];
  }> = [];
  const [eleicao, setEleicao] = useState(arrSetE);

  const findAllElections = async () => {
    let i: number;
    await ElectionService.findAll().then((response: any) => {
      arrSetE2.push({
        label: "selecionar eleição",
        value: 0,
        cargos: [""],
      });
      let elections: Array<Election> = response._array;
      for (i = 0; i < elections.length; i++) {
        let positions = elections[i].positions.split(",");
        arrSetE2.push({
          label: elections[i].name,
          value: elections[i].id,
          cargos: positions,
        });
      }
      setEleicao(arrSetE2);
      console.log("ArrSetE:" + eleicao);
      eleicao.map((e) => {
        console.log(e.label);
      });
    });
  };

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [selectedCargo, setSelectedCargo] = useState(" ");
  const [cargos, setCargos] = useState([""]);
  // Novo estado
  const [loadSecondScreen, setLoadSecondScreen] = useState(false);

  const findSelectedElection = (value: number) => {
    let e:
      | { label: string; value: string | number; cargos: string[] }
      | undefined;
    e = eleicao.find((e) => e.value === value);
    let c = ["selecionar cargo"];
    let fc = [""];
    if (e !== undefined) {
      fc = c.concat(e.cargos);
      setCargos(fc);
    }
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

  useEffect(() => {
    findAllElections();
  }, []);

  const electionOptions = () => {
    eleicao.map((e) => {
      return {};
    });
  };

  if (loadSecondScreen) {
    return (
      <GluestackUIProvider>
        <BoxContainer alignItems={"center"}>
          <Header title="Cadastrar Candidato" headerWidth={"100%"} />
          <Box
            alignItems="baseline"
            justifyContent="flex-start"
            flexDirection="row"
            w={"100%"}
            gap={"$2"} mt={"1%"}
          >
            
            {hasVice && hasParty &&
            <>
            <Box w={"50%"} alignItems="flex-start" justifyContent="center">
            <DInput placeholder="Ex: João" text="Nome*" onChange={setName} type={"text"}/>
            <DInput
              placeholder="Ex: Chapa Verde"
              text="Chapa"
              type={"text"}
              onChange={setParty}
            />
          </Box>
          <Box w={"50%"} alignItems="flex-start" justifyContent="center">
            <DInput
              placeholder="Ex: 55"
              keyType={"numeric"}
              maxLength={2}
              text="Número*"
              type={"text"}
              onChange={setNumber}
            />
            
            <DInput
              placeholder="Ex: Maria"
              text="Vice"
              type={"text"}
              onChange={setViceName}
            />
          </Box></>}
          {!hasVice && !hasParty && 
            <>
            <Box w={"50%"} alignItems="flex-start" justifyContent="center">
            <DInput placeholder="Ex: João" text="Nome*" onChange={setName} type={"text"}/>
            
          </Box>
          <Box w={"50%"} alignItems="flex-start" justifyContent="center">
            <DInput
              placeholder="Ex: 55"
              keyType={"numeric"}
              maxLength={2}
              text="Número*"
              type={"text"}
              onChange={setNumber}
            />
            
           
          </Box></>}
          {hasParty &&
            <>
            <Box w={"50%"} alignItems="flex-start" justifyContent="center">
            <DInput placeholder="Ex: João" text="Nome*" onChange={setName} type={"text"}/>
            <DInput
              placeholder="Ex: Chapa Verde"
              text="Chapa"
              type={"text"}
              onChange={setParty}
            />
          </Box>
          <Box w={"50%"} alignItems="flex-start" justifyContent="center">
            <DInput
              placeholder="Ex: 55"
              keyType={"numeric"}
              maxLength={2}
              text="Número*"
              type={"text"}
              onChange={setNumber}
            />
          </Box></>}
          {hasVice &&
            <>
            <Box w={"50%"} alignItems="flex-start" justifyContent="center">
            <DInput placeholder="Ex: João" text="Nome*" onChange={setName} type={"text"}/>
            <DInput
              placeholder="Ex: Maria"
              text="Vice"
              type={"text"}
              onChange={setViceName}
            />
          </Box>
          <Box w={"50%"} alignItems="flex-start" justifyContent="center">
            <DInput
              placeholder="Ex: 55"
              keyType={"numeric"}
              maxLength={2}
              text="Número*"
              type={"text"}
              onChange={setNumber}
            />
          </Box></>}
            
          </Box>
          {hasImage && 
           <Box
           flexDirection="row"
           alignItems="center"
           justifyContent={"center"}
           gap={"$2"}
         >
           <Text fontWeight="$bold" fontSize={"$lg"}>Escolher foto</Text>
           <Entypo
             name="upload-to-cloud"
             size={60}
             color="black"
             onPress={pickImageAsync}
           />
         </Box>}
            
          
         
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
              onPress={() => setLoadSecondScreen(false)}
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
            Escolher eleição*
          </Text>

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
              findSelectedElection(Number(itemValue));
              console.log("Eleição Selecionada: " + itemValue);
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

          <Text fontSize="$md" fontWeight="$bold" mt={"$3"}>
            Escolher cargo*
          </Text>

          <Picker
            style={{
              height: "10%",
              width: "100%",
              backgroundColor: "white",
              borderColor: "black",
            }}
            selectedValue={selectedCargo}
            onValueChange={(itemValue: string) => {
              setSelectedCargo(itemValue);
              console.log("Cargo Selecionado: " + itemValue);
            }}
          >
            {cargos.map((item) => {
              return <Picker.Item key={item} label={item} value={item} />;
            })}
          </Picker>
          <Box flexDirection="row" p={"$1"} mt={"$2"} alignItems="center" gap={"$2"} bgColor="$white">
            <Checkbox
              value={hasVice}
              style={{backgroundColor:"white"}}
              onValueChange={() =>
                hasVice === false ? setHasVice(true) : setHasVice(false)
              }
            />
            <Text fontSize={"$lg"} fontWeight="$bold">Candidato terá vice?</Text>
            <Checkbox
              value={hasParty}
              style={{backgroundColor:"white"}}
              onValueChange={() =>
                hasParty === false ? setHasParty(true) : setHasParty(false)
              }
            />
            <Text fontSize={"$lg"} fontWeight="$bold">Candidato terá chapa?</Text>
            <Checkbox
              value={hasImage}
              style={{backgroundColor:"white"}}
              onValueChange={() =>
                hasImage === false ? setHasImage(true) : setHasImage(false)
              }
            />
            <Text fontSize={"$lg"} fontWeight="$bold">Candidato terá foto?</Text>
          </Box>

          <Box
            flexDirection="row"
            alignItems="flex-end"
            justifyContent="space-between"
            w={"100%"}
            mt={"4%"}
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
