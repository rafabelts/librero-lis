// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class TextFormFieldWithoutIcon extends StatelessWidget {
  final String label;
  const TextFormFieldWithoutIcon({super.key, required this.label});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      cursorColor: const Color.fromARGB(255, 22, 75, 143),
      decoration: InputDecoration(
        label: Text(label),
      ),
    );
  }
}

class PasswordTextFormField extends StatefulWidget {
  final String label;
  const PasswordTextFormField({super.key, required this.label});

  @override
  State<PasswordTextFormField> createState() => _PasswordTextFormFieldState();
}

class _PasswordTextFormFieldState extends State<PasswordTextFormField> {
  bool isObscure = true;
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      obscureText: isObscure,
      maxLength: 16,
      cursorColor: const Color.fromARGB(255, 22, 75, 143),
      decoration: InputDecoration(
        counter: const Offstage(),
        label: Text(widget.label),
        suffixIcon: GestureDetector(
          onTap: () => setState(() {
            isObscure = !isObscure;
          }),
          child: Icon(isObscure ? Icons.visibility_off : Icons.visibility),
        ),
      ),
    );
  }
}
