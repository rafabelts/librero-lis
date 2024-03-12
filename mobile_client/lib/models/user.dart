// ignore_for_file: non_constant_identifier_names

class User {
  final String student_id;
  final String email;
  final String password;
  final String name;

  const User(
      {required this.student_id,
      required this.email,
      required this.password,
      required this.name});

  factory User.fromJson(Map<String, String> json) {
    return switch (json) {
      {
        'student_id': String student_id,
        'email': String email,
        'password': String password,
        'name': String name,
      } =>
        User(
          student_id: student_id,
          email: email,
          password: password,
          name: name,
        ),
      _ => throw const FormatException('Failed to load user'),
    };
  }
}
