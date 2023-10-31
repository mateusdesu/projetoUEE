import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

type DSelectProps = {
  items: { label: string; value: string }[];
  zIndex?: number;
  onChangeValue?: any;
};

export const DSelect = ({ items, zIndex,onChangeValue }: DSelectProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <DropDownPicker
      onChangeValue={onChangeValue}
      placeholder="Selecione uma opção"
      dropDownDirection="DEFAULT"
      dropDownContainerStyle={{
        zIndex: zIndex || 1000, // Set a default zIndex or use the provided zIndex
      }}
      style={{width: "100%",borderRadius: 20}}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
    />
  );
};
