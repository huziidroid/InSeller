import React from "react";
import { Container, SelectLabel, StyledSelectDropdown } from "./styles";

const Dropdown = ({ label, data, onSelect, placeholder }) => {
  return (
    <Container>
      <SelectLabel>{label}</SelectLabel>
      <StyledSelectDropdown
        data={data}
        onSelect={onSelect}
        defaultButtonText={placeholder}
      />
    </Container>
  );
};

export default Dropdown;
