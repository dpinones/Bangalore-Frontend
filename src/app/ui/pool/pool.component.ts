import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { User } from '../model/user.model';
import { Record } from '../model/record.model';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { RewardModalComponent } from '../reward-modal/reward-modal.component';

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
  users!: User[];
  records!: Record[];

  connect: boolean = false;
  
  constructor(public dialog: MatDialog, private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.userConnect();
    this.init();
  }

  async init(){
    this.totalPool = await this.blockchainService.totalPool();
    this.numberOfStakers = await this.blockchainService.getNumberOfStakers();
    this.myTickets = await this.blockchainService.getTicketsForStaker();
    this.totalTickets = await this.blockchainService.getNumberOfTickets();
    this.reward = await this.blockchainService.getReward();  
    this.ticketValue = await this.blockchainService.ticketValue();
    this.getUsers();
    this.getRecords();
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

  buyTickets(){
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '400px',
      width: '300px',
      data: {ticketValue: this.ticketValue}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  reclaimRewards(){
    const dialogRef = this.dialog.open(RewardModalComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
