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
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      ><Box alignItems="center" justifyContent="center">
        <Text fontSize="$3xl" fontWeight="$bold" lineHeight={"$3xl"} alignSelf="center">
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
