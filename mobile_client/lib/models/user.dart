// ignore_for_file: non_constant_identifier_names, constant_identifier_names

class User {
  final String email;
  final String student_id;
  final String name;

  const User(
      {required this.email, required this.student_id, required this.name});

  factory User.fromJson(Map<String, String> json) {
    return switch (json) {
      {
        'email': String email,
        'student_id': String student_id,
        'name': String name,
      } =>
        User(
          email: email,
          student_id: student_id,
          name: name,
        ),
      _ => throw const FormatException('Failed to load user'),
    };
  }
}
