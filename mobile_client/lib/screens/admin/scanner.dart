// ignore_for_file: prefer_const_constructors

import 'dart:io';
import 'package:flutter/material.dart';
import 'package:mobile_client/widgets/buttons.dart';
import 'package:mobile_client/widgets/scanner_actions.dart';

import 'package:qr_code_scanner/qr_code_scanner.dart';

class BookScanner extends StatefulWidget {
  const BookScanner({super.key});

  @override
  State<BookScanner> createState() => _BookScannerState();
}

class _BookScannerState extends State<BookScanner> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  Barcode? result;
  QRViewController? controller;

  // In order to get hot reload to work we need to pause the camera if the platform
  // is android, or resume the camera if the platform is iOS.
  @override
  void reassemble() {
    super.reassemble();
    if (Platform.isAndroid) {
      controller!.pauseCamera();
    } else if (Platform.isIOS) {
      controller!.resumeCamera();
    }
  }

  @override
  Widget build(BuildContext context) {
    var scanArea = (MediaQuery.of(context).size.width < 400 ||
            MediaQuery.of(context).size.height < 400)
        ? 250.00
        : 500.00;
    return Scaffold(
      body: Stack(
        alignment: Alignment.bottomCenter,
        children: [
          Expanded(
            flex: 5,
            child: QRView(
                key: qrKey,
                onQRViewCreated: _onQRViewCreated,
                cameraFacing: CameraFacing.back,
                overlay: QrScannerOverlayShape(
                  borderColor: const Color.fromARGB(255, 36, 157, 78),
                  borderRadius: 10,
                  borderLength: 30,
                  borderWidth: 15,
                  cutOutSize: scanArea,
                ) // Forma del overlay para el QR,
                ),
          ),
          Positioned(
            top: 40.0,
            left: 20.0,
            child: AppBackButton(),
          ),
          Positioned(
            bottom: 40.0,
            right: null,
            left: null,
            child: ElevatedButton(
                style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(
                        const Color.fromARGB(255, 36, 157, 78)),
                    overlayColor: MaterialStateProperty.all(
                        Color.fromARGB(255, 22, 95, 47)),
                    fixedSize: MaterialStateProperty.all(const Size(100, 70))),
                child: Icon(
                  Icons.qr_code,
                  size: 55,
                ),
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) => SelectScannerAction(
                      book_code: '',
                    ),
                  );
                }),
          ),
        ],
      ),
    );
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) {
      setState(() {
        result = scanData;
      });
    });
  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }
}


/*{
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  Barcode? result;
  QRViewController? controller;

  // Se pausa o resume (en adroid pausa, ios resume) la cámara para que el hot reload funcione
  @override
  void reassemble() {
    super.reassemble();
    if (Platform.isAndroid) {
      controller!.pauseCamera();
    } else if (Platform.isIOS) {
      controller!.resumeCamera();
    }
  }

  @override
  Widget build(BuildContext context) {
    // Se comprueba ancho o alto del dispositivo y se cambia el area de scan y el overlay para el qr
    var scanArea = (MediaQuery.of(context).size.width < 400 ||
            MediaQuery.of(context).size.height < 400)
        ? 250.00
        : 500.00;
    return Scaffold(
      body: Stack(
        alignment: Alignment.bottomCenter,
        children: [
          Expanded(
            flex: 5,
            child: QRView(
                key: qrKey,
                onQRViewCreated: _onQRViewCreated,
                cameraFacing: CameraFacing.back,
                overlay: QrScannerOverlayShape(
                  borderColor: const Color.fromARGB(255, 36, 157, 78),
                  borderRadius: 10,
                  borderLength: 30,
                  borderWidth: 15,
                  cutOutSize: scanArea,
                ) // Forma del overlay para el QR,
                ),
          ),
          Positioned(
            top: 40.0,
            left: 20.0,
            child: AppBackButton(),
          ),
          Positioned(
            bottom: 40.0,
            right: null,
            left: null,
            child: ElevatedButton(
              style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(
                      const Color.fromARGB(255, 36, 157, 78)),
                  overlayColor: MaterialStateProperty.all(
                      Color.fromARGB(255, 22, 95, 47)),
                  fixedSize: MaterialStateProperty.all(const Size(100, 70))),
              child: Icon(
                Icons.qr_code,
                size: 55,
              ),
              onPressed: () {
                BookManagmentService.returnBookToInventory(
                    'aef11a94-13b5-4976-ae84-fe03183fe998');
              },
            ),
          ),
        ],
      ),
    );
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) {
      setState(() {
        result = scanData;
      });
      print(result);
    });
  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }
}
*/