import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CoinDetails = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );

        const data = await response.json();

        setCoin(data);
      } catch (error) {
        console.error("Error fetching coin details:", error);
      }
    };

    fetchCoinDetails();
  }, [id]);

  if (!coin) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <main className="coin-details">
      <Link to="/" className="back-button">
        ← Back to Dashboard
      </Link>

      <div className="details-card">
        <img
          src={coin.image?.large}
          alt={coin.name}
          className="coin-image"
        />

        <h1>{coin.name}</h1>

        <p className="coin-symbol">
          {coin.symbol?.toUpperCase()}
        </p>

        <div className="details-grid">
          <div>
            <h3>Current Price</h3>

            <p>
              ${coin.market_data?.current_price?.usd?.toLocaleString()}
            </p>
          </div>

          <div>
            <h3>Market Cap Rank</h3>

            <p>#{coin.market_cap_rank}</p>
          </div>

          <div>
            <h3>All-Time High</h3>

            <p>
              ${coin.market_data?.ath?.usd?.toLocaleString()}
            </p>
          </div>

          <div>
            <h3>24 Hour High</h3>

            <p>
              ${coin.market_data?.high_24h?.usd?.toLocaleString()}
            </p>
          </div>

          <div>
            <h3>24 Hour Low</h3>

            <p>
              ${coin.market_data?.low_24h?.usd?.toLocaleString()}
            </p>
          </div>

          <div>
            <h3>Total Volume</h3>

            <p>
              ${coin.market_data?.total_volume?.usd?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="coin-description">
          <h2>About {coin.name}</h2>

          <p>
            {coin.description?.en
              ? coin.description.en
                  .replace(/<[^>]*>/g, "")
                  .slice(0, 1000)
              : "No description available."}
          </p>
        </div>
      </div>
    </main>
  );
};

export default CoinDetails;