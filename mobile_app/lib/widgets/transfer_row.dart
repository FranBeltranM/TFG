import 'package:flutter/cupertino.dart';
import '../classes/transfer.dart';

class TransferRow extends StatelessWidget {
  final Transfer transferObject;
  final Color color;

  const TransferRow({
    required this.transferObject,
    required this.color,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(8.0),
          ),
          alignment: Alignment.center,
          padding: const EdgeInsets.all(12.0),
          child: Column(
            children: [
              Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Inicio: ${transferObject.startTranferDate}'),
                      Text('Fin: ${transferObject.endTransferDate}'),
                    ],
                  ),
                  Padding(padding: EdgeInsets.only(bottom: 8.0)),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          const Icon(CupertinoIcons.collections, size: 20.0),
                          const Padding(
                            padding: EdgeInsets.only(
                              left: 2.0,
                              right: 2.0,
                            ),
                          ),
                          Text(
                            '${transferObject.typeTransfer}',
                            textAlign: TextAlign.center,
                            style: TextStyle(fontSize: 14.0),
                          ),
                        ],
                      ),
                      SizedBox(
                        width: 120.0,
                        child: Row(children: [
                          const Icon(CupertinoIcons.person_alt_circle,
                              size: 20.0),
                          const Padding(
                            padding: EdgeInsets.only(
                              left: 2.0,
                              right: 2.0,
                            ),
                          ),
                          Text(
                            '${transferObject.person}',
                            textAlign: TextAlign.center,
                            style: TextStyle(fontSize: 14.0),
                          ),
                        ]),
                      )
                    ],
                  ),
                  Padding(padding: EdgeInsets.only(bottom: 8.0)),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          const Icon(
                            CupertinoIcons.location,
                            size: 20.0,
                          ),
                          const Padding(
                            padding: EdgeInsets.only(
                              left: 2.0,
                              right: 2.0,
                            ),
                          ),
                          Text(
                            transferObject.city,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 14.0,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(
                        width: 120.0,
                        child: Row(
                          children: [
                            const Icon(CupertinoIcons.map_pin, size: 20.0),
                            const Padding(
                              padding: EdgeInsets.only(
                                left: 2.0,
                                right: 2.0,
                              ),
                            ),
                            Text(
                              transferObject.zipCode,
                              textAlign: TextAlign.center,
                              style: const TextStyle(
                                fontSize: 14.0,
                              ),
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
        Container(
          color: const Color.fromARGB(255, 137, 137, 137),
          width: 24.0,
          height: 1.0,
          margin: const EdgeInsets.symmetric(
            vertical: 8.0,
          ),
        ),
      ],
    );
  }
}
