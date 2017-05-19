---
title: Static headers & footers in UITableView
date: 2017-04-27 00:55:49
tags: swift
---

Have you ever been in the need of removing that annoying bounce animation from your table view header ? well I have been there so I can understand your struggle. If for any reason you want to keep your custom header view static in your table view here is a quick snippet that will make the trick for you.
<!--more-->

```swift
override func scrollViewDidScroll(scrollView: UIScrollView) {
    let offsetY: CGFloat = scrollView.contentOffset.y
    if let headerContentView = self.tableView.tableHeaderView?.subviews[0] {
        headerContentView.transform = offsetY > 0 ? CGAffineTransformMakeTranslation(0, offsetY) : CGAffineTransformMakeTranslation(0, min(offsetY, 0))
        }
}
```

This is the Obj-C version for the classic men
```javascript
- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    CGFloat offsetY = scrollView.contentOffset.y;
    UIView *headerContentView = self.tableView.tableHeaderView.subviews[0];
    
    headerContentView.transform = offsetY > 0 ? CGAffineTransformMakeTranslation(0, offsetY) : CGAffineTransformMakeTranslation(0, MIN(offsetY, 0));
}
```
Keep in mind that you can use the same trick for having static footers in your tableViews you only need to change the next line

```
self.tableView.tableHeaderView
```
to 

```
self.tableView.tableFooterView
```
