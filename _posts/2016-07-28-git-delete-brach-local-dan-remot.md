---
layout: post
title: "Git, Delete branch Local dan Remote"
date: 2016-07-28T05:47:33+07:00
categories:
 - linux
 - myself
tags:
 - git
---

## How to delete git branch local and remote?

To delete local branch:

```
git branch -d branch_name
```

To delete remote branch:

```
git push origin --delete branch_name
```

Note: `origin` is a remote name, please use remote name with yours

Then, in the other machine, you can sync it with remote with:

```
git fetch --all --prune
```

## Bagaimana cara membuang branch di remote dan local?

Untuk membuang local branch:

```
git branch -d branch_name
```

Untuk membuang remote branch:

```
git push origin --delete branch_name
```

Kemudian, di mesin lain anda dapat melakukan sync dengan remote:

```
git fetch --all --prune
```

~~This is a post to remember myself when panic~~
