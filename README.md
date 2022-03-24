# Discourse-It

Discourse-It is a fun combination clone where users can create channels like Discord in which users can make posts like you would see on Reddit. Users can enter channels they identify with and join in on the discourse. 

## Features

1.Users can signup, login with their account, or use the Demo login provided to them.

2. Create, Read, Update, Delete Channels

3. Create, Read, Update, Delete Posts within Channels
 
4. (Bonus/Upcoming): Users will be able to direct message other users via a Websocket

## Technologies Used
-React
-Redux
-Python
-Flask SQLAlchemy
-PostgreSQL


## Installation
1. Clone the repository

   ```bash
   git clone https://github.com/Willy-Git-Man/Discourse-It
   ```

2. CD into root of project and install project dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file in the root of your project and add the following lines into the file:
   ```bash
   SECRET_KEY=<your-secret-key-value>
   DATABASE_URL=postgresql://<your-database-user>:<your-user-password>@localhost/<your-database-name>>
   ```

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file. Use the following commands in your terminal:
   ```bash
   A. psql - Enter psql command line
   B. CREATE USER <your-database-user> WITH PASSWORD '<your-user-password>';
   C. CREATE DATABASE <your-database-name> WITH OWNER <your-database-user>
   D. /q - Exit psql command line
   ```

5. Get into your pipenv shell, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. Open up a second terminal, and cd into react-app directory. Use npm install to install required dependecies from package.json

   ```bash
   npm install
   ```

7. Run the server using npm start in the second terminal. The default server runs on localhost:3000. Navigate to localhost:3000 in your browser (if it does not open automatically)

   ```bash
   npm start
   ```

8. Login to the site using the demo user, or sign up for you own account, and explore the site!
