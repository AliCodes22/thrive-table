import { faker } from "@faker-js/faker";

export const createRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    city: faker.location.city(),
    registeredAt: faker.date.past(),
  };
};

export const users = faker.helpers.multiple(createRandomUser, {
  count: 500,
});
