describe('Primitive values', () => {
  it('should test jest assertions', () => {
    const number = 10;

    expect(number).toBe(10);
    expect(number).toEqual(10);

    expect(number).not.toBeNull();
    expect(number).not.toBeFalsy();
    expect(number).toBeTruthy();

    expect(number).toBeGreaterThan(9);
    expect(number).toBeLessThan(12);
    expect(number).toBeGreaterThanOrEqual(10);
    expect(number).toBeLessThanOrEqual(10);

    expect(number).toBeCloseTo(10.001);

    expect(number).toHaveProperty('toString');
  });
});

describe('Object values', () => {
  it('should test jest assestions with objects', () => {
    const person1 = { name: 'Renato', age: 20 };
    const person2 = { ...person1 };

    expect(person1).toEqual(person2);
    expect(person2).toHaveProperty('age', 20);
    expect(person2.name).toBe('Renato');
  });
});
