import { GluestackUIProvider, Input, InputField } from "@gluestack-ui/themed";

type DefaultInputProps = {
    text: string;
}

export const DefaultInput = (props: DefaultInputProps) => {
    return (
    <GluestackUIProvider>
        <Input>
        <InputField placeholder={props.text} />
        </Input>
    </GluestackUIProvider>
    )
};
