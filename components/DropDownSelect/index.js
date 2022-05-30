import React from "react";
import { Container, SelectLabel, StyledSelectDropdown } from "./styles";

const Dropdown = ({
  label,
  data,
  onSelect,
  placeholder,
  defaultValue = "",
}) => {
  return (
    <Container>
      <SelectLabel>{label}</SelectLabel>
      <StyledSelectDropdown
        data={data}
        onSelect={onSelect}
        defaultButtonText={placeholder}
        defaultValue={defaultValue}
      />
    </Container>
  );
};

export default Dropdown;
