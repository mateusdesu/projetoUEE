import {
  GluestackUIProvider,
  Box,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectContent,
  SelectItem,
  SelectPortal,
  SelectBackdrop,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
} from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";

type DselectProps = {
  item: string[];
};
export const DSelect = (props: DselectProps) => {
  return (
    <GluestackUIProvider>
      <Box alignItems="flex-start" w={"100%"}>
        <Select w="100%">
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Selecionar Eleição" />
            <SelectIcon mr="$3">
              <FontAwesome name="chevron-down" size={16} color="black" />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {props.item.map((i) => (
                <SelectItem label={i} value={i} key={i} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </Box>
    </GluestackUIProvider>
  );
};
