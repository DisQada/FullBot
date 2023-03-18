<div align="center">

halfbot-example

<br>

![](https://img.shields.io/npm/v/@disqada/halfbot.svg?maxAge=3600)
![](https://img.shields.io/npm/dt/@disqada/halfbot.svg?maxAge=3600)

</div>

# Translations

<div align="right">

[Arabic](README.md) | [English](README.en.md)

</div>

<br>

---

# About the project

Ready template for Discord bot code using halfbot tool

<br>
<br>

# Before starting

## Environment

Inside the project there is a file named `useme.env`, rename it and remove `useme`

Inside the file you will find the following line

```
TOKEN=PUT_YOUR_TOKEN_HERE
```

Replace `PUT_YOUR_TOKEN_HERE` with your own bot token without putting it inside quotes and without leaving any spaces

⚠️⚠️ DO NOT SHARE the TOKEN with anyone ⚠️⚠️

<br>

## Setup

To download all the required packages, run the following command

```
npm run setup
```

<br>

## Programming

You can now start modifying the data of the files in the following path

```
bot/config/
```

And add extra functionalities inside the correct folder in the following path

```
bot/modules/
```

<br>

# Employment

Now all that remains is to run the bot and try it out, which you can do by running the following command

```
npm run start
```

Or you can use the following command to make the bot restart automatically after every modification and save to the code

```
npm run watch
```
