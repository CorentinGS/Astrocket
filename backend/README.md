<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/corentings/astrocket">
    <img src="../frontend/src/assets/img/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Astrocket Backend</h3>
  <p align="center">
    A backend for the astrocket project
    <br />
    <a href="https://github.com/CorentinGS/Astrocket/documentation"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://astrocket.corentings.dev">View Demo</a>
    ·
    <a href="https://github.com/corentings/astrocket/issues">Report Bug</a>
    ·
    <a href="https://github.com/corentings/astrocket/issues">Request Feature</a>
  </p>
</div>

<!-- TOC -->

* [About The Project](#about-the-project)
    * [Built With](#built-with)
* [Getting Started](#getting-started)
    * [Prerequisites (for development)](#prerequisites-for-development)
    * [Installation (I assume you have a backend running)](#installation-i-assume-you-have-a-backend-running)
        * [Using Docker](#using-docker)
        * [Using Docker Compose](#using-docker-compose)
        * [Using Devbox (recommended)](#using-devbox-recommended)
* [Architecture](#architecture)
    * [Pages](#pages)
    * [Components](#components)
    * [Configuration](#configuration)
* [Roadmap](#roadmap)
* [Contact](#contact)

<!-- TOC -->


<!-- ABOUT THE PROJECT -->

## About The Project

[![Astrocket Screen Shot][product-screenshot]](https://astrocket.corentings.dev)

Astrocket is a web-based chat app (like an IRC) that provides a modern interface, storage for messages, and secured
account creation using oauth2. It’s designed with self-hosting in mind and allows users to deploy their instance quickly
and easily using prebuilt docker images.
Thus, people don’t need to worry about their privacy as they can control their data/messages and don’t rely on
third-party providers such as Microsoft, Google, or Discord.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for
the acknowledgements section. Here are a few examples.

* [![Pocketbase][Pocketbase.io]][Pocketbase-url]
* [![Golang][Golang.dev]][Golang-url]
* [![Docker][Docker.com]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites (for development)

* [Docker](https://www.docker.com/)
* Docker Compose (recommended)
* [Github OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) (optional)
* [Discord OAuth App](https://discord.com/developers/applications) (optional)
* [Pocketbase.io](https://pocketbase.io/) (if you don't want to use docker)

### Installation (I assume you have a backend running)

1. Clone the repo (or fork it if you want to contribute)

```sh
git clone https://github.com/CorentinGS/Astrocket.git
```

2. cd into the project

```sh
cd backend
```

#### Using Docker Compose (recommended)

3. Run the docker-compose file

```sh
docker-compose up -d
```

#### Using pocketbase binary

3. Run the pocketbase binary

```sh
./pocketbase
```

## Configuration

To configure the backend, you need to apply the migrations using the following command:

```sh
./pocektbase migrate
```

Then, you need to create a new user using the following command:

```sh
./pocketbase admin create username password
```

Finally, you need to create a new oauth2 app on github and/or discord and configure it using the pocketbase admin
panel (http://localhost:8080/_/)


<!-- ROADMAP -->

## Roadmap

- [x] Add oauth2 support
- [ ] Pocketbase as a framework
    - [ ] Return connected users list
- [ ] User verification

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->

## Contact

CorentinGS - [@CorentinGS](https://github.com/corentings)

Project Link: [https://github.com/corentings/astrocket](https://github.com/corentings/astrocket)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- https://github.com/othneildrew/Best-README-Template/tree/master -->

[product-screenshot]: public/landing.png

[Pocketbase.io]: https://img.shields.io/badge/PocketBase-B8DBE4?style=for-the-badge&logo=PocketBase&logoColor=white

[Pocketbase-url]: https://pocketbase.io/

[Golang.dev]: https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white

[Golang-url]: https://go.dev/

[Docker.com]: https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white

[Docker-url]: https://www.docker.com/

