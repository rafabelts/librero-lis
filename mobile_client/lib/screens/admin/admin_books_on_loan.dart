// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/cards.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class AdminOnLoan extends StatelessWidget {
  const AdminOnLoan({super.key});

  static const books = {
    0: {
      'image':
          'https://files.passeidireto.com/a0172480-e9cb-4bbf-8b43-40482f09adad/bg1.png',
      'title': 'Introducción a la programación',
      'student': 'Jhon Doe',
    },
    1: {
      'image':
          'https://files.passeidireto.com/a0172480-e9cb-4bbf-8b43-40482f09adad/bg1.png',
      'title': 'Introducción a la programación',
      'student': 'Jhon Doe',
    },
    2: {
      'image':
          'https://files.passeidireto.com/a0172480-e9cb-4bbf-8b43-40482f09adad/bg1.png',
      'title': 'Introducción a la programación',
      'student': 'Jhon Doe',
    },
  };
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        H1BoldText(text: "Libros prestados"),
        Padding(
          padding: EdgeInsets.only(top: 5, bottom: 30),
          child: AppSearchBar(),
        ),
        RenderBooksOnLoan(
          itemCount: books.length,
          itemBuilder: (context, index) {
            return BookCard(
              image: books[index]!["image"]!,
              title: books[index]!["title"]!,
              content: "Prestado a: ${books[index]!["student"]!}",
            );
          },
        ),
      ],
    );
  }
}
