//ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class ErrorDialog extends StatelessWidget {
  final String error;
  const ErrorDialog({super.key, required this.error});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        runSpacing: 10,
        children: [
          H3BoldText(
            text: "Error",
            color: Color.fromARGB(255, 205, 47, 27),
          ),
          Title1Text(
            text: error,
            color: Color.fromARGB(255, 95, 22, 13),
          )
        ],
      ),
      backgroundColor: Color.fromARGB(255, 252, 235, 233),
    );
  }
}
