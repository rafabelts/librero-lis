// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile_client/models/book.dart';
import 'package:mobile_client/utils/buttons_theme.dart';
import 'package:mobile_client/widgets/book_info.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class BookInfo extends StatelessWidget {
  const BookInfo({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final Book book = ModalRoute.of(context)!.settings.arguments as Book;

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppBackButton(color: appColorScheme.onBackground),
              Padding(
                padding: EdgeInsets.only(top: 60, bottom: 60.0),
                child: BookInfoCard(
                  title: book.title,
                  author: book.authorName,
                  editorial: book.editorial,
                  year: book.publishYear,
                  image: book.image,
                ),
              ),
              BookInfoTable(
                bookRows: [
                  TableRow(children: [
                    Center(
                      child: Title1Text(text: "1L"),
                    ),
                    Center(
                      child: Title1Text(text: "En biblioteca"),
                    ),
                    Center(
                      child: GestureDetector(
                        onTap: () => print("Tap"),
                        child: Title1TextBold(
                          text: "Descargar",
                          color: Color.fromARGB(255, 36, 157, 78),
                        ),
                      ),
                    )
                  ])
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
