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
const airport = new hono_1.Hono();
airport.post("demo-airport", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const indiaAirport = [
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
                cityName: 'Hyderabad',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Rajiv Gandhi International Airport',
                iataCode: 'HYD'
            },
            {
                cityName: 'Kolkata',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Netaji Subhas Chandra Bose International Airport',
                iataCode: 'CCU'
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
                cityName: 'Goa',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Goa International Airport',
                iataCode: 'GOI'
            },
            {
                cityName: 'Jaipur',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Jaipur International Airport',
                iataCode: 'JAI'
            },
            {
                cityName: 'Lucknow',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Chaudhary Charan Singh International Airport',
                iataCode: 'LKO'
            },
            {
                cityName: 'Amritsar',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Sri Guru Ram Dass Jee International Airport',
                iataCode: 'ATQ'
            },
            {
                cityName: 'Trivandrum',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Trivandrum International Airport',
                iataCode: 'TRV'
            },
            {
                cityName: 'Kochi',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Cochin International Airport',
                iataCode: 'COK'
            },
            {
                cityName: 'Coimbatore',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Coimbatore International Airport',
                iataCode: 'CJB'
            },
            {
                cityName: 'Guwahati',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Lokpriya Gopinath Bordoloi International Airport',
                iataCode: 'GAU'
            },
            {
                cityName: 'Nagpur',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Dr. Babasaheb Ambedkar International Airport',
                iataCode: 'NAG'
            },
            {
                cityName: 'Patna',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Jay Prakash Narayan International Airport',
                iataCode: 'PAT'
            },
            {
                cityName: 'Srinagar',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Sheikh Ul-Alam International Airport',
                iataCode: 'SXR'
            },
            {
                cityName: 'Varanasi',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Lal Bahadur Shastri International Airport',
                iataCode: 'VNS'
            },
            {
                cityName: 'Indore',
                countryName: 'India',
                countryCode: 'IN',
                airportName: 'Devi Ahilya Bai Holkar Airport',
                iataCode: 'IDR'
            }
        ];
        const japanAirport = [
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
                cityName: 'Osaka',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Osaka International Airport (Itami)',
                iataCode: 'ITM'
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
                cityName: 'Naha',
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
            },
            {
                cityName: 'Okayama',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Okayama Airport',
                iataCode: 'OKJ'
            },
            {
                cityName: 'Matsuyama',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Matsuyama Airport',
                iataCode: 'MYJ'
            },
            {
                cityName: 'Kumamoto',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Kumamoto Airport',
                iataCode: 'KMJ'
            },
            {
                cityName: 'Nagoya',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Nagoya Airfield (Komaki Airport)',
                iataCode: 'NKM'
            },
            {
                cityName: 'Okinawa',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Miyako Airport',
                iataCode: 'MMY'
            },
            {
                cityName: 'Kochi',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Kochi Ryoma Airport',
                iataCode: 'KCZ'
            },
            {
                cityName: 'Toyama',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Toyama Airport',
                iataCode: 'TOY'
            },
            {
                cityName: 'Oita',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Oita Airport',
                iataCode: 'OIT'
            },
            {
                cityName: 'Niigata',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Niigata Airport',
                iataCode: 'KIJ'
            },
            {
                cityName: 'Kobe',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Kobe Airport',
                iataCode: 'UKB'
            },
            {
                cityName: 'Shizuoka',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Shizuoka Airport',
                iataCode: 'FSZ'
            },
            {
                cityName: 'Nagano',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Matsumoto Airport',
                iataCode: 'MMJ'
            },
            {
                cityName: 'Akita',
                countryName: 'Japan',
                countryCode: 'JP',
                airportName: 'Akita Airport',
                iataCode: 'AXT'
            }
        ];
        const unitedStatesAirport = [
            {
                cityName: 'Atlanta',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Hartsfield-Jackson Atlanta International Airport',
                iataCode: 'ATL'
            },
            {
                cityName: 'Los Angeles',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Los Angeles International Airport',
                iataCode: 'LAX'
            },
            {
                cityName: 'Chicago',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'O\'Hare International Airport',
                iataCode: 'ORD'
            },
            {
                cityName: 'Dallas',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Dallas/Fort Worth International Airport',
                iataCode: 'DFW'
            },
            {
                cityName: 'Denver',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Denver International Airport',
                iataCode: 'DEN'
            },
            {
                cityName: 'New York',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'John F. Kennedy International Airport',
                iataCode: 'JFK'
            },
            {
                cityName: 'San Francisco',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'San Francisco International Airport',
                iataCode: 'SFO'
            },
            {
                cityName: 'Seattle',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Seattle-Tacoma International Airport',
                iataCode: 'SEA'
            },
            {
                cityName: 'Las Vegas',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Harry Reid International Airport',
                iataCode: 'LAS'
            },
            {
                cityName: 'Orlando',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Orlando International Airport',
                iataCode: 'MCO'
            },
            {
                cityName: 'Charlotte',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Charlotte Douglas International Airport',
                iataCode: 'CLT'
            },
            {
                cityName: 'Miami',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Miami International Airport',
                iataCode: 'MIA'
            },
            {
                cityName: 'Phoenix',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Phoenix Sky Harbor International Airport',
                iataCode: 'PHX'
            },
            {
                cityName: 'Houston',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'George Bush Intercontinental Airport',
                iataCode: 'IAH'
            },
            {
                cityName: 'Boston',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Logan International Airport',
                iataCode: 'BOS'
            },
            {
                cityName: 'Minneapolis',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Minneapolis-Saint Paul International Airport',
                iataCode: 'MSP'
            },
            {
                cityName: 'Detroit',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Detroit Metropolitan Airport',
                iataCode: 'DTW'
            },
            {
                cityName: 'Philadelphia',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Philadelphia International Airport',
                iataCode: 'PHL'
            },
            {
                cityName: 'Salt Lake City',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Salt Lake City International Airport',
                iataCode: 'SLC'
            },
            {
                cityName: 'San Diego',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'San Diego International Airport',
                iataCode: 'SAN'
            },
            {
                cityName: 'Washington',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Washington Dulles International Airport',
                iataCode: 'IAD'
            },
            {
                cityName: 'Baltimore',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Baltimore/Washington International Thurgood Marshall Airport',
                iataCode: 'BWI'
            },
            {
                cityName: 'Tampa',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Tampa International Airport',
                iataCode: 'TPA'
            },
            {
                cityName: 'Portland',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Portland International Airport',
                iataCode: 'PDX'
            },
            {
                cityName: 'Honolulu',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Daniel K. Inouye International Airport',
                iataCode: 'HNL'
            },
            {
                cityName: 'St. Louis',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'St. Louis Lambert International Airport',
                iataCode: 'STL'
            },
            {
                cityName: 'Dallas',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Dallas Love Field',
                iataCode: 'DAL'
            },
            {
                cityName: 'Chicago',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Chicago Midway International Airport',
                iataCode: 'MDW'
            },
            {
                cityName: 'Oakland',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'Oakland International Airport',
                iataCode: 'OAK'
            },
            {
                cityName: 'New York',
                countryName: 'United States',
                countryCode: 'US',
                airportName: 'LaGuardia Airport',
                iataCode: 'LGA'
            }
        ];
        const germanyAirport = [
            {
                cityName: 'Frankfurt',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Frankfurt am Main Airport',
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
                cityName: 'Berlin',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Berlin Tegel Airport',
                iataCode: 'TXL'
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
                cityName: 'Cologne',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Cologne Bonn Airport',
                iataCode: 'CGN'
            },
            {
                cityName: 'Stuttgart',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Stuttgart Airport',
                iataCode: 'STR'
            },
            {
                cityName: 'Nuremberg',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Nuremberg Airport',
                iataCode: 'NUE'
            },
            {
                cityName: 'Hannover',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Hannover Airport',
                iataCode: 'HAJ'
            },
            {
                cityName: 'Leipzig',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Leipzig/Halle Airport',
                iataCode: 'LEJ'
            },
            {
                cityName: 'Bremen',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Bremen Airport',
                iataCode: 'BRE'
            },
            {
                cityName: 'Dresden',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Dresden Airport',
                iataCode: 'DRS'
            },
            {
                cityName: 'Dortmund',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Dortmund Airport',
                iataCode: 'DTM'
            },
            {
                cityName: 'Frankfurt',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Frankfurt-Hahn Airport',
                iataCode: 'HHN'
            },
            {
                cityName: 'Karlsruhe',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Karlsruhe/Baden-Baden Airport',
                iataCode: 'FKB'
            },
            {
                cityName: 'Memmingen',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Memmingen Airport',
                iataCode: 'FMM'
            },
            {
                cityName: 'Paderborn',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Paderborn Lippstadt Airport',
                iataCode: 'PAD'
            },
            {
                cityName: 'Rostock',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Rostock-Laage Airport',
                iataCode: 'RLG'
            },
            {
                cityName: 'Saarbrücken',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Saarbrücken Airport',
                iataCode: 'SCN'
            },
            {
                cityName: 'Weeze',
                countryName: 'Germany',
                countryCode: 'DE',
                airportName: 'Weeze Airport',
                iataCode: 'NRN'
            }
        ];
        const allCities = [...indiaAirport, ...japanAirport, ...unitedStatesAirport, ...germanyAirport];
        allCities === null || allCities === void 0 ? void 0 : allCities.map((city, index) => __awaiter(void 0, void 0, void 0, function* () {
            const cityy = yield prisma_1.default.cities.findFirst({
                where: {
                    cityName: city.cityName,
                    countryCode: city.countryCode
                }
            });
            yield prisma_1.default.airports.create({
                data: {
                    airportName: city.airportName,
                    address: city.cityName,
                    iataCode: city.iataCode,
                    cityId: cityy.id,
                }
            });
        }));
        return c.json({ success: true, airport: true }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
airport.post("create-airport", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // check airport code
        const airportCode = yield prisma_1.default.airports.findUnique({
            where: {
                iataCode: body.iataCode
            }
        });
        if (airportCode) {
            return c.json({ success: false, message: "Airport iata code already exist" }, 400);
        }
        // create airport
        const airport = yield prisma_1.default.airports.create({
            data: Object.assign({}, body)
        });
        return c.json({ success: true, airport }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
airport.put("update-airport/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const body = yield c.req.json();
        const airport = yield prisma_1.default.airports.update({
            where: {
                id: +id
            },
            data: Object.assign({}, body)
        });
        return c.json({ success: true, airport }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
airport.get("read-airport/:code", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = c.req.param("code");
        const airport = yield prisma_1.default.airports.findUnique({
            where: {
                iataCode: code
            },
            include: {
                city: true
            }
        });
        if (!airport)
            return c.json({ success: false, message: 'Not found airport' }, 409);
        return c.json({ success: true, airport }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
airport.delete("delete-airport/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const airport = yield prisma_1.default.airports.delete({
            where: {
                id: +id
            }
        });
        return c.json({ success: true, airport }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
airport.get("all-airports", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 25, search = '', orderColumn = '', order = '' } = c.req.query();
        const conditions = {};
        if (search) {
            conditions.airportName = {
                contains: search,
                mode: "insensitive"
            };
        }
        const query = {};
        if (orderColumn && order) {
            query.orderBy = { [orderColumn]: order };
        }
        const airports = yield prisma_1.default.airports.findMany(Object.assign(Object.assign({ where: conditions, take: +limit, skip: (+page - 1) * +limit }, query), { include: {
                city: true
            } }));
        const count = yield prisma_1.default.airports.count({
            where: conditions
        });
        return c.json({ success: true, airports, count }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
airport.get("search-airport", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = c.req.query('search');
        const airport = yield prisma_1.default.airports.findMany({
            where: {
                OR: [
                    {
                        iataCode: { contains: search, mode: "insensitive" }
                    },
                    {
                        city: {
                            cityName: { contains: search, mode: "insensitive" }
                        }
                    },
                ]
            },
            include: {
                city: true
            }
        });
        return c.json({ success: true, airport }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = airport;
