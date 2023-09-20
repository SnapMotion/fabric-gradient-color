// @ts-nocheck
import { Box, Input } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

export default function RGBItem({ value, type, label, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (value !== +inputValue && inputValue !== "") {
      setInputValue(value);
    }
  }, [inputValue, value]);

  const onChangeHandler = useCallback(
    (event) => {
      const value = +event.target.value;

      if (Number.isNaN(value) || value.length > 3 || value < 0 || value > 255) {
        return;
      }
      setInputValue(event.target.value);

      onChange(value);
    },
    [onChange]
  );

  const onBlur = useCallback(() => {
    !inputValue && inputValue !== 0 && setInputValue(value);
  }, [inputValue, setInputValue, value]);

  return (
    <Box>
      <Input
        size={"sm"}
        value={inputValue}
        type={type}
        label={label}
        onChange={onChangeHandler}
        onBlur={onBlur}
        classes="rgb"
        padding={0}
        textAlign={"center"}
      />
      <Box fontSize={"sm"} color={"gray.400"} textAlign={"center"} pt={1}>
        {label}
      </Box>
    </Box>
  );
}
