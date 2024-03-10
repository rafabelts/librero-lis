//ignore_for_file:prefer_const_constructors
import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/widgets/settings_alert_dialogs.dart';
import 'package:mobile_client/widgets/settings_widgets.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class AdminSettings extends StatelessWidget {
  const AdminSettings({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        H1BoldText(text: "Configuración"),
        // Padding(
        //   padding: EdgeInsets.only(top: 6, bottom: 50),
        //   child: AppSearchBar(),
        // ),
        Padding(
          padding: EdgeInsets.symmetric(vertical: 36),
          child: Wrap(
            runSpacing: 50.0,
            children: [
              SettingsItem(
                  onTap: () =>
                      Navigator.pushNamed(context, Routes.changePassword),
                  setting: "Cambiar contraseña",
                  icon: Icons.lock),
              SettingsItem(
                  onTap: () => showDialog(
                      context: context,
                      builder: (BuildContext context) =>
                          VerificationToSignOut()),
                  setting: "Cerrar sesión",
                  icon: Icons.exit_to_app),
            ],
          ),
        ),
      ],
    );
  }
}
