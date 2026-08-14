// CurrencyContext.js
// Site-wide INR/USD/CAD currency switch. Flight fares from the booking API are
// always in USD; this context converts them for display when the visitor
// picks another currency (INR is the default) using live, cached exchange rates.
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CurrencyContext = createContext();

const SELECTED_CURRENCY_KEY = "selectedCurrency";
const RATE_CACHE_KEY = "usdRatesCache";
const RATE_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
// Used only if the live API and the cache both fail.
const FALLBACK_RATES = { INR: 88, CAD: 1.37 };

const SYMBOLS = { INR: "₹", USD: "$", CAD: "C$" };
const CURRENCIES = ["INR", "USD", "CAD"];

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState(
    () => localStorage.getItem(SELECTED_CURRENCY_KEY) || "INR"
  );
  // USD-based rates, e.g. { INR: 88.2, CAD: 1.37 }. USD itself is always 1.
  const [rates, setRates] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const readCache = () => {
      try {
        return JSON.parse(localStorage.getItem(RATE_CACHE_KEY) || "null");
      } catch {
        return null;
      }
    };

    const loadRates = async () => {
      const cached = readCache();
      if (cached && Date.now() - cached.timestamp < RATE_CACHE_TTL) {
        if (!cancelled) setRates(cached.rates);
        return;
      }

      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();
        const rates = { INR: data?.rates?.INR, CAD: data?.rates?.CAD };
        if (rates.INR && rates.CAD) {
          if (!cancelled) setRates(rates);
          localStorage.setItem(
            RATE_CACHE_KEY,
            JSON.stringify({ rates, timestamp: Date.now() })
          );
          return;
        }
        throw new Error("INR/CAD rate missing from response");
      } catch (error) {
        console.error("Error fetching USD exchange rates:", error);
        if (!cancelled) setRates(cached?.rates || FALLBACK_RATES);
      }
    };

    loadRates();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((next) => {
    setCurrencyState(next);
    localStorage.setItem(SELECTED_CURRENCY_KEY, next);
  }, []);

  // Converts `amount` (given in `fromCurrency`) into the currently selected
  // display currency. Returns the raw amount until exchange rates load.
  const convert = useCallback(
    (amount, fromCurrency = "USD") => {
      if (amount == null || isNaN(amount)) return amount;
      if (fromCurrency === currency) return amount;
      if (!rates) return amount;

      const rateFor = (code) => (code === "USD" ? 1 : rates[code]);
      const fromRate = rateFor(fromCurrency);
      const toRate = rateFor(currency);
      if (!fromRate || !toRate) return amount;

      const amountInUsd = amount / fromRate;
      return amountInUsd * toRate;
    },
    [currency, rates]
  );

  const formatPrice = useCallback(
    (amount, fromCurrency = "USD") => {
      const converted = convert(amount, fromCurrency);
      if (converted == null || isNaN(converted)) return "";
      const decimals = currency === "INR" ? 0 : 2;
      const formatted = Number(converted).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      return `${SYMBOLS[currency]}${formatted}`;
    },
    [convert, currency]
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencies: CURRENCIES,
        symbol: SYMBOLS[currency],
        setCurrency,
        convert,
        formatPrice,
        rateReady: rates != null,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
