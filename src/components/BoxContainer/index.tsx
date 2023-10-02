import { GluestackUIProvider, Box } from "@gluestack-ui/themed";

type BoxProps = {
    children: React.ReactNode;
    alignItems?: any;
  };
export const BoxContainer = (props: BoxProps) => {
  return (
    <GluestackUIProvider>
        <Box flex={2} p={"$4"} justifyContent="center" alignItems={props.alignItems}>
          {props.children}
        </Box>
    </GluestackUIProvider>
  );
};