import { RootStore } from '../RootStore';

describe('Login', () => {
  it('Login with correct credentials', async () => {
    const store = new RootStore();
    store.authStore.setUsername('test123');
    store.authStore.setPassword('123456');
    await store.authStore.login();
    expect(store.authStore.errors).toBe(undefined);
  });
  it('Login with incorrect credentials', async () => {
    const store = new RootStore();
    store.authStore.setUsername('test1234');
    store.authStore.setPassword('123456');
    await store.authStore.login();
    expect(store.authStore.errors[0]).toBe('Incorrect Credentials');
  });
});

describe('Register', () => {
  it('Register with exisiting user', async () => {
    const store = new RootStore();
    store.authStore.setUsername('test123');
    store.authStore.setFName('testf');
    store.authStore.setLName('testl');
    store.authStore.setEmail('test@gmail.com');
    store.authStore.setPassword('123456');
    await store.authStore.register();
    expect(store.authStore.errors[0]).toBe(
      'A user with that username already exists.'
    );
  });
});
