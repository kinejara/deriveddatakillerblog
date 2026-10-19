---
title: "Coroutines and Flow on Android"
date: 2020-12-01
tags: ["kotlin", "android"]
---

A coroutine is a suspendable piece of work. A `suspend` function can wait for a network call or a database read without blocking the thread that started it.

Start that work in `viewModelScope` or `lifecycleScope`. When the `ViewModel` or the screen goes away, the scope cancels the work with it. Skip `GlobalScope`. It outlives the screen that needed the result.

`Flow` is a stream of values over time. A one-shot request stays a `suspend` function. A search box, a database query, or a location update is a `Flow`.

Collect it from the UI scope:

```kotlin
viewModel.results.collect { items ->
    render(items)
}
```

Cold flows do nothing until something collects them. `StateFlow` keeps the latest value, so a new collector gets the current state immediately.
