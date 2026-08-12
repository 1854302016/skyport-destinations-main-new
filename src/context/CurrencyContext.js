// CurrencyContext.js
// Site-wide INR/USD currency switch. Flight fares from the booking API are
// always in USD; this context converts them for display when the visitor
// picks INR (the default) using a live, cached exchange rate.
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CurrencyContext = createContext();

const SELECTED_CURRENCY_KEY = "selectedCurrency";
const RATE_CACHE_KEY = "usdToInrRateCache";
const RATE_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
const FALLBACK_USD_TO_INR = 88; // used only if the live API and the cache both fail

const SYMBOLS = { INR: "₹", USD: "$" };

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState(
    () => localStorage.getItem(SELECTED_CURRENCY_KEY) || "INR"
  );
  const [usdToInr, setUsdToInr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const readCache = () => {
      try {
        return JSON.parse(localStorage.getItem(RATE_CACHE_KEY) || "null");
      } catch {
        return null;
      }
    };

    const loadRate = async () => {
      const cached = readCache();
      if (cached && Date.now() - cached.timestamp < RATE_CACHE_TTL) {
        if (!cancelled) setUsdToInr(cached.rate);
        return;
      }

      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();
        const rate = data?.rates?.INR;
        if (rate) {
          if (!cancelled) setUsdToInr(rate);
          localStorage.setItem(
            RATE_CACHE_KEY,
            JSON.stringify({ rate, timestamp: Date.now() })
          );
          return;
        }
        throw new Error("INR rate missing from response");
      } catch (error) {
        console.error("Error fetching USD/INR exchange rate:", error);
        if (!cancelled) setUsdToInr(cached?.rate || FALLBACK_USD_TO_INR);
      }
    };

    loadRate();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((next) => {
    setCurrencyState(next);
    localStorage.setItem(SELECTED_CURRENCY_KEY, next);
  }, []);

  // Converts `amount` (given in `fromCurrency`) into the currently selected
  // display currency. Returns the raw amount until the exchange rate loads.
  const convert = useCallback(
    (amount, fromCurrency = "USD") => {
      if (amount == null || isNaN(amount)) return amount;
      if (fromCurrency === currency) return amount;
      if (!usdToInr) return amount;
      if (fromCurrency === "USD" && currency === "INR") return amount * usdToInr;
      if (fromCurrency === "INR" && currency === "USD") return amount / usdToInr;
      return amount;
    },
    [currency, usdToInr]
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
        currencies: ["INR", "USD"],
        symbol: SYMBOLS[currency],
        setCurrency,
        convert,
        formatPrice,
        rateReady: usdToInr != null,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
