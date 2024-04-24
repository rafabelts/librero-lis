//ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables
import 'package:flutter/material.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class SuccessDialog extends StatelessWidget {
  final List<Widget> successMessage;
  const SuccessDialog({super.key, required this.successMessage});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        runSpacing: 10,
        children: successMessage,
      ),
      backgroundColor: Color.fromARGB(255, 234, 247, 238),
    );
  }
}
