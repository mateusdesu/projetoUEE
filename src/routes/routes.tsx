import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CadastrarEleicao } from '../screens/CadastrarEleicao';
const Stack = createNativeStackNavigator();

export const Routes = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CadastrarEleicao" component={CadastrarEleicao} />
        </Stack.Navigator>
    );
}