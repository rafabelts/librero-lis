// ignore_for_file: non_constant_identifier_names, prefer_const_constructors
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/widgets/error_alert_dialogs.dart';
import 'package:mobile_client/widgets/success_alert_dialogs.dart';

String url = "http://192.168.1.194:3001"; // 192.168.1.173

class AuthService {
  static void signUp(
    BuildContext context,
    String student_id,
    String email,
    String password,
    String name,
  ) async {
    final response = await http.post(
      Uri.parse('$url/api/librero-lis/auth/sign-up'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'student_id': student_id,
        'email': email,
        'password': password,
        'name': name,
        'user_type': 'student',
      }),
    );

    if (response.statusCode == 201) {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => AccountVerification(email: email),
        ),
      );
    } else if (response.statusCode == 409) {
      if (response.body.contains("Email already taken")) {
        Future.microtask(
          () => showDialog(
            context: context,
            builder: (BuildContext context) => ErrorEmailAlreadyTaken(),
          ),
        );
      }

      if (response.body.contains("Student ID already taken")) {
        Future.microtask(
          () => showDialog(
              context: context,
              builder: (BuildContext context) =>
                  ErrorStudenIDAlreadyTaken(studentID: student_id)),
        );
      }
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorInServer(),
        ),
      );
    }
  }

  // This function makes a get request to see if the user is logged on or not
  static Stream<bool?> checkUserLoggedOn() {
    return http
        .get(
          Uri.parse("$url/api/librero-lis/user-session-status"),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
        )
        .asStream()
        .asyncMap(
          (response) {
            if (response.statusCode == 201) {
              return true;
            } else {
              return false;
            }
          },
        );
  }

  // Handdle log in function
  static void logIn(
    BuildContext context,
    String email,
    String password,
  ) async {
    final response = await http.post(
      Uri.parse("$url/api/librero-lis/auth/log-in"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        <String, String>{
          "email": email,
          "password": password,
        },
      ),
    );

    if (response.statusCode == 201) {
      Future.microtask(
          () => Navigator.pushReplacementNamed(context, Routes.mainPage));
    } else if (response.statusCode == 401) {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorLogingIn(),
        ),
      );
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorInServer(),
        ),
      );
    }
  }

  static void signOut(BuildContext context) async {
    final response = await http.get(Uri.parse("$url/api/librero-lis/sign-out"));

    if (response.statusCode == 201) {
      Future.microtask(() {
        Navigator.pop(context);
        Navigator.pushReplacementNamed(context, Routes.welcomeScreen);
      });
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorInServer(),
        ),
      );
    }
  }
}
