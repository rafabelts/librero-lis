import 'package:flutter/material.dart';
import 'package:mobile_client/utils/theme.dart';

class AppBackButton extends StatelessWidget {
  final Color? color;
  const AppBackButton({super.key, this.color});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.pop(context),
      child: Icon(
        Icons.arrow_back_ios,
        size: 28,
        color: color,
      ),
    );
  }
}

class AppContinueElevatedButton extends StatelessWidget {
  final Function() onPressed;
  final String label;
  const AppContinueElevatedButton({
    super.key,
    required this.onPressed,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onPressed,
        child: Text(
          label,
          style: const TextStyle(fontSize: 21.0, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}

class AppOutlinedButton extends StatelessWidget {
  final Function() onPressed;
  final String label;
  const AppOutlinedButton({
    super.key,
    required this.onPressed,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton(
        onPressed: onPressed,
        child: Text(
          label,
          style: const TextStyle(fontSize: 21.0, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}

class BottomNavigatorButton extends StatelessWidget {
  final Function() onPressed;
  final IconData icon;
  const BottomNavigatorButton(
      {super.key, required this.onPressed, required this.icon});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all(appColorScheme.secondary),
          overlayColor: MaterialStateProperty.all(
            const Color.fromARGB(255, 28, 123, 61),
          ),
          fixedSize: MaterialStateProperty.all(const Size(90, 45))),
      child: Icon(
        icon,
        size: 40,
      ),
    );
  }
}
