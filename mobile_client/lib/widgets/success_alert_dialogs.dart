//ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables
import 'package:flutter/material.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class BookAddedToLoan extends StatelessWidget {
  final String bookTitle;
  final String limitDate;
  const BookAddedToLoan(
      {super.key, required this.bookTitle, required this.limitDate});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        runSpacing: 10,
        children: [
          H3BoldText(
            text: "¡Libro agregado!",
            color: Color.fromARGB(255, 17, 73, 36),
          ),
          Title2Text(
            text:
                "$bookTitle ha sido agregado a tu biblioteca de préstamos, recuerda que la fecha límite de entrega es el $limitDate",
            color: Color.fromARGB(255, 42, 41, 49),
          )
        ],
      ),
      backgroundColor: Color.fromARGB(255, 234, 247, 238),
    );
  }
}

class BookAddedToInventory extends StatelessWidget {
  final String bookTitle;
  final String limitDate;
  const BookAddedToInventory(
      {super.key, required this.bookTitle, required this.limitDate});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        runSpacing: 10,
        children: [
          H3BoldText(
            text: "¡Libro agregado!",
            color: Color.fromARGB(255, 17, 73, 36),
          ),
          Title2Text(
            text: "$bookTitle ha sido agregado al inventario",
            color: Color.fromARGB(255, 42, 41, 49),
          )
        ],
      ),
      backgroundColor: Color.fromARGB(255, 234, 247, 238),
    );
  }
}

class DevolutionSuccess extends StatelessWidget {
  final String user;
  final String bookTitle;
  const DevolutionSuccess(
      {super.key, required this.user, required this.bookTitle});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        runSpacing: 10,
        children: [
          H3BoldText(
            text: "¡Libro devuelto!",
            color: Color.fromARGB(255, 17, 73, 36),
          ),
          Title2Text(
            text: "$user ha devuelto el libro $bookTitle",
            color: Color.fromARGB(255, 42, 41, 49),
          )
        ],
      ),
      backgroundColor: Color.fromARGB(255, 234, 247, 238),
    );
  }
}

class AccountVerification extends StatelessWidget {
  final String email;
  const AccountVerification({super.key, required this.email});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        runSpacing: 10,
        children: [
          H3BoldText(
            text: "¡Verifica tu cuenta!",
            color: Color.fromARGB(255, 17, 73, 36),
          ),
          Title2Text(
            text:
                "Se ha enviado un link a tu correo $email para la verificación",
            color: Color.fromARGB(255, 42, 41, 49),
          )
        ],
      ),
      backgroundColor: Color.fromARGB(255, 234, 247, 238),
    );
  }
}
