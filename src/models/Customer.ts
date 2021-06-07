import {
  CustomerOrder,
  EnterpriseCustomerProtocol,
  IndividualCustomerProtocol,
} from './protocols/CustomerProtocol';

export class IndividualCustomer
  // eslint-disable-next-line prettier/prettier
  implements IndividualCustomerProtocol, CustomerOrder {
  firstName: string;
  lastName: string;
  cpf: string;

  constructor(firstName: string, lastName: string, cpf: string) {
    this.cpf = cpf;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  getIDN(): string {
    return this.cpf;
  }
}

export class EnterpriseCustomer
  // eslint-disable-next-line prettier/prettier
  implements EnterpriseCustomerProtocol, CustomerOrder {
  name: string;
  cnpj: string;

  constructor(name: string, cnpj: string) {
    this.cnpj = cnpj;
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  getIDN(): string {
    return this.cnpj;
  }
}
