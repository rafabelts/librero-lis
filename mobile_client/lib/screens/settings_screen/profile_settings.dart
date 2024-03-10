// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile_client/routes/app_routes.dart';
import 'package:mobile_client/utils/theme.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/settings_widgets.dart';
import 'package:mobile_client/widgets/text_sections.dart';

class ProfileSettings extends StatelessWidget {
  const ProfileSettings({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppBackButton(color: appColorScheme.onBackground),
              Padding(
                padding: EdgeInsets.only(top: 30.0, bottom: 34.0),
                child: H1BoldText(
                  text: 'Jhon Doe',
                ),
              ),
              Wrap(
                runSpacing: 50.0,
                children: [
                  SettingsItem(
                    onTap: () =>
                        Navigator.pushNamed(context, Routes.changeEmailScreen),
                    setting: "Cambiar correo",
                    icon: Icons.email,
                  ),
                  SettingsItem(
                    onTap: () => Navigator.pushNamed(
                        context, Routes.changeStudentIdScreen),
                    setting: "Cambiar matrícula",
                    icon: Icons.assignment_ind,
                  ),
                  SettingsItem(
                    onTap: () =>
                        Navigator.pushNamed(context, Routes.changeName),
                    setting: "Cambiar nombre",
                    icon: Icons.person,
                  ),
                  SettingsItem(
                    onTap: () =>
                        Navigator.pushNamed(context, Routes.changePassword),
                    setting: "Cambiar contraseña",
                    icon: Icons.lock,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
