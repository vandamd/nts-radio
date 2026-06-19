import type React from "react";
import { Text as DefaultText, StyleSheet, type TextProps } from "react-native";

interface StyledTextProps extends TextProps {
  children: React.ReactNode;
}

export function StyledText({ style, ...rest }: StyledTextProps) {
  return (
    <DefaultText
      allowFontScaling={false}
      style={[styles.text, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "PublicSans-Regular",
  },
});
