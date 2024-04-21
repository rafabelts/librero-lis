// ignore_for_file: prefer_const_constructors, constant_identifier_names, camel_case_types
import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/images_container.dart';
import 'package:mobile_client/widgets/settings_alert_dialogs.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class BookCard extends StatelessWidget {
  final String image;
  final String title;
  final String content;
  const BookCard(
      {super.key,
      required this.image,
      required this.title,
      required this.content});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 210,
      width: 162,
      child: Stack(
        children: [
          image.isEmpty
              ? const WithoutImageOfBook()
              : ImageOfBook(image: image),
          Positioned(
            bottom: 0.0,
            child: Container(
              width: 162,
              decoration: BoxDecoration(
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    blurRadius: 2,
                    offset: const Offset(0, 0),
                  ),
                ],
                color: appColorScheme.primaryContainer,
                shape: BoxShape.rectangle,
                borderRadius: BorderRadius.circular(5.0),
              ),
              child: Padding(
                padding: EdgeInsets.only(left: 6, bottom: 5, top: 5),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    BodyBoldText(
                      text: title,
                      alignment: TextAlign.left,
                    ),
                    CaptionText(text: content)
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

enum menuOptions { DeleteCopy, Delete }

class BookOnInventoryCard extends StatelessWidget {
  final String image;
  final String title;
  final Object args;

  const BookOnInventoryCard(
      {super.key,
      required this.image,
      required this.title,
      required this.args});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 210,
      child: Stack(
        children: [
          GestureDetector(
            onTap: () =>
                Navigator.pushNamed(context, Routes.bookInfo, arguments: args),
            child: image.isEmpty
                ? const WithoutImageOfBook()
                : ImageOfBook(image: image),
          ),
          Positioned(
            bottom: 0.0,
            child: Container(
              width: 162,
              decoration: BoxDecoration(
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    blurRadius: 2,
                    offset: const Offset(0, 0),
                  ),
                ],
                color: appColorScheme.primaryContainer,
                shape: BoxShape.rectangle,
                borderRadius: BorderRadius.circular(5.0),
              ),
              child: Padding(
                padding: EdgeInsets.only(left: 4, bottom: 5, top: 5),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    SizedBox(
                      width: 110,
                      child: BodyBoldText(
                        text: title,
                        alignment: TextAlign.left,
                      ),
                    ),
                    PopupMenuButton(
                      color: Color(0xff28272D).withOpacity(0.85),
                      icon: Icon(
                        Icons.more_vert,
                        size: 30,
                        color: Color.fromARGB(255, 55, 53, 63),
                      ),
                      onSelected: (menuOptions item) {
                        switch (item) {
                          case menuOptions.DeleteCopy:
                            showDialog(
                              context: context,
                              builder: (BuildContext context) =>
                                  VerificationToDeleteBook(
                                optionToDelete: 'copy',
                              ),
                            );
                            break;
                          case menuOptions.Delete:
                            showDialog(
                              context: context,
                              builder: (BuildContext context) =>
                                  VerificationToDeleteBook(
                                optionToDelete: 'book',
                              ),
                            );
                            break;
                        }
                      },
                      shadowColor: Colors.transparent,
                      surfaceTintColor: Colors.transparent,
                      itemBuilder: (BuildContext context) =>
                          <PopupMenuEntry<menuOptions>>[
                        PopupMenuItem(
                          value: menuOptions.DeleteCopy,
                          child: Title2TextBold(
                            text: 'Eliminar copia',
                            color: appColorScheme.background,
                          ),
                        ),
                        PopupMenuItem(
                          value: menuOptions.Delete,
                          child: Title2TextBold(
                            text: 'Eliminar',
                            color: Color(0xffE75D4B),
                          ),
                        )
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// Here its created the student card widget
enum studentMenuOptions { Eliminar }

class StudentCard extends StatelessWidget {
  final String name;
  final String studentId;
  final int debts;
  const StudentCard(
      {super.key,
      required this.name,
      required this.studentId,
      required this.debts});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 116,
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color.fromARGB(255, 22, 95, 47),
        shape: BoxShape.rectangle,
        borderRadius: BorderRadius.circular(10.0),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 6,
          ),
        ],
      ),
      child: ListTile(
        contentPadding: EdgeInsets.symmetric(horizontal: 15, vertical: 2),
        title: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            H4BoldText(
              text: name,
              color: Color.fromARGB(255, 237, 237, 238),
            ),
            Spacer(),
            PopupMenuButton(
              color: Color(0xff28272D).withOpacity(0.8),
              icon: Icon(
                Icons.more_vert,
                size: 30,
                color: appColorScheme.background,
              ),
              onSelected: (studentMenuOptions item) => showDialog(
                context: context,
                builder: (BuildContext context) => AlertDialog(
                  content: H3BoldText(text: "text"),
                ),
              ),
              shadowColor: Colors.transparent,
              surfaceTintColor: Colors.transparent,
              itemBuilder: (BuildContext context) =>
                  <PopupMenuEntry<studentMenuOptions>>[
                PopupMenuItem(
                  value: studentMenuOptions.Eliminar,
                  child: Title2TextBold(
                    text: 'Eliminar',
                    color: Color(0xffE75D4B),
                  ),
                )
              ],
            ),
          ],
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Title2Text(
              text: studentId,
              color: Color.fromARGB(255, 237, 237, 238),
            ),
            Title2Text(
              text: "No. adeudos: $debts",
              color: Color.fromARGB(255, 237, 237, 238),
            ),
          ],
        ),
      ),
    );
  }
}
