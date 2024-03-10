/* 
  In this file are defined the themes of the colorscheme, elevated button and outlined button
  Made by: Rafael Alejandro Beltrán Santos
*/

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile_client/utils/buttons_theme.dart';
import 'package:mobile_client/utils/colors.dart';
import 'package:mobile_client/utils/input_decoration.dart';
import 'package:mobile_client/utils/search_bars.dart';

final appColorScheme = AppColorScheme.lightColorScheme;

class AppTheme {
  AppTheme._();

  static ThemeData lightTheme = ThemeData(
    colorScheme: appColorScheme,
    elevatedButtonTheme: AppButtonTheme.elevatedButtonLightTheme,
    outlinedButtonTheme: AppButtonTheme.outlinedButtonLightTheme,
    fontFamily: 'Puritan',
    searchBarTheme: AppSearchBarTheme.lightTheme,
    inputDecorationTheme: AppInputDecoration.lightTheme,
    splashColor: appColorScheme.primaryContainer,
    splashFactory: InkSplash.splashFactory,
    iconTheme: const IconThemeData(
      size: 40,
      color: Color.fromARGB(255, 200, 199, 204),
    ),
  );
}
