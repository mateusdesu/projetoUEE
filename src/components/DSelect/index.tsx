import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

type DSelectProps = {
  items: any;
  onValueChange: any;
  selectedValue: any;

};

export const DSelect = ({items, onValueChange} : DSelectProps) => {
  //const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <Picker style={{ height: "10%", width: "100%",backgroundColor:"white", borderColor:"black" }}
      //selectedValue={selectedOption}
      /*onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}*/
    >
      {items.map((item: { key: string | undefined; value: string | null; label: string | undefined; }) => {
        return <Picker.Item key={item.label} label={item.label} value={item.value} />
      })}
    </Picker>
  );
};
