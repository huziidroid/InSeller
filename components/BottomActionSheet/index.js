import React from "react";
import { Container, StyledInput } from "./styles";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const ActionSheet = ({
  value,
  label,
  placeholder,
  options,
  fontSize,
  setValue,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const showActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: options.map((option) => option.label),
        cancelButtonIndex: options.length - 1,
        destructiveButtonIndex: options.length - 1,
        title: placeholder,
        containerStyle: {
          width: width,
          height: height - 300,
        },
      },
      (buttonIndex) => {
        if (buttonIndex !== options.length - 1) {
          setValue(options[buttonIndex]);
        } else {
          setValue(placeholder);
        }
      }
    );
  };
  return (
    <Container onPress={showActionSheet}>
      <StyledInput
        fontSize={fontSize}
        value={value.label}
        disabled
        showSoftInputOnFocus={false}
        pointerEvents="none"
        label={label}
        placeholder={placeholder}
      />
    </Container>
  );
};

export default ActionSheet;
