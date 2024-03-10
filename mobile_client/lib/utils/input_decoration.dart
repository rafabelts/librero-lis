import 'package:flutter/material.dart';

class AppInputDecoration {
  AppInputDecoration._();

  static InputDecorationTheme lightTheme = InputDecorationTheme(
    alignLabelWithHint: true,
    labelStyle: const TextStyle(color: Color.fromARGB(255, 113, 111, 122)),
    floatingLabelStyle: const TextStyle(
      fontWeight: FontWeight.bold,
      color: Color.fromARGB(255, 22, 75, 143),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(4),
      borderSide: const BorderSide(
        color: Color.fromARGB(255, 113, 111, 122),
      ),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(4),
      borderSide: const BorderSide(
        width: 2.0,
        color: Color.fromARGB(255, 22, 75, 143),
      ),
    ),
    contentPadding: const EdgeInsets.symmetric(
      vertical: 2.0,
      horizontal: 15.0,
    ), // Set height of the text input
    suffixIconColor: const Color.fromARGB(255, 113, 111, 122),
    errorBorder: const OutlineInputBorder(),
  );
}
