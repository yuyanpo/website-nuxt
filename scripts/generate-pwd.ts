import bcrypt from 'bcrypt'

bcrypt.hash('user1234', 10).then((h: string) => console.log(h))
