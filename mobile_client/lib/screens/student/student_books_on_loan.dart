// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/book_info.dart';
import 'package:mobile_client/widgets/cards.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class StudentBooksOnLoan extends StatelessWidget {
  const StudentBooksOnLoan({super.key});

  static const books = {
    0: {
      'image':
          'https://files.passeidireto.com/a0172480-e9cb-4bbf-8b43-40482f09adad/bg1.png',
      'title': 'Introducción a la programación',
      'date': '12/2/24'
    },
    1: {
      'image':
          'https://files.passeidireto.com/a0172480-e9cb-4bbf-8b43-40482f09adad/bg1.png',
      'title': 'Introducción a la programación',
      'date': '12/2/24'
    },
    2: {
      'image':
          'https://files.passeidireto.com/a0172480-e9cb-4bbf-8b43-40482f09adad/bg1.png',
      'title': 'Introducción a la programación',
      'date': '12/2/24'
    },
    3: {
      'image':
          'https://files.passeidireto.com/a0172480-e9cb-4bbf-8b43-40482f09adad/bg1.png',
      'title': 'Introducción a la programación',
      'date': '12/2/24'
    },
    4: {
      'image':
          'https://files.passeidireto.com/a0172480-e9cb-4bbf-8b43-40482f09adad/bg1.png',
      'title': 'Introducción a la programación',
      'date': '12/2/24'
    },
    5: {
      'image':
          'https://files.passeidireto.com/a0172480-e9cb-4bbf-8b43-40482f09adad/bg1.png',
      'title': 'Introducción a la programación',
      'date': '12/2/24'
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
              content: "Fecha de entrega ${books[index]!["date"]!}",
            );
          },
        ),
      ],
    );
  }
}
