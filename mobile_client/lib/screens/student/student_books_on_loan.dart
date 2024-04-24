// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/services/book_management.dart';
import 'package:mobile_client/services/shared_preferences.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/book_info.dart';
import 'package:mobile_client/widgets/cards.dart';
import 'package:mobile_client/widgets/text_sections.dart';
import 'package:shared_preferences/shared_preferences.dart';

class StudentBooksOnLoan extends StatefulWidget {
  final String studentId;
  const StudentBooksOnLoan({super.key, required this.studentId});

  @override
  State<StudentBooksOnLoan> createState() => _StudentBooksOnLoanState();
}

class _StudentBooksOnLoanState extends State<StudentBooksOnLoan> {
  late List<dynamic> books = [];

  Future<void> _loadBooksData() async {
    final prefs = await SharedPreferences.getInstance();
    final String? bookData = SharedPreferencesService.getStudentLoans(prefs);
    print('Book Data: $bookData');

    if (bookData == null || bookData.isEmpty) {
      SharedPreferencesService.fetchStudentBooksOnLoan(widget.studentId);
    }

    final newData = SharedPreferencesService.getStudentLoans(prefs);
    if (newData != null && newData.isNotEmpty) {
      setState(() {
        books = json.decode(newData);
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _loadBooksData();
    print(books);
  }

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
        books.isEmpty
            ? Center(
                child: H1BoldText(
                  text: 'Por el momento no hay libros en préstamo',
                ),
              )
            : RenderBooksOnLoan(
                itemCount: books.length,
                itemBuilder: (context, index) {
                  return BookCard(
                    image: books[index]["image_url"],
                    title: books[index]["title"],
                    content:
                        "Fecha de entrega ${books[index]["devolution_date"]}",
                  );
                },
              ),
      ],
    );
  }
}
