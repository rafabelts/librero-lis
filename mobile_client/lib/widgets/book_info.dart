// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_gallery_saver/image_gallery_saver.dart';
import 'package:mobile_client/utils/buttons_theme.dart';
import 'package:mobile_client/widgets/success_alert_dialogs.dart';
import 'package:mobile_client/widgets/text_sections.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:screenshot/screenshot.dart';

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

class BookInfoCard extends StatelessWidget {
  final String isbn;
  final String title;
  final String author;
  final String editorial;
  final int year;
  final int copies;
  final String image;
  const BookInfoCard({
    super.key,
    required this.isbn,
    required this.title,
    required this.author,
    required this.editorial,
    required this.year,
    required this.copies,
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
            H3BoldText(
              text: title,
            ),
            Padding(
              padding: EdgeInsets.only(top: 10),
              child: Wrap(
                spacing: 8,
                direction: Axis.vertical,
                children: [
                  BodyText(text: "ISBN: $isbn"),
                  BodyText(text: "Autor(es): $author"),
                  BodyText(text: "Editorial: $editorial"),
                  BodyText(text: "Año de publicación: $year"),
                  BodyText(text: "Copias: $copies")
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

class BookInfoTable extends StatefulWidget {
  final String bookTitle;
  final List<dynamic> data;

  const BookInfoTable({
    super.key,
    required this.bookTitle,
    required this.data,
  });

  @override
  State<BookInfoTable> createState() => _BookInfoTableState();
}

class _BookInfoTableState extends State<BookInfoTable> {
  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  ScreenshotController screenShotController = ScreenshotController();
  String? imageBase64;

  void generateQr(BuildContext context, String copyId) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Transform.scale(
          scale: 1.5,
          child: Center(
            child: CircularProgressIndicator(
              color: appColorScheme.background,
            ),
          ),
        );
      },
    );

    screenShotController
        .captureFromWidget(
      Container(
        decoration: BoxDecoration(
            borderRadius: BorderRadius.all(Radius.circular(20)),
            color: appColorScheme.background),
        width: 200,
        height: 250,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            H3BoldText(
              text: widget.bookTitle,
              color: Colors.black,
            ),
            Center(
              child: QrImageView(
                data: copyId,
              ),
            ),
          ],
        ),
      ),
    )
        .then(
      (Uint8List bytes) async {
        Navigator.pop(context); // Cerrar el diálogo de carga
        setState(
          () {
            imageBase64 = base64Encode(bytes);
          },
        );

        final result =
            await ImageGallerySaver.saveImage(bytes.buffer.asUint8List());

        print(result);

        if (result['isSuccess']) {
          Future.microtask(
            () => showDialog(
              context: context,
              builder: (BuildContext context) => SuccessDialog(
                successMessage: [
                  Title2Text(text: '¡QR descargado exitosamente!')
                ],
              ),
            ),
          );
        }
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return DataTable(
      border: TableBorder.all(
        color: Color.fromARGB(255, 24, 82, 157),
        borderRadius: BorderRadius.circular(4),
      ),
      columns: [
        DataColumn(label: H5BoldText(text: 'ID')),
        DataColumn(label: H5BoldText(text: 'Status')),
        DataColumn(label: H5BoldText(text: 'QR')),
      ],
      rows: widget.data
          .map(
            (item) => DataRow(
              cells: <DataCell>[
                DataCell(Title2Text(
                        text: item['copy_id'].toString().split('-').first)
                    // H5text(text: item['copy_id'] ),
                    ),
                DataCell(
                  Title2Text(
                      text: item['on_loan'] ? 'En prestamo' : 'En librero'),
                ),
                DataCell(GestureDetector(
                  onTap: () {
                    generateQr(context, item['copy_id']);
                  },
                  child: H5BoldText(
                    text: "Descargar",
                    color: Color.fromARGB(255, 36, 157, 78),
                  ),
                ))
              ],
            ),
          )
          .toList(),
    );
  }
}
