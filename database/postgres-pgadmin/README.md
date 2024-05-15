# 1. Run this command                 //inside the postgres-pgadmin folder

     docker-compose up -d 



# 2. Go to LINK:  (http://localhost:8080/)

    ports:
      - "8080:80"



# 3. PgAdmin Credentials: 

    environment:
      - PGADMIN_DEFAULT_EMAIL=pgadminuser@gmail.com
      - PGADMIN_DEFAULT_PASSWORD=Database123!



# 4. Register Server

     1. HOSTNAME: "postgres-db"            //same as Service name
            services:
                postgres-db:

     1. PORT: "5432"

     1. Username: "postgres"

     1. Password: "Database123!"
