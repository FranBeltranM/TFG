import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../classes/vehicle.dart';
import '../../widgets/transfer_row.dart';

class ShowVehicleData extends StatelessWidget {
  const ShowVehicleData({
    Key? key,
    required this.futureVehicle,
    required String vin,
  })  : _vin = vin,
        super(key: key);

  final Future<Vehicle>? futureVehicle;
  final String _vin;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Vehicle>(
      future: futureVehicle,
      builder: (context, snapshot) {
        if (_vin != '') {
          switch (snapshot.connectionState) {
            case ConnectionState.none:
            case ConnectionState.waiting:
              return const CupertinoActivityIndicator();
            default:
              if (snapshot.hasError) {
                return Column(
                  children: const [
                    Icon(CupertinoIcons.xmark_circle),
                    Text('Failed to fetch data.'),
                  ],
                );
              } else {
                return Container(
                  padding: const EdgeInsets.only(left: 50.0, right: 50.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          // color: Colors.blue.shade100,
                          borderRadius: BorderRadiusDirectional.circular(8.0),
                        ),
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Text(snapshot.data!.brand),
                            Text(snapshot.data!.model),
                          ],
                        ),
                      ),
                      Container(
                        color: const Color(0xFF00C6FF),
                        width: 24.0,
                        height: 1.0,
                        margin: const EdgeInsets.symmetric(vertical: 8.0),
                      ),
                      Container(
                        // padding: EdgeInsets.only(left: 50.0, right: 50.0),
                        padding: const EdgeInsets.all(8.0),
                        // decoration: BoxDecoration(color: Colors.blue.shade100),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                const Icon(CupertinoIcons.textformat_123,
                                    size: 20.0),
                                const Padding(
                                  padding: EdgeInsets.only(
                                    left: 2.0,
                                    right: 2.0,
                                  ),
                                ),
                                Text(
                                  snapshot.data!.vin,
                                  style: const TextStyle(
                                    fontSize: 14.0,
                                    // fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(
                              width: 100.0,
                              child: Row(
                                children: [
                                  const Icon(CupertinoIcons.info, size: 20.0),
                                  const Padding(
                                    padding: EdgeInsets.only(
                                      left: 2.0,
                                      right: 2.0,
                                    ),
                                  ),
                                  Text(snapshot.data!.fuel),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        // padding: EdgeInsets.only(left: 50.0, right: 50.0),
                        // decoration: BoxDecoration(color: Colors.blue.shade100),
                        padding: const EdgeInsets.all(8.0),

                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                const Icon(
                                    CupertinoIcons.device_phone_landscape,
                                    size: 20.0),
                                const Padding(
                                  padding: EdgeInsets.only(
                                    left: 2.0,
                                    right: 2.0,
                                  ),
                                ),
                                Text(snapshot.data!.plateType),
                              ],
                            ),
                            SizedBox(
                              width: 100.0,
                              child: Row(
                                children: [
                                  const Icon(CupertinoIcons.escape, size: 20.0),
                                  const Padding(
                                    padding: EdgeInsets.only(
                                      left: 2.0,
                                      right: 2.0,
                                    ),
                                  ),
                                  Text(snapshot.data!.emissions),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        color: const Color(0xFF00C6FF),
                        width: 24.0,
                        height: 1.0,
                        margin: const EdgeInsets.symmetric(vertical: 8.0),
                      ),
                      Column(
                        children: snapshot.data!.transfers
                            .map(
                              (e) => TransferRow(
                                transferObject: e,
                                color: Colors.blue.shade100,
                              ),
                            )
                            .toList(),
                      ),
                    ],
                  ),
                );
              }
          }
        } else {
          return Container();
        }
      },
    );
  }
}
