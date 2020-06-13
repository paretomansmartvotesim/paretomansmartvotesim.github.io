---
twuser: paretoman1
byline: 'By Paretoman and Contributors, May 2020'
description: An Explorable Guide to Group Decision Making
banner: Smart Voting Simulator
layout: page-3
title: Home
---

{% include card.html title='Finding Common Ground' description='Start here. Jump right in' url='commonground.html' img='img/venn-diagram.png' %}


{% include card.html title='Approval Voting' description='#2' url='approval_superman.html' img='img/winner-circle.png' %}

{% include card.html title='Primaries' description='#3' url='primaries.html' img='img/primary-strategy.png' %}

{% include card.html title="Nicky Case's Original - To Build a Better Ballot" description='' url='original.html' img='img/split-vote.png' %}

{% include card.html title="Jameson Quinn's Extension of Nicky's Sim" description='to show strategies for score voting, introduce STAR, and play the game of chicken' url='newer.html' img='img/chicken.png' %}

Not sure yet?  Here's a quick intro:

 Take a look at this great interactive sketch that Nicky Case made. You have two candidates {% include str.html str='`<span class="letterBig" style="color:hsl(240,80%,70%);"><b>A</b></span> <span class="letterBig" style="color:hsl(45,80%,70%);"><b>B</b></span> and you have a voter <img src="play/img/voter.png" />`' %} . Just move the voter and you'll see that he is just gonna vote for whoever he's closest to.

{% include sim-intro.html id='model1' caption='`<b><span style="font-size:2.5em;">click &amp; drag</span><br>the candidates and the voter:</b>`' %}

You can add more voters and see that you kinda get a sense of how voters are gonna vote as they move around and how an election with those voters would go. Most votes wins.

{% include sim-intro.html id='model2' caption='`<b>drag the candidates &amp; voter<span class="underline">s</span> around.<br>(to move voters, drag the <em>middle</em> of the crowd)<br>watch how that changes the election:</b>`' %}

In this kind of voting, you get a single choice for who you want to win. The ballot is pretty simple. This is the way the ballot is now.

{% include sim-ballot.html title='SINGLE CHOICE VOTING' caption='Also called First Past the Post.' id='ballotSingle' link='[link](http://127.0.0.1:8000/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQWrEMAz8i84-RLZkJzn3AT30FnLYdlMaCNllN0tZSvv2Sp4WCiUEIsmSxjPjD2qoH4aSA0sZw8DKlollkT3TcQzEPsKlDdy2Xifqm0BS_0o9B8o20YR_n82W3U672-l2O9zUS9kZeRlRghCDEStCrszYCLBYtOuSha42o-HYYeQ6EyMCYKKg0roQMw4LqhaVoUTzoalE2S0BUgJSAlICUjKkwczEYMYq8BKkcojWEofzGXF5Llfib2KAQ_JE6p78hRQolYJnAUXp6qHCMGUE0FPQ058XxBMqhGqp_BR2KYTmBgEiM1zPQMlaJTi5DIgMBhlWFzAo2C2xIj0fluW0Pd3PE_X0uNwuh2Xe7hTo-nZ6f5iuL5f5vM2n1bpft_U4vc7rdKTPbxSiHLmuAgAA)' %}

What could we do differently?  That's what this site's all about.  Just look at this giant sandbox.  I'll eventually have enough pages here to make use of all its features.