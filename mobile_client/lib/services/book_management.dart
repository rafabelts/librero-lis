// ignore_for_file: non_constant_identifier_names, prefer_const_constructors
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_client/services/shared_preferences.dart';
import 'package:mobile_client/widgets/error_alert_dialogs.dart';
import 'package:mobile_client/widgets/success_alert_dialogs.dart';
import 'package:mobile_client/widgets/text_sections.dart';

// String url = "https://librero-server.vercel.app/books";
// String url = "http://10.50.15.39:3001/books";
String url = "http://192.168.1.115:3001/books";

class BookManagmentService {
  static Future<List<dynamic>> fetchBooksData() async {
    final response = await http.get(
      Uri.parse('$url/fetch-books-data'),
    );
    if (response.statusCode == 201) {
      if (response.body.isNotEmpty) {
        return jsonDecode(response.body);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  static Future<List<dynamic>> fetchBooksOnLoanData() async {
    final response = await http.get(
      Uri.parse('$url/fetch-books-on-loan-data'),
    );
    if (response.statusCode == 201) {
      if (response.body.isNotEmpty) {
        return jsonDecode(response.body);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  static Future<List<dynamic>> fetchStudentBooksOnLoanData(
      String studentId) async {
    final response = await http.post(
      Uri.parse('$url/fetch-students-books-on-loan-data'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        <String, dynamic>{
          'id_of_student': studentId,
        },
      ),
    );

    if (response.statusCode == 201) {
      if (response.body.isNotEmpty) {
        return jsonDecode(response.body);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  static Future<void> addNewBook(
    BuildContext context,
    String isbn,
    String title,
    String author,
    String editorial,
    String publicationYear,
    String copies,
    String image_extension,
    String image_base64,
  ) async {
    final response = await http.post(
      Uri.parse('$url/add'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'isbn': isbn,
        'title': title,
        'editorial': editorial,
        'publication_year': int.parse(publicationYear),
        'copies': int.parse(copies),
        'author': author,
        'image_extension': image_extension,
        'image_base64': image_base64,
      }),
    );

    if (response.statusCode == 201) {
      Future.microtask(
        () {
          Navigator.pop(context);
          showDialog(
              context: context,
              builder: (BuildContext context) => SuccessDialog(
                    successMessage: [
                      H3BoldText(
                        text: "¡Libro agregado!",
                        color: Color.fromARGB(255, 17, 73, 36),
                      ),
                      Title2Text(
                        text: "$title ha sido agregado al inventario",
                        color: Color.fromARGB(255, 42, 41, 49),
                      )
                    ],
                  ));
        },
      );
      SharedPreferencesService.fetchInventoryData();
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'Error en el servidor',
          ),
        ),
      );
    }
  }

  static Future<void> deleteBook(
    BuildContext context,
    String isbn,
  ) async {
    final response = await http.post(
      Uri.parse('$url/delete-book'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'isbn': isbn,
      }),
    );

    if (response.statusCode == 201) {
      Future.microtask(
        () {
          Navigator.pop(context);
          showDialog(
              context: context,
              builder: (BuildContext context) => SuccessDialog(
                    successMessage: [
                      H3BoldText(
                        text: "¡Libro eliminado!",
                        color: Color.fromARGB(255, 17, 73, 36),
                      ),
                      Title2Text(
                        text: "El libro con el isbn $isbn ha sido eliminado",
                        color: Color.fromARGB(255, 42, 41, 49),
                      )
                    ],
                  ));
        },
      );
      SharedPreferencesService.fetchInventoryData();
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'Error en el servidor',
          ),
        ),
      );
    }
  }

  static Future<void> deleteBookCopy(
    BuildContext context,
    String id,
  ) async {
    final response = await http.post(
      Uri.parse('$url/delete-book-copy'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'id': id,
      }),
    );

    if (response.statusCode == 201) {
      Future.microtask(
        () {
          Navigator.pop(context);
          showDialog(
              context: context,
              builder: (BuildContext context) => SuccessDialog(
                    successMessage: [
                      H3BoldText(
                        text: "¡Copia eliminada!",
                        color: Color.fromARGB(255, 17, 73, 36),
                      ),
                      Title2Text(
                        text: "Se ha eliminado la copia $id",
                        color: Color.fromARGB(255, 42, 41, 49),
                      )
                    ],
                  ));
        },
      );
      SharedPreferencesService.fetchInventoryData();
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'Error en el servidor',
          ),
        ),
      );
    }
  }

  static Future<void> returnBookToInventory(
      BuildContext context, String bookId) async {
    final response = await http.post(
      Uri.parse('$url/return-loan'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        <String, dynamic>{
          'book_id': bookId,
        },
      ),
    );
    if (response.statusCode == 201) {
      Future.microtask(
        () {
          Navigator.pop(context);
          showDialog(
              context: context,
              builder: (BuildContext context) => SuccessDialog(
                    successMessage: [
                      H3BoldText(
                        text: "¡Libro devuelto!",
                        color: Color.fromARGB(255, 17, 73, 36),
                      ),
                      Title2Text(
                        text: "Se ha devuelto la copia $bookId",
                        color: Color.fromARGB(255, 42, 41, 49),
                      )
                    ],
                  ));
        },
      );
      SharedPreferencesService.fetchInventoryData();
      SharedPreferencesService.fetchBooksOnLoan();
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'Error en el servidor',
          ),
        ),
      );
    }
  }

  static Future<void> addLoan(
    BuildContext context,
    String bookId,
    String devolutionDate,
    String studentBorrower,
  ) async {
    final response = await http.post(
      Uri.parse('$url/add-loan'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        <String, dynamic>{
          'book_id': bookId,
          'devolution_date': devolutionDate,
          'student_borrower': studentBorrower,
        },
      ),
    );
    if (response.statusCode == 201) {
      Future.microtask(
        () {
          Navigator.pop(context);
          showDialog(
              context: context,
              builder: (BuildContext context) => SuccessDialog(
                    successMessage: [
                      H3BoldText(
                        text: "¡Libro en préstamo!",
                        color: Color.fromARGB(255, 17, 73, 36),
                      ),
                      Title2Text(
                        text:
                            "Se ha prestado la copia $bookId al alumno con matrícula $studentBorrower",
                        color: Color.fromARGB(255, 42, 41, 49),
                      )
                    ],
                  ));
        },
      );
      SharedPreferencesService.fetchInventoryData();
      SharedPreferencesService.fetchBooksOnLoan();
    } else if (response.statusCode == 404) {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'El alumno conn la matrícula $studentBorrower no existe',
          ),
        ),
      );
    } else {
      Future.microtask(
        () => showDialog(
          context: context,
          builder: (BuildContext context) => ErrorDialog(
            error: 'Error en el servidor',
          ),
        ),
      );
    }
  }
}
