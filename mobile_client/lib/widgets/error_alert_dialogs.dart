//ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class WifiOrOtherError extends StatelessWidget {
  const WifiOrOtherError({super.key});

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
          Title2Text(
            text: "Compruebe su conexión a internet o intente más tarde",
            color: Color.fromARGB(255, 95, 22, 13),
          )
        ],
      ),
      backgroundColor: Color.fromARGB(255, 252, 235, 233),
    );
  }
}

class ErrorScanning extends StatelessWidget {
  const ErrorScanning({super.key});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        direction: Axis.vertical,
        children: [
          H3BoldText(
            text: "Error",
            color: Color.fromARGB(255, 205, 47, 27),
          ),
          Title2Text(text: "No es posible leer el código QR")
        ],
      ),
      backgroundColor: Color.fromARGB(255, 252, 235, 233),
    );
  }
}

class ErrorDeletingAccount extends StatelessWidget {
  final String bookTitle;
  const ErrorDeletingAccount({super.key, required this.bookTitle});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        children: [
          H3BoldText(
            text: "Error",
            color: Color.fromARGB(255, 205, 47, 27),
          ),
          Title2Text(
              text:
                  "No es posible eliminar tu cuenta ya que tienes un adeudo con el libro: $bookTitle"),
          Padding(
            padding: EdgeInsets.only(top: 20),
            child: AppContinueElevatedButton(
                isButtonDisabled: false,
                onPressed: () =>
                    Navigator.pushNamed(context, Routes.mainPageScreen),
                label: "Ir a libros prestados"),
          ),
        ],
      ),
      backgroundColor: Color.fromARGB(255, 252, 235, 233),
    );
  }
}

class ErrorStudenIDAlreadyTaken extends StatelessWidget {
  final String studentID;
  const ErrorStudenIDAlreadyTaken({super.key, required this.studentID});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        children: [
          H3BoldText(
            text: "Error",
            color: Color.fromARGB(255, 205, 47, 27),
          ),
          Title2Text(
            text:
                "La matrícula $studentID ya se encuentra registrada en el sistema, intente de nuevo con una diferente",
          ),
        ],
      ),
      backgroundColor: Color.fromARGB(255, 252, 235, 233),
    );
  }
}

class ErrorEmailAlreadyTaken extends StatelessWidget {
  const ErrorEmailAlreadyTaken({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        direction: Axis.vertical,
        children: [
          H3BoldText(
            text: "Error",
            color: Color.fromARGB(255, 205, 47, 27),
          ),
          Title2Text(
            text: "Correo electrónico ya registrado",
          ),
        ],
      ),
      backgroundColor: Color.fromARGB(255, 252, 235, 233),
    );
  }
}

class ErrorLogingIn extends StatelessWidget {
  const ErrorLogingIn({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        children: [
          Title1Text(
            text: "Correo electrónico o contraseña incorrecta",
          ),
        ],
      ),
      backgroundColor: Color.fromARGB(255, 252, 235, 233),
    );
  }
}

class ErrorInServer extends StatelessWidget {
  const ErrorInServer({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        direction: Axis.vertical,
        children: [
          H3BoldText(
            text: "Error en el servidor",
            color: Color.fromARGB(255, 205, 47, 27),
          ),
          Title2Text(
            text: "Por favor intenta de nuevo más tarde",
          ),
        ],
      ),
      backgroundColor: Color.fromARGB(255, 252, 235, 233),
    );
  }
}
