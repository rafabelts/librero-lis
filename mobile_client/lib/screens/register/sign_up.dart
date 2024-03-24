/*
  
*/

// ignore_for_file: prefer_const_constructors
import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/services/auth_service.dart';
import 'package:mobile_client/utils/capitalize_string.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class SignUp extends StatefulWidget {
  const SignUp({super.key});

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final _formKey = GlobalKey<FormState>();
  bool _isButtonDisabled = true;

  bool _errorInName = false;
  bool _errorInStudentId = false;
  bool _errorInEmail = false;
  bool _errorInPassword = false;
  bool _errorInConfirmedPassword = false;

  // Text controllers
  final _nameController = TextEditingController();
  final _studentIdController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

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
                  padding: EdgeInsets.only(top: 30.0, bottom: 20.0),
                  child: H1BoldText(
                    text: 'Crear cuenta',
                  ),
                ),
                Wrap(
                  runSpacing: 25.0,
                  children: <Widget>[
                    TextFormFieldWithoutIcon(
                        label: "Nombre",
                        errorInField: _errorInName,
                        controller: _nameController,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            setState(() {
                              _errorInName = true;
                            });
                            return "Por favor ingresa tu nombre";
                          }
                          return null;
                        },
                        onChanged: (name) {
                          setState(() {
                            _errorInName = false;
                          });
                        }),
                    TextFormFieldWithoutIcon(
                      label: "Matrícula",
                      errorInField: _errorInStudentId,
                      controller: _studentIdController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          setState(() {
                            _errorInStudentId = true;
                          });
                          return "Por favor ingresa tu matrícula, recuerda que es sin la z";
                        } else if (value.length != 9) {
                          setState(() {
                            _errorInStudentId = true;
                          });
                          return 'Matrícula incorrecta, recuerda que es sin la z';
                        }
                        return null;
                      },
                      onChanged: (studentID) {
                        setState(() {
                          _errorInStudentId = false;
                        });
                      },
                    ),
                    TextFormFieldWithoutIcon(
                      label: "Correo electrónico",
                      errorInField: _errorInEmail,
                      controller: _emailController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          setState(() {
                            _errorInEmail = true;
                          });
                          return "Por favor ingresa tu correo electrónico";
                        }

                        final isStudentEmail =
                            RegExp(r'^[\w.%+-]+@estudiantes\.uv\.mx$')
                                .hasMatch(value);

                        final isInstitutionalEmail =
                            RegExp(r'^[\w.%+-]+@uv\.mx$').hasMatch(value);

                        if (!isStudentEmail && !isInstitutionalEmail) {
                          setState(() {
                            _errorInEmail = true;
                          });
                          return "Por favor utiliza tu correo institucional";
                        }

                        return null;
                      },
                      onChanged: (email) {
                        setState(() {
                          _errorInEmail = false;
                        });
                      },
                    ),
                    PasswordTextFormField(
                      label: "Contraseña",
                      controller: _passwordController,
                      errorInField: _errorInPassword,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          setState(() {
                            _errorInPassword = true;
                          });
                          return "Por favor ingresa tu contraseña";
                        }
                        final isValid = RegExp(
                                r'^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z!@#$%^&*(),.?":{}|<>]{8,16}$')
                            .hasMatch(value);

                        if (!isValid) {
                          setState(() {
                            _errorInPassword = true;
                          });
                          return "La contraseña debe tener de 8 a 16 caracteres, al menos un número y al menos un símbolo";
                        }
                        return null;
                      },
                      onChanged: (password) {
                        setState(() {
                          _errorInPassword = false;
                        });
                      },
                    ),
                    PasswordTextFormField(
                      controller: _confirmPasswordController,
                      errorInField: _errorInConfirmedPassword,
                      label: "Confirmar contraseña",
                      validator: (value) {
                        if (value != _passwordController.text) {
                          setState(() {
                            _errorInConfirmedPassword = true;
                          });
                          return "Las contraseñas no coinciden";
                        }
                        return null;
                      },
                      onChanged: (values) {
                        if (_nameController.text.isNotEmpty &&
                            _studentIdController.text.isNotEmpty &&
                            _emailController.text.isNotEmpty &&
                            _passwordController.text.isNotEmpty) {
                          setState(() {
                            _isButtonDisabled = values.isEmpty;
                          });
                        }

                        setState(() {
                          _errorInPassword = false;
                        });
                      },
                    ),
                  ],
                ),
                RichTexts(
                  alignment: Alignment.centerLeft,
                  principalText: "Al continuar, aceptas los ",
                  otherTextsList: [
                    TextSpan(
                      text: "Términos y Condiciones",
                      style: TextStyle(
                        fontSize: 14,
                        color: Color.fromARGB(255, 28, 123, 61),
                        fontWeight: FontWeight.bold,
                      ),
                      recognizer: TapGestureRecognizer()..onTap = () {},
                    ),
                    TextSpan(text: ", y la "),
                    TextSpan(
                      text: "Política de Privacidad",
                      style: TextStyle(
                        fontSize: 14,
                        color: Color.fromARGB(255, 28, 123, 61),
                        fontWeight: FontWeight.bold,
                      ),
                      recognizer: TapGestureRecognizer()..onTap = () {},
                    ),
                  ],
                ),
                Spacer(),
                Wrap(
                  runSpacing: 20,
                  children: [
                    AppContinueElevatedButton(
                      isButtonDisabled: _isButtonDisabled,
                      label: "Continuar",
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          AuthService.signUp(
                            context,
                            _studentIdController.text.capitalize(),
                            _emailController.text.toLowerCase(),
                            _confirmPasswordController.text,
                            _nameController.text,
                          );
                        }
                      },
                    ),
                    RichTexts(
                      alignment: Alignment.center,
                      principalText: "Ya tienes una cuenta? ",
                      otherTextsList: [
                        TextSpan(
                          text: "Inicia sesión",
                          style: TextStyle(
                            fontSize: 14,
                            color: Color.fromARGB(255, 28, 123, 61),
                            fontWeight: FontWeight.bold,
                          ),
                          recognizer: TapGestureRecognizer()
                            ..onTap = () => Navigator.pushNamed(
                                context, Routes.logInScreen),
                        )
                      ],
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
