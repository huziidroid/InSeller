import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../colors";
import { InputWrapper, StyledInput } from "./styles";

const SearchInput = ({ value, searchRef, placeholder, onChange }) => {
  return (
    <InputWrapper>
      <StyledInput
        value={value}
        ref={searchRef}
        placeholder={placeholder}
        onChangeText={onChange}
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity onPress={() => searchRef.current.focus()}>
        <Feather
          style={{ marginRight: 30 }}
          name="search"
          size={20}
          color={Colors.secondary}
        />
      </TouchableOpacity>
    </InputWrapper>
  );
};

export default SearchInput;
