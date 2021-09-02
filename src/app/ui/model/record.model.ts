export class Record {
    user: string;
    amount: string;
    date: Date;

    constructor(_user: string, _amount: string, _date: string) {
        this.user = _user;
        this.amount = _amount;
        this.date = new Date(_date);
    }
}