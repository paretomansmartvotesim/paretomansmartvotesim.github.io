---
permalink: /modify/
layout: page-2
title: Modify the Simulator
---

These are the build instructions to help you run this site on your computer.

There are two paths: modify a build, or modify the source.

## Sandbox Editor

Also, there is some ability to write code in the sandbox. Just hit "dev" under "Voting systems by Type" and "Create One" under "what voting system?". Then you can load and edit the code for any system. This is limited to only the parts of the code that count the ballots and display the output. To change how voters fill in their ballot, you'll have to modify the code locally on your computer. Instructions are below.

{% include gif-show.html
gif = "gif/create_one_wide.gif"
%}

## Modify a Build

If you want to mess around with the javascript code for calculating elections and votes, then it's quicker and easier to work from the already-compiled repository, the [build](https://github.com/paretoman/ballot_site/). 

To get started from this build, do the following:

1. Download the repository from github.

2. Start an http server. For example, start a terminal in the downloaded folder and type: 

   ```
   python -m http.server
   ```

Here's more detailed instructions for those that are new to programming web pages:

1. Download the repository from github.
2. Install VS Code.
3. Open VS Code, and open the repository folder you downloaded.
4. Install the Live Server extension by Ritwick Dey.
5. Hit "Go Live" in bottom right corner, small text.
6. Hit F5 in VS Code. This starts a debug session.
7. The first time you hit F5, you have to edit the config file. Change the port from 8080 to 5500 because that's what Live Server uses. Then save. Then hit F5.

Now you are in a debug session where you can search through the code for interesting parts and set breakpoints and check out variable contents. You can basically watch the code work.

You can make changes. When you hit save on your changes, the current page you're on in the browser will reload with your changes.

## Modify the Source

If you want to edit the html or add more js files, then you'll want to run the jekyll build tool at some point. 

Jekyll is a build tool. The reason I'm using Jekyll is I want to modularize my html, and jekyll seems to be popular and minimal, and github does it.

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

## License

All of this is available without copyright under the [CC0 public domain license](https://creativecommons.org/share-your-work/public-domain/cc0/). The only exception is other people's stuff. I used some software packages that other people have made. You can tell where they are by reading the source code.