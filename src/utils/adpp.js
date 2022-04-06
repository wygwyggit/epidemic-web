async function getWeb3Provider() {
    if (!window.web3Provider) {
        if (!window.ethereum) {
            console.error("there is no web3 provider.");
            return null;
        }
        window.web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    }
    return window.web3Provider;
}
const daiAbi = [
    // Simple types
    "constructor(string symbol, string name)",
    "function transferFrom(address from, address to, uint value)",
    "function balanceOf(address owner) view returns (uint balance)",
    "event Transfer(address indexed from, address indexed to, address value)",
    "error InsufficientBalance(account owner, uint balance)",

    // Some examples with the struct type, we use the tuple keyword:
    // (note: the tuple keyword is optional, simply using additional
    //        parentheses accomplishes the same thing)
    // struct Person {
    //   string name;
    //   uint16 age;
    // }
    "function addPerson(tuple(string name, uint16 age) person)",
    "function addPeople(tuple(string name, uint16 age)[] person)",
    "function getPerson(uint id) view returns (tuple(string name, uint16 age))",

    "event PersonAdded(uint indexed id, tuple(string name, uint16 age) person)"
]
export {
    daiAbi,
    getWeb3Provider
}