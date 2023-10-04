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
        bg="$green400"
        borderColor="$black"
        borderWidth={"$1"}
        width={props.width || "80%"}
        height={"$12"}
        mx={"auto"}
        p={"$1"}
        my={"$1"}
        borderRadius={"$xl"}
        onPress={props.onPress}
      >
        <Text color="$trueGray900" fontWeight="$bold" fontSize={"$xl"} textAlign="center">
          {props.text}
        </Text>
      </Button>
    </GluestackUIProvider>
  );
};
