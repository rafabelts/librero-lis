// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';

import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/error_alert_dialogs.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class DeleteAccount extends StatelessWidget {
  const DeleteAccount({super.key});

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
                padding: EdgeInsets.only(top: 30.0),
                child: H1BoldText(
                  text: 'Eliminar cuenta',
                ),
              ),
              Title2Text(text: "Para continuar, ingresa tu contraseña"),
              Padding(
                padding: EdgeInsets.only(top: 30),
                child: PasswordTextFormField(
                  label: "Contraseña",
                ),
              ),
              Spacer(),
              AppContinueElevatedButton(
                  onPressed: () => showDialog(
                        context: context,
                        builder: (BuildContext context) =>
                            ErrorDeletingAccount(bookTitle: "bookTitle"),
                      ),
                  label: "Continuar")
            ],
          ),
        ),
      ),
    );
  }
}
