---
layout: page-2
title: Modify the Simulator
---

These are the build instructions. That means, if you want to run the site locally on your computer, you have to follow these instructions.

Why? Because I’m using a build tool, Jekyll. The reason I'm using Jekyll is I want to modularize my html, and jekyll seems to be popular and minimal, and github does it.

If you really don't want to run jekyll, I also have a repository for the [build](https://github.com/paretoman/ballot_site/). So you can start from there. But really, you're making it harder on yourself to do things like add new pages.

Here are instructions for building this site on your local machine.

1. Install Ruby. You might want to follow [these instructions from jekyll​](https://jekyllrb.com/docs/installation/windows/).

2. Do these to install jekyll and bundler and to start a server for the code.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
gem install jekyll bundler
gem install jekyll -v 3.8.7
bundle exec jekyll serve
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Other tips for Developing the site:

-  I edit markdown with [Typora](https://typora.io/) after copying it in from a better word processor.

-  Here's a good [tutorial](https://learn.cloudcannon.com/) for jekyll from CloudCannon. The jekyll site has great tutorials, too.
