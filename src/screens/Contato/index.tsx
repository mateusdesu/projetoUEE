
import { Box, GluestackUIProvider, Text,ScrollView } from "@gluestack-ui/themed";

import { Box, Text, GluestackUIProvider } from "@gluestack-ui/themed";

import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React from "react";

export const Contato = ({navigation,}: {navigation: NavigationProp<any>;}) =>
{
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"center"}>
        <ScrollView>
        <Header title="Contato"></Header>
        <Box bgColor="white" p={"$2"}>
          <Text fontSize={"$lg"} fontWeight="$bold">Autores:</Text>
          <Text>
            Adriana da Silva Lisboa Tomaz E-mail: atomaz@unicarioca.edu.br 
          </Text>
          <Text>
            Augusto Schwager de Carvalho E-mail: augustoschwager@yahoo.com.br 
          </Text>
          <Text fontSize={"$lg"} fontWeight="$bold">Desenvolvedores:</Text>
          <Text fontSize={"$md"} fontWeight="$bold">Programação</Text>
          <Text>Mateus Lopes da Silva E-mail: mateuslopes1717@gmail.com</Text>
          <Text>Victor Revers Kasnowski E-mail: victor.kasnowski@gmail.com</Text>
          <Text>Nathalia Gorito da Silva E-mail: natgorito@gmail.com</Text>
          <Text fontSize={"$md"} fontWeight="$bold">Design</Text>
          <Text>Gustavo Souza Caetano Lima: E-mail: caetanogustavo2000@gmail.com</Text>
          <Text>Isabel Marchon Trota E-mail: isabelmarchontt2@gmail.com</Text>
          <Text>Daniel Farias Vinhas Paiva E-mail: daninhoworks@gmail.com</Text>
          <Text fontSize={"$lg"} fontWeight="$bold">Links:</Text>
          <Text>Mestrado Unicarioca: https://unicarioca.edu.br/cursos/mestrado/novas-tecnologias-digitais-na-educacao</Text>
          <Text>Grupo EduTech Unicarioca : https://edutechunicarioca.blogspot.com/</Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          w={"95%"}
        >
          <FontAwesome
            name="chevron-left"
            size={28}
            color="black"
            onPress={() => navigation.navigate("MenuConfig")}
          />

      <Box flexDirection="row" justifyContent="space-between">
        <Box>
          <Text fontWeight="$bold">Adriana da Silva Lisboa Tomaz</Text>
          <Box flexDirection="column">
            <FontAwesome name="envelope" size={28} color={"black"}/>
            <Text>atomaz@unicarioca.edu.br</Text>
            <FontAwesome name="phone" size={28} color={"black"}/>
            <Text>(21) 97056-2595</Text>
          </Box>
        </Box>

        <Box>
          <Text fontWeight="$bold">Augusto Schwager de Carvalho</Text>
          <Box>
            <FontAwesome name="envelope" size={28} color={"black"}/>
            <Text>augustoschwager@yahoo.com.br</Text>
            <FontAwesome name="phone" size={28} color={"black"}/>
            <Text>(21) 98208-5344</Text>
          </Box>
        </Box>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" w={"95%"}>
          <FontAwesome name="chevron-left" size={28} color="black" onPress={() => navigation.navigate("MenuConfig")}/>

        </Box>
        </ScrollView>
      </BoxContainer>
    </GluestackUIProvider>
  );
};