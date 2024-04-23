// ignore_for_file: non_constant_identifier_names

import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferencesService {
  static void saveUserData(
    String id,
    String name,
    String student_id,
    String user_type,
  ) async {
    final prefs = await SharedPreferences.getInstance();

    prefs.setString("id", id);
    prefs.setString("name", name);
    prefs.setString("student_id", student_id);
    prefs.setString("user_type", user_type);
  }

  static String get_user_id(SharedPreferences prefs) {
    return prefs.getString('id') ?? '';
  }

  static String get_user_name(SharedPreferences prefs) {
    return prefs.getString('name') ?? '';
  }

  static String get_user_student_id(SharedPreferences prefs) {
    return prefs.getString('student_id') ?? '';
  }

  static String get_user_type(SharedPreferences prefs) {
    return prefs.getString('user_type') ?? '';
  }

  static void add_new_user_name(SharedPreferences prefs, String name) {
    prefs.remove('name');
    prefs.reload();
    prefs.setString('name', name);
  }
}
