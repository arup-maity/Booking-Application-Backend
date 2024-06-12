import { Hono } from "hono";
import prisma from "../config/prisma";

const city = new Hono()

city.post("demo-city", async c => {
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
      ]
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
      ]
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
      ]
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
      ]

      const allCities = [...indiaAirport, ...japanAirport, ...unitedStatesAirport, ...germanyAirport]

      const cityList = [
         {
            "cityName": "Mumbai",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Delhi",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Bengaluru",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Chennai",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Hyderabad",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Kolkata",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Ahmedabad",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Pune",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Goa",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Jaipur",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Lucknow",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Amritsar",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Trivandrum",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Kochi",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Coimbatore",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Guwahati",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Nagpur",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Patna",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Srinagar",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Varanasi",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Indore",
            "countryName": "India",
            "countryCode": "IN"
         },
         {
            "cityName": "Tokyo",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Osaka",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Nagoya",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Fukuoka",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Sapporo",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Naha",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Hiroshima",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Sendai",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Kagoshima",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Okayama",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Matsuyama",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Kumamoto",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Okinawa",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Kochi",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Toyama",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Oita",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Niigata",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Kobe",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Shizuoka",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Nagano",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Akita",
            "countryName": "Japan",
            "countryCode": "JP"
         },
         {
            "cityName": "Atlanta",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Los Angeles",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Chicago",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Dallas",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Denver",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "New York",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "San Francisco",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Seattle",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Las Vegas",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Orlando",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Charlotte",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Miami",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Phoenix",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Houston",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Boston",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Minneapolis",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Detroit",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Philadelphia",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Salt Lake City",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "San Diego",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Washington",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Baltimore",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Tampa",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Portland",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Honolulu",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "St. Louis",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Oakland",
            "countryName": "United States",
            "countryCode": "US"
         },
         {
            "cityName": "Frankfurt",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Munich",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Berlin",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Düsseldorf",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Hamburg",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Cologne",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Stuttgart",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Nuremberg",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Hannover",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Leipzig",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Bremen",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Dresden",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Dortmund",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Karlsruhe",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Memmingen",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Paderborn",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Rostock",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Saarbrücken",
            "countryName": "Germany",
            "countryCode": "DE"
         },
         {
            "cityName": "Weeze",
            "countryName": "Germany",
            "countryCode": "DE"
         }
      ]

      cityList?.map(async (city) =>
         await prisma.cities.create({
            data: {
               cityName: city.cityName,
               countryName: city.countryName,
               countryCode: city.countryCode,
            }
         })
      )
      return c.json({ success: true, done: 'city' }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
city.post('create-city', async c => {
   try {
      const body = await c.req.json()
      // check cityCode exists
      const cityName = await prisma.cities.findUnique({
         where: {
            cityName_countryName: {
               cityName: body.cityName,
               countryName: body.countryName
            }
         }
      })
      if (cityName) return c.json({ success: false, message: 'City Name already exists on this country' }, 409)
      // create city
      const city = await prisma.cities.create({
         data: { ...body }
      })
      return c.json({ success: true, city }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
city.put("update-city/:id", async c => {
   try {
      const id = c.req.param("id")
      const body = await c.req.json()
      const city = await prisma.cities.update({
         where: { id: +id },
         data: {
            ...body
         }
      })
      return c.json({ success: true, city }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
city.get("read-city/:id", async c => {
   try {
      const id = c.req.param("id")
      const city = await prisma.cities.findUnique({
         where: { id: +id },
         include: {
            airports: true
         }
      })
      return c.json({ success: true, city }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
city.delete("delete-city/:id", async c => {
   try {
      const id = c.req.param("id")
      const city = await prisma.cities.delete({
         where: {
            id: +id
         }
      })
      return c.json({ success: true, city }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
city.get("all-cities", async c => {
   try {
      const { page = 1, limit = 25, search = '', orderColumn = '', order = '' } = c.req.query()
      const conditions: any = {}
      if (search) {
         conditions.cityName = {
            contains: search,
            mode: "insensitive"
         }
      }
      const query: any = {}
      if (orderColumn && order) {
         query.orderBy = { [orderColumn]: order }
      }
      const cities = await prisma.cities.findMany({
         where: conditions,
         include: {
            airports: true
         },
         take: +limit,
         skip: (+page - 1) * +limit,
         ...query
      })
      const count = await prisma.cities.count({
         where: conditions
      })
      return c.json({ success: true, cities, count }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
export default city