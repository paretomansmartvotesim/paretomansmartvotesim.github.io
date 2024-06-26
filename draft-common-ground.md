---
permalink: /draft-common-ground/
twuser: paretoman1
byline: 'By Paretoman and Contributors, May 2020'
description: An Explorable Guide to Group Decision Making
banner: Smart Voting Simulator
layout: page-3
title: Home
---
{% include letters.html %}

Let's start off by explaining what we want from a group decision. I explain in this video:

{% include video.html url='https://www.youtube.com/embed/hUYLTh_aSTE' %}

To find common ground, you have to allow people to vote with more than one candidate.

Now that we talked about what we want, let's talk about how we can build something and get there. Take a look at this great interactive sketch that Nicky Case made. You have two candidates {{ A }} {{ B }} and you have a voter <img src="play/img/voter.png" /> . Just move the voter and you'll see that he is just gonna vote for whoever he's closest to.

{% include sim-intro.html id='model1' caption='`<b><span style="font-size:2.5em;">click &amp; drag</span><br>the candidates and the voter:</b>`' %}

You can add more voters and see that you kinda get a sense of how voters are gonna vote as they move around and how an election with those voters would go. Most votes wins.

{% include sim-intro.html id='model2' caption='`<b>drag the candidates &amp; voter<span class="underline">s</span> around.<br>(to move voters, drag the <em>middle</em> of the crowd)<br>watch how that changes the election:</b>`' %}

In this kind of voting, you get a single choice for who you want to win. The ballot is pretty simple. This is the way the ballot is now.

{% include sim-ballot.html title='SINGLE CHOICE VOTING' caption='Also called First Past the Post.' id='ballotSingle' link='[link](http://127.0.0.1:8000/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQWrEMAz8i84-RLZkJzn3AT30FnLYdlMaCNllN0tZSvv2Sp4WCiUEIsmSxjPjD2qoH4aSA0sZw8DKlollkT3TcQzEPsKlDdy2Xifqm0BS_0o9B8o20YR_n82W3U672-l2O9zUS9kZeRlRghCDEStCrszYCLBYtOuSha42o-HYYeQ6EyMCYKKg0roQMw4LqhaVoUTzoalE2S0BUgJSAlICUjKkwczEYMYq8BKkcojWEofzGXF5Llfib2KAQ_JE6p78hRQolYJnAUXp6qHCMGUE0FPQ058XxBMqhGqp_BR2KYTmBgEiM1zPQMlaJTi5DIgMBhlWFzAo2C2xIj0fluW0Pd3PE_X0uNwuh2Xe7hTo-nZ6f5iuL5f5vM2n1bpft_U4vc7rdKTPbxSiHLmuAgAA)' %}

So, what would the suggestions that I made look like? With ranking, this is what the ballot would look like. And it would be counted a little differently. You count for each pair. For each pair, most votes wins. And if somebody goes undefeated, they win the election.

{% include sim-ballot.html title='PAIR-WISE RANKED VOTING' caption='`again, click &amp; drag`' id='ballotPair' link='[link](http://127.0.0.1:8000/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQU7EMAz8i885xE7stD3zAsSt6mFhi6hYtSt2EUII3o6T0UpIqMrBsceezDhfFGkYR-uCsE5hZNXAHftNNHqtTFMgri2cUuAkNU80xECZhj6Q0sCBzDti-He8t-wi3S7S7yIc29NcFdVUkEIQZwRFsKaMXQBnj_5c8tA3UJzHi8KtRwQBNJKRaRsQQ7Eg65A5i_geYhPKdSVgSmBKYEpgSs40cmA0GkbBl2CVgziUK13tydVetZvldkk3KLe5_Jcyw2ku-BZIzH0rKhamjAB5CnmKfSm-UGFUwaJYl8KoRQSYNGzdwGLaLCQXYqAwKDCsukBBwWyBgsfD6bRdHz7PMw10f1hf5yMFurxsH3fz5eltOV-XbXXo5309zs_L6vD3L0JAR1KrAgAA)' %}

And here's approval voting. You can add more candidates and more voters and see how they vote. Approval lets you pick as many candidates as you like. Still, most votes wins.

{% include sim-ballot.html title='APPROVAL VOTING' caption='`yup, stiiiiill click &amp; drag`' id='ballotApproval' link='[link](http://127.0.0.1:8000/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRwUrFQAz8lz3vockm2bY3wU_wVnp4-ioWSlveeyoi-u1mdxAEKT1MssnOzkw_QxP6YcgWSfIYB1LySrxiKpWOYwxUVii3kdq29Cn0TQwSenJQhxjMV5r47_PlfDhpDyfd4YSa-jYVSaVltFBEAlCAVWXkAkgc_bnk0NUhO48fMtUdZgBoWNBpvcCGw4yuRecs7EE0VSiVTMCUwJTAlMCUnGnwNLFouAq-BKsU2UdS6MqOFHvFrvBv4YRDKoXUe_KXUuBUMv4LJEpXDxWBKQEgTyFPkZfiFyqMaq76FHEpjFoDgElD6gYW02qhiDNQGBQYos5QkHE3c2V6PC3Ldnv42KfQh7t9v2xvpyXEcH3Z3u-n69Nl3m_ztvrw-3U9T8_zOp3D1w9Qth21rgIAAA)' %}

And if you want to see, here's score voting. It's just kind of a more specific form of approval voting.

{% include sim-ballot.html title='SCORE VOTING' caption='you guessed it' id='ballotScore' link='[link](http://127.0.0.1:8000/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQWrDQAz8y551sLSS1va5P2huxoc2cWkgxCFJKaW0b692h0KhGB9mtZJmZ8afqUvjNJVC3NtME-tA7B4n4Uw88DxT4jrCotRLLXMaO0qaRmZKFkDJY6Kjf18Ml81Ov9kZNjvctbe5KqqloIQiVoABvCnjEMAaGM_lgKE1JXjiUrjNiABAI4rK2oI4LguqHlWwSATRNaFcMwFTBlMGUwZTDqaJiTHoWAVfhlUmiZZWujqj1V61q_J7CMIp14O2Pf1LqXCqBf8FEnVol4bAjAGQZ5BnyMvwCw1GrTR9hrgMRr0DwKQjdQeLW7NQxTkoHAocURcoKNgt0pien06n9b77uCxpTI_79bokSrfX9f1hue2vx8v9uJ6j8_12Piwvx_NySF8_76woUaoCAAA)' %}

And those are the basic vote-tallying methods. You just need to add the rule that the person with the highest tally wins. And now you've got a basic voting method that solves a lot of problems.

The spoiler effect is one of those problems. Even though {{ B }} should win, the election system is spoiling this. But if you use approval or condorcet or score, then it'll work out.

{% capture cap2 %}drag {{ C }} to <em>just under</em> {{ B }} to create a spoiler effect.<br> then compare these four different voting methods:{% endcapture %}

{% include sim-test.html title='' caption=cap2 id='election31' %}

There's a lot of details, but that's the gist of it.

Putting it all together, here's a sandbox for you to try out all the different systems and to make your own scenarios:

