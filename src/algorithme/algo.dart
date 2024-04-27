import 'dart:async';
import 'dart:isolate';

// ignore: non_constant_identifier_names
int MAX_PRIORITY = 100;
// ignore: non_constant_identifier_names
final List<Dock> DOCKS = [
  Dock(width: 10, place: 'A'),
  Dock(width: 15, place: 'B'),
  Dock(width: 20, place: 'C'),
  Dock(width: 25, place: 'D'),
  Dock(width: 30, place: 'E'),
];
List<Trip> TRIPS = <Trip>[
  Trip(
    name: 'Trip 1',
    origin: 'Port Said',
    destination: 'Alexandria',
    travelDuration: const Duration(seconds: 15),
    cargoType: CargoType(name: 'Cars', priority: 1),
    specialConditions: [
      SpecialCondition(name: 'Fragile', priority: 3),
    ],
    urgency: Urgency(name: 'High', value: 3),
    ship:
        Ship(name: "Ship 1", width: 20, timeAtPort: const Duration(seconds: 2)),
  ),
  Trip(
    name: 'Trip 2',
    origin: 'Port Said',
    destination: 'Alexandria',
    travelDuration: const Duration(seconds: 25),
    cargoType: CargoType(name: 'Cars', priority: 1),
    specialConditions: [
      SpecialCondition(name: 'Fragile', priority: 3),
    ],
    urgency: Urgency(name: 'High', value: 3),
    ship:
        Ship(name: "Ship 2", width: 15, timeAtPort: const Duration(seconds: 1)),
  ),
  Trip(
    name: 'Trip 3',
    origin: 'Port Said',
    destination: 'Alexandria',
    travelDuration: const Duration(seconds: 10),
    cargoType: CargoType(name: 'Cars', priority: 1),
    specialConditions: [
      SpecialCondition(name: 'Fragile', priority: 3),
    ],
    urgency: Urgency(name: 'High', value: 3),
    ship:
        Ship(name: "Ship 3", width: 25, timeAtPort: const Duration(seconds: 3)),
  ),
  Trip(
    name: 'Trip 4',
    origin: 'Port Said',
    destination: 'Alexandria',
    travelDuration: const Duration(seconds: 20),
    cargoType: CargoType(name: 'Cars', priority: 1),
    specialConditions: [
      SpecialCondition(name: 'Fragile', priority: 3),
    ],
    urgency: Urgency(name: 'High', value: 3),
    ship:
        Ship(name: "Ship 4", width: 20, timeAtPort: const Duration(seconds: 2)),
  ),
  Trip(
    name: 'Trip 5',
    origin: 'Port Said',
    destination: 'Alexandria',
    travelDuration: const Duration(seconds: 15), // Change the travel duration
    cargoType:
        CargoType(name: 'Electronics', priority: 2), // Change the cargo type
    specialConditions: [
      SpecialCondition(name: 'Fragile', priority: 3),
      SpecialCondition(
          name: 'Perishable', priority: 4), // Add a new special condition
    ],
    urgency: Urgency(name: 'Medium', value: 2), // Change the urgency
    ship: Ship(name: "Ship 5", width: 30, timeAtPort: const Duration(days: 2)),
  ),
  Trip(
    name: 'Trip 6',
    origin: 'Port Said',
    destination: 'Alexandria',
    travelDuration: const Duration(seconds: 20), // Change the travel duration
    cargoType:
        CargoType(name: 'Textiles', priority: 1), // Change the cargo type
    specialConditions: [
      SpecialCondition(name: 'Fragile', priority: 3),
    ],
    urgency: Urgency(name: 'Low', value: 1), // Change the urgency
    ship:
        Ship(name: "Ship 6", width: 25, timeAtPort: const Duration(seconds: 3)),
  ),
  Trip(
    name: 'Trip 7',
    origin: 'Port Said',
    destination: 'Alexandria',
    travelDuration: const Duration(seconds: 35), // Change the travel duration
    cargoType:
        CargoType(name: 'Chemicals', priority: 3), // Change the cargo type
    specialConditions: [
      SpecialCondition(
          name: 'Hazardous', priority: 5), // Add a new special condition
    ],
    urgency: Urgency(name: 'High', value: 3), // Change the urgency
    ship:
        Ship(name: "Ship 7", width: 20, timeAtPort: const Duration(seconds: 2)),
  ),
  Trip(
    name: 'Trip 8',
    origin: 'Port Said',
    destination: 'Alexandria',
    travelDuration: const Duration(seconds: 35), // Change the travel duration
    cargoType: CargoType(name: 'Food', priority: 2), // Change the cargo type
    specialConditions: [
      SpecialCondition(
          name: 'Perishable', priority: 4), // Add a new special condition
    ],
    urgency: Urgency(name: 'Medium', value: 2), // Change the urgency
    ship:
        Ship(name: "Ship 8", width: 15, timeAtPort: const Duration(seconds: 1)),
  ),
  Trip(
    name: 'Trip 9',
    origin: 'Port Said',
    destination: 'Alexandria',
    travelDuration: const Duration(seconds: 20), // Change the travel duration
    cargoType:
        CargoType(name: 'Electronics', priority: 2), // Change the cargo type
    specialConditions: [
      SpecialCondition(name: 'Fragile', priority: 3),
      SpecialCondition(
          name: 'Perishable', priority: 4), // Add a new special condition
    ],
    urgency: Urgency(name: 'Medium', value: 2), // Change the urgency
    ship:
        Ship(name: "Ship 9", width: 25, timeAtPort: const Duration(seconds: 3)),
  ),
];

class Parking {
  static List<Trip> trips = [];

  Parking();

  static void lowerPriority() {
    trips.map((e) => {e.priority -= 1});
  }

  static void parkTrip(Trip trip) {
    trips.add(trip);
    trips.sort((a, b) => a.priority.compareTo(b.priority));
    logAllDocks();
  }
}

class Urgency {
  String name;
  int value;

  Urgency({required this.name, required this.value});
}

class CargoType {
  String name;
  int priority;

  CargoType({required this.name, required this.priority});
}

class SpecialCondition {
  String name;
  int priority;

  SpecialCondition({required this.name, required this.priority});
}

class Ship {
  String name;
  double width;
  Duration timeAtPort;
  Ship({
    required this.name,
    required this.width,
    required this.timeAtPort,
  });
}

int calculatePriority(Urgency urgency, List<SpecialCondition> specialConditions,
    CargoType cargoType, Duration timeAtPort) {
  int w1 = 3; // weight for urgency
  double w2 = 0.05; // weight for time at port
  int w3 = 2; // weight for type of ship/cargo
  int w4 = 5; // weight for special conditions

  int priority = 0;

  priority += w1 * urgency.value;
  priority -= (w2 * timeAtPort.inMinutes)
      .toInt(); // Use inMinutes to get time in minutes
  priority += w3 * cargoType.priority;

  int specialConditionValue =
      specialConditions.fold(0, (prev, element) => prev + element.priority);
  priority += w4 * specialConditionValue;

  return MAX_PRIORITY ~/ (priority + 1); // Add 1 to avoid division by zero
}

class Trip {
  String name;
  String origin;
  String destination;
  Duration travelDuration;
  CargoType cargoType;
  List<SpecialCondition> specialConditions;
  Urgency urgency;
  Ship ship;
  int priority;
  Trip(
      {required this.name,
      required this.origin,
      required this.destination,
      required this.travelDuration,
      required this.cargoType,
      required this.ship,
      this.specialConditions = const [],
      required this.urgency})
      : priority = calculatePriority(
            urgency, specialConditions, cargoType, ship.timeAtPort);
}

class PausableTimer {
  Timer? _timer;
  Duration _duration;
  Duration _remaining;
  void Function() _onDone;
  bool _isPaused = false;
  DateTime _startTime;

  PausableTimer(this._duration, this._onDone)
      : _remaining = _duration,
        _startTime = DateTime.now(),
        _timer = Timer(_duration, _onDone);

  void pause() {
    if (_timer != null && _timer!.isActive && !_isPaused) {
      _isPaused = true;
      _remaining = _duration - DateTime.now().difference(_startTime);
      _timer!.cancel();
    }
  }

  void resume() {
    if (_isPaused) {
      _isPaused = false;
      _timer = Timer(_remaining, _onDone);
    }
  }
}

class Dock {
  late bool isFree;
  double width;
  String place;
  Trip? trip;
  PausableTimer? timer;
  Dock({required this.width, required this.place, this.trip}) {
    isFree = trip == null;
  }
  void replaceTrip(Trip _trip) {
    trip = _trip;
    isFree = false;
    timer = PausableTimer(Duration(seconds: 20), () {
      removeShipFromDeck(_trip);
    });
  }

  bool meetsRequirements(Trip trip) {
    //TODO Implement this method based on your requirements
    if (trip.ship.width > width) {
      return false;
    }

    return true;
  }
}

void removeShipFromDeck(Trip trip) {
  var dock = DOCKS.firstWhere((dock) => dock.trip == trip,
      orElse: () => Dock(width: 0, place: "null"));
  if (dock.place == "null") {
    return;
  }
  dock.isFree = true;
  dock.trip = null;
  logAllDocks();
  if (Parking.trips.isNotEmpty) {
    var newTrip = Parking.trips.first;
    Parking.trips.remove(newTrip);
    var dock = findDockingPlace(DOCKS, newTrip);
    dock?.timer?.resume();
  }
}

Dock? findDockingPlace(List<Dock> docks, Trip trip) {
  Dock? bestplace;
  for (var dock in docks) {
    if (!dock.meetsRequirements(trip)) continue;
    if (dock.isFree) {
      dock.replaceTrip(trip);
      logAllDocks();
      return dock;
    } else if (dock.trip!.priority > trip.priority &&
        dock.meetsRequirements(trip)) {
      if (bestplace == null || dock.trip!.priority > bestplace.trip!.priority) {
        bestplace = dock;
        continue;
      }
      continue;
    }
  }
  if (bestplace != null) {
    //TODO kick the currrent ship and na9as ml w9t t3ou
    kickShip(bestplace, docks);
    bestplace.timer?.pause();
    bestplace.trip = trip;
    bestplace.isFree = false; //! Assume this dock is now occupied
    logAllDocks();
    return bestplace;
  }

  Parking.parkTrip(trip);
  return null;
}

void kickShip(Dock dock, List<Dock> docks) {
  var newDocks = [...docks]..remove(dock);
  var trip = TRIPS.firstWhere((element) => element == dock.trip);
  findDockingPlace(newDocks, trip);
  dock.trip = null;
  dock.isFree = true;
}

void logAllDocks() {
  print('\n\n\n');
  print('---------------------------------------------------------');
  print('|    Dock   |   Width  |   Is Free   |   Ship Ocupier   |');
  print('---------------------------------------------------------');
  DOCKS.forEach((dock) {
    print(
        '|     ${dock.place}     |   ${dock.width}   |   ${dock.isFree}  ${dock.isFree ? " " : ""}   |     ${dock.isFree ? "No ship" : dock.trip!.ship.name + " "}      |');
  });
  print('--------------------------------------------------------');
  print("\n");
  print('------------------------------------------------------');
  print('|    Parking Lot   |  Ship Occupier   |   Priority   |');
  print('------------------------------------------------------');
  Parking.trips.forEach((trip) {
    print(
        '|   Parking Lot    |      ${trip.ship.name}      |      ${trip.priority}       |');
  });
  print('------------------------------------------------------');
  print('\n\n\n');
}

void main() async {
    final exitPort = ReceivePort();
  Isolate.current.addOnExitListener(exitPort.sendPort);
  // Wait for a message from the exit listener.
  exitPort.first.then((_) {
    // The isolate is about to shut down. Wait for all timers to finish.
    Timer.run(() {
      // Remove the exit listener.
      Isolate.current.removeOnExitListener(exitPort.sendPort);
      exitPort.close();
    });
  });
  for (var trip in TRIPS) {
    await Future.delayed(Duration(seconds: 2));
    findDockingPlace(DOCKS, trip);
  }
}
