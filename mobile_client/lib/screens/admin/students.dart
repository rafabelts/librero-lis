//ignore_for_file:prefer_const_constructors
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/services/book_management.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/cards.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class Students extends StatefulWidget {
  const Students({super.key});

  @override
  State<Students> createState() => _StudentsState();
}

class _StudentsState extends State<Students> {
  late List<dynamic> students = [];

  Future<void> _loadStudentsData() async {
    List<dynamic> fetchedStudentsData =
        await BookManagmentService.fetchStudentsData();
    setState(() {
      students = fetchedStudentsData;
    });
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
        ListView.builder(
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
}
