// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/widgets/app_search_bar.dart';
import 'package:mobile_client/widgets/settings_alert_dialogs.dart';
import 'package:mobile_client/widgets/settings_widgets.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class StudentSettings extends StatelessWidget {
  const StudentSettings({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        H1BoldText(text: "Configuración"),
        SizedBox(height: 6.0),
        AppSearchBar(),
        Padding(
          padding: EdgeInsets.only(top: 20.0, bottom: 40.0),
          child: SettingsUserCard(name: "Jhon Doe", id: "S23015364"),
        ),
        Wrap(
          runSpacing: 50.0,
          children: [
            SettingsItem(
                onTap: () {},
                setting: "Términos y condiciones",
                icon: Icons.assignment_late),
            SettingsItem(
                onTap: () {},
                setting: "Política de privacidad",
                icon: Icons.article),
            SettingsItem(
                onTap: () => showDialog(
                      context: context,
                      builder: (BuildContext context) =>
                          VerificationToSignOut(),
                    ),
                setting: "Cerrar sesión",
                icon: Icons.exit_to_app),
            SettingsItem(
                onTap: () => Navigator.pushNamed(context, Routes.deleteAccount),
                setting: "Eliminar cuenta",
                icon: Icons.delete_forever),
          ],
        ),
      ],
    );
  }
}
