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
export class PoolComponent implements OnInit{

  balance!: string;
  totalPool!: string;
  numberOfStakers!: string;
  myTickets!: string;
  totalTickets!: string;
  reward!: string;
  ticketValue!: string;
  user!: string;
  users!: User[];
  records!: Record[];

  connect: boolean = false;
  owner: boolean = false;
  
  constructor(public dialog: MatDialog, private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.userConnect();
    this.init();
  }

  async currectAccount(){
    let account: string[] = await this.blockchainService.getAccount();
    return account[0];
  }

  async isOwner(){
    let owner: string = await this.blockchainService.owner();
    if(this.user.toLowerCase() === owner.toLowerCase()){
      this.owner = true;
    }
  }

  async init(){
    
    this.user = await this.currectAccount();
    await this.isOwner();
    
    if(this.owner){
      alert("Is Owner");
    }else{
      this.balance = await this.blockchainService.getBalance(this.user);
      this.totalPool = await this.blockchainService.totalPool();
      this.numberOfStakers = await this.blockchainService.getNumberOfStakers();
      this.myTickets = await this.blockchainService.getTicketsForStaker();
      this.totalTickets = await this.blockchainService.getNumberOfTickets();
      this.reward = await this.blockchainService.getReward();  
      this.ticketValue = await this.blockchainService.ticketValue();
      this.getUsers();
      this.getRecords();
    }
  }

  async harvest(){
    
  }

  async getUsers(){
    this.users = new Array<User>();
    const stakers = await this.blockchainService.getStakers();
    for (let i = 0; i < Number(this.numberOfStakers); i++) {
      const cant = await this.blockchainService.ticketsForStaker(stakers[i]);
      console.log(stakers[i]);
      // console.log('cant:', cant.toNumber());
      // this.users.push(new User(stakers[i], cant.toNumber()));
    }
  }

  async getRecords(){
    this.records = new Array<Record>();
    const numberOfRecord = await this.blockchainService.getNumberOfRecord();
    for (let i = 0; i < numberOfRecord; i++) {
      let record: Record = await this.blockchainService.records(String(i));
      record.id = String(i);
      this.records.push(record);
    }
  }


  // OWNER
  async lookingForAWinner(){
    await this.blockchainService.lookingForAWinner();
  }
  
  async reset(){
    await this.blockchainService.reset();
  }

  ////
  async userConnect(){
    return await this.blockchainService.userConnected();
  }

  async connectToMetamask() {
    await this.blockchainService.connectToMetamask();
    this.userConnect();
  }

  async disconnectToMetamask() {
    alert("Disconnect To Metamask");
    // await this.blockchainService.disconnectedToMetamask();
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
