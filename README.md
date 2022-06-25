# ricette-dellApp

<!-- ABOUT THE PROJECT -->
## About The Project
Create a Node.js app for building ricette dellApp using Express.

### Built With
This app was built with some technologies below:
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- and other

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* [Node.js](https://nodejs.org/en/download/)

### Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/)
* [Database](./blanja.sql)

### Installation

- Clone the Repo
```
git clone https://github.com/ayiis218/ricette-dellApp.git
```
- Go To Folder Repo
```
cd ricette-dellApp
```
- Install Module
```
npm install
```
- Make a new database and import [mama_recipe.sql](./blanja.sql)
- <a href="#setup-env-example">Setup .env</a>
- Type ` npm run dev` To Start Development
- Type ` npm run start` To Start Production

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example

Create .env file in your root project folder.

```env
# app
APP_NAME=
PORT='YOUR PORT'
NODE_ENV=
# Setting PostgreSQL
PG_HOST='YOUR HOST'
PG_USER='YOUR USERNAME'
PG_DATABASE='YOUR DATABASE'
PG_PASSWORD='YOUR PASSWORD'
PG_PORT=5432
# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
STMP_SERVICE=email-server # example: gmail
STMP_USER=your-email
STMP_PASS=your-password
```

<p align="right">(<a href="#top">back to top</a>)</p>

## REST API

You can view my Postman collection [here](https://www.postman.com/warped-shadow-374852/workspace/food-recipe/overview)
</br>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/19659051-a8f34c89-7c8f-409f-8665-ecac960c85df?action=collection%2Ffork&collection-url=entityId%3D19659051-a8f34c89-7c8f-409f-8665-ecac960c85df%26entityType%3Dcollection%26workspaceId%3D783fdc2c-762c-4182-8433-bf1de8619a50)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Related Project
:rocket: [`Backend Mama Recipe`](https://github.com/altrawan/food-recipe-api)

:rocket: [`Frontend Mama Recipe`](https://github.com/altrawan/mama-recipe-app)

:rocket: [`Web Service`](https://mama-recipe.herokuapp.com/)

:rocket: [`Demo Mama Recipe`](https://bit.ly/mama-recipe-app)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

My Email : ayiis.218@gmail.com

Project Link: https://github.com/ayiis218/ricette-dellApp

<p align="right">(<a href="#top">back to top</a>)</p>

## License
Distributed under the [MIT](/LICENSE) License.

<p align="right">(<a href="#top">back to top</a>)</p>
