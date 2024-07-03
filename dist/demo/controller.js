"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const prisma_1 = __importDefault(require("../config/prisma"));
const demo = new hono_1.Hono();
const india = [
    {
        cityName: 'Mumbai',
        countryName: 'India',
        countryCode: 'IN',
        airportName: 'Chhatrapati Shivaji Maharaj International Airport',
        iataCode: 'BOM'
    },
    {
        cityName: 'Delhi',
        countryName: 'India',
        countryCode: 'IN',
        airportName: 'Indira Gandhi International Airport',
        iataCode: 'DEL'
    },
    {
        cityName: 'Bengaluru',
        countryName: 'India',
        countryCode: 'IN',
        airportName: 'Kempegowda International Airport',
        iataCode: 'BLR'
    },
    {
        cityName: 'Chennai',
        countryName: 'India',
        countryCode: 'IN',
        airportName: 'Chennai International Airport',
        iataCode: 'MAA'
    },
    {
        cityName: 'Kolkata',
        countryName: 'India',
        countryCode: 'IN',
        airportName: 'Netaji Subhas Chandra Bose International Airport',
        iataCode: 'CCU'
    },
    {
        cityName: 'Hyderabad',
        countryName: 'India',
        countryCode: 'IN',
        airportName: 'Rajiv Gandhi International Airport',
        iataCode: 'HYD'
    },
    {
        cityName: 'Ahmedabad',
        countryName: 'India',
        countryCode: 'IN',
        airportName: 'Sardar Vallabhbhai Patel International Airport',
        iataCode: 'AMD'
    },
    {
        cityName: 'Pune',
        countryName: 'India',
        countryCode: 'IN',
        airportName: 'Pune Airport',
        iataCode: 'PNQ'
    },
    {
        cityName: 'Kochi',
        countryName: 'India',
        countryCode: 'IN',
        airportName: 'Cochin International Airport',
        iataCode: 'COK'
    },
    {
        cityName: 'Goa',
        countryName: 'India',
        countryCode: 'IN',
        airportName: 'Goa International Airport',
        iataCode: 'GOI'
    }
];
const japan = [
    {
        cityName: 'Tokyo',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Narita International Airport',
        iataCode: 'NRT'
    },
    {
        cityName: 'Tokyo',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Haneda Airport',
        iataCode: 'HND'
    },
    {
        cityName: 'Osaka',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Kansai International Airport',
        iataCode: 'KIX'
    },
    {
        cityName: 'Nagoya',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Chubu Centrair International Airport',
        iataCode: 'NGO'
    },
    {
        cityName: 'Fukuoka',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Fukuoka Airport',
        iataCode: 'FUK'
    },
    {
        cityName: 'Sapporo',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'New Chitose Airport',
        iataCode: 'CTS'
    },
    {
        cityName: 'Okinawa',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Naha Airport',
        iataCode: 'OKA'
    },
    {
        cityName: 'Hiroshima',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Hiroshima Airport',
        iataCode: 'HIJ'
    },
    {
        cityName: 'Sendai',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Sendai Airport',
        iataCode: 'SDJ'
    },
    {
        cityName: 'Kagoshima',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Kagoshima Airport',
        iataCode: 'KOJ'
    }
];
const china = [
    {
        cityName: 'Tokyo',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Narita International Airport',
        iataCode: 'NRT'
    },
    {
        cityName: 'Tokyo',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Haneda Airport',
        iataCode: 'HND'
    },
    {
        cityName: 'Osaka',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Kansai International Airport',
        iataCode: 'KIX'
    },
    {
        cityName: 'Nagoya',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Chubu Centrair International Airport',
        iataCode: 'NGO'
    },
    {
        cityName: 'Fukuoka',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Fukuoka Airport',
        iataCode: 'FUK'
    },
    {
        cityName: 'Sapporo',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'New Chitose Airport',
        iataCode: 'CTS'
    },
    {
        cityName: 'Okinawa',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Naha Airport',
        iataCode: 'OKA'
    },
    {
        cityName: 'Hiroshima',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Hiroshima Airport',
        iataCode: 'HIJ'
    },
    {
        cityName: 'Sendai',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Sendai Airport',
        iataCode: 'SDJ'
    },
    {
        cityName: 'Kagoshima',
        countryName: 'Japan',
        countryCode: 'JP',
        airportName: 'Kagoshima Airport',
        iataCode: 'KOJ'
    }
];
demo.post('/city', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cityList = [...india, ...japan, ...china];
        cityList === null || cityList === void 0 ? void 0 : cityList.map((city) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.cities.create({
                data: {
                    cityName: city.cityName,
                    countryName: city.countryName,
                    countryCode: city.countryCode,
                }
            });
        }));
        return c.json({ success: true }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
demo.post("/airport", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airportList = [...india, ...japan, ...china];
        airportList === null || airportList === void 0 ? void 0 : airportList.map((airport) => __awaiter(void 0, void 0, void 0, function* () {
            const cityId = yield prisma_1.default.cities.findUnique({
                where: {
                    cityName_countryName: {
                        cityName: airport.cityName,
                        countryName: airport.countryName,
                    }
                }
            });
            if (cityId === null || cityId === void 0 ? void 0 : cityId.id) {
                yield prisma_1.default.airports.create({
                    data: {
                        airportName: airport.airportName,
                        iataCode: airport.iataCode,
                        cityId: cityId.id
                    }
                });
            }
            else {
            }
        }));
        return c.json({ success: true }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
demo.post("/airplane", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airplaneModels = [
            { modelNumber: 'A320', manufacturer: 'Airbus', capacity: 150 },
            { modelNumber: 'B737', manufacturer: 'Boeing', capacity: 180 },
            { modelNumber: 'A380', manufacturer: 'Airbus', capacity: 550 },
            { modelNumber: 'B777', manufacturer: 'Boeing', capacity: 350 },
            { modelNumber: 'A350', manufacturer: 'Airbus', capacity: 300 },
            { modelNumber: 'B787', manufacturer: 'Boeing', capacity: 250 },
            { modelNumber: 'A330', manufacturer: 'Airbus', capacity: 250 },
            { modelNumber: 'B747', manufacturer: 'Boeing', capacity: 400 },
            { modelNumber: 'A220', manufacturer: 'Airbus', capacity: 100 },
            { modelNumber: 'B757', manufacturer: 'Boeing', capacity: 200 },
            { modelNumber: 'A340', manufacturer: 'Airbus', capacity: 380 },
            { modelNumber: 'B717', manufacturer: 'Boeing', capacity: 100 },
            { modelNumber: 'A310', manufacturer: 'Airbus', capacity: 200 },
            { modelNumber: 'B767', manufacturer: 'Boeing', capacity: 290 },
            { modelNumber: 'A321', manufacturer: 'Airbus', capacity: 200 },
            { modelNumber: 'B777X', manufacturer: 'Boeing', capacity: 425 },
            { modelNumber: 'A330neo', manufacturer: 'Airbus', capacity: 300 },
            { modelNumber: 'B737 MAX', manufacturer: 'Boeing', capacity: 230 },
            { modelNumber: 'A380plus', manufacturer: 'Airbus', capacity: 600 },
            { modelNumber: 'B777F', manufacturer: 'Boeing', capacity: 102 },
            { modelNumber: 'A350-900', manufacturer: 'Airbus', capacity: 325 },
            { modelNumber: 'B787-10', manufacturer: 'Boeing', capacity: 330 },
            { modelNumber: 'A321neo', manufacturer: 'Airbus', capacity: 240 },
            { modelNumber: 'B767-400ER', manufacturer: 'Boeing', capacity: 375 },
            { modelNumber: 'A330-200F', manufacturer: 'Airbus', capacity: 70 }
        ];
        airplaneModels === null || airplaneModels === void 0 ? void 0 : airplaneModels.map((airplane) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.airplanes.create({
                data: {
                    modelNumber: airplane.modelNumber,
                    manufacturer: airplane.manufacturer,
                    capacity: airplane.capacity,
                }
            });
        }));
        return c.json({ success: true, done: 'city' }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = demo;