# hithaui-api
## Installation
```bash
# install volta
$ curl https://get.volta.sh | bash
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Set up Prisma with MySQL
1. Create and update `.env` file for variables environment
```bash
DATABASE_URL="mysql://username:password@host:port/database_name"
```
2. Open `.env` and adjust the `DATABASE_URL` environment variable
```bash
DATABASE_URL="mysql://username:password@host:port/database_name"
```
Run the following command to initialize and run MySQL on docker (optional)
```bash
$ docker-compose up -d
```
3. Generate prisma schema
```bash
$ npm run prisma:generate
```
4. Generate SQL migration files
```bash
$ npm run prisma:migrate
```
5. Seeding database
```bash
$ npm run seed
```
Or run the following command to start the database including generate, migrate and seeding
```bash
$ npm run start:db
```
