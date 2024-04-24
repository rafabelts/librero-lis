// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/services/shared_preferences.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/book_info.dart';
import 'package:mobile_client/widgets/cards.dart';
import 'package:mobile_client/widgets/text_sections.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AdminOnLoan extends StatefulWidget {
  const AdminOnLoan({super.key});

  @override
  State<AdminOnLoan> createState() => _AdminOnLoanState();
}

class _AdminOnLoanState extends State<AdminOnLoan> {
  late List<dynamic> booksOnLoan = [];

  Future<void> _loadBooksOnLoanData() async {
    final prefs = await SharedPreferences.getInstance();
    final String? bookData = SharedPreferencesService.getBooksOnLoan(prefs);

    if (bookData == null || bookData.isEmpty) {
      SharedPreferencesService.fetchBooksOnLoan();
    }

    final newData = SharedPreferencesService.getBooksOnLoan(prefs);
    if (newData != null && newData.isNotEmpty) {
      setState(() {
        booksOnLoan = json.decode(newData);
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _loadBooksOnLoanData();
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
        booksOnLoan.isEmpty
            ? Center(
                child: H1BoldText(
                  text: 'Por el momento no hay libros en préstamo',
                ),
              )
            : RenderBooksOnLoan(
                itemCount: booksOnLoan.length,
                itemBuilder: (context, index) {
                  return BookCard(
                    image: booksOnLoan[index]['image_url'],
                    title: 'Id: ${booksOnLoan[index]['book_id']}',
                    content: "Prestado a: ${booksOnLoan[index]!["borrower"]!}",
                  );
                },
              ),
      ],
    );
  }

  @override
  void dispose() {
    super.dispose();
  }
}
