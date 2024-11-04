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
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        cityName: 'Beijing',
        countryName: 'China',
        countryCode: 'CN',
        airportName: 'Beijing Capital International Airport',
        iataCode: 'PEK'
    },
    {
        cityName: 'Shanghai',
        countryName: 'China',
        countryCode: 'CN',
        airportName: 'Shanghai Pudong International Airport',
        iataCode: 'PVG'
    },
    {
        cityName: 'Guangzhou',
        countryName: 'China',
        countryCode: 'CN',
        airportName: 'Guangzhou Baiyun International Airport',
        iataCode: 'CAN'
    },
    {
        cityName: 'Chengdu',
        countryName: 'China',
        countryCode: 'CN',
        airportName: 'Chengdu Shuangliu International Airport',
        iataCode: 'CTU'
    },
    {
        cityName: 'Shenzhen',
        countryName: 'China',
        countryCode: 'CN',
        airportName: 'Shenzhen Baoan International Airport',
        iataCode: 'SZX'
    },
    {
        cityName: 'Kunming',
        countryName: 'China',
        countryCode: 'CN',
        airportName: 'Kunming Changshui International Airport',
        iataCode: 'KMG'
    }
];
const russia = [
    {
        cityName: 'Moscow',
        countryName: 'Russia',
        countryCode: 'RU',
        airportName: 'Sheremetyevo International Airport',
        iataCode: 'SVO'
    },
    {
        cityName: 'Moscow',
        countryName: 'Russia',
        countryCode: 'RU',
        airportName: 'Domodedovo International Airport',
        iataCode: 'DME'
    },
    {
        cityName: 'Saint Petersburg',
        countryName: 'Russia',
        countryCode: 'RU',
        airportName: 'Pulkovo Airport',
        iataCode: 'LED'
    },
    {
        cityName: 'Novosibirsk',
        countryName: 'Russia',
        countryCode: 'RU',
        airportName: 'Tolmachevo Airport',
        iataCode: 'OVB'
    },
    {
        cityName: 'Yekaterinburg',
        countryName: 'Russia',
        countryCode: 'RU',
        airportName: 'Koltsovo Airport',
        iataCode: 'SVX'
    },
    {
        cityName: 'Kazan',
        countryName: 'Russia',
        countryCode: 'RU',
        airportName: 'Kazan International Airport',
        iataCode: 'KZN'
    }
];
const germany = [
    {
        cityName: 'Berlin',
        countryName: 'Germany',
        countryCode: 'DE',
        airportName: 'Berlin Brandenburg Airport',
        iataCode: 'BER'
    },
    {
        cityName: 'Frankfurt',
        countryName: 'Germany',
        countryCode: 'DE',
        airportName: 'Frankfurt Airport',
        iataCode: 'FRA'
    },
    {
        cityName: 'Munich',
        countryName: 'Germany',
        countryCode: 'DE',
        airportName: 'Munich Airport',
        iataCode: 'MUC'
    },
    {
        cityName: 'Düsseldorf',
        countryName: 'Germany',
        countryCode: 'DE',
        airportName: 'Düsseldorf Airport',
        iataCode: 'DUS'
    },
    {
        cityName: 'Hamburg',
        countryName: 'Germany',
        countryCode: 'DE',
        airportName: 'Hamburg Airport',
        iataCode: 'HAM'
    },
    {
        cityName: 'Stuttgart',
        countryName: 'Germany',
        countryCode: 'DE',
        airportName: 'Stuttgart Airport',
        iataCode: 'STR'
    }
];
const france = [
    {
        cityName: 'Paris',
        countryName: 'France',
        countryCode: 'FR',
        airportName: 'Charles de Gaulle Airport',
        iataCode: 'CDG'
    },
    {
        cityName: 'Paris',
        countryName: 'France',
        countryCode: 'FR',
        airportName: 'Orly Airport',
        iataCode: 'ORY'
    },
    {
        cityName: 'Nice',
        countryName: 'France',
        countryCode: 'FR',
        airportName: 'Nice Côte d\'Azur Airport',
        iataCode: 'NCE'
    },
    {
        cityName: 'Lyon',
        countryName: 'France',
        countryCode: 'FR',
        airportName: 'Lyon–Saint-Exupéry Airport',
        iataCode: 'LYS'
    },
    {
        cityName: 'Marseille',
        countryName: 'France',
        countryCode: 'FR',
        airportName: 'Marseille Provence Airport',
        iataCode: 'MRS'
    },
    {
        cityName: 'Toulouse',
        countryName: 'France',
        countryCode: 'FR',
        airportName: 'Toulouse Blagnac Airport',
        iataCode: 'TLS'
    }
];
const australia = [
    {
        cityName: 'Sydney',
        countryName: 'Australia',
        countryCode: 'AU',
        airportName: 'Sydney Kingsford Smith Airport',
        iataCode: 'SYD'
    },
    {
        cityName: 'Melbourne',
        countryName: 'Australia',
        countryCode: 'AU',
        airportName: 'Melbourne Airport',
        iataCode: 'MEL'
    },
    {
        cityName: 'Brisbane',
        countryName: 'Australia',
        countryCode: 'AU',
        airportName: 'Brisbane Airport',
        iataCode: 'BNE'
    },
    {
        cityName: 'Perth',
        countryName: 'Australia',
        countryCode: 'AU',
        airportName: 'Perth Airport',
        iataCode: 'PER'
    },
    {
        cityName: 'Adelaide',
        countryName: 'Australia',
        countryCode: 'AU',
        airportName: 'Adelaide Airport',
        iataCode: 'ADL'
    },
    {
        cityName: 'Gold Coast',
        countryName: 'Australia',
        countryCode: 'AU',
        airportName: 'Gold Coast Airport',
        iataCode: 'OOL'
    }
];
const vietnam = [
    {
        cityName: 'Hanoi',
        countryName: 'Vietnam',
        countryCode: 'VN',
        airportName: 'Noi Bai International Airport',
        iataCode: 'HAN'
    },
    {
        cityName: 'Ho Chi Minh City',
        countryName: 'Vietnam',
        countryCode: 'VN',
        airportName: 'Tan Son Nhat International Airport',
        iataCode: 'SGN'
    },
    {
        cityName: 'Da Nang',
        countryName: 'Vietnam',
        countryCode: 'VN',
        airportName: 'Da Nang International Airport',
        iataCode: 'DAD'
    },
    {
        cityName: 'Nha Trang',
        countryName: 'Vietnam',
        countryCode: 'VN',
        airportName: 'Cam Ranh International Airport',
        iataCode: 'CXR'
    },
    {
        cityName: 'Hai Phong',
        countryName: 'Vietnam',
        countryCode: 'VN',
        airportName: 'Cat Bi International Airport',
        iataCode: 'HPH'
    },
    {
        cityName: 'Phu Quoc',
        countryName: 'Vietnam',
        countryCode: 'VN',
        airportName: 'Phu Quoc International Airport',
        iataCode: 'PQC'
    }
];
demo.post('/admin-user', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // check email exists
        const email = yield prisma_1.default.adminUser.findUnique({
            where: {
                email: body.email
            }
        });
        if (email) {
            return c.json({ success: false, message: "Email already exists" }, 409);
        }
        //
        const salt = bcrypt_1.default.genSaltSync(16);
        const hashPassword = bcrypt_1.default.hashSync(body.password, salt);
        // create admin user
        const adminUser = yield prisma_1.default.adminUser.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                role: body.role,
                adminUserAuth: {
                    create: { password: hashPassword, method: 'password' }
                }
            }
        });
        return c.json({ success: true, adminUser }, 200);
    }
    catch (error) {
        console.log('Error creating admin user', error);
        return c.json({ success: false, error: error }, 500);
    }
}));
demo.post('/city', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cityList = [...india, ...japan, ...china, ...russia, ...germany, ...france, ...australia, ...vietnam];
        const totalCity = cityList.length;
        for (const city of cityList) {
            const check = yield prisma_1.default.cities.findUnique({
                where: {
                    cityName_countryName: {
                        cityName: city.cityName,
                        countryName: city.countryName,
                    }
                }
            });
            if (!check) {
                yield prisma_1.default.cities.create({
                    data: {
                        cityName: city.cityName,
                        countryName: city.countryName,
                        countryCode: city.countryCode,
                    },
                });
            }
        }
        return c.json({ success: true, for: 'city', totalCity }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
demo.post("/airport", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airportList = [...india, ...japan, ...china, ...russia, ...germany, ...france, ...australia, ...vietnam];
        const totalAirport = airportList.length;
        for (const airport of airportList) {
            const check = yield prisma_1.default.cities.findUnique({
                where: {
                    cityName_countryName: {
                        cityName: airport.cityName,
                        countryName: airport.countryName,
                    }
                }
            });
            if (check) {
                yield prisma_1.default.airports.create({
                    data: {
                        airportName: airport.airportName,
                        iataCode: airport.iataCode,
                        cityId: check.id
                    }
                });
            }
        }
        return c.json({ success: true, for: 'airport', totalAirport }, 200);
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
        const totalAirplane = airplaneModels.length;
        airplaneModels === null || airplaneModels === void 0 ? void 0 : airplaneModels.map((airplane) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.airplanes.create({
                data: {
                    modelNumber: airplane.modelNumber,
                    manufacturer: airplane.manufacturer,
                    capacity: airplane.capacity,
                }
            });
        }));
        return c.json({ success: true, done: 'airplane', totalAirplane }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = demo;