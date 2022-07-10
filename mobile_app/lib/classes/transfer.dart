import 'package:intl/intl.dart';

class Transfer {
  final String firstPlateDate;
  final String plateDate;
  final String startTranferDate;
  final String writeTransferDate;
  final String endTransferDate;
  final String typeTransfer;
  final String zipCode;
  final String person;
  final String typeServiceVehicle;
  final String city;

  Transfer({
    required this.firstPlateDate,
    required this.plateDate,
    required this.startTranferDate,
    required this.writeTransferDate,
    required this.endTransferDate,
    required this.typeTransfer,
    required this.zipCode,
    required this.person,
    required this.typeServiceVehicle,
    required this.city,
  });

  factory Transfer.fromJson(Map<String, dynamic> json) {
    var values = json.values.toList();
    var dateFormat = DateFormat('yyyy/MM/dd');

    return Transfer(
      firstPlateDate:
          values[0] != null ? dateFormat.format(DateTime.parse(values[0])) : '',
      plateDate:
          values[1] != null ? dateFormat.format(DateTime.parse(values[1])) : '',
      startTranferDate:
          values[2] != null ? dateFormat.format(DateTime.parse(values[2])) : '',
      writeTransferDate:
          values[3] != null ? dateFormat.format(DateTime.parse(values[3])) : '',
      endTransferDate:
          values[4] != null ? dateFormat.format(DateTime.parse(values[4])) : '',
      typeTransfer: values[5].toString(),
      zipCode: values[6].toString(),
      person: values[7].toString(),
      typeServiceVehicle: values[8].toString(),
      city: values[9].toString(),
    );
  }
}
