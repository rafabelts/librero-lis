// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class Welcome extends StatelessWidget {
  const Welcome({super.key});

  @override
  Widget build(BuildContext context) {
    const String imagePath = "assets/images/luzio_w_book.png";
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              H5BoldText(text: "¡Hola! Soy el asistente del librero de LIS"),
              Image.asset(
                imagePath,
                fit: BoxFit.fitWidth,
              ),
              Wrap(
                runSpacing: 22.0,
                children: <Widget>[
                  AppContinueElevatedButton(
                      onPressed: () =>
                          Navigator.pushNamed(context, Routes.signUpScreen),
                      label: "Crear cuenta"),
                  AppOutlinedButton(
                      onPressed: () =>
                          Navigator.pushNamed(context, Routes.logInScreen),
                      label: "Iniciar sesión")
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
