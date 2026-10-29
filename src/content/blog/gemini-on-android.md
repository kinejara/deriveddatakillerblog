---
title: "Using Gemini in an Android app"
date: 2025-09-15
tags: ["android", "kotlin"]
---

People talk about "adding Gemini" like its one dependency. By September it isn't. There is a small model that runs on some phones, and a bigger one that runs in Google's cloud, and they fail in completely different ways. I spent some time in the docs after I/O trying to figure out which one I'd actually call from an app.

The on-device model is Gemini Nano. You don't ship the weights in the APK. A system app, AICore, downloads the model and keeps a single copy on the phone, and ML Kit calls into that. In May, ML Kit added four GenAI tasks on top of it: summarize an article or a conversation, proofread a short piece of text, rewrite it in another tone, and describe an image. In August the newer Nano landed on the Pixel 10, and those same four tasks use it. You still don't write your own prompt. You pick the task, the language, and how the output should look. One bullet or three. Article or chat. That's the API.

For a lot of features that limited menu is what you want. Summarizing a note the user just wrote does not need a model that can plan a vacation. The text stays on the phone, you don't pay per request, and it works with no signal. There are limits though, and they're easy to miss until you hit them. Summarization wants the input under about 4000 tokens. An article also has to be long enough to be worth it, a few hundred words, not a caption. Proofreading is for short text, under 256 tokens, and only a few languages (English, Japanese, French, German, Italian, Spanish, Korean). Hand it a long document and the honest options are to cut the text, or stop pretending this is an on-device job.

Nano is also not on most phones. AICore shows up on recent Pixels and on a growing set of devices with Tensor, Snapdragon, or Dimensity chips. Everyone else gets nothing. So the first call is not the summary. It's a status check, and I'd do it before the button is on screen:

```kotlin
val options = SummarizerOptions.builder(context)
    .setInputType(InputType.ARTICLE)
    .setOutputType(OutputType.ONE_BULLET)
    .setLanguage(Language.ENGLISH)
    .build()
val summarizer = Summarization.getClient(options)

when (summarizer.checkFeatureStatus().await()) {
    FeatureStatus.AVAILABLE -> summarize(text)
    FeatureStatus.DOWNLOADABLE -> downloadThenSummarize()
    FeatureStatus.DOWNLOADING -> summarize(text)
    FeatureStatus.UNAVAILABLE -> showTheNoteWithoutASummary()
}
```

`AVAILABLE` means you can call `runInference` and stream the text into the UI. `DOWNLOADABLE` means the model isn't on the device yet. That download is big, it wants Wi-Fi, and if Nano isn't already there it takes a while. If another app already pulled Nano down, you're mostly waiting on a small adapter for this one task, which is much faster. `DOWNLOADING` means just go ahead and ask. The request waits for the download. `UNAVAILABLE` means this phone will not do it. Hide the button, or send the work to the cloud. Don't toast an error and leave the user staring at it.

A few failures look like your bug. Right after a factory reset, or if AICore's data got cleared, the service isn't ready yet. Binding errors, "feature not found", that kind of thing, until AICore finishes fetching its config. That can be minutes. It can be hours. An unlocked bootloader isn't supported at all, which will annoy exactly the people testing the feature. `checkFeatureStatus()` is how you keep those off the screen. And close the client when the screen goes away. It's holding a model.

The other Gemini is the cloud one. Flash and Pro, and Imagen if the feature is "make a picture." Firebase AI Logic is the Android client, so the app can call the model without you running a backend. I'd start with Flash for anything the user is waiting on. Pro is the slower call: a long document, audio, video, a question that actually needs some reasoning. There's also the Live API if the feature is a real back and forth, not a single prompt and a paragraph back. This path works on any Android phone with a network. That's most of the install base. The Nano list is not.

You pay for every call, and the text leaves the phone. A summary of a private note is a bad thing to send out. A box where the user is clearly asking a service for help is a different story, and you should say so in the UI. Don't drop a Gemini API key in the app and ship it. Use App Check so a copied APK can't run up the bill, and set a spending limit before the first internal build. A tight test loop against a paid model gets expensive faster than a launch does.

If a phone has no Nano and you don't want the text to leave, you're outside Gemini. AI Edge and the MediaPipe LLM Inference API can run some other small model you chose, and Play for On-device AI is in beta to deal with the download, so a midrange phone doesnt get a multi-gigabyte file over cellular. I wouldn't start a feature there. It's a second stack. Nano, and Flash when Nano isn't around, covers the cases I keep running into.
