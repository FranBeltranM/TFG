import 'dart:convert';
import 'package:http/http.dart' as http;
import '../classes/vehicle.dart';

Future<Vehicle> fetchData(String vin) async {
  var wwss = 'https://api-tfg.franbeltran.es/buscar?bastidor=$vin';
  final response = await http.get(Uri.parse(wwss));

  if (response.statusCode == 200) {
    print(response.body);
    return Vehicle.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to fetch data');
  }
}
