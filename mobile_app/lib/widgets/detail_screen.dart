import 'package:flutter/cupertino.dart';
import './data/show_data_vehicle.dart';
import '../classes/vehicle.dart';

class SecondScreenState extends StatelessWidget {
  final String vin;
  final Future<Vehicle>? futureVehicle;

  const SecondScreenState({
    super.key,
    required this.vin,
    required this.futureVehicle,
  });

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: const Color.fromRGBO(254, 254, 254, 0.95),
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Resultados'),
      ),
      child: SingleChildScrollView(
        padding: EdgeInsets.only(top: 110.0, bottom: 40.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ShowVehicleData(futureVehicle: futureVehicle, vin: vin),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
