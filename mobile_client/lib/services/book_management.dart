// ignore_for_file: non_constant_identifier_names, prefer_const_constructors
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

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

  static Future<void> addNewBook(
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
      print('Added book to db');
    } else {
      print('Error');
    }
  }

  static Future<void> deleteBook(
    String title,
  ) async {
    final response = await http.post(
      Uri.parse('$url/delete-book'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'title': title,
      }),
    );

    if (response.statusCode == 201) {
      print('Deleted book copy');
    } else {
      print('Error');
    }
  }

  static Future<void> deleteBookCopy(
    String copy_id,
  ) async {
    final response = await http.post(
      Uri.parse('$url/delete-copy'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'copy_id': copy_id,
      }),
    );

    if (response.statusCode == 201) {
      print('Deleted book copy');
    } else {
      print('Error');
    }
  }

  static Future<void> returnBookToInventory(String bookId) async {
    final response = await http.post(
      Uri.parse('$url/return-book'),
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
      print('Book returned');
    } else {
      print('error');
    }
  }

  static Future<void> addLoan(
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
      print('Book added to loan');
    } else {
      print('error');
    }
  }
}
