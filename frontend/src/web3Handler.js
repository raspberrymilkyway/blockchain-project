import Web3 from 'web3'
import { addHistoryEntry, addBulkHistoryEntry } from './components/History.vue';

// Copied from... Google AI..?
if (typeof window.ethereum !== 'undefined') {
  // Check if MetaMask or other Ethereum provider is injected
  window.web3 = new Web3(window.ethereum);

  // Request account access if needed
  try {
    window.web3.eth.requestAccounts();
  } catch (error) {
    console.error('User denied account access');
  }
} else {
  console.error('No Web3 provider found');
  alert("Please install MetaMask!");
}

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_initialSupply",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "ApprovedTransfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "chemicalType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "locationUsed",
            "type": "string"
          },
          {
            "internalType": "int256",
            "name": "amountUsed",
            "type": "int256"
          },
          {
            "internalType": "uint256",
            "name": "cropCount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "cropType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "timestamp",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageLink",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct CropToken.Chemical",
        "name": "fertilizer",
        "type": "tuple"
      }
    ],
    "name": "Fertilizer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "chemicalType",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "locationUsed",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "amountUsed",
                "type": "int256"
              },
              {
                "internalType": "uint256",
                "name": "cropCount",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "cropType",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "timestamp",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "imageLink",
                "type": "string"
              }
            ],
            "internalType": "struct CropToken.Chemical",
            "name": "chemical",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "timesRun",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "startTime",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "endTime",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct CropToken.ChemicalBulk",
        "name": "fertilizer",
        "type": "tuple"
      }
    ],
    "name": "FertilizerBulk",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "farm",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "fertilizerLimit",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "addedAmount",
        "type": "int256"
      }
    ],
    "name": "FertilizerLimit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "chemicalType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "locationUsed",
            "type": "string"
          },
          {
            "internalType": "int256",
            "name": "amountUsed",
            "type": "int256"
          },
          {
            "internalType": "uint256",
            "name": "cropCount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "cropType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "timestamp",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageLink",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct CropToken.Chemical",
        "name": "fungicide",
        "type": "tuple"
      }
    ],
    "name": "Fungicide",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "chemicalType",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "locationUsed",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "amountUsed",
                "type": "int256"
              },
              {
                "internalType": "uint256",
                "name": "cropCount",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "cropType",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "timestamp",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "imageLink",
                "type": "string"
              }
            ],
            "internalType": "struct CropToken.Chemical",
            "name": "chemical",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "timesRun",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "startTime",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "endTime",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct CropToken.ChemicalBulk",
        "name": "fungicide",
        "type": "tuple"
      }
    ],
    "name": "FungicideBulk",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "farm",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "fungicideLimit",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "addedAmount",
        "type": "int256"
      }
    ],
    "name": "FungicideLimit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "chemicalType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "locationUsed",
            "type": "string"
          },
          {
            "internalType": "int256",
            "name": "amountUsed",
            "type": "int256"
          },
          {
            "internalType": "uint256",
            "name": "cropCount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "cropType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "timestamp",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageLink",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct CropToken.Chemical",
        "name": "herbicide",
        "type": "tuple"
      }
    ],
    "name": "Herbicide",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "chemicalType",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "locationUsed",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "amountUsed",
                "type": "int256"
              },
              {
                "internalType": "uint256",
                "name": "cropCount",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "cropType",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "timestamp",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "imageLink",
                "type": "string"
              }
            ],
            "internalType": "struct CropToken.Chemical",
            "name": "chemical",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "timesRun",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "startTime",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "endTime",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct CropToken.ChemicalBulk",
        "name": "herbicide",
        "type": "tuple"
      }
    ],
    "name": "HerbicideBulk",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "farm",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "herbicideLimit",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "addedAmount",
        "type": "int256"
      }
    ],
    "name": "HerbicideLimit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "chemicalType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "locationUsed",
            "type": "string"
          },
          {
            "internalType": "int256",
            "name": "amountUsed",
            "type": "int256"
          },
          {
            "internalType": "uint256",
            "name": "cropCount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "cropType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "timestamp",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageLink",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct CropToken.Chemical",
        "name": "insecticide",
        "type": "tuple"
      }
    ],
    "name": "Insecticide",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "chemicalType",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "locationUsed",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "amountUsed",
                "type": "int256"
              },
              {
                "internalType": "uint256",
                "name": "cropCount",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "cropType",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "timestamp",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "imageLink",
                "type": "string"
              }
            ],
            "internalType": "struct CropToken.Chemical",
            "name": "chemical",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "timesRun",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "startTime",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "endTime",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct CropToken.ChemicalBulk",
        "name": "insecticide",
        "type": "tuple"
      }
    ],
    "name": "InsecticideBulk",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "farm",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "insecticideLimit",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "addedAmount",
        "type": "int256"
      }
    ],
    "name": "InsecticideLimit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approvalTransfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "approvedAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "fertilizerLimit",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "fungicideLimit",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "herbicideLimit",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "insecticideLimit",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "isDeployer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "dep",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_farm",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "_fertilizerLimit",
        "type": "int256"
      }
    ],
    "name": "setFertilizerLimit",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_farm",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "_fungicideLimit",
        "type": "int256"
      }
    ],
    "name": "setFungicideLimit",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_farm",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "_herbicideLimit",
        "type": "int256"
      }
    ],
    "name": "setHerbicideLimit",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_farm",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "_insecticideLimit",
        "type": "int256"
      }
    ],
    "name": "setInsecticideLimit",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_brand",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "_amount",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "_cropCount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_cropType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_timestamp",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageLink",
        "type": "string"
      }
    ],
    "name": "useFertilizer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "_amount",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "_cropCount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_cropType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageLink",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_timesRun",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_startTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_endTime",
        "type": "string"
      }
    ],
    "name": "useFertilizerBulk",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "_amount",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "_cropCount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_cropType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageLink",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_timesRun",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_startTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_endTime",
        "type": "string"
      }
    ],
    "name": "useFungicideBulk",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "_amount",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "_cropCount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_cropType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageLink",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_timesRun",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_startTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_endTime",
        "type": "string"
      }
    ],
    "name": "useHerbicideBulk",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "_amount",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "_cropCount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_cropType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageLink",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_timesRun",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_startTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_endTime",
        "type": "string"
      }
    ],
    "name": "useInsecticideBulk",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_brand",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "_amount",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "_cropCount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_cropType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_timestamp",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageLink",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_typeOfPesticide",
        "type": "string"
      }
    ],
    "name": "usePesticide",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const tokenContract = new web3.eth.Contract(abi, contractAddress);

window.addEventListener("onload", setMetamaskAddress());
window.ethereum.on("accountsChanged", function () {
  setMetamaskAddress();
});

async function setMetamaskAddress() {
  const accounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
  const addr = accounts[0].toString();
  document.getElementById("metamaskAddress").innerText = "MetaMask Address: " + addr;
  try{
  var lim = await tokenContract.methods.fertilizerLimit(addr).call();
  document.getElementById("fertilizerLimit").innerText = "Fertilizer Limit: " + lim.toString();
  lim = await tokenContract.methods.fungicideLimit(addr).call();
  document.getElementById("fungicideLimit").innerText = "Fungicide Limit: " + lim.toString();
  lim = await tokenContract.methods.insecticideLimit(addr).call();
  document.getElementById("insecticideLimit").innerText = "Insecticide Limit: " + lim.toString();
  lim = await tokenContract.methods.herbicideLimit(addr).call();
  document.getElementById("herbicideLimit").innerText = "Herbicide Limit: " + lim.toString();

  const dep = await tokenContract.methods.isDeployer(accounts[0]).call();
  if (dep){
    document.getElementById("limit").classList = [];
  } else{
    document.getElementById("limit").classList.add("hidden-div");
  }
  } catch (e){
    console.error(e);
  }
  // console.log(accounts);
}



//event listeners
//manual addition events
tokenContract.events.Fertilizer({ fromBlock: 0 }, function (error, event) {
  console.log(event);
})
  .on('data', function (event) {
    const output = event.returnValues[1];
    console.log("fertilizer", output);
    addHistoryEntry(output.chemicalType, output.locationUsed, output.amountUsed, output.cropCount, output.cropType, output.timestamp, output.imageLink)
  })

tokenContract.events.Fungicide({ fromBlock: 0 }, function (error, event) {
  console.log(event);
})
  .on('data', function (event) {
    const output = event.returnValues[1];
    console.log("fungicide", output);
    addHistoryEntry(output.chemicalType, output.locationUsed, output.amountUsed, output.cropCount, output.cropType, output.timestamp, output.imageLink)
  })

tokenContract.events.Insecticide({ fromBlock: 0 }, function (error, event) {
  console.log(event);
})
  .on('data', function (event) {
    const output = event.returnValues[1];
    console.log("insecticide", output);
    addHistoryEntry(output.chemicalType, output.locationUsed, output.amountUsed, output.cropCount, output.cropType, output.timestamp, output.imageLink)
  })

tokenContract.events.Herbicide({ fromBlock: 0 }, function (error, event) {
  console.log(event);
})
  .on('data', function (event) {
    const output = event.returnValues[1];
    console.log("herbicide", output);
    addHistoryEntry(output.chemicalType, output.locationUsed, output.amountUsed, output.cropCount, output.cropType, output.timestamp, output.imageLink)
  })

//bulk events, automated from iot -- no manual use/additions
tokenContract.events.FertilizerBulk({ fromBlock: 0 }, function (error, event) {
  console.log(event);
})
  .on('data', function (event) {
    const output = event.returnValues[1];
    console.log("fertilizer bulk", output);
    addBulkHistoryEntry(output.chemical.chemicalType, output.chemical.locationUsed, output.chemical.amountUsed, output.chemical.cropCount, output.chemical.cropType, output.timesRun, output.startTime, output.endTime, output.chemical.imageLink)
  })

tokenContract.events.FungicideBulk({ fromBlock: 0 }, function (error, event) {
  console.log(event);
})
  .on('data', function (event) {
    const output = event.returnValues[1];
    console.log("fungicide bulk", output);
    addBulkHistoryEntry(output.chemical.chemicalType, output.chemical.locationUsed, output.chemical.amountUsed, output.chemical.cropCount, output.chemical.cropType, output.timesRun, output.startTime, output.endTime, output.chemical.imageLink)
  })

tokenContract.events.InsecticideBulk({ fromBlock: 0 }, function (error, event) {
  console.log(event);
})
  .on('data', function (event) {
    const output = event.returnValues[1];
    console.log("insecticide bulk", output);
    addBulkHistoryEntry(output.chemical.chemicalType, output.chemical.locationUsed, output.chemical.amountUsed, output.chemical.cropCount, output.chemical.cropType, output.timesRun, output.startTime, output.endTime, output.chemical.imageLink)
  })

tokenContract.events.HerbicideBulk({ fromBlock: 0 }, function (error, event) {
  console.log(event);
})
  .on('data', function (event) {
    const output = event.returnValues[1];
    console.log("herbicide bulk", output);
    addBulkHistoryEntry(output.chemical.chemicalType, output.chemical.locationUsed, output.chemical.amountUsed, output.chemical.cropCount, output.chemical.cropType, output.timesRun, output.startTime, output.endTime, output.chemical.imageLink)
  })

//functions
async function fertilize(location, amount, cropCount, cropType, imageLink){
  const accounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
  const time = (new Date()).getTime().toString();
  // console.log(time);
  try{
    await tokenContract.methods.useFertilizer("fertilizer", location, amount, cropCount, cropType, time, imageLink).send({from: accounts[0]});
    var lim = await tokenContract.methods.fertilizerLimit(accounts[0]).call();
    document.getElementById("fertilizerLimit").innerText = "Fertilizer Limit: " + lim.toString();
  } catch (e){
    console.error(e);
  }
}
async function pesticide(chemical, location, amount, cropCount, cropType, imageLink){
  const accounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
  const time = (new Date()).getTime().toString();
  const chem = chemical[0].toUpperCase() + chemical.slice(1)
  try{
    const addr = accounts[0];
    await tokenContract.methods.usePesticide(chemical, location, amount, cropCount, cropType, time, imageLink, chem).send({from: addr});
    var lim = await tokenContract.methods.fungicideLimit(addr).call();
    document.getElementById("fungicideLimit").innerText = "Fungicide Limit: " + lim.toString();
    lim = await tokenContract.methods.insecticideLimit(addr).call();
    document.getElementById("insecticideLimit").innerText = "Insecticide Limit: " + lim.toString();
    lim = await tokenContract.methods.herbicideLimit(addr).call();
    document.getElementById("herbicideLimit").innerText = "Herbicide Limit: " + lim.toString();
  } catch (e){
    console.error(e);
  }
}

async function fertilizerBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime){
  const accounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
  try{
    await tokenContract.methods.useFertilizerBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime).send({from: accounts[0]});
    var lim = await tokenContract.methods.fertilizerLimit(accounts[0]).call();
    document.getElementById("fertilizerLimit").innerText = "Fertilizer Limit: " + lim.toString();
  } catch (e){
    console.error(e)
  }
}
async function fungicideBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime){
  const accounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
  try{
    await tokenContract.methods.useFungicideBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime).send({from: accounts[0]});
    var lim = await tokenContract.methods.fungicideLimit(accounts[0]).call();
    document.getElementById("fungicideLimit").innerText = "Fungicide Limit: " + lim.toString();
  } catch (e){
    console.error(e)
  }
}
async function insecticideBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime){
  const accounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
  try{
    await tokenContract.methods.useInsecticideBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime).send({from: accounts[0]});
    var lim = await tokenContract.methods.insecticideLimit(accounts[0]).call();
    document.getElementById("insecticideLimit").innerText = "Insecticide Limit: " + lim.toString();
  } catch (e){
    console.error(e)
  }
}
async function herbicideBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime){
  const accounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
  try{
    const x = await tokenContract.methods.useHerbicideBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime).send({from: accounts[0]});
    var lim = await tokenContract.methods.herbicideLimit(accounts[0]).call();
    document.getElementById("herbicideLimit").innerText = "Herbicide Limit: " + lim.toString();
  } catch (e){
    console.error(e)
  }
}

async function setLimits(address, fertilizer, fungicide, herbicide, insecticide){
  var added = 0
  const accounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
  try{
    if (fertilizer > 0){
      await tokenContract.methods.setFertilizerLimit(address, fertilizer).send({from: accounts[0]});
    }
    added += 1;
    if (fungicide > 0){
      await tokenContract.methods.setFungicideLimit(address, fungicide).send({from: accounts[0]});
    }
    added += 1;
    if (herbicide > 0){
      await tokenContract.methods.setHerbicideLimit(address, herbicide).send({from: accounts[0]});
    }
    added += 1;
    if (insecticide >0){
      await tokenContract.methods.setInsecticideLimit(address, insecticide).send({from: accounts[0]});
    }
    added += 1;
    setMetamaskAddress();
    document.getElementById("limitOut").innerText = "Successfully increases limits"
  } catch (e){
    const options = ["add to fertilizer limit", "add to fungicide limit", "add to herbicide limit", "add to insecticide limit", "fetch MetaMask and limit data"];
    document.getElementById("limitOut").innerText = "Could not " + options[added];
    console.error(e);
    console.log(address, fertilizer, fungicide, herbicide, insecticide);
  }
}

export{
  fertilize, pesticide, fertilizerBulk, fungicideBulk, insecticideBulk, herbicideBulk, setLimits
};