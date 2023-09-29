import { GluestackUIProvider, Box } from "@gluestack-ui/themed";

type BoxProps = {
    children: React.ReactNode;
  };
export const BoxContainer = (props: BoxProps) => {
  return (
    <GluestackUIProvider>
        <Box flex={1} p={"$4"} justifyContent="center" alignItems="center">
          {props.children}
        </Box>
    </GluestackUIProvider>
  );
};