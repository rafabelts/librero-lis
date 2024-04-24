// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:mobile_client/services/auth_service.dart';
import 'package:mobile_client/services/book_management.dart';
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

  static void fetchInventoryData() async {
    final prefs = await SharedPreferences.getInstance();
    final fetchedBooks = await BookManagmentService.fetchBooksData();
    prefs.setString('inventory', json.encode(fetchedBooks));
  }

  static String? getInventoryData(SharedPreferences prefs) {
    return prefs.getString('inventory');
  }

  static void fetchBooksOnLoan() async {
    final prefs = await SharedPreferences.getInstance();
    final fetchedBooks = await BookManagmentService.fetchBooksOnLoanData();
    prefs.setString('onLoan', json.encode(fetchedBooks));
  }

  static String? getBooksOnLoan(SharedPreferences prefs) {
    return prefs.getString('onLoan');
  }

  static void fetchStudentData() async {
    final prefs = await SharedPreferences.getInstance();
    final fetchedStudents = await AuthService.fetchStudentsData();
    prefs.setString('students', json.encode(fetchedStudents));
  }

  static String? getStudentsData(SharedPreferences prefs) {
    return prefs.getString('students');
  }

  static void fetchStudentBooksOnLoan(String studentId) async {
    final prefs = await SharedPreferences.getInstance();
    final fetchedStudentBooks =
        await BookManagmentService.fetchStudentBooksOnLoanData(studentId);
    prefs.setString('studentsLoan', json.encode(fetchedStudentBooks));
  }

  static String? getStudentLoans(SharedPreferences prefs) {
    return prefs.getString('studentsLoan');
  }
}
