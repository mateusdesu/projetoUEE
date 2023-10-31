import {
  GluestackUIProvider,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Box,
  Text
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
  text?: string;
};

import { useState } from "react";

export const DInput = (props: DefaultInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <GluestackUIProvider>
      <Box alignItems="flex-start" justifyContent="center">
        <Text fontSize={"$lg"} fontWeight={"$bold"} color="$blueGray600">{props.text}</Text>
      <Input width={props.width} my="$2" borderRadius={"$2xl"} borderColor="$blue900">
        <InputField
          backgroundColor="$white"
          padding={"$2"}
          placeholder={props.placeholder}
          accessibilityElementsHidden={false}
          onChangeText={props.onChange}
          keyboardType={props.keyType || "default"}
          maxLength={props.maxLength}
          type={props.type || showPassword ? "text" : "password"}
        />
        {props.showIcon && (
          <InputSlot
            w={"$10"}
            justifyContent="center"
            alignItems="center"
            backgroundColor="$white"
            onPress={toggleShowPassword}
          >
            <InputIcon>
              {<FontAwesome name={showPassword ? "eye-slash" : "eye"} size={16} color="black" />}
            </InputIcon>
          </InputSlot>
        )}
      </Input>
      </Box>
    </GluestackUIProvider>
  );
};
