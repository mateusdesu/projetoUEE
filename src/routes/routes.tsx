import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { CadastrarEleicao } from "../screens/CadastrarEleicao";
import { CadastrarCandidato } from "../screens/CadastrarCandidato";
import { RealizarEleicao } from "../screens/RealizarEleicao";
import { ResultadoEleicao } from "../screens/ResultadoEleicao";
import { MenuConfig } from "../screens/MenuConfig";
import { SenhaMaster } from "../screens/SenhaMaster";
import { ExcluirCadastro } from "../screens/ExcluirCadastro";
import { Termos } from "../screens/Termos";
import { Contato } from "../screens/Contato";

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CadastrarEleicao" component={CadastrarEleicao} />
      <Stack.Screen name="CadastrarCandidato" component={CadastrarCandidato} />
      <Stack.Screen name="RealizarEleicao" component={RealizarEleicao} />
      <Stack.Screen name="ResultadoEleicao" component={ResultadoEleicao} />
      <Stack.Screen name="MenuConfig" component={MenuConfig} />
      <Stack.Screen name="SenhaMaster" component={SenhaMaster} />
      <Stack.Screen name="ExcluirCadastro" component={ExcluirCadastro} />
      <Stack.Screen name="Termos" component={Termos} />
      <Stack.Screen name="Contato" component={Contato} />
    </Stack.Navigator>
  );
};
