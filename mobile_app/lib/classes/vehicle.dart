import 'transfer.dart';

class Vehicle {
  final String brand;
  final String model;
  final String plateType;
  final String vin;
  final String fuel;
  final String emissions;
  var transfers = [];

  Vehicle({
    required this.brand,
    required this.model,
    required this.plateType,
    required this.vin,
    required this.fuel,
    required this.emissions,
    required this.transfers,
  });

  factory Vehicle.fromJson(Map<String, dynamic> json) {
    var transfers = [];

    try {
      for (var transfer in json['transfers']) {
        transfers.add(Transfer.fromJson(transfer));
      }
    } catch (err) {
      throw ('ERROR: $err');
    }

    return Vehicle(
      brand: json['vehicle']['brand'] as String,
      model: json['vehicle']['model'] as String,
      plateType: json['vehicle']['plateType'] as String,
      vin: json['vehicle']['vin'] as String,
      fuel: json['vehicle']['fuel'] as String,
      emissions: json['vehicle']['emissions'] as String,
      transfers: transfers,
    );
  }
}
