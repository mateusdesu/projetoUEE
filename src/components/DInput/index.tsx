import {
  GluestackUIProvider,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";

type DefaultInputProps = {
  placeholder: string;
  onChange?: any;
  width?: any;
  keyType?: any;
  maxLength?: number;
  type?: any;
  showIcon?: boolean;
};

import { useState } from "react";

export const DInput = (props: DefaultInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <GluestackUIProvider>
      <Input width={props.width} my="$2" borderRadius={"$xl"}>
        <InputField
          backgroundColor="$white"
          padding={"$2"}
          placeholder={props.placeholder}
          accessibilityElementsHidden={false}
          onChangeText={props.onChange}
          keyboardType={props.keyType || "default"}
          maxLength={props.maxLength}
          type={showPassword ? "text" : "password"}
        />
        {props.showIcon && (
          <InputSlot
            w={"$10"}
            justifyContent="center"
            alignItems="center"
            onPress={toggleShowPassword}
          >
            <InputIcon>
              {<FontAwesome name={showPassword ? "eye-slash" : "eye"} size={16} color="black" />}
            </InputIcon>
          </InputSlot>
        )}
      </Input>
    </GluestackUIProvider>
  );
};
