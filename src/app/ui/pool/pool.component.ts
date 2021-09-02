import { Component, OnInit } from '@angular/core';
import { BigNumber } from 'ethers';
import { VirtualTimeScheduler } from 'rxjs';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { User } from '../model/user.model';
import { Record } from '../model/record.model';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {

  balanceBnb!: string;
  totalPool!: string;
  numberOfStakers!: string;
  myTickets!: string;
  totalTickets!: string;
  reward!: string;
  ticketValue!: string;
  addressCurrentUser!: string;
  cantidadTicketComprar!: number;

  users!: User[];
  records!: Record[];

  connect: boolean = false;
  
  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.userConnect();
    this.init();
  }

  async init(){
    this.getTotalPool();
    this.getNumberOfStakers();
    this.getTicketsForStaker();
    this.getNumberOfTickets();
    this.getReward();
    this.getUsers();
    this.getTicketValue();
    this.getRecords();
  }

  async stake() {
    await this.blockchainService.stake(this.cantidadTicketComprar, this.cantidadTicketComprar * Number(this.ticketValue));
    this.init();
  }

  async compound() {

  }

  async harvest(){
    
  }

  async getUsers(){
    this.users = new Array<User>();
    const stakers = await this.blockchainService.getStakers();
    for (let i = 0; i < Number(this.numberOfStakers); i++) {
      const cant = await this.blockchainService.ticketsForStaker(stakers[i]);
      console.log(stakers[i]);
      console.log('cant:', cant.toNumber());
      // this.users.push(new User(stakers[i], cant.toNumber()));
    }
  }

  async getRecords(){
    this.records = new Array<Record>();
    const numberOfRecord = await this.blockchainService.getNumberOfRecord();
    for (let i = 0; i < numberOfRecord; i++) {
      let record: Record = await this.blockchainService.records(String(i));
      console.log('record.date:', record.date);
      record.date = new Date(record.date);
      console.log('record.date:', record.date);
      this.records.push(record);
    }
  }

  async getTotalPool(){
    this.totalPool = await this.blockchainService.totalPool();
  }

  async getNumberOfStakers(){
    this.numberOfStakers = await this.blockchainService.getNumberOfStakers();
  }

  async getTicketsForStaker(){
    this.myTickets = await this.blockchainService.getTicketsForStaker();
  }

  async getNumberOfTickets(){
    this.totalTickets = await this.blockchainService.getNumberOfTickets();
  }

  async getReward(){
    this.reward = await this.blockchainService.getReward();
  }
  
  async getTicketValue(){
    this.ticketValue = await this.blockchainService.ticketValue();
  }
  
  async lookingForAWinner(){
    await this.blockchainService.lookingForAWinner();
  }
  
  async reset(){
    await this.blockchainService.reset();
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
