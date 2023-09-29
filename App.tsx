import { GluestackUIProvider} from '@gluestack-ui/themed';
import { Home } from './src/screens/Home';


export default function App() {
  return (
    <GluestackUIProvider>
      <Home />
    </GluestackUIProvider>
  );
}