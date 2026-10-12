# deriveddatakillerblog

Personal blog, originally a Hexo site on a Raspberry Pi 3. It is now a static Astro site deployed to Cloudflare Workers with Wrangler.

```bash
yarn dev       # local Astro server
yarn build     # write dist/
yarn preview   # serve dist/ with Wrangler
yarn deploy    # build and deploy
```

`yarn deploy` needs a Cloudflare login (`npx wrangler login`) the first time.
