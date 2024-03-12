// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class TextFormFieldWithoutIcon extends StatelessWidget {
  final String label;
  final FormFieldValidator validator;
  final bool? errorInField;
  final TextEditingController? controller;
  final Function(String)? onChanged;
  final Function()? onEditingComplete;

  const TextFormFieldWithoutIcon({
    super.key,
    required this.label,
    required this.validator,
    this.errorInField,
    this.controller,
    this.onChanged,
    this.onEditingComplete,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      onEditingComplete: onEditingComplete,
      validator: validator,
      onChanged: onChanged,
      cursorColor: const Color.fromARGB(255, 22, 75, 143),
      decoration: InputDecoration(
        label: Text(label),
        labelStyle: TextStyle(
            color: errorInField == true
                ? Color.fromARGB(255, 205, 47, 27)
                : Color.fromARGB(255, 113, 111, 122)),
        floatingLabelStyle: TextStyle(
          fontWeight: FontWeight.bold,
          color: errorInField == true
              ? Color.fromARGB(255, 205, 47, 27)
              : Color.fromARGB(255, 22, 75, 143),
        ),
      ),
    );
  }
}

class PasswordTextFormField extends StatefulWidget {
  final String label;
  final FormFieldValidator validator;
  final bool? errorInField;
  final TextEditingController? controller;
  final Function(String)? onChanged;
  final Function()? onEditingComplete;

  const PasswordTextFormField({
    super.key,
    required this.label,
    required this.validator,
    this.errorInField,
    this.controller,
    this.onChanged,
    this.onEditingComplete,
  });

  @override
  State<PasswordTextFormField> createState() => _PasswordTextFormFieldState();
}

class _PasswordTextFormFieldState extends State<PasswordTextFormField> {
  bool isObscure = true;
  late FocusNode _focusNode;
  bool _isFocused = false;

  @override
  void initState() {
    super.initState();
    _focusNode = FocusNode(); // Initialized the node
    _focusNode.addListener(_onFocusChange); // Listener for the focus changes
  }

  @override
  void dispose() {
    _focusNode.removeListener(_onFocusChange);
    _focusNode.dispose(); // Releases resources
    super.dispose();
  }

  void _onFocusChange() {
    setState(() {
      _isFocused =
          _focusNode.hasFocus; // Update the variable based in the focus state
    });
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: widget.controller,
      onChanged: widget.onChanged,
      onEditingComplete: widget.onEditingComplete,
      focusNode: _focusNode,
      validator: widget.validator,
      obscureText: isObscure,
      maxLength: 16,
      cursorColor: const Color.fromARGB(255, 22, 75, 143),
      decoration: InputDecoration(
        labelStyle: TextStyle(
          color: widget.errorInField == true
              ? Color.fromARGB(255, 205, 47, 27)
              : Color.fromARGB(255, 113, 111, 122),
        ),
        floatingLabelStyle: TextStyle(
          fontWeight: FontWeight.bold,
          color: widget.errorInField == true
              ? Color.fromARGB(255, 205, 47, 27)
              : Color.fromARGB(255, 22, 75, 143),
        ),
        counter: const Offstage(),
        label: Text(widget.label),
        suffixIcon: GestureDetector(
          onTap: () => setState(() {
            isObscure = !isObscure;
          }),
          child: Icon(
            isObscure ? Icons.visibility_off : Icons.visibility,
            color: _isFocused
                ? widget.errorInField == true
                    ? Color.fromARGB(255, 205, 47, 27)
                    : Color.fromARGB(255, 22, 75, 143)
                : widget.errorInField == true
                    ? Color.fromARGB(255, 205, 47, 27)
                    : Color.fromARGB(255, 113, 111, 122),
          ),
        ),
      ),
    );
  }
}
