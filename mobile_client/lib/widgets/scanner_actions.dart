// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile_client/services/book_management.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class SelectScannerAction extends StatefulWidget {
  final String? book_code;
  const SelectScannerAction({super.key, this.book_code});

  @override
  State<SelectScannerAction> createState() => _SelectScannerActionState();
}

class _SelectScannerActionState extends State<SelectScannerAction> {
  bool _isNewLoan = false;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: _isNewLoan
          ? AddLoanScreen()
          : Wrap(
              runSpacing: 15,
              children: [
                H3BoldText(
                  text: "¿Qué acción desea realizar?",
                  color: Color.fromARGB(255, 32, 32, 37),
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 40.0),
                  child: Column(
                    children: [
                      AppContinueElevatedButton(
                        isButtonDisabled: false,
                        onPressed: () => setState(() {
                          _isNewLoan = true;
                        }),
                        label: "Agregar prestamo",
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      AppOutlinedButton(
                        onPressed: () {
                          BookManagmentService.returnBookToInventory(
                            widget.book_code!,
                          );
                        },
                        label: "Devolver libro",
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}

class AddLoanScreen extends StatefulWidget {
  const AddLoanScreen({super.key});

  @override
  State<AddLoanScreen> createState() => _AddLoanScreenState();
}

class _AddLoanScreenState extends State<AddLoanScreen> {
  final _formKey = GlobalKey<FormState>();
  bool _isButtonDisabled = true;
  bool _errorInStudent = false;

  final _studentIdController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Wrap(
      runSpacing: 20,
      children: [
        Title1Text(
            alignment: TextAlign.justify,
            text:
                "Por favor ingrese la matrícula del alumno que tomara prestado el libro"),
        Form(
          key: _formKey,
          child: TextFormFieldWithoutIcon(
            errorInField: _errorInStudent,
            label: 'Matrícula',
            validator: (value) {
              if (value == null || value.isEmpty) {
                setState(() {
                  _errorInStudent = true;
                });
                return "Por favor ingresa tu contraseña";
              }
              return null;
            },
            onChanged: (values) {
              if (_studentIdController.text.isNotEmpty) {
                setState(() {
                  _isButtonDisabled = values.isEmpty;
                });
              }

              setState(() {
                _errorInStudent = false;
              });
            },
            controller: _studentIdController,
          ),
        ),
        AppContinueElevatedButton(
            isButtonDisabled: _isButtonDisabled,
            onPressed: () {
              print(DateTime.now());
              /*if(_formKey.currentState!.validate()){
                
              }*/
            },
            label: 'Crear nuevo prestamo')
      ],
    );
  }
}
