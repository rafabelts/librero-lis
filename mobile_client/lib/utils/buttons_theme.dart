/* 
  In this file are declared the theme data for the eleveted and outlined button styles.
  Made by: Rafael Alejandro Beltrán Santos
*/

import 'package:flutter/material.dart';
import 'package:mobile_client/utils/colors.dart';

final appColorScheme = AppColorScheme.lightColorScheme;

class AppButtonTheme {
  AppButtonTheme._();

// Elevated button theme for the light theme of the app
  static ElevatedButtonThemeData elevatedButtonLightTheme =
      ElevatedButtonThemeData(
    style: ButtonStyle(
      fixedSize: MaterialStateProperty.all(const Size(72, 48)),
      backgroundColor: MaterialStateProperty.all(appColorScheme.primary),
      foregroundColor: MaterialStateProperty.all(appColorScheme.onPrimary),
      overlayColor:
          MaterialStateProperty.all(const Color(0xFF113A6F)), // 4675B1
      shape: MaterialStateProperty.all(
        RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(6),
        ),
      ),
      elevation: MaterialStateProperty.all(5),
      textStyle: MaterialStatePropertyAll(
        TextStyle(
          color: appColorScheme.onPrimary,
          fontWeight: FontWeight.bold,
        ),
      ),
    ),
  );

// Outlined button theme for the light theme of the app
  static OutlinedButtonThemeData outlinedButtonLightTheme =
      OutlinedButtonThemeData(
    style: ButtonStyle(
      fixedSize: MaterialStateProperty.all(const Size(72, 48)),
      foregroundColor: MaterialStateProperty.all(
        const Color.fromARGB(255, 70, 117, 177),
      ),
      overlayColor:
          MaterialStateProperty.all(const Color.fromARGB(255, 232, 238, 245)),
      side: MaterialStateProperty.all(
        const BorderSide(
            width: 2,
            color: Color.fromARGB(255, 70, 117, 177),
            style: BorderStyle.solid),
      ),
      shape: MaterialStateProperty.all(
        RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(6),
        ),
      ),
      textStyle: const MaterialStatePropertyAll(
        TextStyle(
          color: Color.fromRGBO(70, 117, 177, 100),
          fontWeight: FontWeight.bold,
        ),
      ),
    ),
  );
}
