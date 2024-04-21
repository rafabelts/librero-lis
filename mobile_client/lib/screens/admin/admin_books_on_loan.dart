// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/services/book_management.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/book_info.dart';
import 'package:mobile_client/widgets/cards.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class AdminOnLoan extends StatefulWidget {
  const AdminOnLoan({super.key});

  @override
  State<AdminOnLoan> createState() => _AdminOnLoanState();
}

class _AdminOnLoanState extends State<AdminOnLoan> {
  late List<dynamic> booksOnLoan = [];

  Future<void> _loadBooksOnLoanData() async {
    List<dynamic> fetchedBooksOnLoan =
        await BookManagmentService.fetchBooksOnLoanData();
    setState(() {
      booksOnLoan = fetchedBooksOnLoan;
    });
  }

  @override
  void initState() {
    super.initState();
    _loadBooksOnLoanData();
    print(booksOnLoan);
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
}
