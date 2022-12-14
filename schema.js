const { buildSchema } = require("graphql");

const schema = buildSchema(`

    type Crypt{
        id: ID
        rank: String
        symbol: String
        name: String
        supply: String
        maxSupply: String
        marketCapUsd: String
        volumeUsd24Hr: String
        priceUsd: String
        changePercent24Hr: String
        vwap24Hr: String
    }

    type CryptAbout{
        about: Crypt
        markets: [Markets]
        historyPerDay: [History]
        rates: Rates
    }

    type History{
        date: String
        priceUsd: String
        time: Float
    }

    type Markets{
        baseId: String
        baseSymbol: String
        exchangeId: String
        priceUsd: String
        quoteId: String
        quoteSymbol: String
        volumePercent: String
        volumeUsd24Hr: String
    }

    type Rates{
        currencySymbol: String
        id: String
        rateUsd: String
        symbol: String
        type: String
    }

    type Query{
        getAllCrypts: [Crypt]
        getCryptAbout(id: ID): CryptAbout
    }
`);

module.exports = schema;
