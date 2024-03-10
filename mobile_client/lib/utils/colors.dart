/* 
  In this file is defined the app color scheme
  Made by: Rafael Alejandro Beltrán Santos
*/

// ignore_for_file: prefer_const_constructors
import 'package:flutter/material.dart';

class AppColorScheme {
  AppColorScheme._();

  static ColorScheme lightColorScheme = ColorScheme(
    brightness: Brightness.light,
    primary: Color.fromARGB(255, 24, 82, 157),
    onPrimary: Color.fromARGB(255, 237, 237, 238),
    secondary: Color.fromARGB(255, 36, 157, 78),
    onSecondary: Color.fromARGB(255, 237, 237, 238),
    primaryContainer: Color.fromARGB(255, 232, 238, 245),
    onPrimaryContainer: Color.fromARGB(255, 42, 41, 49),
    error: Color.fromARGB(255, 205, 47, 27),
    onError: Color.fromARGB(255, 252, 235, 233),
    errorContainer: Color.fromARGB(255, 252, 235, 233),
    onErrorContainer: Color.fromARGB(255, 252, 235, 233),
    background: Color(0xFFF9FAFB),
    onBackground: Color.fromARGB(255, 32, 32, 37),
    surface: Color.fromARGB(255, 42, 41, 49),
    onSurface: Color.fromARGB(255, 32, 32, 37),
  );
}
