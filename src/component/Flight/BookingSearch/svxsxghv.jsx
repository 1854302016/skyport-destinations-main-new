const result = [
  [
    {
      FirstNameFormat: null,
      IsBookableIfSeatNotAvailable: false,
      IsHoldAllowedWithSSR: false,
      LastNameFormat: null,
      ResultIndex:
        "OB2[TBO]N355cHab5gb6tmld7RYBiheXUCm0EmeTZLY2e2oSImnARYGmXAawIWzdgJMzSAltMl9fNGIhrBPL79Ei9Yxi4fmyq+B5Tek3HaN0Xs7MZF0FtY7ufurQCI6iUwzr7ddaBVq9xwl1d4PtRnz0hC+dmzmOg1Jv97+QhKvZkaHM9PfBO30F6kfc2wi/erwYJ1AWY+BtzRjs75aPpKwiMEkg3sTG8YJwaLggh+XDrh/eHCy5BL823UmJn9i0XNWNhhIADkQOjNsQrMJsoGhlRSAS3UaNul9OgkBOLQHtGuAutnyK08DVAoqrEJlcPHxvFhfWgHbe6sxY8NfsZwbTuvsvcu4g3or3m+ZIod3/HSL9kW+Hpn7Q5jKspLUTtv3d9vnr7lYEHp05fr+aMRCiNFClYu5WtnJh7HQZ8kYCUYeP+Ks=",
      Source: 120,
      IsLCC: true,
      IsRefundable: true,
      IsPanRequiredAtBook: false,
      IsPanRequiredAtTicket: false,
      IsPassportRequiredAtBook: false,
      IsPassportRequiredAtTicket: false,
      GSTAllowed: true,
      IsCouponAppilcable: true,
      IsGSTMandatory: false,
      AirlineRemark: "Iween test int.",
      IsPassportFullDetailRequiredAtBook: false,
      ResultFareType: "RegularFare",
      Fare: {
        Currency: "INR",
        BaseFare: 3998,
        Tax: 2486,
        TaxBreakup: [
          {
            key: "K3",
            value: 0,
          },
        ],
        YQTax: 1800,
        AdditionalTxnFeeOfrd: 0,
        AdditionalTxnFeePub: 0,
        PGCharge: 0,
        OtherCharges: 472,
        ChargeBU: [
          {
            key: "TBOMARKUP",
            value: 0,
          },
          {
            key: "GLOBALPROCUREMENTCHARGE",
            value: 0,
          },
          {
            key: "CONVENIENCECHARGE",
            value: 0,
          },
          {
            key: "OTHERCHARGE",
            value: 472,
          },
        ],
        Discount: 0,
        PublishedFare: 6956,
        CommissionEarned: 0,
        PLBEarned: 0,
        IncentiveEarned: 0,
        OfferedFare: 6956,
        TdsOnCommission: 0,
        TdsOnPLB: 0,
        TdsOnIncentive: 0,
        ServiceFee: 0,
        TotalBaggageCharges: 0,
        TotalMealCharges: 0,
        TotalSeatCharges: 0,
        TotalSpecialServiceCharges: 0,
      },
      FareBreakdown: [
        {
          Currency: "INR",
          PassengerType: 1,
          PassengerCount: 2,
          BaseFare: 3998,
          Tax: 2486,
          TaxBreakUp: [
            {
              key: "YQTax",
              value: 1800,
            },
          ],
          YQTax: 1800,
          AdditionalTxnFeeOfrd: 0,
          AdditionalTxnFeePub: 0,
          PGCharge: 0,
          SupplierReissueCharges: 0,
        },
      ],
      Segments: [
        [
          {
            Baggage: null,
            CabinBaggage: null,
            CabinClass: 0,
            SupplierFareClass: null,
            TripIndicator: 1,
            SegmentIndicator: 1,
            Airline: {
              AirlineCode: "SG",
              AirlineName: "Spicejet",
              FlightNumber: "8269",
              FareClass: "P1",
              OperatingCarrier: "",
            },
            Origin: {
              Airport: {
                AirportCode: "DEL",
                AirportName: "Indira Gandhi Airport",
                Terminal: "",
                CityCode: "DEL",
                CityName: "Delhi",
                CountryCode: "IN",
                CountryName: "India",
              },
              DepTime: "2024-04-09T20:15:00",
            },
            Destination: {
              Airport: {
                AirportCode: "BOM",
                AirportName:
                  "Chhatrapati Shivaji Maharaj International Airport",
                Terminal: "",
                CityCode: "BOM",
                CityName: "Mumbai",
                CountryCode: "IN",
                CountryName: "India",
              },
              ArrTime: "2024-04-09T22:30:00",
            },
            Duration: 135,
            GroundTime: 0,
            Mile: 0,
            StopOver: false,
            FlightInfoIndex: "",
            StopPoint: "",
            StopPointArrivalTime: null,
            StopPointDepartureTime: null,
            Craft: "",
            Remark: null,
            IsETicketEligible: true,
            FlightStatus: "Confirmed",
            Status: "",
            FareClassification: {
              Type: "",
            },
          },
        ],
      ],
      LastTicketDate: null,
      TicketAdvisory: null,
      FareRules: [
        {
          Origin: "DEL",
          Destination: "BOM",
          Airline: "SG",
          FareBasisCode: "P1",
          FareRuleDetail: "",
          FareRestriction: "",
          FareFamilyCode: "",
          FareRuleIndex: "",
        },
      ],
      AirlineCode: "SG",
      ValidatingAirline: "SG",
      FareClassification: {
        Color: "Green",
        Type: "InstSeriesPurIWN",
      },
    },
  ],
];

const njdvb = {
  FirstNameFormat: null,
  IsBookableIfSeatNotAvailable: false,
  IsHoldAllowedWithSSR: false,
  LastNameFormat: null,
  ResultIndex:
    "OB3[TBO]0/XsQjJJymNBUM6YHyECGx1EdgwxD9zAneU8Xp4tz1ti18SOHLvSunkEU8sep6H66JV9geEfXOIUArfb6joyyZMnt1Zg0SowU5yaDkJ/CKNAF1TbfPaFUFXxFHH6wwT6QX/hoZ0TPiRv42TJwY+BT1jHc8ZMTFBDsu565nEUeYE0F2i65tPyTaG+MhVCspoJ+Fz29d6n3g/cw5JlZxeF/HhFEPyM2XqZ02E2uyuYpmQpq8qg+K+/bChFmCFqYdfSB/drO5OklIzMQ6pGv6OPDzFc0hWndr4Q8cCA+gQPXdXyPGq56CzE56DYms1WR/hWf8GMFuH1Bko6PRHAtN/SiwWZOj0Xql3GRsJke0C9F+mcWzEkdj5+hWXkqMCuHBhmv7J40wYntDY+llYkJrOY7sQ94ZjkfcArnp4dhddgOxlNk/sh/LF9GBpHc/24S+0yEHHD1fJRN2AvDejtciqTWMcINNSIsU8S4bcnMLscmv8xms/KQM+DTqIW0ubpC4AmOjyamAeQ9uNh4p/mICqz6Gj3muCwVcRCKx6dPdPyqBF0Jhtgj5IugHkFe6Y1hK2F",
  Source: 6,
  IsLCC: true,
  IsRefundable: false,
  IsPanRequiredAtBook: false,
  IsPanRequiredAtTicket: false,
  IsPassportRequiredAtBook: false,
  IsPassportRequiredAtTicket: false,
  GSTAllowed: true,
  IsCouponAppilcable: true,
  IsGSTMandatory: false,
  AirlineRemark: "6E main.",
  IsPassportFullDetailRequiredAtBook: false,
  ResultFareType: "RegularFare",
  Fare: {
    Currency: "INR",
    BaseFare: 18500,
    Tax: 3765,
    TaxBreakup: [
      {
        key: "K3",
        value: 0,
      },
      {
        key: "YQTax",
        value: 0,
      },
      {
        key: "YR",
        value: 0,
      },
      {
        key: "PSF",
        value: 0,
      },
      {
        key: "UDF",
        value: 0,
      },
      {
        key: "INTax",
        value: 0,
      },
      {
        key: "TransactionFee",
        value: 0,
      },
      {
        key: "OtherTaxes",
        value: 0,
      },
    ],
    YQTax: 0,
    AdditionalTxnFeeOfrd: 0,
    AdditionalTxnFeePub: 0,
    PGCharge: 0,
    OtherCharges: 0,
    ChargeBU: [
      {
        key: "TBOMARKUP",
        value: 0,
      },
      {
        key: "GLOBALPROCUREMENTCHARGE",
        value: 0,
      },
      {
        key: "CONVENIENCECHARGE",
        value: 0,
      },
      {
        key: "OTHERCHARGE",
        value: 0,
      },
    ],
    Discount: 0,
    PublishedFare: 22265,
    CommissionEarned: 255,
    PLBEarned: 120.91,
    IncentiveEarned: 0,
    OfferedFare: 21889.09,
    TdsOnCommission: 102,
    TdsOnPLB: 48.36,
    TdsOnIncentive: 0,
    ServiceFee: 0,
    TotalBaggageCharges: 0,
    TotalMealCharges: 0,
    TotalSeatCharges: 0,
    TotalSpecialServiceCharges: 0,
  },
  FareBreakdown: [
    {
      Currency: "INR",
      PassengerType: 1,
      PassengerCount: 3,
      BaseFare: 9000,
      Tax: 2259,
      TaxBreakUp: [
        {
          key: "YQTax",
          value: 0,
        },
        {
          key: "YR",
          value: 0,
        },
      ],
      YQTax: 0,
      AdditionalTxnFeeOfrd: 0,
      AdditionalTxnFeePub: 0,
      PGCharge: 0,
      SupplierReissueCharges: 0,
    },
    {
      Currency: "INR",
      PassengerType: 2,
      PassengerCount: 2,
      BaseFare: 6000,
      Tax: 1506,
      TaxBreakUp: [
        {
          key: "YQTax",
          value: 0,
        },
        {
          key: "YR",
          value: 0,
        },
      ],
      YQTax: 0,
      AdditionalTxnFeeOfrd: 0,
      AdditionalTxnFeePub: 0,
      PGCharge: 0,
      SupplierReissueCharges: 0,
    },
    {
      Currency: "INR",
      PassengerType: 3,
      PassengerCount: 2,
      BaseFare: 3500,
      Tax: 0,
      TaxBreakUp: null,
      YQTax: 0,
      AdditionalTxnFeeOfrd: 0,
      AdditionalTxnFeePub: 0,
      PGCharge: 0,
      SupplierReissueCharges: 0,
    },
  ],
  Segments: [
    [
      {
        Baggage: "15 KG",
        CabinBaggage: " 7 KG",
        CabinClass: 2,
        SupplierFareClass: null,
        TripIndicator: 1,
        SegmentIndicator: 1,
        Airline: {
          AirlineCode: "6E",
          AirlineName: "Indigo",
          FlightNumber: "2766",
          FareClass: "SN",
          OperatingCarrier: "",
        },
        NoOfSeatAvailable: 18,
        Origin: {
          Airport: {
            AirportCode: "DEL",
            AirportName: "Indira Gandhi Airport",
            Terminal: "2",
            CityCode: "DEL",
            CityName: "Delhi",
            CountryCode: "IN",
            CountryName: "India",
          },
          DepTime: "2024-04-10T03:45:00",
        },
        Destination: {
          Airport: {
            AirportCode: "BOM",
            AirportName: "Chhatrapati Shivaji Maharaj International Airport",
            Terminal: "2",
            CityCode: "BOM",
            CityName: "Mumbai",
            CountryCode: "IN",
            CountryName: "India",
          },
          ArrTime: "2024-04-10T05:40:00",
        },
        Duration: 115,
        GroundTime: 0,
        Mile: 0,
        StopOver: false,
        FlightInfoIndex: "",
        StopPoint: "",
        StopPointArrivalTime: null,
        StopPointDepartureTime: null,
        Craft: "321",
        Remark: null,
        IsETicketEligible: true,
        FlightStatus: "Confirmed",
        Status: "",
        FareClassification: {
          Type: "",
        },
      },
    ],
  ],
  LastTicketDate: null,
  TicketAdvisory: null,
  FareRules: [
    {
      Origin: "DEL",
      Destination: "BOM",
      Airline: "6E",
      FareBasisCode: "SSPL",
      FareRuleDetail: "",
      FareRestriction: "",
      FareFamilyCode: "",
      FareRuleIndex: "",
    },
  ],
  AirlineCode: "6E",
  ValidatingAirline: "6E",
  FareClassification: {
    Color: "lightBlue",
    Type: "Publish",
  },
};

// https://flight.easemytrip.com/FlightList/Index?srch=DEL-Delhi-India|BOM-Mumbai-India|08/04/2024&px=3-2-2&cbn=0&ar=undefined&isow=true&isdm=true&lang=en-us&&IsDoubleSeat=false&CCODE=IN&curr=INR&apptype=B2C

// https://flight.easemytrip.com/FlightList/Index?srch=DEL-Delhi-India|BOM-Mumbai-India|08/04/2024&px=3-2-2&cbn=4&ar=undefined&isow=true&isdm=true&lang=en-us&&IsDoubleSeat=false&CCODE=IN&curr=INR&apptype=B2C            premium economy(cbn)

// https://flight.easemytrip.com/FlightListRT/Index?srch=DEL-Delhi-India|BOM-Mumbai-India|08/04/2024-10/4/2024&px=3-2-2&cbn=4&ar=undefined&isow=false&isdm=true&lang=en-us&&IsDoubleSeat=false&CCODE=IN&curr=INR&apptype=B2C    roundway(diff url)

// https://flight.easemytrip.com/Review/CheckOut?CSU=&SearchID=5vbny01mvzr&ft=7&Ift=7&bc=&ISWL=&curr=INR&lang=en-us&CCODE=IN&apptype=B2C&utm_campaign=&utm_source=&utm_medium=&utm_term=&adgroupid=&gad_source=&gclid=

/* 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const cabinMapping = {
      Economy: 2,
      First: 6,
      Business: 4,
      PremiumEconomy: 3,
    };

    const tripTypeMapping = {
      OneWay: 1,
      RoundTrip: 2,
      MultiCity: 3,
    };

    const cabin = cabinMapping[event.target.cabinClass.value];
    const tripType = tripTypeMapping[!setActive ? "RoundTrip" : "OneWay"];

    // proxy: "http://localhost:3000",
    // const SearchData = {
    //   Adults: rooms[0].adults,
    //   Authentication: {
    //     Password: "EMT@uytrFYTREt",
    //     UserName: "EMTB2B",
    //     IpAddress: "192.168.1.135",
    //   },
    //   Cabin: cabin,
    //   Childs: rooms[0].children,
    //   FlightSearchDetails: [
    //     {
    //       BeginDate: startDate.format("YYYY-MM-DD"),
    //       Origin: event.target.from.value,
    //       Destination: event.target.to.value,
    //     },
    //   ],
    //   Infants: rooms[0].infants,
    //   TraceId: "1",
    //   TripType: tripType,
    // };

    const SearchData = {
      EndUserIp: "192.168.10.10",
      TokenId: "4ba5b7e1-12c2-429c-b427-f8128bf5b157",
      AdultCount: rooms[0].adults,
      ChildCount: rooms[0].children,
      InfantCount: rooms[0].infants,
      JourneyType: tripType,
      Segments: [
        {
          Origin: event.target.from.value,
          Destination: event.target.to.value,
          FlightCabinClass: cabin,
          PreferredDepartureTime: startDate
            .startOf("day")
            .format("YYYY-MM-DDTHH:mm:ss"),
          PreferredArrivalTime: endDate
            ? endDate.startOf("day").format("YYYY-MM-DDTHH:mm:ss")
            : startDate
                .add(1, "day")
                .startOf("day")
                .format("YYYY-MM-DDTHH:mm:ss"),
        },
      ],
    };
    // const JsonData = JSON.stringify(SearchData);

    // try {
    //   console.log(SearchData);
    //   const response = await axios.post(
    //     "https://admin.skyportdestinations.com/api/flightSearch",
    //     SearchData
    //     // {
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //     "Access-Control-Allow-Origin": "http://localhost:3000",
    //     //   },
    //     // }
    //   );
    //   navigate("/flightList", {
    //     state: { flightSearchResponse: response.data.data.results },
    //   });
    //   console.log("API response:", response.data.data.results);
    // } catch (error) {
    //   console.error("API request failed:", error);
    // }

    console.log(SearchData);
    dispatch(flightSearch(SearchData, navigate));
    navigate(
      `/flightList/${encodeURIComponent(`dest=${SearchData.Segments.Destination}|org=${SearchData.Segments.Origin}|dep=${SearchData.Segments.PreferredDepartureTime}|arr=${SearchData.Segments.PreferredArrivalTime}|px=${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}|jt=${SearchData.JourneyType}|cbn=${SearchData.Segments.FlightCabinClass}`)}`
    );
  };

*/
