---
title: CLABEValidator
date: 2016-08-28 15:50:49
tags: objective-c
---

CLABEValidator is a NSSTring category that will help you to validate CLABE numbers.

CLABE is a mexican standard for the numbering of bank accounts in Mexico,
for more information please refer to [wikipedia].

You can find this category in [github]. 

[github]: <https://github.com/kinejara/CLABEValidator>
[wikipedia]: <https://en.wikipedia.org/wiki/CLABE>

# Installation

Just drag and drop the file ``NSString+PNGCLABEValidator.h`` and ``NSString+PNGCLABEValidator.m`` to your project

# Usage

* Import the category to your desire class ``#import "NSString+PNGCLABEValidator.h"``
* Call method ``[NSString isValidCLABE:@"03218000011835971"];``

# TODO
* method to abstract short name and institution name from CLABE number
* implementation of NSError to generate error descriptions

