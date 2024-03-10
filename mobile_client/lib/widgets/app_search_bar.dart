//ignore_for_file:prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile_client/utils/buttons_theme.dart';

class AppSearchBar extends StatefulWidget {
  const AppSearchBar({super.key});

  @override
  State<AppSearchBar> createState() => _AppSearchBarState();
}

class _AppSearchBarState extends State<AppSearchBar> {
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
    return SizedBox(
      height: 45,
      width: double.infinity,
      child: SearchBar(
        focusNode: _focusNode,
        // onTap: () {
        //   controller.openView();
        // },
        // onChanged: (_) {
        //   controller.openView();
        // },

        trailing: _isFocused
            ? [
                Icon(
                  Icons.clear,
                  size: 25,
                  color: appColorScheme.primary,
                )
              ]
            : null,
        leading: Icon(
          _isFocused ? Icons.arrow_back_ios : Icons.search,
          size: 25,
          color: _isFocused
              ? appColorScheme.primary
              : Color.fromARGB(255, 113, 111, 122),
        ),
        hintText: 'Buscar...',
      ),
    );
  }
}
