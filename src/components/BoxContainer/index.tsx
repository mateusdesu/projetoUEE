import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import {ImageBackground} from 'react-native'

type BoxProps = {
    children: React.ReactNode;
    alignItems?: any;
    flexDirection?: any;
  };
export const BoxContainer = (props: BoxProps) => {
  return (
    <GluestackUIProvider>
      <ImageBackground source={require("../../assets/bg.png")} resizeMode="cover" style={{flex: 1, justifyContent: "center", padding: 0, margin: 0}}>
        <Box p={"$4"} justifyContent="center" alignItems={props.alignItems || "center"} flexDirection={props.flexDirection}>
          {props.children}
        </Box>
        </ImageBackground>
    </GluestackUIProvider>
  );
};