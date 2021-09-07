import { Injectable } from '@angular/core';
import { BigNumber, Contract, ethers} from 'ethers';
import * as abis from './../../../utils/getAbis';
import * as contractAddresses from './../../../utils/getContractAddress';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  ethereum: any;
  private signer: any;
  private enable: any;
  private accounts: any;
  private bangaloreAddress: string;

  constructor() {
    this.bangaloreAddress = contractAddresses.getBangaloreAddress();
  }

  async userConnected(){
    try {
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return true;
    } catch {
      return false;
    }
  }

  async connectToMetamask() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        //this.ethereum = await window.ethereum.currentProvider;
        //console.log(this.ethereum);
      }
      this.enable = this.enableMetaMaskAccount();
    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.request({ method: 'eth_requestAccounts' });
    });
    return Promise.resolve(enable);
  }

  async getAccount() {
    let accounts: [];
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
  }

  async getChainId() {
    let chainId: number;
    chainId = parseInt(window.ethereum.chainId);
    return chainId;
  }

  async getBalance(address: string) {
    let balance: string;
    balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
    let balanceStr: string = balance.toString(); 
    let ret = ethers.utils.formatEther(balanceStr);
    return ret;
  }

  
  // USER
  async buyTicket(amount: number, value: number){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const stakeTx = await bangaloreContract.buyTicket(amount, { value: ethers.utils.parseEther(String(value)) });
    console.log('stakeTx:', stakeTx);
  }

  async withdraw(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    await bangaloreContract.withdraw();
  }

  // OWNER
  async lookingForAWinner(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    try {
      await bangaloreContract.lookingForAWinner();
    }catch(error){
      console.log('error:', error);
    }
  }
  
  async reset(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    await bangaloreContract.reset();
  }

  async owner(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    return await bangaloreContract.owner();
  }

  //GETTERS
  async getReward(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const reward = await bangaloreContract.getReward();
    let rewardStr: string = reward.toString(); 
    let ret = ethers.utils.formatEther(rewardStr);
    return ret;
  }

  async getNumberOfUsers(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const ret = await bangaloreContract.getNumberOfUsers();
    return ret;
  }

  async getTicketsForUser(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const ret = await bangaloreContract.getTicketsForUser();
    return ret;
  }

  async users(index: string){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const ret = await bangaloreContract.users(index);
    return ret;
  }

  async getNumberOfTickets(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const ret = await bangaloreContract.getNumberOfTickets();
    return ret;
  }
  
  async getNumberOfRecord(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const ret = await bangaloreContract.getNumberOfRecord();
    return ret;
  }
  
  async ticketValue(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const ticketValue = await bangaloreContract.ticketValue();
    let ticketValueStr: string = ticketValue.toString(); 
    let ret = ethers.utils.formatEther(ticketValueStr);
    return ret;
  }
  
  async ticketsForUser(user: string){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const ret = await bangaloreContract.ticketsForUser(user);
    return ret;
  }
  
  async records(index: string){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    let ret: any = await bangaloreContract.records(index);
    const amount: BigNumber = ret.amount; 
    let amountStr: string = amount.toString(); 
    ret =  {date: ret.date, user: ret.user, amount: ethers.utils.formatEther(amountStr)};
    return ret;
  }

  async getUsers(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const ret = await bangaloreContract.getUsers();
    return ret;
  }

  async totalPool(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const totalPool = await bangaloreContract.totalPool();
    let totalPoolStr: string = totalPool.toString(); 
    let ret = ethers.utils.formatEther(totalPoolStr);
    return ret;
  }
  
  async paused(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForLotteryEth(),
      signer
    );
    bangaloreContract.connect(signer);
    const ret = await bangaloreContract.paused();
    return ret;
  }
}
