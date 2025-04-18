
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';


const prisma = new PrismaClient();

async function main() {
  await prisma.collectionTrack.deleteMany({});
  await prisma.collection.deleteMany({});
  await prisma.playlistTrack.deleteMany({});
  await prisma.playlist.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.track.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.category.deleteMany({});

  await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: 'test user',
        email: 'test@gmail.com',
        password: hashSync("12345", 10),
        token: '1111',
      },
      {
        id: 2,
        name: 'test admin',
        email: 'testAdmin@gmail.com',
        password: hashSync("12345", 10),
        token: '11111',
      },
    ]
  })

  await prisma.track.createMany({
    data: [
      {
        id: 1, 
        title: "Naruto Opening - 15",
        artist: "Artist One",
        Url: '/music/OST15.mp3',
        UrlImage: '/img/OST15.jpg',
        duration: 150,
        releaseDate: new Date("2022-01-01"),
      },
      {
        id: 2, 
        title: "Naruto Opening - 16",
        artist: "Artist Two",
        Url: '/music/OST16.mp3',
        UrlImage: '/img/OST16.jpg',
        duration: 200,
        releaseDate: new Date("2023-02-01"),
      },
      {
        id: 3, 
        title: "Naruto Opening - 15",
        artist: "Artist One",
        Url: '/music/OST17.mp3',
        UrlImage: '/img/OST17.jpg',
        duration: 180,
        releaseDate: new Date("2022-01-01"),
      },
      {
        id: 4, 
        title: "Naruto Opening - 15",
        artist: "Artist One",
        Url: '/music/OST18.mp3',
        UrlImage: '/img/OST18.jpg',
        duration: 200,
        releaseDate: new Date("2022-01-01"),
      },
    ]
  });

  await prisma.category.createMany({
    data: [
      {
        id: 1,
        name: 'Все'
      },
      {
        id: 2,
        name: 'Музыка'
      },
      {
        id: 3,
        name: 'Подкасты'
      }
    ]
  })

  await prisma.playlist.createMany({
    data: [
      {
        id: 1,
        name: "My Favorites",
        userId: 1,
      }
    ]
  });

  await prisma.playlistTrack.createMany({
    data: [
      {
        playlistId: 1,
        trackId:1
      },
      {
        playlistId: 1,
        trackId:2
      },
    ]
})
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });