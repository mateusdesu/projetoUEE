import { GluestackUIProvider, Input, InputField } from "@gluestack-ui/themed";

type DefaultInputProps = {
  placeholder: string;
  onChange?: any;
  width?: any;
  keyType?: any;
  maxLength?: number;
  type?: any;
};

export const DInput = (props: DefaultInputProps) => {
  return (
    <GluestackUIProvider>
      <Input width={props.width} my="$2">
        <InputField
          placeholder={props.placeholder}
          accessibilityElementsHidden={false}
          onChangeText={props.onChange}
          keyboardType={props.keyType || "default"}
          maxLength={props.maxLength}
          type={props.type}
        />
      </Input>
    </GluestackUIProvider>
  );
};
