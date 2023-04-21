import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string;
}

export function DeleteButton({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      bg="danger.700"
      h={14}
      rounded="sm"
      fontSize="sm"
      _pressed={
        {
          bg: "danger.500"
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
