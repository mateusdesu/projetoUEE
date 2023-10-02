import { GluestackUIProvider, Input, InputField } from "@gluestack-ui/themed";

type DefaultInputProps = {
  placeholder: string;
  onChange: any;
  width: any;
};

export const DInput = (props: DefaultInputProps) => {
  return (
    <GluestackUIProvider>
      <Input width={props.width} my="$2">
        <InputField
          placeholder={props.placeholder}
          accessibilityElementsHidden={false}
          onChangeText={props.onChange}
        />
      </Input>
    </GluestackUIProvider>
  );
};
