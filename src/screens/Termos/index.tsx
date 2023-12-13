import { Box, GluestackUIProvider,Text,ScrollView } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { DButton } from "../../components/DButton";
import { BoxContainer } from "../../components/BoxContainer";
import { Image } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React from "react";

export function Termos({ navigation }: { navigation: NavigationProp<any> }) {
  return (
    <GluestackUIProvider>
      <BoxContainer alignItems={"center"}>
        <ScrollView>
        <Header title="Termos"></Header>
        <Box bgColor="white" p={"$1"} mb={"$2"}>
          <Text>
          1. Termos

Ao acessar a “UEE – Urna Eletrônica Escolar”, concordo em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concordo em ser responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar este aplicativo. Os materiais contidos neste aplicativo são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.

2. Uso de Licença

É concedida permissão para baixar uma cópia dos materiais (informações ou software), apenas para uso pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:

2.1. Modificar ou copiar os materiais;

2.2. Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);

2.3. Tentar descompilar ou fazer engenharia reversa de qualquer software contido na ”UEE – Urna Eletrônica Escolar”;

2.4. Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais;

2.5. Transferir os materiais para outra pessoa ou “espelhar” os materiais em qualquer outro servidor.

Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser reincidida pela “UEE – Urna Eletrônica Escolar” a qualquer momento.

3. Isenção de responsabilidade

Os materiais na “UEE – Urna Eletrônica Escolar” são fornecidos “como estão”. “UEE – Urna Eletrônica Escolar” não oferece garantias, expressas ou implícitas e, por este meio, isenta e nega todas as outras garantias. Além disso a “UEE – Urna Eletrônica Escolar” não garante ou faz qualquer representação relativa a precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais dentro do aplicativo ou de outra forma relacionado a esses materiais ou em sites vinculados a este aplicativo.

4. Precisão dos materiais

Os materiais exibidos no aplicativo “UEE – Urna Eletrônica Escolar” podem incluir erros técnicos, tipográficos ou fotográficos. “UEE – Urna Eletrônica Escolar” não garante qualquer material em seu aplicativo seja preciso, completo ou atual. “UEE – Urna Eletrônica Escolar” pode fazer alterações nos materiais contidos no aplicativo a qualquer momento sem aviso prévio. No entanto, “UEE – Urna Eletrônica Escolar” não se compromete a atualizar os materiais.

5. Links

A “UEE – Urna Eletrônica Escolar” não analisou todos os sites vinculados ao seu aplicativo e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por “UEE – Urna Eletrônica Escolar”. O uso de qualquer site vinculado é por conta e risco do usuário.

6. Modificações

A “UEE – Urna Eletrônica Escolar” pode revisar estes termos de serviço do aplicativo a qualquer momento sem aviso prévio. Ao usar este aplicativo você concorda em ficar vinculado a versão atual destes termos de serviço.

O uso continuado de nosso aplicativo será considerado como aceitação de nossos termos de serviço. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais entre em contato conosco através do site urnaeletronicaescolar.blogspot.com.

Esta política é efetiva a partir de setembro de 2023.
          </Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          w={"95%"}
        >
          <FontAwesome
            name="chevron-left"
            size={28}
            color="black"
            onPress={() => navigation.navigate("MenuConfig")}
          />
        </Box>
        </ScrollView>
      </BoxContainer>
    </GluestackUIProvider>
  );
}
