// ignore_for_file: non_constant_identifier_names
class Book {
  final String isbn;
  final String title;
  final String editorial;
  final String author;
  final int publication_year;
  final int copies;
  final List<dynamic> copiesData;
  final String image_url;

  Book(this.isbn, this.title, this.editorial, this.author,
      this.publication_year, this.copies, this.copiesData, this.image_url);
}
