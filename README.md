# Teddy's Travels Backend

Teddy's Travel is a web application that helps you to plan and organize trips. This is the backend part of the service which I developed as part of my coding bootcamp at [Code Labs Academy](https://codelabsacademy.com/).

## How to run the backend

1. If this is your first time running the application, install dependencies using

   ```sh
   npm i
   ```

2. Next, run a mongodb instance on this port 27017.

   E.g. using Docker:

   ```sh
   docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:latest
   ```

3. Create a `.env` file based on `.env.example`.

4. Start the development server by running:

   ```sh
   npm run start
   ```

By default the service will be reachable on port 3000.

To retrieve the automatically generated swagger documentation, visit `http:localhost/api`.

**Please note that this is still under active development and several endpoints and features have not been implemented yet!**
