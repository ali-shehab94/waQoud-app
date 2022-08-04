<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.

**[PROJECT PHILOSOPHY](#philosophy) • [WIREFRAMES](#wireframes) • [TECH STACK](#stacks) • [IMPLEMENTATION](#implementation) • [HOW TO RUN?](#install)**

</div>

<br><br>

<img src="./readme/title2.svg" id='philosophy'/>

> waQoud is a utility app that calculates your trip costs and keeps you updated on the daily fluctuating gas prices.

### User Stories

-   As a user, I want to easily access the updated gas prices
-   As a user, I want to find out my trip costs according to the vehicle I am driving
-   As a user, I want to keep maintenance records of all my vehicles in one place
-   As a user, I want to know how many gas stations are around me and their locations

<br><br>

<img src="./readme/title3.svg" id='wireframes'/>

> The design was implemented on Figma
> The logo was created on Canva

| <table>

  <tr>
    <td><img src="./readme/" /></td>
    <td><img src="./readme/map.PNG" /></td>
    <td><img src="./readme/search.PNG"/></td>
    <td><img src="./readme/feed.PNG"/></td>
  </tr>
  <tr>
    <td><img src="./readme/options.PNG" /></td>
    <td><img src="./readme/reviews.PNG"/></td>
    <td><img src="./readme/profile.PNG"/></td>
    <td><img src="./readme/profilerev.PNG"/></td>
  </tr>
</table>

<br><br>

<img src="./readme/title4.svg" id='stacks'/>

Here's a brief high-level overview of the tech stack used to build waQoud:

-   This project uses the [React Native Framework](https://reactnative.dev/). React Native is a framework for building native apps using React. It can be used to develop applications that target anything from Android, iOS devices to Windows systems.
-   For reliability, the app uses [MySQL](https://www.mysql.com/) database with a firm structure to allow scalability.

-   The app uses the font [Righteous](https://fonts.google.com/specimen/Work+Sans) as its main font, and the design of the app adheres to the material design guidelines.

-   [Cars API](https://fonts.google.com/specimen/Work+Sans) was used to get necessary info about cars like mileage.

-   [Google Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/overview) was used to calculate distance between two coordinates.

-   [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) was used to get nearby gas stations, and for autocomplete to when searching places.

<br><br>
<img src="./readme/title5.svg" id='implementation'/>

> Using the above mentioned tech stack and the wireframes built with Figma, the implementation of the app is shown as below (recordings from the real app)

| Register                           | Sign in                           | Gas Prices Chart                     |
| ---------------------------------- | --------------------------------- | ------------------------------------ |
| <img src="./readme/sign-up.gif" /> | <img src="./readme/login.gif"  /> | <img src="./readme/gas-prices.gif"/> |

| Add a vehicle                         | Select a vehicle                    | Calculate Trip Cost by marker              |
| ------------------------------------- | ----------------------------------- | ------------------------------------------ |
| <img src="./readme/add-vehicle.gif"/> | <img src="./readme/pick-car.gif" /> | <img src="./readme/calculate-trip.gif"  /> |

| Calculate Trip Cost by Search                     | Vehicle Tracker                     | Gas Station Nearby                                |
| ------------------------------------------------- | ----------------------------------- | ------------------------------------------------- |
| <img src="./readme/calculate-trip-by-name.gif" /> | <img src="./readme/tracker.gif"  /> | <img src="./readme/navigate-to-gas-station.gif"/> |

<br><br>
<img src="./readme/title6.svg" id='install'/>

> This is an example of how you may give instructions on setting up your project locally.
> To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
    ```sh
    git clone https://github.com/your_username_/Project-Name.git
    ```
3. Install NPM packages
    ```sh
    npm install
    ```
4. Enter your API in `config.js`
    ```js
    const API_KEY = 'ENTER YOUR API';
    ```
