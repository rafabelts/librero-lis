// ignore_for_file: non_constant_identifier_names

import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:mobile_client/models/user.dart';

Future<void> createUser(
  String student_id,
  String email,
  String password,
  String name,
) async {
  final response = await http.post(
    Uri.parse('http://10.50.15.12:3001/librero-lis/api'),
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
    print("User created");
  } else {
    throw Exception('Failed to create user');
  }
}
