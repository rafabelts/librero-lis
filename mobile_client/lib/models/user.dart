// ignore_for_file: non_constant_identifier_names, constant_identifier_names

class User {
  final String email;
  final String name;
  final String student_id;
  final String user_type;

  const User(
      {required this.email,
      required this.student_id,
      required this.name,
      required this.user_type});

  factory User.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'email': String email,
        'name': String name,
        'student_id': String student_id,
        'user_type': String user_type,
      } =>
        User(
          email: email,
          name: name,
          student_id: student_id,
          user_type: user_type,
        ),
      _ => throw const FormatException('Failed to load user'),
    };
  }
}
