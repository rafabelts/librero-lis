//ignore_for_file:prefer_const_constructors
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/cards.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class Students extends StatelessWidget {
  const Students({super.key});

  static const students = {
    0: {
      'name': 'Jhon Doe',
      'studentID': 'S23015364',
      'debts': 2,
    },
  };

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
              name: students[index]!["name"]!.toString(),
              studentId: students[index]!["studentID"]!.toString(),
              debts: int.parse(students[index]!["debts"].toString()),
            );
          },
        ),
      ],
    );
  }
}
