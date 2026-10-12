# deriveddatakillerblog

Personal blog, originally a Hexo site on a Raspberry Pi 3. It is now a static Astro site deployed to Cloudflare Workers with Wrangler.

```bash
yarn dev       # local Astro server
yarn build     # write dist/
yarn preview   # serve dist/ with Wrangler
yarn deploy    # build and deploy
```

`yarn deploy` needs a Cloudflare login (`npx wrangler login`) the first time.

Dependencies are locked with Yarn 4.5.0 (`packageManager` in `package.json`), which is the Yarn release Cloudflare Workers Builds uses for the install. A Yarn 1 `yarn install` will rewrite `yarn.lock` and the Cloudflare install will fail again.
