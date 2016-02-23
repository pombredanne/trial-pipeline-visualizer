# Trial Pipeline Signup Visualiser

The internal monitor we display at [Buildkite](https://buildkite.com/) HQ to monitor new customers signing up, how they’re progressing, and who ultimately upgrades.

To start it up locally (in a webpack dev server):

```bash
npm install && npm start
```

This will use data from [accounts.json](accounts.json). If you want to point it to a server-based JSON endpoint (using the webpack dev server http proxy), set the following environment variables:

```bash
env TRIAL_DASHBOARD_HOST='xxx' TRIAL_DASHBOARD_SECRET='yyy' npm start
```

## License

Copyright (c) 2016 Buildkite Pty Ltd. See LICENSE.md for details.
