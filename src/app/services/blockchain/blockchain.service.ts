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
    console.log('window.ethereum = ', window.ethereum);
    chainId = parseInt(window.ethereum.chainId);
    return chainId;
  }

  async getBnbBalance(address: string) {
    let balance: string;
    balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
    let balanceStr: string = balance.toString(); 
    let ret = ethers.utils.formatEther(balanceStr);
    return ret;
  }

  ///////////////////

  async stake(amount: number){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForBangalore(),
      signer
    );
    bangaloreContract.connect(signer);
    await bangaloreContract.stake({ value: ethers.utils.parseEther(String(amount)) });

  }

  async compound(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForBangalore(),
      signer
    );
    bangaloreContract.connect(signer);
    await bangaloreContract.compound();
  }

  async harvest(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForBangalore(),
      signer
    );
    bangaloreContract.connect(signer);
    await bangaloreContract.harvest();
  }

  async addDeposit(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForBangalore(),
      signer
    );
    bangaloreContract.connect(signer);
    await bangaloreContract.addDeposit();
  }

  async getBalance(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForBangalore(),
      signer
    );
    bangaloreContract.connect(signer);
    console.log('bangaloreContract:', bangaloreContract);
    const balance = await bangaloreContract.getBalance();
    let balanceStr: string = balance.toString(); 
    let ret = ethers.utils.formatEther(balanceStr);
    return ret;
  }

  async totalPool(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForBangalore(),
      signer
    );
    bangaloreContract.connect(signer);
    const totalPool = await bangaloreContract.totalPool();
    let totalPoolStr: string = totalPool.toString(); 
    let ret = ethers.utils.formatEther(totalPoolStr);
    return ret;
  }

  async getReward(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForBangalore(),
      signer
    );
    bangaloreContract.connect(signer);
    const reward = await bangaloreContract.getReward();
    let rewardStr: string = reward.toString(); 
    let ret = ethers.utils.formatEther(rewardStr);
    return ret;
  }

  async getNumberOfStakers(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForBangalore(),
      signer
    );
    bangaloreContract.connect(signer);
    const ret = await bangaloreContract.getNumberOfStakers();
    return ret;
  }

  async addUserToTeam(address: string){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForBangalore(),
      signer
    );
    bangaloreContract.connect(signer);
    await bangaloreContract.addUserToTeam(address)
  }
  
  async removeUserToTeam(){
    let bangaloreContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    bangaloreContract = new ethers.Contract(
      this.bangaloreAddress,
      abis.getAbiForBangalore(),
      signer
    );
    bangaloreContract.connect(signer);
    await bangaloreContract.removeUserToTeam();
  }

}
