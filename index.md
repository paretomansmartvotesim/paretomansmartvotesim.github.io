---
layout: page-2
title: Home
banner: Smart Voting Simulator
description: An Explorable Guide to Group Decision Making
byline: 'By Paretoman and Contributors, May 2020'
twuser: paretoman1
---
{% include letters.html %}

{% include card.html title='Finding Common Ground' description=' - #1 Start here. Jump right in.' url='commonground' img='img/venn-diagram.png' %}

{% include card.html title='Primaries' description=" - #2 we don't need them" url='primaries' img='img/primary-strategy.png' %}

{% include card.html title='Approval Voting' description=' - #3 a practical improvement - and it works with strategy' url='approval' img='img/winner-circle.png' %}

{% include card.html title="To Build a Better Ballot" description=" - Nicky Case's original sim" url='original' img='img/split-vote.png' %}

{% include card.html title="An Even Better Ballot" description=" - Jameson Quinn's extension of Nicky's sim to show strategies for score voting, introduce STAR, and play the game of chicken" url='newer' img='img/chicken.png' %}

{% include card.html title="Instant Runoff Voting" description=" - a kinder politics with a kind of Ranked Choice Voting (RCV) for single-winner elections" url='irv' img='img/irv.png' %}

{% include card.html title="The Single Transferable Vote" description=" - an introduction to proportional representation with STV, the multi-winner form of Ranked Choice Voting RCV." url='stv' img='img/stv.png' %}

{% include card.html title="Proportional Representation" description=" - continuing after STV, here are more kinds of proportional representation without parties, using scoring and paired methods" url='proportional' img='img/proportional.png' %}

{% include card.html title="Condorcet Methods" description=' - the best way to find common ground.' url='condorcet' img='img/condorcet.png' %}

{% include card.html title="Sandbox" description=' - try everything' url='sandbox/' img='img/sandbox.png' %}



# Intro

Take a look at this great interactive sketch that Nicky Case made. You have two candidates  {{ A }} {{ B }} and you have a voter <img src="play/img/voter.png" />  . Just move the voter and you'll see that he is just gonna vote for whoever he's closest to.

{% include sim-intro.html id='model1' caption='`<b><span style="font-size:2.5em;">click &amp; drag</span><br>the candidates and the voter:</b>`' %}

You can add more voters and see that you kinda get a sense of how voters are gonna vote as they move around and how an election with those voters would go. Most votes wins.

{% include sim-intro.html id='model2' caption='`<b>drag the candidates &amp; voter<span class="underline">s</span> around.<br>(to move voters, drag the <em>middle</em> of the crowd)<br>watch how that changes the election:</b>`' %}

In this kind of voting, you get a single choice for who you want to win. The ballot is pretty simple. This is the way the ballot is now.

{% include sim-ballot.html title='SINGLE CHOICE VOTING' caption='Also called First Past the Post.' id='ballotSingle' link='[link](http://127.0.0.1:8000/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQWrEMAz8i84-RLZkJzn3AT30FnLYdlMaCNllN0tZSvv2Sp4WCiUEIsmSxjPjD2qoH4aSA0sZw8DKlollkT3TcQzEPsKlDdy2Xifqm0BS_0o9B8o20YR_n82W3U672-l2O9zUS9kZeRlRghCDEStCrszYCLBYtOuSha42o-HYYeQ6EyMCYKKg0roQMw4LqhaVoUTzoalE2S0BUgJSAlICUjKkwczEYMYq8BKkcojWEofzGXF5Llfib2KAQ_JE6p78hRQolYJnAUXp6qHCMGUE0FPQ058XxBMqhGqp_BR2KYTmBgEiM1zPQMlaJTi5DIgMBhlWFzAo2C2xIj0fluW0Pd3PE_X0uNwuh2Xe7hTo-nZ6f5iuL5f5vM2n1bpft_U4vc7rdKTPbxSiHLmuAgAA)' %}

What could we do differently?  That's what this site's all about.  [Go up to the top menu to start exploring.](index#content)