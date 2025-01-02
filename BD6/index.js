const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

let travelPackages = [
  {
    packageId: 1,
    destination: 'Paris',
    price: 1500,
    duration: 7,
    availableSlots: 10,
  },
  {
    packageId: 2,
    destination: 'Rome',
    price: 1200,
    duration: 5,
    availableSlots: 15,
  },
  {
    packageId: 3,
    destination: 'Tokyo',
    price: 2000,
    duration: 10,
    availableSlots: 8,
  },
  {
    packageId: 4,
    destination: 'New York',
    price: 1700,
    duration: 7,
    availableSlots: 12,
  },
  {
    packageId: 5,
    destination: 'Dubai',
    price: 1100,
    duration: 4,
    availableSlots: 20,
  },
  {
    packageId: 6,
    destination: 'Sydney',
    price: 2500,
    duration: 12,
    availableSlots: 5,
  },
  {
    packageId: 7,
    destination: 'Cape Town',
    price: 1800,
    duration: 8,
    availableSlots: 6,
  },
  {
    packageId: 8,
    destination: 'Bangkok',
    price: 800,
    duration: 3,
    availableSlots: 25,
  },
  {
    packageId: 9,
    destination: 'Barcelona',
    price: 1400,
    duration: 6,
    availableSlots: 10,
  },
  {
    packageId: 10,
    destination: 'Bali',
    price: 1300,
    duration: 5,
    availableSlots: 15,
  },
  {
    packageId: 11,
    destination: 'Istanbul',
    price: 1000,
    duration: 4,
    availableSlots: 18,
  },
  {
    packageId: 12,
    destination: 'London',
    price: 1900,
    duration: 9,
    availableSlots: 7,
  },
  {
    packageId: 13,
    destination: 'Hawaii',
    price: 2200,
    duration: 10,
    availableSlots: 8,
  },
  {
    packageId: 14,
    destination: 'Moscow',
    price: 1600,
    duration: 8,
    availableSlots: 10,
  },
  {
    packageId: 15,
    destination: 'Athens',
    price: 1200,
    duration: 6,
    availableSlots: 12,
  },
];

let bookings = [
  {
    bookingId: 1,
    packageId: 1,
    customerName: 'Anjali Seth',
    bookingDate: '2024-12-01',
    seats: 2,
  },
  {
    bookingId: 2,
    packageId: 5,
    customerName: 'Rahul',
    bookingDate: '2024-11-20',
    seats: 3,
  },
  {
    bookingId: 3,
    packageId: 8,
    customerName: 'Kiran Wankhade',
    bookingDate: '2024-10-15',
    seats: 1,
  },
  {
    bookingId: 4,
    packageId: 3,
    customerName: 'Robert',
    bookingDate: '2024-09-10',
    seats: 4,
  },
  {
    bookingId: 5,
    packageId: 12,
    customerName: 'Aryan Khan',
    bookingDate: '2024-08-25',
    seats: 2,
  },
];

async function getAllPackages() {
  return travelPackages;
}

async function getPackageByDestination(destination) {
  return travelPackages.find((dest) => dest.destination === destination);
}

async function addNewBooking(data) {
  data.bookingId = bookings.length + 1;
  bookings.push(data);
  return data;
}

async function getBookingByPackageId(id) {
  let existingBooking = bookings.find((ele) => ele.packageId === id);
  return existingBooking;
}

async function updateSlots(data) {
  const { packageId, seatsBooked } = data;
  let existingPackage = travelPackages.find(
    (ele) => ele.packageId === packageId
  );
  existingPackage.availableSlots = existingPackage.availableSlots - seatsBooked;
  return existingPackage;
}

//Get all packages.
app.get('/packages', async (req, res) => {
  const packages = await getAllPackages();
  res.status(200).json(packages);
});

//Get booking by destination
app.get('/packages/:destination', async (req, res) => {
  const destination = req.params.destination;
  const Allpackage = await getPackageByDestination(destination);
  if (!Allpackage) return res.status(404).json({ message: 'No Package Found' });
  res.status(200).json(Allpackage);
});

//Add new Bookig
app.post('/bookings', async (req, res) => {
  const booking = await addNewBooking(req.body);
  res.status(201).json(booking);
});

//update slots for package
app.post('/packages/update-seats', async (req, res) => {
  const updatedPackage = await updateSlots(req.body);
  res.status(201).json(updatedPackage);
});

//retrieve All Bookings for a Package
app.get('/bookings/:packageId', async (req, res) => {
  const id = parseInt(req.params.packageId);
  const bookings = await getBookingByPackageId(id);
  if (!bookings) return res.status(404).json({ message: 'No bookings found' });
  res.status(200).json(bookings);
});

module.exports = app;
module.exports = {
  getAllPackages,
  getBookingByPackageId,
  getPackageByDestination,
  addNewBooking,
  updateSlots,
};
