// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile_client/utils/buttons_theme.dart';

BorderSide getBorder(Set<MaterialState> states) {
  if (states.contains(MaterialState.focused)) {
    return BorderSide(width: 2, color: appColorScheme.primary);
  } else {
    return BorderSide(width: 1, color: Color.fromARGB(255, 113, 111, 122));
  }
}

class AppSearchBarTheme {
  AppSearchBarTheme._();

  static SearchBarThemeData lightTheme = SearchBarThemeData(
    backgroundColor: MaterialStateProperty.all(Colors.transparent),
    elevation: MaterialStateProperty.all(0),
    overlayColor: MaterialStateProperty.all(
      Color.fromARGB(255, 232, 238, 245),
    ),
    padding: MaterialStateProperty.all(EdgeInsets.symmetric(horizontal: 10.0)),
    side: MaterialStateProperty.resolveWith(getBorder),
    shape: MaterialStateProperty.all(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(4),
      ),
    ),
  );
}
