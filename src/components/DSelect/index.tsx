import {
  GluestackUIProvider,
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
export const DSelect = () => {
  return (
    <GluestackUIProvider>
      <Select>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select option" />
          <SelectIcon mr="$3">
            <FontAwesome name="chevron-down" size={24} color="black" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem label="UX Research" value="ux" />
            <SelectItem label="Web Development" value="web" />
            <SelectItem
              label="Cross Platform Development Process"
              value="Cross Platform Development Process"
            />
            <SelectItem label="UI Designing" value="ui" isDisabled={true} />
            <SelectItem label="Backend Development" value="backend" />
          </SelectContent>
        </SelectPortal>
      </Select>
    </GluestackUIProvider>
  );
};
