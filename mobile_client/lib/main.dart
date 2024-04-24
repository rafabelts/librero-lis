// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/screens/main_page.dart';
import 'package:mobile_client/screens/welcome_screen.dart';
import 'package:mobile_client/services/shared_preferences.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future main() async {
  await dotenv.load(fileName: ".env");

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late Widget screen = Welcome();
  void _redirect() async {
    final prefs = await SharedPreferences.getInstance();

    String id = SharedPreferencesService.get_user_id(prefs);
    String name = SharedPreferencesService.get_user_name(prefs);
    String student_id = SharedPreferencesService.get_user_student_id(prefs);
    String user_type = SharedPreferencesService.get_user_type(prefs);

    if (id != '' && name != '' && student_id != '' && user_type != '') {
      setState(() {
        screen = MainPage();
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _redirect();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: AppTheme.lightTheme,
      debugShowCheckedModeBanner: false,
      routes: routes,
      /*
      This makes the call of the function that checks if the user is logged in, if the user is logged on it will render the main page
       */
      home: screen,
    );
  }

  @override
  void dispose() {
    super.dispose();
  }
}
