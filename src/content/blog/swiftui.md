---
title: "SwiftUI"
date: 2019-07-22
tags: ["swift", "ios"]
---

SwiftUI is Apple's declarative UI framework, announced at WWDC 2019. You describe what the screen shows. The framework updates the screen when the data changes.

This is the first time Apple has given us one UI toolkit that is actually pleasant to write. A screen that used to be a view controller, a storyboard, and a pile of layout constraints is now a small value type. You stop pushing data into controls and start saying what the screen is. The preview updates as you type, so the feedback loop is the code itself, not a rebuild and a tap through the app.

A view is a struct with a `body`. `@State` holds a value the view owns. Change that value and `body` runs again.

```swift
struct Counter: View {
    @State private var count = 0

    var body: some View {
        Button("Count: \(count)") {
            count += 1
        }
    }
}
```

Xcode 11 draws a live preview next to this code. The same view can run on iPhone, iPad, and Mac, with the iOS 13 and macOS Catalina SDKs.

UIKit is still there. A new screen can be SwiftUI, and an existing one can stay UIKit. `UIHostingController` puts a SwiftUI view inside a UIKit app.
