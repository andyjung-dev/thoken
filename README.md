# Thoken (a quick and dirty analyzer)

Currently the value is in the data, not in any code.
Only pulls crypto data from a sqlite db, exposes it as JSON in a REST API, to be access in the project `thoken-ui`

## Future schema

Good starting point is the resources available at [blockchain-etl](https://github.com/blockchain-etl), in particular the `token_transfers` and `contracts` related to the Ethereum network.

Other data will have to be collected for each of the networks to be analyzed, such as:

- Tezos:
- BCH
- USDT
- LTC
- EOS
- ADA
- XMR
- NEO
- DASH
...

Generic columns to be associated are:
- `timestamp` of transactions
- `sender` and `recipient(s)`
- `amount` or `transaction_data`
- `link` to either merkle root or other similar aggregation
- If index is required, can be based on the `timestamp` and concatened with the `sender` or simply the `tx_hash` in some systems (such as Bitcoin)

Current choice is PostgreSQL but currently it is estimated that the largest network to deal with will be Ethereum due to its smart contracts, then Bitcoin because of its historical usage. 