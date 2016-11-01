---
title: How to use Automator to kill Derived Data
date: 2016-11-01 12:11:51
tags: swift,xcode,objective-c
---


Automator is a tool inside of MacOS which allows you to build both simple and complex task, things like renaming files in a folder, merging content in finder and killing that derived data folder are things you can do by using this friendly tool.

So we are going to use Automator in order to clean up our derived data directory, I will talk about the reasons why you should and you may want to do this in another post for now I will asumme you are reading this because you are tired of the annoying process of cleaning up your derived data.

You just need to follow the next steps:

1. Type automator in Spotlight search bar then press enter to open Automator.
2. Choose "Application" from the menu then click "choose".
3. Click "Files & Folders" in the actions bar.
4. Locate "Ask for finder items".
5. Drag and drop the action "Ask for finder items" into your workflow.
6. Locate "Move Finder Items to Trash" in the "Files & Folder" action bar
7. Drag & drop "Move Finder Items to Trash" under "Ask for finder items" step
8. Select "Start at" then "Other", locate your derived data directory
9. Select "Save.." inside of the file menu
10. Click over your new icon and verify your derived data directory.

If you are wondering about the path of your derived data, it should be something like this:
  > ~/Library/Developer/Xcode/DerivedData
 
 
 
