# Book Quotes to Deals Generator App Card

Use the free, open-source [Open Library](https://openlibrary.org/) API to search for books, add them to a quote, and generate a deal from a Contact record.

## Overview

You can now build UI extensions for public apps. Utilize HubSpot's [library of UI components](https://hubs.la/Q02RR5bV0) to create app cards that blend seamlessly with HubSpot. By leveraging [React](https://react.dev/), get started coding in a modern, flexible framework.

Within this repo, you'll find an `index.js` file with a [sample OAuth flow](https://github.com/HubSpot/oauth-quickstart-nodejs) to connect this public app to an account of your choosing. We recommend creating a [developer test account](https://developers.hubspot.com/docs/api/account-types#developer-test-accounts) inside of your app developer account for testing purposes.

This app card demonstrates:

* Using `hubspot.fetch` to call external APIs
* Using [NextJS](https://nextjs.org/) to expose endpoints to both HubSpot and open-source APIs
* Using a `local.json` file to proxy calls from a locally running backend service

### Project Structure

This project is split into two parts:

1. `book-quote-api/` \-  A backend built with [NextJS](https://nextjs.org/) to expose endpoints to both HubSpot and open-source APIs
2. `src/` \- The frontend [public app](https://developers.hubspot.com/docs/guides/apps/public-apps/overview?utm_campaign=Global+%28en%29+%7C+Developers+%7C+DevRel+GitHub&utm_source=GitHub&utm_medium=gh_repo&utm_content=uie_public_app_charts) containing one app card that works on contact records

## Installing the App Card

### Requirements

A few things must be set up before using this public app sample.

* You must have a HubSpot developer account ([sign up](https://hubs.la/Q02Rzsjc0)).
* You must have the [HubSpot CLI](https://github.com/HubSpot/hubspot-cli/blob/main/packages/cli/README.md) installed and set up.
* You must install [Node.js](https://nodejs.org/en/download/package-manager) and [yarn](https://yarnpkg.com/getting-started).
* You should create a developer test account inside of your HubSpot developer account.

*Note: You must be a super-admin for the account that you want to install the app in.*

### Initializing the HubSpot Public App and OAuth

The HubSpot CLI enables you to run this project locally so that you may test and iterate quickly. Getting started is simple. Navigate to the root directory and follow these steps:

1. Initialize the project to generate the `hubspot.config.yml,` which contains the account information needed to run the project. Follow the prompts, select your developer account, and generate a personal access key.


```
hs init
```



2. Upload the project to your developer account. This will generate the credentials needed to start the OAuth flow.


```
hs project upload
```



3. Create a `.env` file in the root of the repository with the ID and secret for your app (found on the app settings page), eg:


```
CLIENT_ID='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
CLIENT_SECRET='yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy'
SCOPE='crm.objects.contacts.read,crm.objects.contacts.write,crm.objects.deals.write,crm.objects.deals.read'
```

4. The `SCOPE` environment variable is optional in this example. If not set, this application will use the scope `crm.objects.contacts.read`. The scopes can be separated by a comma, space, or URL-encoded space (`%20`)

5. From the root of the repository, run:

```
$ yarn install
$ yarn start
```


6. Open your browser to `http://localhost:3000/` to view your HubSpot Access Token.

### Running the NextJS Backend Locally

1. With your OAuth flow running in the background, navigate to the `book-quote-api/` directory and run `npm install` to install the required dependencies for the NextJS project.
2. Create a `.env.local` file in this directory to house your HubSpot Access Token (generated from the OAuth workflow). You can find an example of this file in `sample.env.local`.

```
HUBSPOT_ACCESS_TOKEN='YOUR_ACCESS_TOKEN'
```

3. Now, you’re ready to start the development server\! Be sure to take note of the port the project is running on, as the local proxy will need to be configured later.

```
npm run dev
```

### Running the HubSpot Publical App Locally

1. Navigate to the app card extensions directory (`src/app/extensions`) and install the node dependencies.

```
npm install
```



2. Open your browser to `http://localhost:3000/install` to kick off the OAuth 2.0 flow. This is where it's recommended to use a developer test account. When you connect the developer test account through this OAuth flow, it will also add the app card to the account.

3. Start the server for local development.


```
hs project dev
```

### Note

When making changes to configuration files ({CARD\_NAME}-card.json and app.json), be sure to stop the development server and use `hs project upload` to update the project before restarting the development server.

Since this is a public app, always make sure to upload the project into your app developer account, not a singular account.

### Viewing the App Card

This card is configured to be viewed on Contact records. To view the card for development, navigate to any Contact record and select `Customize record`. Select the view you'd like to update from the table and choose `Add cards`.

<img width="1450" alt="Screenshot 2025-01-21 at 11 14 28 AM" src="https://github.com/user-attachments/assets/bf416eb8-6e16-4784-b358-8f0217b9073b" />

Then, navigate to any contact record page to view the card in the middle column.

### Using the Book Quotes Card

This app card offers users the ability to:
- [ ] **Search for books:** Search for books by title, author, or ISBN using the OpenLibrary API
      
<br/>
      
![search for books](https://github.com/user-attachments/assets/07ee50ac-59c9-41b6-bb82-f7a864d594c7)


- [ ] **Build a Cart:** Add or remove books from the cart and toggle between the book search and cart views
      
<br/>

![add to cart](https://github.com/user-attachments/assets/e7e1e6bb-85fc-4bdf-a11e-8f7f9e0ee641)


- [ ] **Generate a quote deal from the cart items:** Generate a quote deal from the cart items and add it to the contact record with the HubSpot Deals API. After the quote is generated, click the link in the banner to view the deal in HubSpot.
      
<br/>

![create a deal](https://github.com/user-attachments/assets/953fde36-f6bc-4443-80f7-42b0a2c3a5ce)



## Learn more about App Cards Powered by UI Extensions
To learn more about building public app cards, visit the [HubSpot app cards landing page](https://developers.hubspot.com/build-app-cards) and check out the [HubSpot public app cards developer documentation](https://developers.hubspot.com/docs/guides/crm/public-apps/overview).

