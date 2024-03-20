// ignore_for_file: non_constant_identifier_names, prefer_const_constructors
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_client/models/user.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/widgets/error_alert_dialogs.dart';
import 'package:mobile_client/widgets/success_alert_dialogs.dart';

class AuthService {
  static Future<void> signUp(
    BuildContext context,
    String student_id,
    String email,
    String password,
    String name,
  ) async {
    final response = await http.post(
      Uri.parse('http://192.168.1.72:3001/librero-lis/api/auth/signUp'),
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

  // Handdle log in function
  static Future<void> logIn(
    BuildContext context,
    String email,
    String password,
  ) async {
    final response = await http.post(
      Uri.parse("http://192.168.1.72:3001/librero-lis/api/auth/logIn"),
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
      final user =
          User.fromJson(jsonDecode(response.body) as Map<String, String>);
      Future.microtask(
        () => Navigator.pushReplacementNamed(context, Routes.mainPageScreen),
      );
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
}
