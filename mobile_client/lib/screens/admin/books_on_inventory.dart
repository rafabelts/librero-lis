// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/models/book.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/cards.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class BooksOnInventory extends StatelessWidget {
  const BooksOnInventory({super.key});

  static const books = {
    0: {
      'image':
          'https://files.passeidireto.com/a0172480-e9cb-4bbf-8b43-40482f09adad/bg1.png',
      'title': 'Introducción a la programación',
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
        GridView.builder(
          physics: NeverScrollableScrollPhysics(),
          shrinkWrap: true,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 26,
            childAspectRatio: 162 / 210, // Aspect ratio = width / height
            mainAxisSpacing: 22,
          ),
          itemCount: books.length,
          itemBuilder: (BuildContext context, int index) {
            String image = books[index]!["image"]!;
            String title = books[index]!["title"]!;

            Book book =
                Book(image, 123, title, "Jhon Doe", "Editorial", 2012, 2);
            return BookOnInventoryCard(
              image: book.image,
              title: book.title,
              args: book,
            );
          },
        ),
      ],
    );
  }
}
