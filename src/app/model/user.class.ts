export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    reviewer: boolean;
    admin: boolean;

    constructor(id: number = null, userName: string = null, password: string = null, firstName: string = null,
                lastName: string = null, phoneNumber: string = null, email: string = null, reviewer: boolean = false,
                admin: boolean = false) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.reviewer = reviewer;
        this.admin = admin;
    }

    about(): string {
        return 'User: id=' + this.id + ', username=' + this.userName + ', password=' + this.password + ', fname='
             + this.firstName + ', lname=' + this.lastName + ', phone#=' + this.phoneNumber + ', email:' + this.email
             + ', reviewer=' + this.reviewer + ', admin=' + this.admin;
    }
}
