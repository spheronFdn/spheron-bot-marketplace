# Spheron Bot Marketplace

The Spheron Bot Marketplace is a dedicated platform for bot creators to showcase and promote their innovative creations. We provide a single, verified space for users to discover a diverse range of open-source bots, fostering a community of high-quality and cutting-edge projects.

## Why did we build this?
We built the Spheron Bot Marketplace with the following goals in mind:

1. **Provide Exposure for Bot Creators:**
    - We wanted to offer a dedicated platform for bot creators to showcase and promote the incredible bots they are building.
    - The marketplace serves as a central hub where users can discover and explore a variety of bots created by talented developers.
2. **Single Platform for Verified Bots:**
    - Our aim is to create a single, trustworthy platform where users can find verified bots.
    - By curating and verifying the bots listed on our marketplace, we ensure a high-quality selection for users.

## How to List Your Bot on Spheron Bot Marketplace

1. **Create a Pull Request:**

    - Fork the Spheron Bot Marketplace repository to your GitHub account.
    - Create a new branch in your forked repository for your bot.

2. **Add Your Bot Information:**

    - In your branch, create a new JSON file in the bots directory.
    - Follow the JSON format specified below to provide details about your bot.

3. **Submit Pull Request:**

    - Commit your changes to your branch and push it to your forked repository.
    - Create a Pull Request (PR) from your branch to the main Spheron Bot Marketplace repository.

4. **Verification Process:**

    - Our team will review the PR and verify that your bot details follow the required format.
    - Once verified, your bot will be listed on the Spheron Bot Marketplace.

### JSON Format for Bot Information

```json
{
  "address": "<Your Wallet Address>",
  "botGithub": "<Bot GitHub URL>",
  "githubId": "<Your GitHub ID>",
  "name": "<Bot Name>",
  "description": "<Bot Description>",
  "url": "<Bot URL>",
  "healthUrl": "<Bot Health Check URL>",
  "bannerUrl": "<Bot Banner URL>",
  "socialProfile": "<Link to your Social Profile>"
}
```

- **address:** Your Wallet Address.
- **botGithub:** Link to the bot's github repository.
- **githubId:** Your GitHub ID.
- **name:** The name of your bot.
- **description:** A brief description of your bot.
- **url:** The URL associated with your bot.
- **healthUrl:** The health check URL for monitoring bot status.
- **bannerUrl:** Link to the banner to be displayed on the marketplace for your bot.
- **socialProfile:** A link to any of your Social Profile.

### Open Source Requirement

Your bot must be open-sourced. Provide a link to the GitHub repository in your JSON file.

## Help

For help, discussions or any other queries: [Join our Community](https://community.spheron.network/)

## Version History

- 0.1
  - Initial Release

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
