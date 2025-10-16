export const GREETER_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_GREETER_CONTRACT_ADDRESS as `0x${string}`;

export const GREETER_ABI = [
  {
    type: "constructor",
    inputs: [{ name: "_greeting", type: "string", internalType: "string" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "greeter",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setGreeting",
    inputs: [{ name: "newGreeting", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
];
