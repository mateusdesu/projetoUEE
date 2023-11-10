import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Text,Box, GluestackUIProvider } from "@gluestack-ui/themed";

type DSelectProps = {
  items: any;
  text?: string;
};

export const DSelect = ({items,text} : DSelectProps) => {
  const [selectedItem, setSelectedItem] = useState();
  return (
    <GluestackUIProvider>
    <Box width={"100%"} h={"$20"} >
    <Text fontSize={"$lg"} fontWeight={"$bold"} color="$blueGray600">{text}</Text>
    <Picker style={{ height: "10%", width: "100%",backgroundColor:"white",
  borderTopStartRadius: 10, borderTopEndRadius: 10, borderBottomStartRadius: 10, borderBottomEndRadius: 10, }}
      selectedValue={selectedItem}
      onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
    >
      {items.map((item: { key: string | undefined; value: string | null; label: string | undefined; }) => {
        return <Picker.Item key={item.label} label={item.label} value={item.value} />
      })}
    </Picker>
    </Box>
    </GluestackUIProvider>
  );
};
