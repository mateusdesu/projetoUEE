import { GluestackUIProvider, Box, Text, Image } from "@gluestack-ui/themed";

type HeaderProps = {
  title: string;
};
export const Header = (props: HeaderProps) => {
  return (
    <GluestackUIProvider>
      <Box
        px={"$2"}
        pt={"$5"}
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="row"
      >
        <Text fontSize="$4xl" fontWeight="$bold" lineHeight={"$4xl"}>
          {props.title}
        </Text>
        <Image
          ml="$48"
          size="md"
          alt="Logo Urna Eletrônica Escolar"
          source={require("../../assets/icon.png")}
        />
      </Box>
    </GluestackUIProvider>
  );
};
