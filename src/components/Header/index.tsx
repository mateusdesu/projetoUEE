import { GluestackUIProvider, Box, Text, Image } from "@gluestack-ui/themed";

type HeaderProps = {
  title: string;
  headerWidth?: any;
};
export const Header = (props: HeaderProps) => {
  return (
    <GluestackUIProvider>
      <Box
        px={"$2"}
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      >
        <Box w={"30%" || props.headerWidth}></Box>
        <Box alignItems="center" justifyContent="center">
        <Text fontSize="$4xl" fontWeight="$bold" lineHeight={"$4xl"} alignSelf="center" color="$blue900">
          {props.title}
        </Text>
        </Box>
        
        <Image
          ml="$48"
          size="sm"
          alt="Logo Urna Eletrônica Escolar"
          source={require("../../assets/icon.png")}
        />
      </Box>
    </GluestackUIProvider>
  );
};
