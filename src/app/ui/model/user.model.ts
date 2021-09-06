export class User {
    user!: string;
    tickets!: number;

    constructor(_user: string, _tickets: number){
        this.user = _user;
        this.tickets = _tickets;
    }
}