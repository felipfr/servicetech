import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      bg="green.600"
      h={14}
      rounded="sm"
      fontSize="sm"
      _pressed={
        {
          bg: "emerald.500"
        }
      }
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}
