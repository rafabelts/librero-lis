// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile_client/screens/admin/admin_books_on_loan.dart';
import 'package:mobile_client/screens/admin/admin_settings.dart';
import 'package:mobile_client/screens/admin/books_on_inventory.dart';
import 'package:mobile_client/screens/admin/students.dart';
import 'package:mobile_client/services/shared_preferences.dart';
import 'package:mobile_client/widgets/bottom_navigator_bars.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'student/student_books_on_loan.dart';
import 'student/student_settings.dart';

class MainPage extends StatefulWidget {
  const MainPage({
    super.key,
  });

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  String userType = '';
  String userStudentId = '';
  String selectedScreen = '';
  Map<String, Widget> screens = {};

  Future<void> _setScreens() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      userType = SharedPreferencesService.get_user_type(prefs);
      userStudentId = SharedPreferencesService.get_user_student_id(prefs);
    });
    selectedScreen =
        userType == "admin" ? "Books On Inventory" : "Books On Loan";
    screens = {
      "Books On Loan":
          userType == "student" ? StudentBooksOnLoan() : AdminOnLoan(),
      "Books On Inventory": BooksOnInventory(),
      "Students": Students(),
      "Settings": userType == "student"
          ? StudentSettings(
              studentId: userStudentId,
            )
          : AdminSettings(),
    };
  }

  @override
  void initState() {
    super.initState();

    _setScreens();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
          child: SingleChildScrollView(
            padding: EdgeInsets.all(20),
            child: screens[selectedScreen],
          ),
        ),
        bottomNavigationBar: userType == "admin"
            ? AdminBottomNavigatorBar(
                screen: selectedScreen,
                changeScreen: (String screen) => setState(() {
                  selectedScreen = screen;
                }),
              )
            : StudentBottomNavigatorBar(
                screen: selectedScreen,
                changeScreen: (String screen) => setState(() {
                  selectedScreen = screen;
                }),
              ));
  }
}
