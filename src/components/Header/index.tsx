import { GluestackUIProvider, Box } from "@gluestack-ui/themed";

type HeaderProps = {
    children: React.ReactNode;
  };
export const Header = (props: HeaderProps) => {
  return (
    <GluestackUIProvider>
        <Box  flex={1} px={"$2"} pt={"$6"} justifyContent="space-between" alignItems="flex-start" flexDirection="row">
          {props.children}
        </Box>
    </GluestackUIProvider>
  );
};