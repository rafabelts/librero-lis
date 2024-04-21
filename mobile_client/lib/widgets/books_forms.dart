// ignore_for_file: prefer_const_constructors

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile_client/services/book_management.dart';
import 'package:mobile_client/utils/buttons_theme.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class AddBookForm extends StatefulWidget {
  const AddBookForm({super.key});

  @override
  State<AddBookForm> createState() => _AddBookFormState();
}

class _AddBookFormState extends State<AddBookForm> {
  final _formKey = GlobalKey<FormState>();
  bool _isButtonDisabled = true;

  bool _errorInIsbn = false;
  bool _errorInTitle = false;
  bool _errorInQuantity = false;

  // Text controllers
  final _isbnController = TextEditingController();
  final _titleController = TextEditingController();
  final _authorController = TextEditingController();
  final _yearController = TextEditingController();
  final _editorialController = TextEditingController();
  final _copiesController = TextEditingController();

  XFile? imageXFile;
  String? imageBase64;

  final picker = ImagePicker();
  Future getImage(ImageSource img) async {
    final pickedFile = await picker.pickImage(source: img);
    final readImageBytes = await pickedFile?.readAsBytes();
    if (pickedFile != null) {
      setState(() {
        imageXFile = pickedFile;
        imageBase64 = base64Encode(readImageBytes!);
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
            backgroundColor: appColorScheme.background,
            content: Text('No se ha seleccionado ninguna imagen')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Form(
          key: _formKey,
          child: Wrap(
            runSpacing: 22.0,
            children: [
              TextFormFieldWithoutIcon(
                label: "ISBN",
                controller: _isbnController,
                errorInField: _errorInIsbn,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    setState(() {
                      _errorInIsbn = true;
                    });
                    return 'Por favor agregue el isbn del libro';
                  }
                  return null;
                },
              ),
              TextFormFieldWithoutIcon(
                label: "Título",
                controller: _titleController,
                errorInField: _errorInTitle,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    setState(() {
                      _errorInTitle = true;
                    });
                    return 'Por favor agregue el título del libro';
                  }
                  return null;
                },
              ),
              TextFormFieldWithoutIcon(
                label: "Autor (es)",
                controller: _authorController,
                validator: (value) => null,
              ),
              TextFormFieldWithoutIcon(
                label: "Editorial",
                controller: _editorialController,
                validator: (value) => null,
              ),
              TextFormFieldWithoutIcon(
                label: "Año de publicación",
                controller: _yearController,
                validator: (value) => null,
              ),
              TextFormFieldWithoutIcon(
                label: "Cantidad",
                controller: _copiesController,
                errorInField: _errorInQuantity,
                onChanged: (value) {
                  if (_isbnController.text.isNotEmpty &&
                      _titleController.text.isNotEmpty &&
                      _copiesController.text.isNotEmpty) {
                    setState(() {
                      _isButtonDisabled = value.isEmpty;
                    });
                  }
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    setState(() {
                      _errorInQuantity = true;
                    });
                    return 'Por favor agregue la cantidad de libros que existen';
                  }
                  return null;
                },
              ),
              _upLoadImage(context),
              SizedBox(
                height: 5,
              ),
              AppContinueElevatedButton(
                isButtonDisabled: _isButtonDisabled,
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    BookManagmentService.addNewBook(
                      _isbnController.text,
                      _titleController.text,
                      _authorController.text,
                      _editorialController.text,
                      _yearController.text,
                      _copiesController.text,
                      imageXFile!.path.split('.').last.toLowerCase(),
                      imageBase64!,
                    );
                  }
                },
                label: "Continuar",
              )
            ],
          ),
        ),
      ],
    );
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
            child: imageBase64 == null
                ? Icon(
                    Icons.image,
                    size: 96,
                  )
                : Image.memory(base64Decode(imageBase64!))),
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
              onPressed: () => getImage(ImageSource.camera),
              child: Title2TextBold(
                text: "Tomar fotografía",
              ),
            ),
            SizedBox(
              height: 5,
            ),
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
              onPressed: () => getImage(ImageSource.gallery),
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
