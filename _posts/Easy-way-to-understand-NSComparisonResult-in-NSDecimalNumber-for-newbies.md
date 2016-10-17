---
title: Easy way to understand NSComparisonResult in NSDecimalNumber for newbies
date: 2016-08-28 15:09:20
tags: objective-c,swift
---

So if you go straight to the documentation you’ll find out this:  
 >// compare two _NSDecimalNumbers_
 

 So deep.. ok but how do we handle something basic like fooDecimalNumber > barDecimalNumber? if you google a little bit you will find out that you can use one of the definitions in the   typedef enum _NSComparisonResult_, in the case of _NSOrderedSame_ everything is really clear but  when it comes about _NSOrderedAscending_ and _NSOrderedDescending_ let’s be honest at first  glance these guys are not that clear, so how do we get familiar with _NSDecimalNumber_ comparison results ?
 
 Behold the key of _NSComparisonResult_
 
 ![comparision result](http://commandshift.co.uk/images/compare.png)
 
 And if you still need to read some code
 
 ```sh
if ([fooDecimalNumber compare:barDecimalNumber]) == NSOrderedDescending {
	//fooDecimalNumber is bigger than barDecimalNumber
}
```

```sh
if ([fooDecimalNumber compare:barDecimalNumber]) == NSOrderedAscending {
	//fooDecimalNumber is smaller than barDecimalNumber
}
```
