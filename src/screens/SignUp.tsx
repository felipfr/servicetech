import * as zod from "zod";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import logo from '../assets/logo_primary.webp'
import { Alert, Keyboard, Image, TouchableWithoutFeedback } from "react-native";
import { Box, Icon, KeyboardAvoidingView, useTheme, VStack } from "native-base";
import { Button } from "../components/Button";
import { Envelope, Key } from "phosphor-react-native";
import { FormInput } from "../components/FormInput";
import { Header } from "../components/Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpValidationSchema = zod
  .object({
    email: zod
      .string({ required_error: "O email é obrigatório" })
      .email("Digite um email válido"),
    password: zod
      .string({ required_error: "A senha é obrigatória" })
      .min(6, "A senha deve conter no mínimo 6 caracteres"),
    passwordConfirmation: zod.string().optional(),
  })
  .refine(data => data.passwordConfirmation === data.password, {
    message: "As senhas devem ser iguais",
    path: ["passwordConfirmation"],
  });

type SignUpFormData = zod.infer<typeof signUpValidationSchema>;

export const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();

  const { handleSubmit, control, formState: { errors }, } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpValidationSchema),
  });

  async function handleSignUp({ email, password }: SignUpFormData) {
    setIsLoading(true);

    try {
      await auth()
        .createUserWithEmailAndPassword(email, password);
      Alert.alert("", "Usuário cadastrado com sucesso!");
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Ops!", "Este email já está em uso. Tente novamente com um email diferente.");
      } else {
        Alert.alert("Ops!", "Não foi possível criar sua conta, tente novamente.");
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box bg="blueGray.900" flex={1}>
        <KeyboardAvoidingView behavior="position" enabled>
          <VStack alignItems="center" px={8} pt={24}>
            <Image source={logo} style={{ width: 260, height: 140 }} />

            <Header title="Crie sua Conta" />

            <FormInput
              placeholder="Email"
              keyboardType="email-address"
              mb={4}
              InputLeftElement={
                <Icon ml={4} as={<Envelope color={colors.blueGray[300]} />} />
              }
              name="email"
              control={control}
              error={errors.email?.message}
            />

            <FormInput
              placeholder="Senha"
              secureTextEntry
              mb={4}
              InputLeftElement={
                <Icon ml={4} as={<Key color={colors.blueGray[300]} />} />
              }
              name="password"
              control={control}
              error={errors.password?.message}
            />

            <FormInput
              placeholder="Confirme sua Senha"
              secureTextEntry
              mb={8}
              InputLeftElement={
                <Icon ml={4} as={<Key color={colors.blueGray[300]} />} />
              }
              name="passwordConfirmation"
              control={control}
              error={errors.passwordConfirmation?.message}
            />

            <Button
              title="Cadastrar"
              w="full"
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
              mb={4}
            />
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
};
