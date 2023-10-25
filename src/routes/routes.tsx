import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { CadastrarEleicao } from "../screens/CadastrarEleicao";
import { CadastrarCandidato } from "../screens/CadastrarCandidato";
import { RealizarEleicao } from "../screens/RealizarEleicao";
import { ResultadoEleicao } from "../screens/ResultadoEleicao";
import { MenuConfig } from "../screens/MenuConfig";

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
    </Stack.Navigator>
  );
};
