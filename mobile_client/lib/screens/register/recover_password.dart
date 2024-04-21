// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile_client/services/auth_service.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class RecoverPassword extends StatefulWidget {
  final bool recover;
  const RecoverPassword({super.key, required this.recover});

  @override
  State<RecoverPassword> createState() => _RecoverPasswordState();
}

class _RecoverPasswordState extends State<RecoverPassword> {
  final _formKey = GlobalKey<FormState>();
  bool _isButtonDisabled = true;
  bool _errorInEmail = false;
  // Text controllers
  final _emailController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    String typeOfInstruction = widget.recover ? "recuperación" : "modificación";
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppBackButton(color: appColorScheme.onBackground),
              Padding(
                padding: EdgeInsets.only(top: 30.0),
                child: H1BoldText(
                  text: widget.recover
                      ? 'Recuperar contraseña'
                      : 'Modificar contraseña',
                ),
              ),
              Title2Text(
                  text:
                      "Ingrese su correo electrónico para enviar las instrucciones de $typeOfInstruction la contraseña"),
              Form(
                key: _formKey,
                child: Padding(
                  padding: EdgeInsets.only(top: 40),
                  child: TextFormFieldWithoutIcon(
                    controller: _emailController,
                    errorInField: _errorInEmail,
                    label: "Correo electrónico",
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        setState(() {
                          _errorInEmail = true;
                        });
                        return 'Por favor ingrese su correo electrónico';
                      }
                      return null;
                    },
                    onChanged: (values) {
                      if (_emailController.text.isNotEmpty) {
                        setState(() {
                          _isButtonDisabled = values.isEmpty;
                        });
                      }

                      setState(() {
                        _errorInEmail = false;
                      });
                    },
                  ),
                ),
              ),
              Spacer(),
              AppContinueElevatedButton(
                isButtonDisabled: _isButtonDisabled,
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    AuthService.sendRecoveryEmail(
                      context,
                      _emailController.text,
                    );
                  }
                },
                label: "Continuar",
              )
            ],
          ),
        ),
      ),
    );
  }
}
