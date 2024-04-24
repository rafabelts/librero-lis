// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/models/book.dart';
import 'package:mobile_client/services/shared_preferences.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/cards.dart';
import 'package:mobile_client/widgets/text_sections.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BooksOnInventory extends StatefulWidget {
  const BooksOnInventory({super.key});
  @override
  State<BooksOnInventory> createState() => _BooksOnInventoryState();
}

class _BooksOnInventoryState extends State<BooksOnInventory> {
  late List<dynamic> books = [];

  Future<void> _loadBooksData() async {
    final prefs = await SharedPreferences.getInstance();
    final String? bookData = SharedPreferencesService.getInventoryData(prefs);

    if (bookData == null || bookData.isEmpty) {
      SharedPreferencesService.fetchInventoryData();
    }

    final newData = SharedPreferencesService.getInventoryData(prefs);
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
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        H1BoldText(text: "Libros"),
        Padding(
          padding: EdgeInsets.only(top: 5, bottom: 30),
          child: AppSearchBar(),
        ),
        books.isEmpty
            ? Center(
                child: H1BoldText(
                  text: 'Por el momento no hay libros',
                ),
              )
            : GridView.builder(
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 40,
                  childAspectRatio: 162 / 210, // Aspect ratio = width / height
                  mainAxisSpacing: 40,
                ),
                itemCount: books.length,
                itemBuilder: (BuildContext context, int index) {
                  Book book = Book(
                      books[index]["isbn"],
                      books[index]["title"],
                      books[index]["editorial"],
                      books[index]["author"],
                      books[index]["publication_year"],
                      books[index]["copies"],
                      books[index]["copies_data"],
                      books[index]["image_url"]);

                  return BookOnInventoryCard(
                    image: book.image_url,
                    title: book.title,
                    args: book,
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
