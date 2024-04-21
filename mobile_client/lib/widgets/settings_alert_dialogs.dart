//ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables
import 'package:flutter/material.dart';
import 'package:mobile_client/services/auth_service.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class VerificationToDeleteBook extends StatelessWidget {
  final String optionToDelete;
  const VerificationToDeleteBook({super.key, required this.optionToDelete});

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
            padding: EdgeInsets.only(bottom: 40.0),
            child: Column(
              children: [
                RichTexts(
                  alignment: Alignment.centerLeft,
                  principalText: 'Ingrese ',
                  otherTextsList: [
                    TextSpan(
                      text: optionToDelete == 'copy'
                          ? 'id de la copia'
                          : 'continuar',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                        text: optionToDelete == 'copy'
                            ? ' que desea elminar'
                            : ' para eliminar el libro y sus copias')
                  ],
                ),
                SizedBox(
                  height: 15,
                ),
                TextFormFieldWithoutIcon(
                    label: '',
                    validator: (validate) {
                      return null;
                    })
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
                  onPressed: () {},
                  label: "Eliminar",
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
