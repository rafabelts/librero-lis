// ignore_for_file: prefer_const_constructors
import 'package:flutter/material.dart';

class WithoutImageOfBook extends StatelessWidget {
  const WithoutImageOfBook({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 225,
      width: 162,
      decoration: BoxDecoration(
        color: const Color.fromARGB(255, 238, 238, 238),
        shape: BoxShape.rectangle,
        borderRadius: BorderRadius.circular(10.0),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 6,
          ),
        ],
      ),
      child: Align(
        alignment: Alignment.center,
        child: Icon(
          Icons.image,
          size: 96,
        ),
      ),
    );
  }
}

class ImageOfBook extends StatelessWidget {
  final String image;
  const ImageOfBook({super.key, required this.image});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 225,
      width: 162,
      decoration: BoxDecoration(
        color: const Color.fromARGB(255, 238, 238, 238),
        shape: BoxShape.rectangle,
        image: DecorationImage(
          image: NetworkImage(image),
          fit: BoxFit.fill,
          onError: (exception, stackTrace) => Icon(
            Icons.image,
            size: 96,
          ),
        ),
        borderRadius: BorderRadius.circular(10.0),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 6,
          ),
        ],
      ),
    );
  }
}
