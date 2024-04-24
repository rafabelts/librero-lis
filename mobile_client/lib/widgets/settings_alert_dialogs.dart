//ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables
import 'package:flutter/material.dart';
import 'package:mobile_client/services/auth_service.dart';
import 'package:mobile_client/services/book_management.dart';
import 'package:mobile_client/services/shared_preferences.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class VerificationToDeleteBook extends StatefulWidget {
  final String optionToDelete;
  const VerificationToDeleteBook({super.key, required this.optionToDelete});

  @override
  State<VerificationToDeleteBook> createState() =>
      _VerificationToDeleteBookState();
}

class _VerificationToDeleteBookState extends State<VerificationToDeleteBook> {
  final _formKey = GlobalKey<FormState>();
  final _deleteController = TextEditingController();
  bool _errorInDeleteController = false;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Form(
        key: _formKey,
        child: Wrap(
          runSpacing: 5,
          children: [
            H3BoldText(
              text: "¿Estás seguro?",
              color: Color.fromARGB(255, 32, 32, 37),
            ),
            Padding(
              padding: EdgeInsets.only(bottom: 40.0),
              child: Column(
                children: [
                  RichTexts(
                    alignment: Alignment.centerLeft,
                    principalText: 'Ingrese el ',
                    otherTextsList: [
                      TextSpan(
                        text: widget.optionToDelete == 'copy'
                            ? 'id de la copia'
                            : 'isbn',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      TextSpan(
                          text: widget.optionToDelete == 'copy'
                              ? ' que desea elminar'
                              : ' para eliminar el libro y sus copias')
                    ],
                  ),
                  SizedBox(
                    height: 15,
                  ),
                  TextFormFieldWithoutIcon(
                    controller: _deleteController,
                    errorInField: _errorInDeleteController,
                    label: '',
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        setState(() {
                          _errorInDeleteController = true;
                        });
                        return 'Por favor ingrese el texto';
                      }
                      return null;
                    },
                  )
                ],
              ),
            ),
            Wrap(
              crossAxisAlignment: WrapCrossAlignment.center,
              spacing: 56,
              direction: Axis.horizontal,
              children: [
                GestureDetector(
                  onTap: () => Navigator.pop(context),
                  child: H5BoldText(
                    text: "Cancelar",
                    color: Color.fromARGB(255, 160, 37, 21),
                  ),
                ),
                SizedBox(
                  width: 150,
                  child: AppContinueElevatedButton(
                    isButtonDisabled: false,
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        widget.optionToDelete == 'copy'
                            ? BookManagmentService.deleteBookCopy(
                                context, _deleteController.text)
                            : BookManagmentService.deleteBook(
                                context, _deleteController.text);
                        SharedPreferencesService.fetchInventoryData();
                      }
                    },
                    label: "Eliminar",
                  ),
                ),
              ],
            )
          ],
        ),
      ),
      backgroundColor: Color.fromARGB(255, 232, 238, 245),
    );
  }
}

class VerificationToDeleteUser extends StatelessWidget {
  final String user;
  const VerificationToDeleteUser({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        runSpacing: 5,
        children: [
          H3BoldText(
            text: "¿Estás seguro?",
            color: Color.fromARGB(255, 32, 32, 37),
          ),
          Padding(
            padding: EdgeInsets.only(bottom: 20.0),
            child: Title2Text(
              text:
                  "Si presiona continuar, el alumno $user será eliminado definitivamente",
              color: Color.fromARGB(255, 42, 41, 49),
            ),
          ),
          Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 56,
            direction: Axis.horizontal,
            children: [
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: H5BoldText(
                  text: "Cancelar",
                  color: Color.fromARGB(255, 160, 37, 21),
                ),
              ),
              SizedBox(
                width: 150,
                child: AppContinueElevatedButton(
                  isButtonDisabled: false,
                  onPressed: () {},
                  label: "Continuar",
                ),
              ),
            ],
          )
        ],
      ),
      backgroundColor: Color.fromARGB(255, 232, 238, 245),
    );
  }
}

class VerificationToSignOut extends StatelessWidget {
  const VerificationToSignOut({super.key});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      content: Wrap(
        runSpacing: 20,
        children: [
          H3BoldText(
            text: "¿Estás seguro?",
            color: Color.fromARGB(255, 32, 32, 37),
          ),
          Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 30,
            children: [
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: H5BoldText(
                  text: "Cancelar",
                  color: Color.fromARGB(255, 160, 37, 21),
                ),
              ),
              SizedBox(
                width: 175,
                child: AppContinueElevatedButton(
                  isButtonDisabled: false,
                  onPressed: () => AuthService.signOut(context),
                  label: "Cerrar sesión",
                ),
              ),
            ],
          )
        ],
      ),
      backgroundColor: Color.fromARGB(255, 232, 238, 245),
    );
  }
}
