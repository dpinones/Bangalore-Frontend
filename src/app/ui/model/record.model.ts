export class Record {
    id!: string;
    user: string;
    amount: string;

    constructor(_user: string, _amount: string, _date: string) {
        this.user = _user;
        this.amount = _amount;
    }
}