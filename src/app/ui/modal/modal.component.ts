import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  ticketValue!: number;
  cantidadTicketComprar!: number;
  
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private blockchainService: BlockchainService) { 
      this.ticketValue = data.ticketValue;
    }
    
    ngOnInit(): void {
    }
    
    async buyNow() {
    await this.blockchainService.stake(this.cantidadTicketComprar, this.cantidadTicketComprar * this.ticketValue);
  }

}
