export interface User {
    email: any;
    password: any;
    businessClient: any;
    companyName: any;
    contactPersonName: any;
    contactPersonSurname:any;
    contactNumber:any;
}

export interface userInformationOnSignIn {
    contactPersonName: string | null,
    contactPersonSurname: string | null,
    businessClient: boolean | null,
    email: string | null,
    companyName:string | null
  }
