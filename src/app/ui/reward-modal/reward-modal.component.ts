import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';

@Component({
  selector: 'app-reward-modal',
  templateUrl: './reward-modal.component.html',
  styleUrls: ['./reward-modal.component.css']
})
export class RewardModalComponent implements OnInit {

  reward!: number;

  constructor(public dialogRef: MatDialogRef<RewardModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private blockchainService: BlockchainService) {
    this.reward = data.reward;
  }

  ngOnInit(): void {
  }
  
  async withdraw(){
    await this.blockchainService.harvest();
  }

}
