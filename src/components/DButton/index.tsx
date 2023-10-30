import { GluestackUIProvider, Button, Text } from "@gluestack-ui/themed";

type MainButtonProps = {
  text: string;
  onPress?: () => void;
  width?: any;
};
export const DButton = (props: MainButtonProps) => {
  return (
    <GluestackUIProvider>
      <Button
        bg="white"
        borderColor="$green900"
        borderWidth={"$2"}
        width={props.width || "80%"}
        height={"$12"}
        mx={"auto"}
        p={"$1"}
        my={"$1"}
        borderRadius={"$2xl"}
        onPress={props.onPress}
      >
        <Text color="$blue900" lineHeight={"$2xl"} fontWeight="$bold" fontSize={"$2xl"} textAlign="center">
          {props.text}
        </Text>
      </Button>
    </GluestackUIProvider>
  );
};
