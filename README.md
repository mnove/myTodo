Simple todo app - FullStack - PERN 

## Getting Started

Install docker and docker-compose for example:

```bash
sudo apt update
sudo apt install docker.io docker-compose
```

Start everything in the `docker-compose.yml`:

```bash
docker-compose up
```

or just the database

```bash
docker-compose up postgres
```

Check what is running or stopped with

```bash
docker ps -a
```

When finished can

```bash
docker-compose down
```

### Initialise the database

```bash
docker cp database.sql mytodo_postgres_1:/tmp
docker-compose exec postgres psql -U postgres -f /tmp/database.sql
```

### Install all dependencies

Navigate to the project directory and run this command 
```sh
  npm install
```

Then, navigate the client folder and run the same command to run all the client's dependencies.  

### Start the server

Navigate to the project directory and run this command 
```sh
  npm start 
```

### Start the client (React app)

Navigate to the Client folder and run this command 
```sh
  npm start
```    

