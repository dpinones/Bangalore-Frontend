import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {

  balanceBnb!: string;
  addressCurrentUser!: string;
  balance!: string;
  totalPool!: string;
  reward!:string;
  numberOfStakers!: string;

  ///
  connect: boolean = false;
  //
  
  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.userConnect();
    this.getBalance();
    this.getTotalPool();
    this.getReward();
    this.getNumberOfStakers();
  }

  stake() {

  }

  compound() {

  }

  harvest(){

  }

  async getBalance(){
    this.balance = await this.blockchainService.getBalance();
  }
  
  async getTotalPool(){
    this.totalPool = await this.blockchainService.totalPool();
  }

  async getReward(){
    this.reward = await this.blockchainService.getReward();
  }

  async getNumberOfStakers(){
    this.numberOfStakers = await this.blockchainService.getNumberOfStakers();
  }

  ////
  async userConnect(){
    this.connect = await this.blockchainService.userConnected();
    if(this.connect) {
      this.getAccount();
    }
  }

  async connectToMetamask() {
    await this.blockchainService.connectToMetamask();
    this.userConnect();
  }

  async disconnectToMetamask() {
    alert("Disconnect To Metamask");
    // await this.blockchainService.disconnectedToMetamask();
  }  

  async getAccount() {
    let account: string[];
    account = await this.blockchainService.getAccount();
    this.addressCurrentUser = account[0];
    this.balanceBnb = await this.blockchainService.getBnbBalance(this.addressCurrentUser);
  }
}
