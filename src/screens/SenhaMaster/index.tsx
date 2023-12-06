import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { DInput } from "../../components/DInput";
import { Image } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import MasterService from "../../services/MasterService";
import { Alert } from "react-native";

export const SenhaMaster = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [senhaMaster, setSenhaMaster] = useState<string>("");
  const [confirmSenhaMaster, setConfirmSenhaMaster] = useState<string>("");

 
  const addMaster = async()=>{
    let msg = ""

      if(senhaMaster != "" && confirmSenhaMaster != ""){
        if(senhaMaster == confirmSenhaMaster){
          msg = await MasterService.addMaster(senhaMaster);
        }else{
          msg = "Senhas não conferem!";
        }     
      }else{
         msg = "Preencha todos os campos!";
      }
    
    Alert.alert(msg);
  }

  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"center"}>
        <Header title="Senha Master"></Header>
        <DInput
          placeholder="Senha Master"
          showIcon={true}
          width="$90%"
          onChange={setSenhaMaster}
          text="Cadastre a Senha Master*"
        />
        <DInput
          placeholder="Senha Master"
          showIcon={true}
          width="$90%"
          onChange={setConfirmSenhaMaster}
          text="Repita a Senha Master*"
        />
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
          <FontAwesome name="check" size={32} color="green" onPress={()=> addMaster()} />
        </Box>
      </BoxContainer>
    </GluestackUIProvider>
  );
};
