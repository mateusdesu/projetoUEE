import { GluestackUIProvider, Input, InputField } from "@gluestack-ui/themed";

type DefaultInputProps = {
    text: string;
}

export const DInput = (props: DefaultInputProps) => {
    return (
    <GluestackUIProvider>
        <Input>
        <InputField placeholder={props.text} accessibilityElementsHidden={true}/>
        </Input>
    </GluestackUIProvider>
    )
};
