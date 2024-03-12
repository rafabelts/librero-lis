// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class RecoverPassword extends StatelessWidget {
  const RecoverPassword({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        AppBackButton(color: appColorScheme.onBackground),
        Padding(
          padding: EdgeInsets.only(top: 30.0),
          child: H1BoldText(
            text: 'Recuperar contraseña',
          ),
        ),
        Title2Text(
            text:
                "Ingrese su correo electrónico para enviar las instrucciones de recuperación"),
        Padding(
          padding: EdgeInsets.only(top: 40),
          child: TextFormFieldWithoutIcon(
            label: "Correo electrónico",
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter text';
              }
              return null;
            },
          ),
        ),
        Spacer(),
        AppContinueElevatedButton(
          isButtonDisabled: false,
          onPressed: () {},
          label: "Continuar",
        )
      ],
    );
  }
}
