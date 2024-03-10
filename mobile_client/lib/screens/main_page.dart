// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile_client/screens/admin/admin_books_on_loan.dart';
import 'package:mobile_client/screens/admin/admin_settings.dart';
import 'package:mobile_client/screens/admin/books_on_inventory.dart';
import 'package:mobile_client/screens/admin/students.dart';
import 'package:mobile_client/widgets/bottom_navigator_bars.dart';

import 'student/student_books_on_loan.dart';
import 'student/student_settings.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  static String userType = "admin";
  String selectedScreen =
      userType == "admin" ? "Books On Inventory" : "Books On Loan";

  Map<String, Widget> screens = {
    // Student screens
    "Books On Loan":
        userType == "student" ? StudentBooksOnLoan() : AdminOnLoan(),
    "Books On Inventory": BooksOnInventory(),
    "Students": Students(),
    "Settings": userType == "student" ? StudentSettings() : AdminSettings(),
    // Admin screens
  };

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
