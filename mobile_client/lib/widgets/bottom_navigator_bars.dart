//ignore_for_file:prefer_const_constructors
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/buttons.dart';

class StudentBottomNavigatorBar extends StatefulWidget {
  final String screen;
  final Function(String) changeScreen;
  const StudentBottomNavigatorBar(
      {super.key, required this.screen, required this.changeScreen});
  @override
  State<StudentBottomNavigatorBar> createState() =>
      _StudentBottomNavigatorBarState();
}

class _StudentBottomNavigatorBarState extends State<StudentBottomNavigatorBar> {
  Color onFocus(String inScreen) => widget.screen == inScreen
      ? appColorScheme.primary
      : const Color.fromARGB(255, 200, 199, 204);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 30.0),
      height: 100,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          InkWell(
            borderRadius: BorderRadius.circular(50.0),
            onTap: () => widget.changeScreen("Books On Loan"),
            child: Icon(
              Icons.menu_book,
              color: onFocus("Books On Loan"),
            ),
          ),
          Spacer(),
          InkWell(
            borderRadius: BorderRadius.circular(50.0),
            onTap: () => widget.changeScreen("Settings"),
            child: Icon(
              Icons.settings,
              color: onFocus("Settings"),
            ),
          ),
        ],
      ),
    );
  }
}

class AdminBottomNavigatorBar extends StatefulWidget {
  final String screen;
  final Function(String) changeScreen;
  const AdminBottomNavigatorBar(
      {super.key, required this.screen, required this.changeScreen});

  @override
  State<AdminBottomNavigatorBar> createState() =>
      _AdminBottomNavigatorBarState();
}

class _AdminBottomNavigatorBarState extends State<AdminBottomNavigatorBar> {
  Color onFocus(String inScreen) => widget.screen == inScreen
      ? appColorScheme.primary
      : const Color.fromARGB(255, 200, 199, 204);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(
          horizontal: widget.screen == "Settings" || widget.screen == "Students"
              ? 14.0
              : 12.0),
      height: 100,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: EdgeInsets.only(
                right:
                    widget.screen == "Settings" || widget.screen == "Students"
                        ? 58
                        : 34),
            child: InkWell(
              borderRadius: BorderRadius.circular(50.0),
              onTap: () => widget.changeScreen("Books On Inventory"),
              child: Icon(
                Icons.menu_book,
                color: onFocus("Books On Inventory"),
              ),
            ),
          ),
          InkWell(
            borderRadius: BorderRadius.circular(50.0),
            onTap: () => widget.changeScreen("Books On Loan"),
            child: Icon(
              Icons.book,
              color: onFocus("Books On Loan"),
            ),
          ),
          widget.screen == "Settings" || widget.screen == "Students"
              ? Padding(padding: EdgeInsets.symmetric(horizontal: 29))
              : Padding(
                  padding: EdgeInsets.symmetric(
                      horizontal: Platform.isAndroid ? 34 : 25),
                  child: BottomNavigatorButton(
                    onPressed: () => widget.screen == "Books On Inventory"
                        ? Navigator.pushNamed(context, Routes.addBook)
                        : Navigator.pushNamed(context, Routes.bookScanner),
                    icon: widget.screen == "Books On Inventory"
                        ? Icons.add
                        : Icons.qr_code,
                  ),
                ),
          InkWell(
            borderRadius: BorderRadius.circular(50.0),
            onTap: () => widget.changeScreen("Students"),
            child: Icon(
              Icons.contact_page,
              color: onFocus("Students"),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(
                left: widget.screen == "Settings" || widget.screen == "Students"
                    ? 58
                    : 34),
            child: InkWell(
              borderRadius: BorderRadius.circular(50.0),
              onTap: () => widget.changeScreen("Settings"),
              child: Icon(
                Icons.settings,
                color: onFocus("Settings"),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
