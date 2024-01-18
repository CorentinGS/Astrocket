<h1 align="center">
  <br>
  <a href="https://astrocket.corentings.dev"><img src="frontend/src/assets/img/logo.png" alt="Astrocket" width="200"></a>
  <br>
  Astrocket
  <br>
</h1>

<h4 align="center">A simple chat app using <a href="https://astro.build" target="_blank">
Astro</a> + <a href="https://pocketbase.io" target="_blank">Pocketbase</a>.</h4>

<p align="center">
<a href="https://jetpack.io/devbox/docs/contributor-quickstart/">
    <img
        src="https://jetpack.io/img/devbox/shield_moon.svg"
        alt="Built with Devbox"
    />
</a>
  <a href="https://github.com/corentings/astrocket/LICENSE"><img src="https://img.shields.io/github/license/corentings/astrocket?style=flat-square"></a>
  <a href="https://github.com/CorentinGS?tab=packages&repo_name=Astrocket">
      <img src="https://github.com/corentings/astrocket/actions/workflows/docker-publish.yml/badge.svg">
  </a>
  <a href="https://github.com/CorentinGS?tab=packages&repo_name=Astrocket">
      <img src="https://github.com/corentings/astrocket/actions/workflows/docker-publish-front.yml/badge.svg">
  </a>
<a href="https://app.fossa.com/projects/git%2Bgithub.com%2FCorentinGS%2FAstrocket?ref=badge_small" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FCorentinGS%2FAstrocket.svg?type=small"/></a>

</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-develop">How To Develop</a> •
  <a href="#How-to-deploy">How To Deploy</a> •
  <a href="#demo">Demo</a> •
  <a href="#disclaimer">Disclaimer</a> •
  <a href="#license">License</a>
</p>

![screenshot](documentation/assets/astrocket.gif)

## Key Features

* **Modern UI** - Astrocket provides a modern interface that is easy to use and intuitive.
* **Self-hosted** - Astrocket is designed with self-hosting in mind and allows users to deploy their instance quickly
  and easily using prebuilt docker images.
* **Secure** - Astrocket provides secured account creation using oauth2. Thus, people don’t need to worry about their
  privacy as they can control their data/messages and don’t rely on third-party providers.

## How To Develop

Follow the instructions on the [backend](backend/README.md) and [frontend](frontend/README.md) READMEs.

## How To Deploy

### Using Docker Compose

You can deploy the app using docker-compose. You can find an example of a docker compose
file [here](docker-compose.yml).

If you want to use the prebuilt images, you can edit the [docker-compose.yml](docker-compose.yml) file to use the images
from
the [GitHub packages](https://github.com/CorentinGS?tab=packages&repo_name=Astrocket).

```bash
docker compose up -d
```

## Demo

You can access the demo [here](https://astrocket.corentings.dev).

## Disclaimer

This project is for educational purposes only. It is not intended to be used in production. The project is destined to
be presented as a final project for a course at IU International University of Applied Sciences.

## License

MIT

---

> [corentings.dev](https://corentings.dev) &nbsp;&middot;&nbsp;
> GitHub [@CorentinGS](https://github.com/corentings) 
