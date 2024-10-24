import Web3 from 'web3'

if (typeof window.ethereum !== 'undefined') {
  // Check if MetaMask or other Ethereum provider is injected
  window.web3 = new Web3(window.ethereum);

  // Request account access if needed
  try {
    // await window.ethereum.request({ method: 'eth_requestAccounts' });
    window.web3.eth.requestAccounts();
  } catch (error) {
    console.error('User denied account access');
  }

  console.log('Web3 instance:', web3);
} else {
  console.error('No Web3 provider found');
  alert("Please install MetaMask!");
}

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
              "name": "brandUsed",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "locationUsed",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "amountUsed",
              "type": "uint256"
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
          "name": "farm",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fertilizerLimit",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "addedAmount",
          "type": "uint256"
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
              "name": "brandUsed",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "locationUsed",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "amountUsed",
              "type": "uint256"
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
          "name": "farm",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fungicideLimit",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "addedAmount",
          "type": "uint256"
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
              "name": "brandUsed",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "locationUsed",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "amountUsed",
              "type": "uint256"
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
          "name": "farm",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "herbicideLimit",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "addedAmount",
          "type": "uint256"
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
              "name": "brandUsed",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "locationUsed",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "amountUsed",
              "type": "uint256"
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
          "name": "farm",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "insecticideLimit",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "addedAmount",
          "type": "uint256"
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
      "name": "fungicideLimit",
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
      "name": "herbicideLimit",
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
      "name": "insecticideLimit",
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
          "internalType": "uint256",
          "name": "_fertilizerLimit",
          "type": "uint256"
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
          "internalType": "uint256",
          "name": "_fungicideLimit",
          "type": "uint256"
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
          "internalType": "uint256",
          "name": "_herbicideLimit",
          "type": "uint256"
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
          "internalType": "uint256",
          "name": "_insecticideLimit",
          "type": "uint256"
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
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
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
          "name": "_brand",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
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

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const tokenContract = new web3.eth.Contract(abi, contractAddress);

window.addEventListener("onload", setMetamaskAddress());
window.ethereum.on("accountsChanged", function(){
  setMetamaskAddress();
});

async function setMetamaskAddress() { 
  const accounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
  document.getElementById("metamaskAddress").innerText = "MetaMask Address: " + accounts[0].toString();
  console.log(accounts);
}



tokenContract.events.Fertilizer({ fromBlock: 0 }, function(error, event){
  console.log(event);
})
.on('data', function(event){
  console.log("fertilizer", event.returnValues[1]);
})

tokenContract.events.Fungicide({ fromBlock: 0 }, function(error, event){
  console.log(event);
})
.on('data', function(event){
  console.log("fungicide", event.returnValues[1]);
})

tokenContract.events.Insecticide({ fromBlock: 0 }, function(error, event){
  console.log(event);
})
.on('data', function(event){
  console.log("insecticide", event.returnValues[1]);
})

tokenContract.events.Herbicide({ fromBlock: 0 }, function(error, event){
  console.log(event);
})
.on('data', function(event){
  console.log("herbicide", event.returnValues[1]);
})