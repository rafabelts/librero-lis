// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_client/services/auth_service.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/text_fields.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class ChangeName extends StatefulWidget {
  const ChangeName({super.key});

  @override
  State<ChangeName> createState() => _ChangeNameState();
}

class _ChangeNameState extends State<ChangeName> {
  final _formKey = GlobalKey<FormState>();
  bool _isButtonDisabled = true;
  bool _errorInName = false;
  TextEditingController _nameController = TextEditingController();

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
              children: [
                AppBackButton(color: appColorScheme.onBackground),
                Padding(
                  padding: EdgeInsets.only(top: 30.0, bottom: 18.0),
                  child: H1BoldText(
                    text: 'Modificar nombre',
                  ),
                ),
                TextFormFieldWithoutIcon(
                  errorInField: _errorInName,
                  controller: _nameController,
                  label: "Nuevo nombre",
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      setState(() {
                        _errorInName = true;
                      });
                      return 'Por favor ingrese un valor';
                    }
                    return null;
                  },
                  onChanged: (values) {
                    if (_nameController.text.isNotEmpty) {
                      setState(() {
                        _isButtonDisabled = values.isEmpty;
                      });
                    }

                    setState(() {
                      _errorInName = false;
                    });
                  },
                ),
                Spacer(),
                AppContinueElevatedButton(
                  isButtonDisabled: _isButtonDisabled,
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      AuthService.changeName(
                        context,
                        _nameController.text,
                      );
                    }
                  },
                  label: "Continuar",
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
