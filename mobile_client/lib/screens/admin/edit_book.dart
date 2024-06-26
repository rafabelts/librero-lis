// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile_client/utils/buttons_theme.dart';

import 'package:mobile_client/widgets/books_forms.dart';
import 'package:mobile_client/widgets/buttons.dart';

import 'package:mobile_client/widgets/text_sections.dart';

class EditBook extends StatelessWidget {
  const EditBook({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppBackButton(color: appColorScheme.onBackground),
              Padding(
                padding: EdgeInsets.only(top: 30.0, bottom: 18.0),
                child: H1BoldText(
                  text: 'Editar libro',
                ),
              ),
              AddBookForm(),
              Spacer(),
              AppContinueElevatedButton(
                  isButtonDisabled: false, onPressed: () {}, label: "Continuar")
            ],
          ),
        ),
      ),
    );
  }
}
