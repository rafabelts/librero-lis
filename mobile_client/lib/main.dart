// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/screens/admin/scanner.dart';
import 'package:mobile_client/screens/main_page.dart';

import 'package:mobile_client/screens/welcome_screen.dart';
import 'package:mobile_client/services/auth_service.dart';
import 'package:mobile_client/utils/theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: AppTheme.lightTheme,
      debugShowCheckedModeBanner: false,
      routes: routes,
      /*
      This makes the call of the function that checks if the user is logged in, if the user is logged on it will render the main page
       */

      home: StreamBuilder<bool?>(
        stream: AuthService.checkUserLoggedOn(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return CircularProgressIndicator();
          } else {
            print(snapshot.data);
            if (snapshot.hasData && snapshot.data == true) {
              return MainPage();
            } else {
              // return BookScanner();
              return Welcome();
            }
          }
        },
      ),
    );
  }
}
