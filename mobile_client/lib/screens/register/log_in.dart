// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class LogIn extends StatelessWidget {
  const LogIn({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                AppBackButton(
                  color: appColorScheme.onBackground,
                ),
                Padding(
                    padding: EdgeInsets.only(top: 88.0, bottom: 20.0),
                    child: H1BoldText(
                      text: 'Iniciar sesión',
                    )),
                Wrap(
                  runSpacing: 25.0,
                  children: const <Widget>[
                    TextFormFieldWithoutIcon(label: "Correo electrónico"),
                    PasswordTextFormField(
                      label: "Contraseña",
                    )
                  ],
                ),
                Spacer(),
                AppContinueElevatedButton(
                    label: "Continuar",
                    onPressed: () =>
                        Navigator.pushNamed(context, Routes.mainPageScreen)),
              ],
            )),
      ),
    );
  }
}
