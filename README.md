# Agricultural IoT and Blockchain: A Tomato's Journey from the Field to Supply
A project developed during the last two months of my Blockchain 5576 class.

It is designed to monitor a farmer’s use of chemicals on their crops via a blockchain, which can be added to both manually and automatically via an IoT simulator.

## Instructions
See [System Manual](https://github.com/raspberrymilkyway/blockchain-project/blob/3fed4d3ddc4afa280cd9d1cd53e2353f9d062beb/files/SystemManual.pdf) for backend help.

See [User Manual](https://github.com/raspberrymilkyway/blockchain-project/blob/3fed4d3ddc4afa280cd9d1cd53e2353f9d062beb/files/UserManual.pdf) for frontend help.

## Why do this?
Blockchain is a transparent, trustless environment by nature. This would particularly benefit a food supply chain, where those further along the supply chain and outside of it (consumers) might want to know the exact amounts of chemicals that were used on a particular batch of crops.

Ultimately, this project was designed to look into integrating blockchain technology into agricultural IoT.

## What does this project do?
### Backend:
- Run and handle the blockchain/Node network
- Deploy the smart contract
- Start the frontend
- Run an IoT randomizer infinitely
- Interact with the smart contract
- (Independently run the IoT randomizer without interacting with the smart contract -- it stands alone too!)
### Frontend:
- Connect to MetaMask
- View chemical spending limits
- View chemical history on the blockchain
- Manually add chemical usage to the blockchain
- Automatically add chemical usage to the blockchain (via an IoT simulator)
- Smart contract deployer can set chemical limits for accounts

## Tech Stack
Backend:
- Hardhat
- Solidity
- Node.js (+npm)
- IoT device simulator

Frontend:
- Vue.js
- Web3.js

Wallet Integration:
- MetaMask

## Potential Future Extensions
- Encrypt data
    - Would have to change current approach to encrypt everything; encryption is fairly useless when it's supposed to be accessible to the public. Certain information could be encrypted (e.g. field) before being added to the blockchain without issue.
- Improve the frontend
    - Display information more cleanly
    - Organize history better
    - Allow filtering through history
- Extend IoT simulators
    - Add image detection
    - Add more variety and realism to the data
- Find project limitations (how many IoT devices can be supported at once? etc.)
- Connect to actual IoT devices + test in the field
- Fix any remaining weird behavior (bugs)

## Does this project work?
Yes! By following the processes described in the two manuals (linked under Instructions), you can set it up on your device. You do need the backend blockchain (Node network) running before the frontend will fully work. The backend also works by itself, if the provided frontend is unwanted.
