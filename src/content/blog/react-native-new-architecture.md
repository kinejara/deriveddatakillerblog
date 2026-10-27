---
title: "React Native's New Architecture"
date: 2024-12-01
tags: ["react-native", "javascript"]
---

The New Architecture is a rewrite of how React Native talks to native code and draws the screen. The old model serialized every call across an asynchronous bridge. JavaScript and native code never shared a direct interface, so React could not schedule work the way it does on the web.

Four pieces replace that bridge:

- **JSI** is a direct interface. JavaScript can call native code without waiting on a JSON message.
- **TurboModules** load a native module when it is first used, from a type-safe spec.
- **Fabric** is the renderer. Layout and updates can run synchronously, which is what React 18 needs for Suspense, Transitions, and `useLayoutEffect`.
- **Bridgeless mode** drops the old bridge once those pieces are in place.

On October 23, 2024, React Native 0.76 turned this on by default. A new project created with that release already runs the New Architecture. Before 0.76 you opted in. After 0.76 you opt out.

What you actually feel:

- Native calls no longer have to cross the bridge as serialized messages.
- Native modules start when they are used, not all at launch.
- Concurrent React features work, because the renderer can be interrupted and resumed.
- Libraries written for the old architecture still load through an interop layer. That layer does not cover every old trick, such as custom Shadow Nodes. A library that needs the full benefit has to ship TurboModule and Fabric specs.

An existing app can upgrade to 0.76 and keep running. The default only means the new path is the one you start on.
