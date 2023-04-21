import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="blueGray.700"
      h={14}
      size="md"
      borderWidth={0}
      borderRadius={5}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="blueGray.300"
      _focus={
        {
          borderWidth: 1,
          borderColor: 'green.500',
          bg: 'blueGray.700'
        }
      }
      { ...rest }
    />
  );
}
