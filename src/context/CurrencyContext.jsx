import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client.js";
import {
  DEFAULT_USD_TO_RWF,
  formatUSD as fUSD,
  formatRWF as fRWF,
  formatPrice as fPrice,
} from "../utils/currency.js";

const CurrencyContext = createContext(null);

// Fetches the live USD→RWF rate from the backend once on load and exposes
// formatting helpers bound to that rate. Falls back to the constant until then.
export function CurrencyProvider({ children }) {
  const [rate, setRate] = useState(DEFAULT_USD_TO_RWF);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    api
      .get("/currency/rates", { params: { symbols: "RWF" } })
      .then((r) => {
        const rwf = r.data?.data?.rates?.RWF;
        if (rwf) setRate(rwf);
        setUpdatedAt(r.data?.data?.updatedAt || null);
      })
      .catch(() => {
        /* keep the fallback rate */
      });
  }, []);

  const value = {
    rate,
    updatedAt,
    formatUSD: (a) => fUSD(a),
    formatRWF: (a) => fRWF(a, rate),
    formatPrice: (a) => fPrice(a, rate),
  };

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
