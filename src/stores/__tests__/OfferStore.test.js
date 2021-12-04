import { RootStore } from '../RootStore';

describe('Offers', () => {
  it('get all the offers', async () => {
    const store = new RootStore();
    store.authStore.setUsername('test123');
    store.authStore.setPassword('123456');
    await store.authStore.login();
    store.restaurantStore.offerStore.offers = [
      {
        id: 1,
        title: 'Parata Heavy Deal',
        number_of_items: 5,
        discount: '12.50',
        availability: true,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, arcu et eleifend luctus, diam ligula gravida nisi, vitae faucibus dolor tellus sed tellus. Duis neque tortor, malesuada et interdum in, efficitur id ipsum. Nunc porta porta urna eget lacinia. Maecenas ac nisi vel metus mattis sodales ut consequat augue. Mauris rhoncus, mi quis lacinia eleifend, ipsum libero auctor nisl, eu venenatis metus eros a justo. Integer quis mauris ac elit feugiat posuere. Mauris cursus nunc sed diam eleifend feugiat. Maecenas porta dictum tellus et facilisis. Phasellus erat dui, condimentum at mi id, molestie posuere elit.',
        photo_main:
          'http://178.128.121.215:8000/media/photos/special_offers/parata_special_1.jpeg',
        date_added: '2021-08-28T22:29:09+05:30',
        menu_item: 1,
      },
      {
        id: 2,
        title: 'Five Coke Combo Deal',
        number_of_items: 5,
        discount: '10.00',
        availability: true,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac felis mollis, sollicitudin lorem id, lacinia urna. Suspendisse dapibus porta pharetra. Fusce suscipit vehicula efficitur. Praesent luctus metus mi, ut elementum sem suscipit a. Vestibulum tincidunt lectus et blandit gravida. Ut ut nisi id neque rhoncus mattis non sed nibh. Sed vestibulum augue eu orci fringilla, tempus pretium leo porttitor. Donec eu libero tellus.',
        photo_main:
          'http://178.128.121.215:8000/media/photos/special_offers/coke_sp.jpeg',
        date_added: '2021-10-02T20:59:08+05:30',
        menu_item: 2,
      },
      {
        id: 3,
        title: 'Extra Large Chicken Fried Rice',
        number_of_items: 3,
        discount: '15.00',
        availability: true,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac felis mollis, sollicitudin lorem id, lacinia urna. Suspendisse dapibus porta pharetra. Fusce suscipit vehicula efficitur. Praesent luctus metus mi, ut elementum sem suscipit a. Vestibulum tincidunt lectus et blandit gravida. Ut ut nisi id neque rhoncus mattis non sed nibh. Sed vestibulum augue eu orci fringilla, tempus pretium leo porttitor. Donec eu libero tellus.',
        photo_main:
          'http://178.128.121.215:8000/media/photos/special_offers/fried_rice_sp.jpeg',
        date_added: '2021-10-02T21:02:39+05:30',
        menu_item: 3,
      },
    ];
    expect(store.restaurantStore.offerStore.offers).toStrictEqual([
      {
        id: 1,
        title: 'Parata Heavy Deal',
        number_of_items: 5,
        discount: '12.50',
        availability: true,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, arcu et eleifend luctus, diam ligula gravida nisi, vitae faucibus dolor tellus sed tellus. Duis neque tortor, malesuada et interdum in, efficitur id ipsum. Nunc porta porta urna eget lacinia. Maecenas ac nisi vel metus mattis sodales ut consequat augue. Mauris rhoncus, mi quis lacinia eleifend, ipsum libero auctor nisl, eu venenatis metus eros a justo. Integer quis mauris ac elit feugiat posuere. Mauris cursus nunc sed diam eleifend feugiat. Maecenas porta dictum tellus et facilisis. Phasellus erat dui, condimentum at mi id, molestie posuere elit.',
        photo_main:
          'http://178.128.121.215:8000/media/photos/special_offers/parata_special_1.jpeg',
        date_added: '2021-08-28T22:29:09+05:30',
        menu_item: 1,
      },
      {
        id: 2,
        title: 'Five Coke Combo Deal',
        number_of_items: 5,
        discount: '10.00',
        availability: true,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac felis mollis, sollicitudin lorem id, lacinia urna. Suspendisse dapibus porta pharetra. Fusce suscipit vehicula efficitur. Praesent luctus metus mi, ut elementum sem suscipit a. Vestibulum tincidunt lectus et blandit gravida. Ut ut nisi id neque rhoncus mattis non sed nibh. Sed vestibulum augue eu orci fringilla, tempus pretium leo porttitor. Donec eu libero tellus.',
        photo_main:
          'http://178.128.121.215:8000/media/photos/special_offers/coke_sp.jpeg',
        date_added: '2021-10-02T20:59:08+05:30',
        menu_item: 2,
      },
      {
        id: 3,
        title: 'Extra Large Chicken Fried Rice',
        number_of_items: 3,
        discount: '15.00',
        availability: true,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac felis mollis, sollicitudin lorem id, lacinia urna. Suspendisse dapibus porta pharetra. Fusce suscipit vehicula efficitur. Praesent luctus metus mi, ut elementum sem suscipit a. Vestibulum tincidunt lectus et blandit gravida. Ut ut nisi id neque rhoncus mattis non sed nibh. Sed vestibulum augue eu orci fringilla, tempus pretium leo porttitor. Donec eu libero tellus.',
        photo_main:
          'http://178.128.121.215:8000/media/photos/special_offers/fried_rice_sp.jpeg',
        date_added: '2021-10-02T21:02:39+05:30',
        menu_item: 3,
      },
    ]);
  });
});
