//ignore_for_file:prefer_const_constructors
import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/services/auth_service.dart';
import 'package:mobile_client/services/shared_preferences.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/cards.dart';
import 'package:mobile_client/widgets/text_sections.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Students extends StatefulWidget {
  const Students({super.key});

  @override
  State<Students> createState() => _StudentsState();
}

class _StudentsState extends State<Students> {
  late List<dynamic> students = [];

  Future<void> _loadStudentsData() async {
    final prefs = await SharedPreferences.getInstance();
    final String? studentsData =
        SharedPreferencesService.getStudentsData(prefs);

    if (studentsData == null || studentsData.isEmpty) {
      SharedPreferencesService.fetchStudentData();
    }

    final newData = SharedPreferencesService.getStudentsData(prefs);
    if (newData != null && newData.isNotEmpty) {
      setState(() {
        students = json.decode(newData);
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _loadStudentsData();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        H1BoldText(text: "Alumnos"),
        Padding(
          padding: EdgeInsets.only(top: 5, bottom: 30),
          child: AppSearchBar(),
        ),
        students.isEmpty
            ? Center(
                child: H1BoldText(
                  text: 'Por el momento no hay estudiantes',
                ),
              )
            : ListView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                itemCount: students.length,
                itemBuilder: (BuildContext context, int index) {
                  return StudentCard(
                    name: students[index]["name"],
                    studentId: students[index]["student_id"],
                    debts: students[index]["books_in_debt"],
                  );
                },
              ),
      ],
    );
  }

  @override
  void dispose() {
    super.dispose();
  }
}
