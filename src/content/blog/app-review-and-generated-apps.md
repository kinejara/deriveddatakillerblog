---
title: "Updated App Review Guidelines"
date: 2026-10-29
tags: ["swift", "ios"]
---

On October 16, Apple [updated the App Review Guidelines](https://developer.apple.com/news/?id=92th7e5i). Most of the note is small cleanup. A few lines stuck with me, because I just shipped an app that was mostly built in Cursor.

Guideline 1.2 now lists AI content creation apps next to social apps. If people can generate or upload content in the app, you need a filter, a way to report it, a way to block someone, and a contact they can actually reach. Skip that, or leave a problem alone after Apple points it out, and they can pull the app until you show a real fix. This one is about the content inside the app, not about using an agent to write the Swift.

2.3.14 is the new creative assets, the ones that show up in the product page header and in search. They can explain the app. They also have to be about your app. No other app's name to game search, no claim you can't back up, no discount that isn't real. A generated header that looks better than the build is still metadata. Review is going to compare it to what you submitted.

2.5.19 is the one I keep thinking about. No hidden, dormant, or undocumented features. Review and the person who downloads the app should be looking at the same thing. Hide behavior in the binary, including by obfuscating it, and Apple can remove the app and terminate the account. This used to live under 2.3.1. That guideline is still there: describe new features specifically in the Notes for Review, and make sure review can actually reach them. A generic "bug fixes and improvements" gets rejected.

I ran into a version of this with ReadFluent. I asked Cursor to drop in a sample book so I could take screenshots, and the next time I imported a real EPUB the sample book came along with it. I hadn't asked for that. I had to go back and be pretty explicit that the book the user picks is the one that should show up, and that the sample stays out of the build. Easy to miss when the code already looks done. If I had left it in and never mentioned it in the review notes, thats the kind of thing 2.5.19 is about.
