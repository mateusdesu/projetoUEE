import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { BoxContainer } from "../../components/BoxContainer";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

export const CadastrarCandidato2 = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const realizarCadastro = () => {
    Alert.alert("Sucesso ✅", "Candidato Cadastrado");
  };

  const [selectedImage, setSelectedImage] = useState('');

  const pickImageAsync = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      quality:1
    });

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri);
      Alert.alert("✅ Imagem selecionada com sucesso!");
      
    }else{
      Alert.alert("⚠️ Nenhuma imagem foi selecionada!");
    }
  }

  return (
    <GluestackUIProvider>
      <Header title="Cadastrar Candidato" />
      <BoxContainer alignItems={"flex-start"}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          w={"100%"}
          mt={"$8"}
        >
          <Entypo name="upload-to-cloud" size={24} color="black" onPress={pickImageAsync}/>
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
            onPress={() => realizarCadastro}
          />
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
