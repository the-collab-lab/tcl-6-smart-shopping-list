[![Netlify Status](https://api.netlify.com/api/v1/badges/7c513e14-ce2e-4e03-ae5a-414955dd997c/deploy-status)](https://app.netlify.com/sites/tcl-6-smart-shopping-list/deploys)

# Overview

The goal of this project is to create a “smart” shopping list app that learns your buying habits and helps you remember what you’re likely to need to buy on your next trip to the store.

How it works is that you will enter items (e.g., “Greek yogurt” or “Paper towels”) into your list. Each time you buy the item, you mark it as purchased in the list. Over time, the app comes to understand the intervals at which you buy different items. If an item is likely to be due to be bought soon, it rises to the top of the shopping list.

The app will work in many of the same ways as [iNeedToBuy.xyz](https://app.ineedtobuy.xyz/) (on which our project is based) with the exception that we will not be implementing barcode scanning (that feature would add a lot of scope to the project and in my experience wasn’t all that useful).

For additional details, please check out the [project brief](PROJECT-BRIEF.md).

<hr>

# Eggheadded
A smart shopping list. View [Eggheaded](https://tcl-6-smart-shopping-list.netlify.com/) here. 

## Summary

### Welcome Screen
* Welcome to Eggheaded! If this is your first time here click create new list to start. 
* If you already have a token you can submit it in the input field and head over to your shopping list.


<img width="1064" alt="Eggheadded welcome screen" src="https://user-images.githubusercontent.com/33433415/83363286-46eab500-a366-11ea-8756-48cd0ef87b79.png">

### Add Item View
* The input field is where you can type in the item you want to add to your list.
* Once that's done you can pick how soon you need it, the time frame you choose will add the item to your list.
<img width="1064" alt="add an item to the shopping list with this form" src="https://user-images.githubusercontent.com/33433415/83363331-bbbdef00-a366-11ea-820e-8a7603787176.png">

### Shopping List View
* Each item is color coded based on how soon the item is needed, and has a details view that can be accessed by clicking the chevron next to the trash can.
* Blue: I need to purchase this soon.
* Yellow: I need to purchase this kind of soon.
* Red: I need to purchase this not so soon. 
* A whole egg signifies that you havent purchased that item just yet and a cracked egg show you have purchased it. 

<img width="1064" alt="Shopping list with items added" src="https://user-images.githubusercontent.com/33433415/83363294-64b81a00-a366-11ea-8389-2d0e08d65454.png">

Search list filter
* You can even search for items within your list. 

<img width="1064" alt="search filter" src="https://user-images.githubusercontent.com/33433415/83363298-6a156480-a366-11ea-94c4-164765a2fef3.png">


## Project Dependencies
- React
- Firebase
- Google Fonts
- Font Awesome
- Bootstrap Modal

## Contributors
:star:  [Elise](https://github.com/espain16) </br>
:star:  [Scott](https://github.com/skillitzimberg) </br>
:star:  [Sara](https://github.com/SaraSweetie)  </br>
:star:  [Myles](https://github.com/erostribe) </br>

## Acknowledgements
- [The Collab Lab](https://the-collab-lab.codes/)
- Andrew
- Lauren
- Steve
- Jayson

## Credits
- <a href="https://www.freepik.com/free-photos-vectors/chicken">Chicken vector created by freepik - www.freepik.com</a>
- <a href="https://www.freepik.com/free-photos-vectors/food">Food vector created by freepik - www.freepik.com</a>
- <a href="https://pixabay.com/vectors/egg-egg-shell-white-hen-s-egg-32275/"> Clker-Free-Vector-Images - pixabay.com</a>
