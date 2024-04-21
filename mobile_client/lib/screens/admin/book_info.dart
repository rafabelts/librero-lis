// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:mobile_client/models/book.dart';
import 'package:mobile_client/utils/buttons_theme.dart';
import 'package:mobile_client/widgets/book_info.dart';
import 'package:mobile_client/widgets/buttons.dart';

class BookInfo extends StatefulWidget {
  const BookInfo({
    super.key,
  });

  @override
  State<BookInfo> createState() => _BookInfoState();
}

class _BookInfoState extends State<BookInfo> {
  @override
  Widget build(BuildContext context) {
    final book = ModalRoute.of(context)!.settings.arguments as Book;

    return Scaffold(
      body: SafeArea(
        child: Padding(
          // padding: const EdgeInsets.symmetric(horizontal: 15),
          padding: Platform.isAndroid
              ? const EdgeInsets.all(20.0)
              : const EdgeInsets.symmetric(horizontal: 15),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppBackButton(color: appColorScheme.onBackground),
              Padding(
                padding: EdgeInsets.only(top: 60, bottom: 60.0),
                child: BookInfoCard(
                  isbn: book.isbn,
                  title: book.title,
                  author: book.author,
                  editorial: book.editorial,
                  year: book.publication_year,
                  image: book.image_url,
                  copies: book.copies,
                ),
              ),
              BookInfoTable(
                data: book.copiesData,
                bookTitle: book.title,
              )
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
  }
}
