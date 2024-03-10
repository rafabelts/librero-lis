// ignore_for_file: prefer_const_constructors
import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/images_container.dart';
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
      width: 162,
      child: GestureDetector(
        onTap: () =>
            Navigator.pushNamed(context, Routes.bookInfo, arguments: args),
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
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      SizedBox(
                        width: 120,
                        child: BodyBoldText(
                          text: title,
                          alignment: TextAlign.left,
                        ),
                      ),
                      Spacer(),
                      GestureDetector(
                        child: Icon(
                          Icons.more_vert,
                          size: 35,
                          color: Color.fromARGB(255, 55, 53, 63),
                        ),
                        onTap: () {},
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class RenderBooksOnLoan extends StatelessWidget {
  final int itemCount;
  final Widget? Function(BuildContext, int) itemBuilder;
  const RenderBooksOnLoan({
    super.key,
    required this.itemCount,
    required this.itemBuilder,
  });

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      physics: NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 26,
        childAspectRatio: 162 / 210, // Aspect ratio = width / height
        mainAxisSpacing: 22,
      ),
      itemCount: itemCount,
      itemBuilder: itemBuilder,
    );
  }
}

// Here its created the student card widget
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
            GestureDetector(
              child: Icon(
                Icons.more_vert,
                size: 35,
                color: Color.fromARGB(255, 237, 237, 238),
              ),
            )
          ],
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.symmetric(vertical: 6),
              child: Title2Text(
                text: studentId,
                color: Color.fromARGB(255, 237, 237, 238),
              ),
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
