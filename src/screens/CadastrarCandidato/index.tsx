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
      setScreen(2);
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
  const [electionPass, setElectionPass] = useState("");

  const checkElectionCredential = async ()=>{
    let authorized = await ElectionService.checkElectionCredential(Number(selectedOption), electionPass);

    if(authorized){
      realizarCadastro();
    }else{
      Alert.alert("Senha incorreta!");
    }
  }

  const realizarCadastro = async () => {
    let inserido = false;
    let realPicPath = "";

    let candidates = await CandidateService.findAll();

    let numCad = candidates.find((c) => c.number == number && c.electionId == Number(selectedOption) && c.position == selectedCargo);

    //let numCad = await CandidateService.findByNumber(number, Number(selectedOption));
    if(numCad != undefined){
      Alert.alert("Número já cadastrado para este cargo!");
    }else{
      const election = eleicao.find((e) => e.value === Number(selectedOption));
      const eName = election != undefined ? election.label : "";

      if (picture_path != "") {
      realPicPath = await ImageService.uploadPic(picture_path, eName, number+"_"+selectedCargo);
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
    }

    if (inserido) {
      Alert.alert(
        "Sucesso ✅",
        "Candidato Cadastrado\nDeseja cadastrar outro candidato?",
        [
          {
            text: "Sim",
            onPress: () => {
              clearInputs();
              setScreen(1);
            },
          },
          {
            text: "Não",
            onPress: () => {
              clearInputs();
              navigation.navigate("Home");
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Erro ⚠️",
        "Falha ao cadastrar candidato! \nTente novamente!"
      );
    }
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
        if(!elections[i].closed){
          arrSetE2.push({
            label: elections[i].name,
            value: elections[i].id,
            cargos: positions,
          });
        }
      }
      setEleicao(arrSetE2);
      
      
    });
  };

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [selectedCargo, setSelectedCargo] = useState(" ");
  const [cargos, setCargos] = useState([""]);
  // Novo estado
  const [screen, setScreen] = useState(1);

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

  const confirmNextScreen = () => {
    if (name !== "" && number !== "" && number.length == 2) {
      if (!hasImage && !hasParty && !hasVice) {
        setScreen(3);
      }
      if (hasParty && hasImage && hasVice) {
        if (party !== "" && picture_path !== "" && vice_name !== "") {
          setScreen(3);
        } else {
          Alert.alert("Erro ⚠️", "Preencha todos os campos");
        }
      }
      else if(hasParty && hasImage){
        if (party !== "" && picture_path !== "") {
          setScreen(3);
        } else {
          Alert.alert("Erro ⚠️", "Chapa ou Imagem não preenchido");
        }
      }
      else if(hasVice && hasImage){
        if (vice_name !== "" && picture_path !== "") {
          setScreen(3);
        } else {
          Alert.alert("Erro ⚠️", "Campos Vice ou Imagem não preenchidos");
        }
      }
      else if(hasVice && hasParty){
        if (vice_name !== "" && party !== "") {
          setScreen(3);
        } else {
          Alert.alert("Erro ⚠️", "Vice ou Chapa não preenchidos");
        }
      }
      else if (hasVice) {
        if (vice_name !== "") {
          setScreen(3);
        } else {
          Alert.alert("Erro ⚠️", "Campo Vice vazio");
        }
      }
      else if (hasParty) {
        if (party !== "") {
          setScreen(3);
        } else {
          Alert.alert("Erro ⚠️", "Campo Chapa vazio");
        }
      }
      else if (hasImage) {
        if (picture_path !== "") {
          setScreen(3);
        } else {
          Alert.alert("Erro ⚠️", "Campo Chapa vazio");
        }
      }
    } else {
      Alert.alert("Erro ⚠️", "Preencha todos os campos corretamente");
    }
  };

  const clearInputs = () => {
    setName("");
    setNumber("");
    setParty("");
    setViceName("");
    setPicturePath("");
  };

  if (screen === 2) {
    return (
      <GluestackUIProvider>
        <BoxContainer alignItems={"center"}>
          <Header title="Cadastrar Candidato" headerWidth={"100%"} />
          <Box
            alignItems="baseline"
            justifyContent="flex-start"
            flexDirection="row"
            w={"100%"}
            gap={"$2"}
            mt={"1%"}
          >
            {hasVice && hasParty && (
              <>
                <Box w={"50%"}  alignItems="flex-start" justifyContent="center"
                sx={{
                  "@lg": {
                    gap: "$10",
                  },
                }}>
                  <DInput
                    placeholder="Ex: João"
                    text="Nome*"
                    onChange={setName}
                    type={"text"}
                  />
                  <DInput
                    placeholder="Ex: Chapa Verde"
                    text="Chapa"
                    type={"text"}
                    onChange={setParty}
                  />
                </Box>
                <Box w={"50%"} alignItems="flex-start" justifyContent="center"
                sx={{
                  "@lg": {
                    gap: "$10",
                  },
                }}>
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
                </Box>
              </>
            )}
            {!hasVice && !hasParty && (
              <>
                <Box w={"50%"} alignItems="flex-start" justifyContent="center">
                  <DInput
                    placeholder="Ex: João"
                    text="Nome*"
                    onChange={setName}
                    type={"text"}
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
                </Box>
              </>
            )}
            {hasParty && (
              <>
                <Box w={"50%"} alignItems="flex-start" justifyContent="center" sx={{
                  "@lg": {
                    gap: "$10",
                  },
                }}>
                  <DInput
                    placeholder="Ex: João"
                    text="Nome*"
                    onChange={setName}
                    type={"text"}
                  />
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
                </Box>
              </>
            )}
            {hasVice && (
              <>
                <Box w={"50%"} alignItems="flex-start" justifyContent="center"
                sx={{
                  "@lg": {
                    gap: "$10",
                  },
                }}>
                  <DInput
                    placeholder="Ex: João"
                    text="Nome*"
                    onChange={setName}
                    type={"text"}
                  />
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
                </Box>
              </>
            )}
          </Box>
          {hasImage && (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent={"center"}
              gap={"$2"}
            >
              <Text fontWeight="$bold" fontSize={"$lg"}>
                Escolher foto
              </Text>
              <Entypo
                name="upload-to-cloud"
                size={60}
                color="black"
                onPress={pickImageAsync}
              />
            </Box>
          )}

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
              onPress={() => {
                clearInputs();
                setScreen(1);
              }}
            />

            <FontAwesome
              name="check"
              size={32}
              color="green"
              onPress={() => confirmNextScreen()}
            />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
  } else if (screen === 1) {
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
            }}
          >
            {cargos.map((item) => {
              return <Picker.Item key={item} label={item} value={item} />;
            })}
          </Picker>
          <Box
            flexDirection="row"
            p={"$1"}
            mt={"$2"}
            alignItems="center"
            gap={"$2"}
            bgColor="$white"
          >
            <Checkbox
              value={hasVice}
              style={{ backgroundColor: "white" }}
              onValueChange={() =>
                hasVice === false ? setHasVice(true) : setHasVice(false)
              }
            />
            <Text fontSize={"$lg"} fontWeight="$bold">
              Candidato terá vice?
            </Text>
            <Checkbox
              value={hasParty}
              style={{ backgroundColor: "white" }}
              onValueChange={() =>
                hasParty === false ? setHasParty(true) : setHasParty(false)
              }
            />
            <Text fontSize={"$lg"} fontWeight="$bold">
              Candidato terá chapa?
            </Text>
            <Checkbox
              value={hasImage}
              style={{ backgroundColor: "white" }}
              onValueChange={() =>
                hasImage === false ? setHasImage(true) : setHasImage(false)
              }
            />
            <Text fontSize={"$lg"} fontWeight="$bold">
              Candidato terá foto?
            </Text>
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
              onPress={() => {
                clearInputs();
                navigation.goBack();
              }}
            />

            <Text fontSize={"$md"} fontWeight="$bold">
              *Preenchimento Obrigatório
            </Text>

            <FontAwesome
              name="check"
              size={32}
              color="green"
              onPress={() => cadastrarCandidato()}
            />
          </Box>
        </BoxContainer>
      </GluestackUIProvider>
    );
  } else if (screen === 3) {
    return (
      <BoxContainer>
        <Header title="Cadastrar Candidato" />
        <DInput
          placeholder="Senha"
          type={"password"}
          width="$90%"
          onChange={setElectionPass}
          text="Senha da Eleição"
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
            onPress={() => {
              clearInputs();
              setScreen(2);
            }}
          />
          <FontAwesome
            name="check"
            size={32}
            color="green"
            onPress={() => checkElectionCredential()}
          />
        </Box>
      </BoxContainer>
    );
  }
};
