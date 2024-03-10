// ignore_for_file: prefer_const_constructors
import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class SignUp extends StatelessWidget {
  const SignUp({super.key});

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
                padding: EdgeInsets.only(top: 30.0, bottom: 20.0),
                child: H1BoldText(
                  text: 'Crear cuenta',
                ),
              ),
              Wrap(
                runSpacing: 25.0,
                children: const <Widget>[
                  TextFormFieldWithoutIcon(label: "Nombre"),
                  TextFormFieldWithoutIcon(label: "Matrícula"),
                  TextFormFieldWithoutIcon(label: "Correo electrónico"),
                  PasswordTextFormField(label: "Contraseña"),
                  PasswordTextFormField(
                    label: "Confirmar contraseña",
                  )
                ],
              ),
              RichTexts(
                alignment: Alignment.centerLeft,
                principalText: "Al continuar, aceptas los ",
                otherTextsList: [
                  TextSpan(
                    text: "Términos y Condiciones",
                    style: TextStyle(
                      fontSize: 14,
                      color: Color.fromARGB(255, 28, 123, 61),
                      fontWeight: FontWeight.bold,
                    ),
                    recognizer: TapGestureRecognizer()..onTap = () {},
                  ),
                  TextSpan(text: ", y la "),
                  TextSpan(
                    text: "Política de Privacidad",
                    style: TextStyle(
                      fontSize: 14,
                      color: Color.fromARGB(255, 28, 123, 61),
                      fontWeight: FontWeight.bold,
                    ),
                    recognizer: TapGestureRecognizer()..onTap = () {},
                  ),
                ],
              ),
              Spacer(),
              Wrap(
                runSpacing: 20,
                children: [
                  AppContinueElevatedButton(
                      label: "Continuar",
                      onPressed: () =>
                          Navigator.pushNamed(context, Routes.mainPageScreen)),
                  RichTexts(
                    alignment: Alignment.center,
                    principalText: "Ya tienes una cuenta? ",
                    otherTextsList: [
                      TextSpan(
                        text: "Inicia sesión",
                        style: TextStyle(
                          fontSize: 14,
                          color: Color.fromARGB(255, 28, 123, 61),
                          fontWeight: FontWeight.bold,
                        ),
                        recognizer: TapGestureRecognizer()
                          ..onTap = () =>
                              Navigator.pushNamed(context, Routes.logInScreen),
                      )
                    ],
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
