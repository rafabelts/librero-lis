// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile_client/services/auth_service.dart';

import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class LogIn extends StatefulWidget {
  const LogIn({super.key});

  @override
  State<LogIn> createState() => _LogInState();
}

class _LogInState extends State<LogIn> {
  final _formKey = GlobalKey<FormState>();
  bool _isButtonDisabled = true;
  bool _errorInEmail = false;
  bool _errorInPassword = false;

  // Text controllers
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                AppBackButton(
                  color: appColorScheme.onBackground,
                ),
                Padding(
                    padding: EdgeInsets.only(top: 88.0, bottom: 20.0),
                    child: H1BoldText(
                      text: 'Iniciar sesión',
                    )),
                Wrap(
                  runSpacing: 25.0,
                  children: <Widget>[
                    TextFormFieldWithoutIcon(
                      label: "Correo electrónico",
                      controller: _emailController,
                      errorInField: _errorInEmail,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          setState(() {
                            _errorInEmail = true;
                          });
                          return 'Por favor ingresa tu correo electrónico';
                        }
                        return null;
                      },
                    ),
                    PasswordTextFormField(
                      label: "Contraseña",
                      controller: _passwordController,
                      errorInField: _errorInPassword,
                      onChanged: (value) {
                        setState(() {
                          _isButtonDisabled = value.isEmpty;
                        });
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          setState(() {
                            _errorInPassword = true;
                          });
                          return 'Por favor ingresa tu contraseña';
                        }
                        return null;
                      },
                    )
                  ],
                ),
                Spacer(),
                AppContinueElevatedButton(
                  isButtonDisabled: _isButtonDisabled,
                  label: "Continuar",
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      AuthService.logIn(
                          context,
                          _emailController.text.toLowerCase(),
                          _passwordController.text);
                    }
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
