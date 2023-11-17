import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { CadastrarEleicao } from "../screens/CadastrarEleicao";
import { CadastrarCandidato } from "../screens/CadastrarCandidato";
import { RealizarEleicao } from "../screens/RealizarEleicao";
import { ResultadoEleicao } from "../screens/ResultadoEleicao";
import { MenuConfig } from "../screens/MenuConfig";
import {Contato} from "../screens/Contato"
import {Termos} from "../screens/Termos"

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CadastrarEleicao" component={CadastrarEleicao} />
      <Stack.Screen name="CadastrarCandidato" component={CadastrarCandidato} />
      <Stack.Screen name="RealizarEleicao" component={RealizarEleicao} />
      <Stack.Screen name="ResultadoEleicao" component={ResultadoEleicao} />
      <Stack.Screen name="MenuConfig" component={MenuConfig} />
      <Stack.Screen name="Contato" component={Contato} />
      <Stack.Screen name="Termos" component={Termos} />
    </Stack.Navigator>
  );
};
