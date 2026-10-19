---
title: "Swift Observation"
date: 2023-09-17
tags: ["swift", "ios"]
---

Observation replaces `ObservableObject` for a lot of SwiftUI state. Mark the model with `@Observable` and read its properties in `body`. The view updates when one of those properties changes.

```swift
import Observation

@Observable
final class Library {
    var title = ""
    var books: [Book] = []
}
```

You do not need `@Published`, and you do not need `objectWillChange`. A view that only reads `books` does not refresh when `title` changes.

Own the model with `@State`. When a child needs a `Binding`, pass the model and mark the parameter `@Bindable`.

```swift
struct Editor: View {
    @Bindable var library: Library

    var body: some View {
        TextField("Title", text: $library.title)
    }
}
```
