//ignore_for_file:prefer_const_constructors
import 'package:flutter/material.dart';
import 'package:mobile_client/screens/admin/add_book.dart';
import 'package:mobile_client/screens/admin/book_info.dart';
import 'package:mobile_client/screens/main_page.dart';
import 'package:mobile_client/screens/register/log_in.dart';
import 'package:mobile_client/screens/register/sign_up.dart';
import 'package:mobile_client/screens/admin/scanner.dart';
import 'package:mobile_client/screens/settings_screen/change_email.dart';
import 'package:mobile_client/screens/settings_screen/change_name.dart';

import 'package:mobile_client/screens/settings_screen/delete_account.dart';

import 'package:mobile_client/screens/welcome_screen.dart';

Map<String, WidgetBuilder> routes = {
  "/welcome_screen": (BuildContext context) => Welcome(),
  "/sign_up": (BuildContext context) => SignUp(),
  "/log_in": (BuildContext context) => LogIn(),
  "/main_page": (BuildContext context) => MainPage(),
  "/change_email": (BuildContext context) => ChangeEmail(),
  "/change_name": (BuildContext context) => ChangeName(),
  "/delete_account": (BuildContext context) => DeleteAccount(),
  "/book_scanner": (BuildContext context) => BookScanner(),
  "/add_book": (BuildContext context) => AddBook(),
  "/book_info": (BuildContext context) => BookInfo(),
};

class Routes {
  Routes._();
  static const String welcomeScreen = "/welcome_screen";
  static const String signUpScreen = "/sign_up";
  static const String logInScreen = "/log_in";
  static const String mainPage = "/main_page";
  static const String profileSettingsScreen = "/profile_settings";
  static const String changeEmailScreen = "/change_email";
  static const String changeName = "/change_name";
  static const String deleteAccount = "/delete_account";
  static const String bookScanner = "/book_scanner";
  static const String addBook = "/add_book";
  static const String bookInfo = "/book_info";
}
