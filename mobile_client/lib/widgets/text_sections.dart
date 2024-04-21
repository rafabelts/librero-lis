import 'package:flutter/material.dart';
import 'package:mobile_client/utils/colors.dart';

class RichTexts extends StatelessWidget {
  final AlignmentGeometry alignment;
  final String principalText;
  final List<InlineSpan> otherTextsList;
  const RichTexts(
      {super.key,
      required this.alignment,
      required this.principalText,
      required this.otherTextsList});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: alignment,
      child: RichText(
        text: TextSpan(
          style: TextStyle(
            fontSize: 14,
            fontFamily: 'Puritan',
            color: AppColorScheme.lightColorScheme.onBackground,
          ),
          text: principalText,
          children: otherTextsList,
        ),
      ),
    );
  }
}

class H1BoldText extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  final Color? color;
  const H1BoldText({super.key, required this.text, this.alignment, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      style: TextStyle(fontSize: 37, fontWeight: FontWeight.bold, color: color),
    );
  }
}

class H3BoldText extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  final Color? color;
  const H3BoldText({super.key, required this.text, this.alignment, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: color),
    );
  }
}

class H4BoldText extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  final Color? color;

  const H4BoldText({super.key, required this.text, this.alignment, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color),
    );
  }
}

class H5Text extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  final Color? color;

  const H5Text({super.key, required this.text, this.alignment, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      overflow: TextOverflow.ellipsis,
      style: TextStyle(fontSize: 21, color: color),
    );
  }
}

class H5BoldText extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  final Color? color;

  const H5BoldText({super.key, required this.text, this.alignment, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      style: TextStyle(fontSize: 21, fontWeight: FontWeight.bold, color: color),
    );
  }
}

class Title1TextBold extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  final Color? color;

  const Title1TextBold(
      {super.key, required this.text, this.alignment, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: color),
    );
  }
}

class Title1Text extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  final Color? color;

  const Title1Text({super.key, required this.text, this.alignment, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      style:
          TextStyle(fontSize: 18, fontWeight: FontWeight.normal, color: color),
    );
  }
}

class Title2TextBold extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  final Color? color;

  const Title2TextBold(
      {super.key, required this.text, this.alignment, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: color),
    );
  }
}

class Title2Text extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  final Color? color;

  const Title2Text({super.key, required this.text, this.alignment, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      style:
          TextStyle(fontSize: 16, fontWeight: FontWeight.normal, color: color),
    );
  }
}

class BodyText extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  const BodyText({super.key, required this.text, this.alignment});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      overflow: TextOverflow.ellipsis,
      maxLines: 4,
      style: const TextStyle(
        fontSize: 14,
      ),
    );
  }
}

class BodyBoldText extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  const BodyBoldText({super.key, required this.text, this.alignment});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      overflow: TextOverflow.ellipsis,
      maxLines: 4,
      style: const TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.bold,
      ),
    );
  }
}

class CaptionText extends StatelessWidget {
  final String text;
  final TextAlign? alignment;
  final Color? color;

  const CaptionText(
      {super.key, required this.text, this.alignment, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: alignment,
      overflow: TextOverflow.ellipsis,
      maxLines: 2,
      style:
          TextStyle(fontSize: 12, fontWeight: FontWeight.normal, color: color),
    );
  }
}
