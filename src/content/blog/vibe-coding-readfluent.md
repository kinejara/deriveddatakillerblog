---
title: "Taking the vibe coding route"
date: 2026-10-19
tags: ["swift", "ios"]
---

After years of not releasing my own iOS app, I decided it was time to build a new one, this time taking the vibe coding route.

Why vibe coding? Between family, work, and other hobbies, who has time to build an entire app from scratch? Unfortunately, not me! 😅 But I still wanted to see how fast I could build an app using the latest AI tools, while also getting a little refresher on the latest development trends and practices coming with the release of the iPhone Duo.

ReadFluent is a bilingual reader. You open an EPUB, read a page, and see the same page in another language. In portrait mode, you have one page and a Translate button. On a wider screen, like an iPad or an open iPhone Duo, you can see the original and the translation side by side.

I built the whole app using Cursor. It was my first time using it to build an entire app, not just fix something or make a new view for an existing app. I already know SwiftUI, so what I really wanted to try was to focus more on a targeted learning experience like how to render an app on iPhone Duo and using Foundation models to generate AI content.

Opening a book, making the text fit the page, bookmarking your place and coming back to the same lines. After a week of making small changes, the app was pretty much what I had in mind.

The app uses SwiftUI for iPhone, iPad and iPhone Duo. Books are stored in SwiftData, and the EPUB itself is just a file in Application Support. I decided not to use an EPUB library. Since an EPUB is basically a zip file, I just read it directly. One of the first bugs was treating the data as zlib, but EPUB uses raw deflate. Honestly, its the kind of mistake I could have made myself.

Pages are built with Core Text, measuring the text with the same font used to draw it. We don't save something like "page 12" because that number changes when you change the font size. Instead, bookmarks and the last reading position save an offset into the book using UserDefaults, so even if you force quit the app, you can continue where you left off.

For translation, the app uses Apple's Translation framework on a real device. On the simulator, it uses sample Spanish text because dealing with language downloads just to take screenshots is a pain.

The best part of working this way is all the stuff in the middle. Handling zip files, pagination, the Duo layout, the splash screen, bookmarks and importing files. Normally, just getting all of that setup takes quite some time. With Cursor, the app started feeling like a real product pretty early, and I could spend more time on the smaller details. Things like learning the changes needed for adapting an app to iPhone Duo.

But there is also a downside. Sometimes the code looks finished way before the actual behavior is finished.

I asked Cursor to add a sample book so I could take some screenshots. The first time I imported a book, it also installed the sample book automatically. The button said import, but suddenly the app had a default book in it. I had to be very clear that the first book should always be the one the user actually selected.

If you don't explain the edge cases, the agent will pick something that sounds reasonable. And thats the tricky part, because reasonable doesn't always mean correct.

There is also the risk of things slowly drifting away from what you actually want to ship. Screenshot mode, demo text, sample books... if you don't keep an eye on those things, you can end up shipping the demo instead of the actual product.

Would I use Cursor again to build a small native app? Absolutely. But I would also spend more time writing down the behaviors I don't want to compromise on, and keep track of all the demo-only features so they don't accidentally become part of the final product.
