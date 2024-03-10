// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class AddBookForm extends StatelessWidget {
  const AddBookForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Wrap(
        runSpacing: 25.0,
        children: [
          TextFormFieldWithoutIcon(
            label: "Nombre",
          ),
          TextFormFieldWithoutIcon(
            label: "Autor (es)",
          ),
          TextFormFieldWithoutIcon(
            label: "Editorial",
          ),
          TextFormFieldWithoutIcon(
            label: "Año de publicación",
          ),
          TextFormFieldWithoutIcon(
            label: "Cantidad",
          ),
          _upLoadImage(context),
        ],
      ),
    ]);
  }

  Widget _upLoadImage(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: Color.fromARGB(255, 237, 237, 238),
          ),
          width: 150,
          height: 200,
          child: Icon(
            Icons.image,
            color: Color.fromARGB(255, 200, 199, 204),
            size: 96,
          ),
        ),
        Spacer(),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            H5BoldText(text: "Subir imagen"),
            ElevatedButton(
              style: ButtonStyle(
                overlayColor: MaterialStateProperty.all(
                  Color.fromARGB(255, 28, 123, 61),
                ),
                backgroundColor: MaterialStateProperty.all(
                  Color.fromARGB(255, 40, 173, 86),
                ),
                fixedSize: MaterialStateProperty.all(
                  Size(204, 30),
                ),
              ),
              onPressed: () {},
              child: Title2TextBold(
                text: "Buscar en la galería",
              ),
            )
          ],
        )
      ],
    );
  }
}

class BookInfoCard extends StatelessWidget {
  final String title;
  final String author;
  final String editorial;
  final String image;
  final int year;
  const BookInfoCard({
    super.key,
    required this.title,
    required this.author,
    required this.editorial,
    required this.year,
    required this.image,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(
              width: 200,
              child: H3BoldText(
                text: title,
              ),
            ),
            Padding(
              padding: EdgeInsets.only(top: 10),
              child: Wrap(
                spacing: 8,
                direction: Axis.vertical,
                children: [
                  BodyText(text: "Autor(es): $author"),
                  BodyText(text: "Editorial: $editorial"),
                  BodyText(text: "Año de publicación: $year")
                ],
              ),
            ),
          ],
        ),
        Spacer(),
        Container(
          width: 156,
          height: 200,
          decoration: BoxDecoration(
              image: DecorationImage(
                image: NetworkImage(
                  image,
                ),
                onError: (exception, stackTrace) => Icon(
                  Icons.image,
                  size: 96,
                ),
              ),
              color: Color.fromARGB(255, 237, 237, 238),
              borderRadius: BorderRadius.circular(10)),
        )
      ],
    );
  }
}

class BookInfoTable extends StatelessWidget {
  final List<TableRow> bookRows;
  const BookInfoTable({super.key, required this.bookRows});

  @override
  Widget build(BuildContext context) {
    return Table(
      border: TableBorder.all(
          color: Color.fromARGB(255, 24, 82, 157),
          borderRadius: BorderRadius.circular(4)),
      children: [
        TableRow(
          children: [
            Center(
              child: H5Text(
                text: "ID",
                color: Color.fromARGB(255, 13, 45, 86),
              ),
            ),
            Center(
              child: H5Text(
                text: "Status",
                color: Color.fromARGB(255, 13, 45, 86),
              ),
            ),
            Center(
              child: H5Text(
                text: "Código QR",
                color: Color.fromARGB(255, 13, 45, 86),
              ),
            ),
          ],
        ),
        ...bookRows,
      ],
    );
  }
}
