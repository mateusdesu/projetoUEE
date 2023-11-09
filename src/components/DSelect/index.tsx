import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View } from "react-native";

type DSelectProps = {
  items: any;
};

export const DSelect = ({items} : DSelectProps) => {
  const [selectedItem, setSelectedItem] = useState();
  return (
    
    <Picker style={{ height: "10%", width: "100%",backgroundColor:"white",
  borderTopStartRadius: 10, borderTopEndRadius: 10, borderBottomStartRadius: 10, borderBottomEndRadius: 10, }}
      selectedValue={selectedItem}
      onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
    >
      {items.map((item: { key: string | undefined; value: string | null; label: string | undefined; }) => {
        return <Picker.Item key={item.label} label={item.label} value={item.value} />
      })}
    </Picker>
  );
};
