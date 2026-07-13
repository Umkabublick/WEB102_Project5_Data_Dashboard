import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
        );

        const data = await response.json();

        setCoins(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchAllCoinData();
  }, []);

  const filteredCoins = coins.filter((coin) => {
    const matchesSearch = coin.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under1" && coin.current_price < 1) ||
      (priceFilter === "1to100" &&
        coin.current_price >= 1 &&
        coin.current_price <= 100) ||
      (priceFilter === "over100" && coin.current_price > 100);

    return matchesSearch && matchesPrice;
  });

  const totalCoins = coins.length;

  const averagePrice =
    coins.length > 0
      ? (
          coins.reduce((sum, coin) => sum + coin.current_price, 0) /
          coins.length
        ).toFixed(2)
      : 0;

  const highestMarketCapCoin =
    coins.length > 0
      ? coins.reduce((highest, coin) =>
          coin.market_cap > highest.market_cap ? coin : highest
        )
      : null;

  const topTenCoins = coins.slice(0, 10);

  return (
    <main className="dashboard">
      <h1>Crypto Market Dashboard</h1>

      <p className="dashboard-description">
        Explore top cryptocurrencies by market cap, price, and daily movement.
      </p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Coins</h3>
          <p>{totalCoins}</p>
        </div>

        <div className="stat-card">
          <h3>Average Price</h3>
          <p>${Number(averagePrice).toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h3>Top Market Cap</h3>
          <p>
            {highestMarketCapCoin
              ? highestMarketCapCoin.name
              : "Loading..."}
          </p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h2>Top 10 Coins by Market Cap</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topTenCoins}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="symbol" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="market_cap" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>24 Hour Price Change</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={topTenCoins}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="symbol" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price_change_percentage_24h"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search coin..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />

        <select
          value={priceFilter}
          onChange={(event) => setPriceFilter(event.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="under1">Under $1</option>
          <option value="1to100">$1 - $100</option>
          <option value="over100">Over $100</option>
        </select>
      </div>

      <div className="coin-list">
        <div className="coin-row header">
          <p>Name</p>
          <p>Symbol</p>
          <p>Price</p>
          <p>Market Cap</p>
          <p>24h Change</p>
        </div>

        {filteredCoins.map((coin) => (
          <Link
            to={`/coin/${coin.id}`}
            className="coin-link"
            key={coin.id}
          >
            <div className="coin-row">
              <p>{coin.name}</p>

              <p>{coin.symbol.toUpperCase()}</p>

              <p>${coin.current_price.toLocaleString()}</p>

              <p>${coin.market_cap.toLocaleString()}</p>

              <p>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;