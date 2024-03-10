//ignore_for_file:prefer_const_constructors
import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class SettingsUserCard extends StatelessWidget {
  final String name;
  final String id;
  const SettingsUserCard({super.key, required this.name, required this.id});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, Routes.profileSettingsScreen),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
        color: Color.fromARGB(255, 17, 58, 111),
        child: ListTile(
          splashColor: Color.fromARGB(255, 10, 34, 66),
          leading: Icon(
            Icons.person,
            color: appColorScheme.background,
            size: 50,
          ),
          title: H1BoldText(
            text: name,
            color: appColorScheme.background,
          ),
          contentPadding: EdgeInsets.symmetric(horizontal: 6.0, vertical: 10.0),
          subtitle: Title1Text(
            text: id,
            color: appColorScheme.background,
          ),
        ),
      ),
    );
  }
}

class SettingsItem extends StatelessWidget {
  final void Function() onTap;
  final String setting;
  final IconData icon;
  const SettingsItem(
      {super.key,
      required this.onTap,
      required this.icon,
      required this.setting});

  @override
  Widget build(BuildContext context) {
    Color color = Color.fromARGB(255, 10, 34, 66);
    return GestureDetector(
      onTap: onTap,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(
            icon,
            color: color,
            size: 40,
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 12.0),
            child: H4BoldText(
              text: setting,
              color: color,
            ),
          ),
          Spacer(),
          Icon(
            Icons.arrow_right,
            color: color,
            size: 36,
          )
        ],
      ),
    );
  }
}
