
import { Box, GluestackUIProvider, Text,ScrollView } from "@gluestack-ui/themed";
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
          <Text fontSize={"$lg"} fontWeight="$bold"
           sx={{
            "@lg": {
              fontSize: "$3xl",
            lineHeight: "$3xl"
            },
          }}>Autores:</Text>
          <Text
          sx={{
            "@lg": {
              fontSize: "$2xl",
            lineHeight: "$2xl"
            },
          }}
          >
            Adriana da Silva Lisboa Tomaz E-mail: atomaz@unicarioca.edu.br 
          </Text>
          <Text
          sx={{
            "@lg": {
              fontSize: "$2xl",
            lineHeight: "$2xl"
            },
          }}
          >
            Augusto Schwager de Carvalho E-mail: augustoschwager@yahoo.com.br 
          </Text>
          <Text fontSize={"$lg"} fontWeight="$bold"
          sx={{
            "@lg": {
              fontSize: "$3xl",
            lineHeight: "$3xl"
            },
          }}>Desenvolvedores:</Text>
          <Text fontSize={"$md"} fontWeight="$bold" 
          sx={{
            "@lg": {
              fontSize: "$3xl",
            lineHeight: "$3xl"
            },
          }}>Programação</Text>
          <Text
          sx={{
            "@lg": {
              fontSize: "$2xl",
            lineHeight: "$2xl"
            },
          }}>Mateus Lopes da Silva E-mail: mateuslopes1717@gmail.com</Text>
          <Text
          sx={{
            "@lg": {
              fontSize: "$2xl",
            lineHeight: "$2xl"
            },
          }}>Victor Revers Kasnowski E-mail: victor.kasnowski@gmail.com</Text>
          <Text
          sx={{
            "@lg": {
              fontSize: "$2xl",
            lineHeight: "$2xl"
            },
          }}>Nathalia Gorito da Silva E-mail: natgorito@gmail.com</Text>
          <Text fontSize={"$md"} fontWeight="$bold"
          sx={{
            "@lg": {
              fontSize: "$3xl",
            lineHeight: "$3xl"
            },
          }}>Design</Text>
          <Text
          >Gustavo Souza Caetano Lima: E-mail: caetanogustavo2000@gmail.com</Text>
          <Text
          >Isabel Marchon Trota E-mail: isabelmarchontt2@gmail.com</Text>
          <Text
          >Daniel Farias Vinhas Paiva E-mail: daninhoworks@gmail.com</Text>
          <Text fontSize={"$lg"} fontWeight="$bold"
          sx={{
            "@lg": {
              fontSize: "$3xl",
            lineHeight: "$3xl"
            },
          }}>Links:</Text>
          <Text
          sx={{
            "@lg": {
              fontSize: "$2xl",
            lineHeight: "$2xl"
            },
          }}>Mestrado Unicarioca: https://unicarioca.edu.br/cursos/mestrado/novas-tecnologias-digitais-na-educacao</Text>
          <Text
          sx={{
            "@lg": {
              fontSize: "$2xl",
            lineHeight: "$2xl"
            },
          }}>Grupo EduTech Unicarioca : https://edutechunicarioca.blogspot.com/</Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          w={"95%"}
          mt={"$2"}
        >
          <FontAwesome
            name="chevron-left"
            size={28}
            color="black"
            onPress={() => navigation.navigate("MenuConfig")}
          />
        </Box>
     
        </ScrollView>
      </BoxContainer>
    </GluestackUIProvider>
  );
};