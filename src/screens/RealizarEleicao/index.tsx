import { Header } from "../../components/Header";
import { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { BoxContainer } from "../../components/BoxContainer";
import {
  Text,
  GluestackUIProvider,
  Box,
  HStack,
  Button,
  ButtonText,
  Image
} from "@gluestack-ui/themed";
import { useState } from "react";
import { DInput } from "../../components/DInput";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Election } from "../../models/Election";
import ElectionService from "../../services/ElectionService";
import { Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CandidateService from "../../services/CandidateService";
import { Candidate } from "../../models/Candidate";
import {Audio} from 'expo-av';

export const RealizarEleicao = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [firstNumberVoted, setFistNumberVoted] = useState<string | any>("");
  const [secondNumberVoted, setSecondNumberVoted] = useState<string | any>("");
  const [NumberVoted, setNumberVoted] = useState<string | any>("");
  const [candidatePicture, setCandidatePicture] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateViceName, setCandidateViceName] = useState<string | null>("");
  const [candidateParty, setCandidateParty] = useState<string | null>("");
  const [candidateId, setCandidateId] = useState<number | null>(0);
  const [passToClose, setPassToClose] = useState("");

  const [candidates, setCandidates] = useState<Array<Candidate>>([]);
  const styles = StyleSheet.create({
    CandidatePicture: { width: 115, height: 120 },
  });

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  const [positionToVote, setPositionToVote] = useState("");

  const [password, setPassword] = useState("");
  const [positions, setPositions] = useState<Array<string>>([]);

  var arrSetE: Array<{
    label: string;
    value: string | number;
    positions: Array<string>;
  }> = [{ label: "", value: "", positions: [] }];
  var arrSetE2: Array<{
    label: string;
    value: string | number;
    positions: Array<string>;
  }> = [];

  const [eleicao, setEleicao] = useState(arrSetE);

  async function playSound() {  
    const sound = new Audio.Sound();
    await sound.loadAsync(require('../../assets/SomUrna.mp3'));
    await sound.playAsync();
  }

  const findAllElections = async () => {
    let i: number;
    await ElectionService.findAll().then((response: any) => {
      arrSetE2.push({
        label: "selecionar eleição",
        value: 0,
        positions: [],
      });
      let elections: Array<Election> = response._array;
      for (i = 0; i < elections.length; i++) {
        if (!elections[i].closed) {
          arrSetE2.push({
            label: elections[i].name,
            value: elections[i].id,
            positions: elections[i].positions.split(","),
          });
        }
      }
      setEleicao(arrSetE2);
    });
  };

  const checkCrendentials = async (password: string, id: number) => {
    let confirm = await ElectionService.checkElectionCredential(id, password);

    if (confirm) {
      SetScreen(2);

      electionSession();
    } else {
      Alert.alert("Senha incorreta!");
    }
  };

  function handleVotes(num: string) {
    if (firstNumberVoted === "") {
      setFistNumberVoted(num);
      setNumberVoted(num);
    } else if (firstNumberVoted != "" && secondNumberVoted === "") {
      setSecondNumberVoted(num);
      setNumberVoted(NumberVoted + num);
    }
  }

  const computeVote = async (id: number) => {
    if (id != 0) {
      let voteWasComputed = await ElectionService.computeVote(id);
      if (voteWasComputed) {          
        clear();
        await playSound();   
        Alert.alert("Voto Confirmado!");        
        electionSession();
      } else {
        Alert.alert("Falha ao computar voto");
      }
    }
  };

  const computeWhiteVote = async (electionId: number, position: string) => {
    let voteWasComputed = await ElectionService.computeWhiteVotes(
      electionId,
      position
    );
    if (voteWasComputed) {
      clear();
      await playSound();
      Alert.alert("Voto Em Branco Confirmado!");
      electionSession();
    } else {
      Alert.alert("Falha ao computar voto");
    }
  };

  const [index, setIndex] = useState(0);

  const electionSession = () => {
    let el = eleicao.find((e) => e.value == Number(selectedOption));
    el != undefined ? setPositions(el.positions) : setPositions(["INDEFINIDO"]);

    if (index == 0 || index < positions.length) {
      setPositionToVote(positions[index]);
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      Alert.alert("FIM!", "", [
        {
          text: "PRÓXIMO",
          onPress: () => {
            setPositionToVote(positions[0]);
            setIndex(1);
          },
        },
      ]);
    }
  };

  const closeElection = async (electionId: number, password: string) => {
    let check = await ElectionService.checkElectionCredential(
      Number(selectedOption),
      password
    );

    if (check) {
      let electionClosed = await ElectionService.closeElection(electionId);

      if (electionClosed) {
        Alert.alert("Eleição encerrada!");
        clear();
        setSelectedOption("");
        SetScreen(1);
        setIndex(0);
      } else {
        Alert.alert("Falha ao encerrar eleição!");
      }
    } else {
      Alert.alert("Senha Incorreta!");
    }
  };

  useEffect(() => {
    setNumberVoted(firstNumberVoted + secondNumberVoted);

    if (secondNumberVoted != "") {
      let c = candidates.filter(
        (candidate) =>
          candidate.number == NumberVoted.toString() &&
          candidate.electionId == Number(selectedOption) &&
          candidate.position == positionToVote
      );

      if (c.length > 0) {
        setCandidateName(c[0].name);
        setCandidateId(c[0].id);

        if (c[0].picture_path != "") {
          setCandidatePicture(c[0].picture_path);
        }

        if (c[0].vice_name != "") {
          setCandidateViceName(c[0].vice_name);
        }

        if (c[0].party != "") {
          setCandidateParty(c[0].party);
        }
      } else {
        Alert.alert("Candidato inválido!");
      }
    }
  }, [secondNumberVoted]);

  function clear() {
    setFistNumberVoted("");
    setSecondNumberVoted("");
    setNumberVoted("");
    setCandidateName("");
    setCandidateViceName("");
    setCandidateParty("");
    setCandidatePicture("");
    setCandidateId(null);
  }

  useEffect(() => {
    findAllElections();

    async function findAllCandidates() {
      let c = await CandidateService.findAll();
      setCandidates(c);
    }

    findAllCandidates();
    //setPositionToVote(positions[0]);
  }, []);

  useEffect(() => {
    let el = eleicao.find((e) => e.value == Number(selectedOption));
    el != undefined ? setPositions(el.positions) : setPositions(["INDEFINIDO"]);
    if (index == 0) {
      setPositionToVote(positions[0]);
    }
  }, [selectedOption]);

  const [screen, SetScreen] = useState(1);
  if (screen === 1) {
    return (
      <GluestackUIProvider>
        <BoxContainer alignItems={"flex-start"}>
          <Header title="Realizar Eleição" />
          <Text fontSize={"$lg"} fontWeight="bold" mb={"$1"}>
            Selecionar Eleição*
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
  } else if (screen === 2) {
    return (
      <BoxContainer alignItems={"center"} flexDirection={"row"} gap={"$2"}>
        <Box w={"50%"} h={"100%"} bg="#f0f0f0" flexDirection="column">
          <Box pl={"$2"} pt={"$2"} flexDirection={"row"} h={"40%"}>
            <Box w={"50%"}>
              <Text fontSize={"$2xl"} lineHeight={"$2xl"} fontWeight="$bold"
              sx={{
                "@lg": {
                  fontSize: "$5xl",
                  lineHeight: "$5xl"
                },
              }}>
                Seu voto para
              </Text>
              <Text
                fontSize={"$xl"}
                lineHeight={"$xl"}
                fontWeight="$bold"
                color="$blueGray600"
                sx={{
                  "@lg": {
                    fontSize: "$4xl",
                    lineHeight: "$4xl"
                  },
                }}
              >
                {positionToVote}
              </Text>
              <Box flexDirection="row" gap={"$1"}>
                <Box
                  borderColor="$black"
                  borderWidth={"$2"}
                  h={"$12"}
                  w={"$10"}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    "@lg": {
                      h: "$24",
                      w: "$16",
                    },
                  }}
                >
                  <Text
                    fontSize={"$2xl"}
                    lineHeight={"$2xl"}
                    fontWeight="$bold"
                    sx={{
                      "@lg": {
                        fontSize: "$5xl",
                        lineHeight: "$5xl",
                      },
                    }}
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
                  sx={{
                    "@lg": {
                      h: "$24",
                      w: "$16",
                    },
                  }}
                >
                  <Text
                    fontSize={"$2xl"}
                    lineHeight={"$2xl"}
                    fontWeight="$bold"
                    sx={{
                      "@lg": {
                        fontSize: "$5xl",
                        lineHeight: "$5xl",
                      },
                    }}
                  >
                    {secondNumberVoted}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box justifyContent="flex-start" alignItems="center" w={"50%"}>
              {candidatePicture != "" ? (
                <Box borderColor="$black" borderWidth={"$2"}>
                  <Image
                    source={{ uri: candidatePicture }}
                    alt="Foto Candidato"
                    size="xl"
                    sx={{
                      "@lg": {
                        h :"100%",
                        w :"$72"
                      },
                    }}
                  />
              </Box>
              ): (<></>)}
              
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box pl={"$2"} pt={"$2"} flexDirection={"column"} w={"50%"}>
              <Text fontSize={"$2xl"} lineHeight={"$2xl"} fontWeight="$bold"
              sx={{
                "@lg": {
                  fontSize: "$5xl",
                  lineHeight: "$5xl"
                },
              }}>
                Nome
              </Text>
              <Text
                fontSize={"$xl"}
                lineHeight={"$xl"}
                fontWeight="$bold"
                color="$blueGray600"
                sx={{
                  "@lg": {
                    fontSize: "$4xl",
                    lineHeight: "$4xl"
                  },
                }}
              >
                {candidateName}
              </Text>
              {candidateViceName && (
                <>
                  <Text
                    fontSize={"$2xl"}
                    lineHeight={"$2xl"}
                    fontWeight="$bold"
                    sx={{
                      "@lg": {
                        fontSize: "$5xl",
                        lineHeight: "$5xl"
                      },
                    }}
                  >
                    Vice
                  </Text>
                  <Text
                    fontSize={"$xl"}
                    lineHeight={"$xl"}
                    fontWeight="$bold"
                    color="$blueGray600"
                    sx={{
                      "@lg": {
                        fontSize: "$4xl",
                    lineHeight: "$4xl"
                      },
                    }}
                  >
                    {candidateViceName}
                  </Text>
                </>
              )}
              {candidateParty && (
                <>
                  <Text
                    fontSize={"$2xl"}
                    lineHeight={"$2xl"}
                    fontWeight="$bold"
                    sx={{
                      "@lg": {
                        fontSize: "$5xl",
                        lineHeight: "$5xl"
                      },
                    }}
                  >
                    Chapa
                  </Text>
                  <Text
                    fontSize={"$xl"}
                    lineHeight={"$xl"}
                    fontWeight="$bold"
                    color="$blueGray600"
                    sx={{
                      "@lg": {
                        fontSize: "$4xl",
                    lineHeight: "$4xl"
                      },
                    }}
                  >
                    {candidateParty}
                  </Text>
                </>
              )}
            </Box>
            <Box w={"50%"} alignItems="center" justifyContent="flex-end">
              <Ionicons
                name="exit-outline"
                size={60}
                color="black"
                onPress={() => SetScreen(3)}
              />
              <Text fontSize={"$xl"} fontWeight="bold"
               sx={{
                "@lg": {
                  fontSize: "$4xl",
              lineHeight: "$4xl"
                },
              }}>
                Pressione a tecla
              </Text>
              <Text fontSize={"$lg"} fontWeight="bold" color="$emerald400"
               sx={{
                "@lg": {
                  fontSize: "$3xl",
              lineHeight: "$3xl"
                },
              }}>
                Verde{" "}
                <Text fontSize={"$lg"} fontWeight="bold"
                 sx={{
                  "@lg": {
                    fontSize: "$3xl",
                lineHeight: "$3xl"
                  },
                }}>
                  para{" "}
                </Text>
                confirmar
              </Text>
              <Text fontSize={"$lg"} fontWeight="bold" color="$amber500"
               sx={{
                "@lg": {
                  fontSize: "$3xl",
              lineHeight: "$3xl"
                },
              }}>
                Laranja{" "}
                <Text fontSize={"$lg"} fontWeight="bold"
                 sx={{
                  "@lg": {
                    fontSize: "$3xl",
                lineHeight: "$3xl"
                  },
                }}>
                  para{" "}
                </Text>
                corrigir
              </Text>
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
                onPress={() =>
                  computeWhiteVote(Number(selectedOption), positionToVote)
                } //ALTERAR APÓS IMPLEMENTAR A POSIÇÃO A SER VOTADA!
                sx={{
                  "@lg": {
                    fontSize: "$3xl",
                    lineHeight: "$3xl"
                  },
                }}
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
                sx={{
                  "@lg": {
                    fontSize: "$3xl",
                    lineHeight: "$3xl"
                  },
                }}
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
                onPress={() =>
                  computeVote(candidateId != null ? candidateId : 0)
                }
                sx={{
                  "@lg": {
                    fontSize: "$3xl",
                    lineHeight: "$3xl"
                  },
                }}
              >
                Confirma
              </ButtonText>
            </Button>
          </HStack>
        </Box>
      </BoxContainer>
    );
  } else if (screen === 3) {
    return (
      <BoxContainer>
        <Header title="Encerrar Eleição" />
        <DInput
          placeholder="Senha"
          type={"password"}
          width="$90%"
          onChange={setPassToClose}
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
            onPress={() => SetScreen(2)}
          />
          <FontAwesome
            name="check"
            size={32}
            color="green"
            onPress={() => closeElection(Number(selectedOption), passToClose)}
          />
        </Box>
      </BoxContainer>
    );
  }
};
