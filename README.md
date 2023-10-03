# HalfBot Example

![version](https://img.shields.io/npm/v/@disqada/halfbot.svg?maxAge=3600)
![downloads](https://img.shields.io/npm/dt/@disqada/halfbot.svg?maxAge=3600)

# Translations

[Arabic](README.ar.md) | [English](README.md)

# Table of Contents

- [HalfBot Example](#halfbot-example)
- [Translations](#translations)
- [Table of Contents](#table-of-contents)
- [About the project](#about-the-project)
- [Before starting](#before-starting)
  - [Environment](#environment)
  - [Setup](#setup)
  - [Programming](#programming)
- [Employment](#employment)

# About the project

Ready template for Discord bot code using halfbot tool

# Before starting

## Environment

Inside the project there is a file named `useme.env`, rename it and remove `useme`

Inside the file you will find the following line

```bash
TOKEN=PUT_YOUR_TOKEN_HERE
```

Replace `PUT_YOUR_TOKEN_HERE` with your own bot token without putting it inside quotes and without leaving any spaces

⚠️⚠️ DO NOT SHARE the TOKEN with anyone ⚠️⚠️

## Setup

To download all the required packages, run the following command

```bash
npm run setup
```

## Programming

You can now start modifying the data of the files in the following path

```bash
bot/config/
```

And add extra functionalities inside the correct folder in the following path

```bash
bot/modules/
```

# Employment

Now all that remains is to run the bot and try it out, which you can do by running the following command

```bash
npm run start
```

Or you can use the following command to make the bot restart automatically after every modification and save to the code

```bash
npm run watch
```
