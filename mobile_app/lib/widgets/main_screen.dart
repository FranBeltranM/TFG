import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../classes/vehicle.dart';
import 'services.dart';
import 'dart:async';
import 'detail_screen.dart';

class MainScreen extends StatefulWidget {
  MainScreen() : super();

  final String title = 'CheckV.dev 🚗';

  @override
  MainScreenState createState() => MainScreenState();
}

class MainScreenState extends State<MainScreen> {
  Future<Vehicle>? futureVehicle;
  final _firstNameController = TextEditingController();
  var _vin = '';

  @override
  void initState() {
    super.initState();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: const Color.fromRGBO(254, 254, 254, 0.95),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          const MainTitle(title: 'CheckV.dev 🚗'),
          const MainTitle(
            title:
                '¿Quieres cambiar de vehículo?\n\n¿Quieres saber cuantas transferencias tiene un vehículo?',
          ),
          VinField(firstNameController: _firstNameController),
          const SizedBox(height: 30),
          CupertinoButton.filled(
            onPressed: () {
              setState(() {});
              _vin = _firstNameController.text;
              futureVehicle = fetchData(_vin);
              print('BASTIDOR: $_vin');
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => SecondScreenState(
                    vin: _vin,
                    futureVehicle: futureVehicle,
                  ),
                ),
              );
            },
            child: const Text('Buscar'),
          ),
        ],
      ),
    );
  }
}

class VinField extends StatelessWidget {
  const VinField({
    Key? key,
    required TextEditingController firstNameController,
  })  : _firstNameController = firstNameController,
        super(key: key);

  final TextEditingController _firstNameController;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: 50.0,
        left: 30.0,
        right: 30.0,
      ),
      child: CupertinoTextField(
        placeholder: 'Introduzca el bastidor de vehículo',
        textAlign: TextAlign.center,
        controller: _firstNameController,
        autofocus: true,
      ),
    );
  }
}

class MainTitle extends StatelessWidget {
  final String title;
  const MainTitle({
    Key? key,
    this.title = "",
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: 100.0,
        left: 50.0,
        right: 50.0,
      ),
      child: Text(
        title,
        textAlign: TextAlign.center,
        style: const TextStyle(
          fontFamily: 'SF UI Text',
          fontWeight: FontWeight.w800,
          fontSize: 18.0,
        ),
      ),
    );
  }
}
