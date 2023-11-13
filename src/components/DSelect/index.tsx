import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Text,Box, GluestackUIProvider } from "@gluestack-ui/themed";

type DSelectProps = {
  items: any;
  text?: string;
  onValueChange?: any;
  selectedValue?: any;
  selectedOption?:any;

};

export const DSelect = ({items, selectedOption} : DSelectProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <Picker style={{ height: "10%", width: "100%",backgroundColor:"white", borderColor:"black" }}
      selectedValue={selectedOption}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
    >
      {items.map((item: { key: string | undefined; value: string | null; label: string | undefined; }) => {
        return <Picker.Item key={item.label} label={item.label} value={item.value} />
      })}
    </Picker>
  );
};
