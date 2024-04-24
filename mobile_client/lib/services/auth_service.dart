// ignore_for_file: non_constant_identifier_names, prefer_const_constructors
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/services/shared_preferences.dart';
import 'package:mobile_client/widgets/error_alert_dialogs.dart';
import 'package:mobile_client/widgets/success_alert_dialogs.dart';
import 'package:mobile_client/widgets/text_sections.dart';
import 'package:shared_preferences/shared_preferences.dart';

// String url = "https://librero-server.vercel.app/auth";
String url = "http://192.168.1.115:3001/auth";

class AuthService {
  static void signUp(
    BuildContext context,
    String student_id,
    String email,
    String password,
    String name,
  ) async {
    final response = await http.post(
      Uri.parse('$url/sign-up'),
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
          builder: (BuildContext context) => SuccessDialog(
            successMessage: [
              H3BoldText(
                text: "¡Verifica tu cuenta!",
                color: Color.fromARGB(255, 17, 73, 36),
              ),
              Title2Text(
                text:
                    "Se ha enviado un link a tu correo $email para la verificación",
                color: Color.fromARGB(255, 42, 41, 49),
              ),
            ],
          ),
        ),
      );
    } else if (response.statusCode == 409) {
      if (response.body.contains("Email already taken")) {
        Future.microtask(
          () => showDialog(
            context: context,
            builder: (BuildContext context) => ErrorDialog(
              error: "Correo electrónico ya registrado",
            ),
          ),
        );
      }

      if (response.body.contains("Student ID already taken")) {
        Future.microtask(
          () => showDialog(
            context: context,
            builder: (BuildContext context) => ErrorDialog(
              error:
                  "La matrícula $student_id ya se encuentra registrada en el sistema, intente de nuevo con una diferente",
            ),
          ),
        );
      }
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'Error en el servidor',
          ),
        ),
      );
    }
  }

  // This function makes a get request to see if the user is logged on or not
  static Stream<bool?> checkUserLoggedIn() {
    return http
        .get(
          Uri.parse('$url/user-session-status'),
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

  // // Handdle log in function
  // static void logIn(BuildContext context, String email, String password) async {
  //   final response = await http.post(
  //     Uri.parse("$url/log-in"),
  //     headers: <String, String>{
  //       "Content-Type": "application/json; charset=UTF-8",
  //     },
  //     body: jsonEncode(
  //       <String, String>{
  //         "email": email,
  //         "password": password,
  //       },
  //     ),
  //   );

  //   if (response.statusCode == 201) {
  //     Future.microtask(
  //       () => Navigator.pushReplacementNamed(context, Routes.mainPage),
  //     );
  //     Map<String, dynamic> data = jsonDecode(response.body);
  //     SharedPreferencesService.saveUserData(
  //         data['id'], data['name'], data['student_id'], data['user_type']);
  //   } else if (response.statusCode == 401) {
  //     Future.microtask(
  //       () => showDialog(
  //         context: context,
  //         builder: (BuildContext context) => ErrorDialog(
  //           error: "Correo electrónico o contraseña incorrecta",
  //         ),
  //       ),
  //     );
  //   } else {
  //     Future.microtask(
  //       () => showDialog(
  //         context: context,
  //         builder: (BuildContext context) => ErrorDialog(
  //           error: 'Error en el servidor',
  //         ),
  //       ),
  //     );
  //   }
  // }

  // Handdle log in function
  static void logIn(
    BuildContext context,
    String email,
    String password,
  ) async {
    final response = await http.post(
      Uri.parse("$url/log-in"),
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

    print('Log in');
    if (response.statusCode == 201) {
      Future.microtask(() {
        Navigator.pushReplacementNamed(context, Routes.mainPage);
        Map<String, dynamic> data = jsonDecode(response.body);
        SharedPreferencesService.saveUserData(
          data['id'],
          data['name'],
          data['student_id'],
          data['user_type'],
        );
      });
    } else if (response.statusCode == 401) {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: "Correo electrónico o contraseña incorrecta",
          ),
        ),
      );
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'Error en el servidor',
          ),
        ),
      );
    }
  }

  static void signOut(BuildContext context) async {
    final response = await http.get(Uri.parse("$url/sign-out"));

    if (response.statusCode == 201) {
      final pref = await SharedPreferences.getInstance();
      pref.remove('id');
      pref.remove('name');
      pref.remove('student_id');
      pref.remove('user_type');
      Future.microtask(() {
        Navigator.pop(context);
        Navigator.pushReplacementNamed(context, Routes.welcomeScreen);
      });
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'Error en el servidor',
          ),
        ),
      );
    }
  }

  static void sendRecoveryEmail(
    BuildContext context,
    String email,
  ) async {
    final response = await http.post(
      Uri.parse("$url/send-recovery-email"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        <String, String>{
          "email": email,
        },
      ),
    );

    if (response.statusCode == 201) {
      Future.microtask(() {
        Navigator.pop(context);
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: Color(0xffbce6cb),
            content: Title2TextBold(
              text: 'Correo envíado',
            ),
          ),
        );
      });
      // Future.microtask(() => signOut(context));
    } else if (response.statusCode == 401) {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: "Error al enviar las instrucciones, intente más tarde",
          ),
        ),
      );
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'Error en el servidor',
          ),
        ),
      );
    }
  }

  static void changeName(BuildContext context, String name) async {
    final prefs = await SharedPreferences.getInstance();

    final respone = await http.post(
      Uri.parse("$url/change-name"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        <String, String>{
          "name": name,
        },
      ),
    );

    if (respone.statusCode == 201) {
      SharedPreferencesService.add_new_user_name(prefs, name);
      Future.microtask(() {
        Navigator.pop(context);
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: Color(0xffbce6cb),
            content: Title2TextBold(
              text: 'Nombre actualizado correctmente',
            ),
          ),
        );
      });
    } else if (respone.statusCode == 401) {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
              error: "Error al enviar las instrucciones, intente más tarde"),
        ),
      );
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'Error en el servidor',
          ),
        ),
      );
    }
  }

  static Future<List<dynamic>> fetchStudentsData() async {
    final response = await http.get(
      Uri.parse('$url/fetch-students-data'),
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      return [];
    }
  }
}
