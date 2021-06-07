import { EnterpriseCustomer, IndividualCustomer } from './Customer';

const createIndividualSut = (
  firstName: string,
  lastName: string,
  cpf: string,
) => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseSut = (name: string, cnpj: string) => {
  return new EnterpriseCustomer(name, cnpj);
};

describe('Customer', () => {
  describe('Individual customer', () => {
    afterEach(() => jest.clearAllMocks());

    it('should have firstName, lastName and cpf', () => {
      const sut = createIndividualSut('Renato', 'Lomba', '507.282.038-63');

      expect(sut).toHaveProperty('firstName', 'Renato');
      expect(sut).toHaveProperty('lastName', 'Lomba');
      expect(sut).toHaveProperty('cpf', '507.282.038-63');
    });

    it('should have methods to get name and idn', () => {
      const sut = createIndividualSut('Renato', 'Lomba', '507.282.038-63');

      expect(sut.getName()).toBe('Renato Lomba');
      expect(sut.getIDN()).toBe('507.282.038-63');
    });
  });

  describe('Enterprise customer', () => {
    afterEach(() => jest.clearAllMocks());

    it('should have name and cnpj', () => {
      const sut = createEnterpriseSut('Seeger', '111.111.111-11/55555');

      expect(sut).toHaveProperty('name', 'Seeger');
      expect(sut).toHaveProperty('cnpj', '111.111.111-11/55555');
    });

    it('should have methods to get name and idn', () => {
      const sut = createEnterpriseSut('Seeger', '111.111.111-11/55555');

      expect(sut.getName()).toBe('Seeger');
      expect(sut.getIDN()).toBe('111.111.111-11/55555');
    });
  });
});
