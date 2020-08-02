---
layout: page-3
title: An Even Better Ballot
banner: To Build a<span class="notation">n Even</span> Better Ballot
description: An addendum to the Interactive Guide to Approval Voting
description-banner: An <span class="notation">addendum to the</span> Interactive Guide to Approval Voting
byline: by <span class="notation">Jameson Quinn &</span> nicky case, <span class="strike">dec 2016</span> <span class="notation">sep 2017</span>
twuser: bettercount_us
---

{% include letters.html %}

You read/played Nicky Case's great [explainer on voting methods](original). And you still want more!

Never fear. I have two more voting methods to teach you about, and I hope I can convince you that they're the best yet.

Who's "me"? I'm Jameson Quinn, a statistics student at Harvard and a board member of the Center for Election Science. I'm not as good a designer or interactive programmer as Nicky, as you can see from the title above. But I have spent a lot of time thinking about voting methods.

I'm also not as cool as Nicky, but I'm going to pretend to be. If my pale imitation of their chatty tone puts you off, then... well, I guess you can wait for my peer-reviewed paper.

So, the story so far: FPTP voting is horrible. There's all kinds of other voting methods that would be better. We're looking for the one that's best. Some activists think that's Instant Runoff Voting (IRV), but Nicky and I both disagree; it can prematurely eliminate centrists and requires centralized counting. Nicky leans towards score voting, and I can see why: it's easy to understand, and in all the simulations Nicky built, it does a great job of satisfying all the little dot-on-screen voters.

By the end of this interactive, you're going to understand the three methods I consider the best. One of them Nicky already showed you: approval voting, which is great because it's so simple and because it has absolutely no downsides versus FPTP. The other two are newer, but they use similar basic ideas to what you've already seen. I hope you like all three methods.

But before I show you the new methods, I have to show you why score voting isn't already the greatest method possible. So I have to explain strategic voting.

## Unstrategic Voting


Remember how Nicky's voters worked in Score Voting? They just gave each candidate a number based on the absolute distance. Like this:

{% include sim.html
title = "Unstrategic Ballot"
caption = "Judge, don't choose."
id = "ballot4"
comment = "Description: this should just be an unstrategic score voter, as in ncase's thing. Allow ballot picture to show 0 scores."
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPHzu6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ4T28lkxvFnSGGcJqVIQqs4UZXfXeb0l2sxF_WckO3qahUD-bWhRCL2sIQxxcBhDN9EIYYaRopB7JAV1SDFf8sq7WZluFmh1N8iVyCmtnguIwcZxIAKkK6FTAWxob1ZDYZezEZmyUz9TM4A0GRGZDTFQJBURA2RsWRz703Mpo-8FeAqkFTAVcBVjGuyXmP5YQEBWAtcW5NjiWxldmI_x-7W3XO-bIx4cu_M_S5fUzN8s-JrIJiHnqzoYSVA7iJqAUBqxRdW2K6KWutvVdiWBIBhgWGBYandigsUUAgUCBqvUKC4q1CgBRH-T_F_epkiRbFd9UhhqSUALDWIaRDTQNhA2KCnga9BVnNZdzYYA4Q9P-12y_nx4zDbTD-sl-NsU316Xd7v59P6uD2ct8vep_1tv5lftvt5E75-ABCA83FMAwAA)"

%}

But notice something about that ballot? For many positions of the voter and candidate, the ballot doesn't include a score of 5 or a score of 0. If you actually voted like that, you'd be giving up on some of your voting power. Say {{ B }} is your favorite, and you give them a score of 3, which also happens to be their average score. If {{ A }} wins with a score of 3.2, you're going to feel very silly for not giving {{ B }} a 5, in order to pull their average up as high as you can.

## Lightly-strategic voting: "normalization"

As I suggested above, in the real world, in score voting and similar methods, most voters will want to make sure that their ballot contains at least one candidate each at the top rating and at the bottom rating. The simplest way to do that (even though the name sounds complicated and math-y) is "normalization". That just means that you set the top and bottom ratings to be however good your favorite and least-favorite candidates are, and then spread the rest of the ratings evenly between that.

Here's an example of a "normalizing" voter for you to play with:

{% include sim.html
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPHzu6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ4T28lkxs5nSGGcJqVIQqs4UZXfXeb0l2sxF_WckO3qahUD-bWhRCL2sIQxxcBhDN9EIYYaRopB7JAV1SDFf8sq7WZluFmh1N8iVyCmtnguIwcZxIAKkK6FTAWxob1ZDYZezEZmyUz9TM4A0GRGZDTFQJBURA2RsWRz703Mpo-8FeAq4CrgKuAqxjVZr7H8sIAArAWurcmxRLYyO7GfY3fr7jlfNkY8uXfmfpevqRm-WTEaCOahJyt6WAmQu4haAJBaMcIK21VRa_2tCtuSADAsmIHAsNRuxQUKKAQKBI1XKFDcVSjQggjzU8xPL79IUWxXPVJYagkAwgYxDWIaCBsIG_Q08DXIai7rzj7GAGHPT7vdcn78OMz2px_Wy3G2X316Xd7v59P6uD2ct8vef_vbfjO_bPfzJnz9AEHATI9MAwAA)"
title = "Normalizing Voter"
caption = "Best is 5. Worst is 0."
id = "ballot5"
comment = "Description: this should be like ncase's 'drag the voter' examples, with a normalizing score voter. This voter should have a series of circles, where the closest one intersects the closest candidate and the farthest one the farthest candidate. Thus, as you moved the voter or candidates the circles would change size."
%}

As soon as voters are using strategy in score voting — even a very slight amount of strategy, such as normalization — it is no longer fully exempt from impossibility theorems like Arrow's theorem. In particular, it no longer obeys independence of irrelevant alternatives (IIA); adding or removing a losing candidate can change how voters normalize, and thus change who wins. For instance, in the simulation below, try moving the losing {{ B }}, and see what happens.

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSXW7EIAyE78IzqrDBxslVoj3Jqj37Gj5ltVJb5WH8g4cZk2dp5bwu0VbF2qNeGu-oET1qkX3G3nkvZ6tllLP8iJRabOeep7I5E45Wf33Zimz93Tn-7Ujb5LI0iFT36scqK2WkyAAQIg6kEhmJeW1POHZVky-LmnySoAA0OshsDyg0OsmCLFk0N9C2YFnLgKkjqHcymLot1VU46IzC17EsVbM1Nt0K5A70DpLw6isYe258Ug7f14zJgyBxHLtoLM4E0H25dQB5ZgBGbdJjXYZRbwAmHZPOuty2hSXOoXAUOKueKJjMThRMFjR5scmLzfvfmTTj3k3tdaw6lqIBWArEBGICSwFhoCfgC2TFkvVl-bctYd8vXQbN5fwCAAA)"
title = "Non-optimal"
caption = ""
id = "election7"
comment = "This should be a score voting scenario with 100% normalizing voters. the voter median around (0,0), and candidates A (3,0), B (-2,0), D (-4,0). Pentagon voters are not enthusiastic enough about B so A wins, even though B is higher utility. Removing D fixes the problem. "
%}

But a bigger problem than IIA violation, which in the real world is relatively hard to engineer or take advantage of, is the issue of differential voting power. In the following election, one of the groups of voters normalizes, and the other one doesn't. The two groups are the same size, but the normalizing group gets a candidate they like a lot better.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSUW4DIQxE7-Jvq8JgDJurbPKb3x6gas9ew1Oatmq10g62YTxjeJMil_O0UtR6uelZv1b515qrm4r9vScrTS5FxeUiH2ai0nccuT-LI0FGybQfouXnl_WZ9fI7vyvHvxUru4MtSWYaoXGsdCXdlpKrvN7vV8m-5qSRZQGkLvPE7F8Tspmp1CTOZDWiCuCvOlHStARo6iCaRMcma2Urr2s0MDWUtUYEU-tLvua3NgZH4Wt4t83h0C3jbs9lfS6T9qzs9X3ev1N77HY-uCakOoY7k-wG1C2iNwCZvQMY7oPa3H06hqMAmA3MBmOLvnW2FBJQBAri2DBQMDg7UDAY1ODmBjc3Hi9qUJyPGWlTX3kszQJgaSJmImZiaUI40TPhm8iaS9ZLz-e3hL1_AuiA1g8cAwAA)"
title = "Strategists win"
caption = ""
id = "election8"
comment = "groups of voters at (-4,0)non-normalizing and (4,0)normalizing. Cands at (-2.5,.5), (-2,0), (0,0), (2,0), (2.5,.5). (2,0) wins."
%}

Is that kind of thing realistic? Perhaps not in the form above; few voters would be so unstrategic as not to normalize. But actually, normalizing as above is a pretty weak strategy. To strategize even more strongly, voters could somehow assess which two candidates were the frontrunners, and use them as the endpoints for normalization. Mostly, this means casting an approval-like ballot that gives every candidate either a 5 or a 0. For instance, in the election below, the voter believes {{ A }}, {{ B }}, and {{ C }} are the frontrunners. Compare the strongly strategic voter below with the normalized voter in the second example above.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPHzu6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ6T2M5kxvFnSGGcJqVIQqs4UZXfXeb0F2sxF_WYkO3qahUD-bWhRCL2YwljioHDGL6JQgw1jBSDWJEl1SDFf8sy7WZmuJmh1N8iVyCmtngsIwYZxIAKkK6FTAWxob1ZDYaezEZmwUy9JmcAaDLjZDTFQBBUnBpOxpLNvTcxmz7yVoCrZKTAVcBVjGuyXmN5saAKrAWurcmxRLY0O7HXsbt195wvGyOe3Dtzv8vX1AzfrPgaCOahByt6WAkAqbUAILXiCytsV0Wu9bcqbEsCwLDgDwSGpXYrLlBAIVAgaLxCgeKuQoEWnPB_iv_TyxQpku2qRwpLLQGoMzWIaRDTQNhA2KCnga9BVnNZdzYYA4Q9P-12y_nx4zDbTD-sl-NsU316Xd7v59P6uD2ct8vep_1tv5lftvt5E75-APMG_FdMAwAA)"
title = "Strong Strategic Voter"
caption = "Almost like strategic approval."
id = "ballot8"
comment = "Single-voter example with 3 candidates and a voter who normalizes based on only the 2 of them."
%}

Just as normalized voters can have more voting power than naive voters, strongly strategic voters can have more than normalized voters (as long as they are not too far off in guessing the frontrunners). This is a potential weakness of score voting.

Even stronger strategic voters could only choose the best of the frontrunners.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPHzu6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ6T2M5kxvFnSGGcJqVIQqs4UZXfXeb0F2sxF_WYkO3qahUD-bWhRCL2YwljioHDGL6JQgw1jBSDWJEl1SDFf8sy7WZmuJmh1N8iVyCmtngsIwYZxIAKkK6FTAWxob1ZDYaezEZmwUy9JmcAaDLjZDTFQBBUnBpOxpLNvTcxmz7yVoCr5F5YwFXAVYxrsl5jebGAAKwFrq3JsUS2NDux17G7dfecLxsjntw7c7_L19QM36z4GgjmoQcrelgJkLuIWgCQWvGFFbarItf6WxW2JQFgWPAHAsNSuxUXKKAQKBA0XqFAcVehQAtO-D_F_-llihTJdtUjhaWWANQVNohpENNA2EDYoKeBr0FWc1l3NhgDhD0_7XbL-fHjMNtMP6yX42xTfXpd3u_n0_q4PZy3y96n_W2_mV-2-3kTvn4AokZDqUwDAAA)"
title = "Best Frontrunner"
caption = "And everybody you like better."
id = "ballot11"
%}

A more risk-averse, safe strategic voter could avoid the worst frontrunner by voting for everyone better.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPHzu6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ4T28lkxs5nSGGcJqVIQqs4UZXfXeb0l2sxF_WckO3qahUD-bWhRCL2sIQxxcBhDN9EIYYaRopB7JAV1SDFf8sq7WZluFmh1N8iVyCmtnguIwcZxIAKkK6FTAWxob1ZDYZezEZmyUz9TM4A0GRGZDTFQJBURA2RsWRz703Mpo-8FeAquTMXcBVwFeOarNdYflhAANYC19bkWCJbmZ3Yz7G7dfecLxsjntw7c7_L19QM36wYDQTz0JMVPawEyF1ELQBIrRhhhe2qqLX-VoVtSQAYFsxAYFhqt-ICBRQCBYLGKxQo7ioUaEGE-Snmp5dfpCi2qx4pLLUEoN72BjENYhoIGwgb9DTwNchqLuvOPsYAYc9Pu91yfvw4zPanH9bLcbZffXpd3u_n0_q4PZy3y95_-9t-M79s9_MmfP0A1o3sPUwDAAA)"
title = "Not the Worst Frontrunner"
caption = "Just everybody you like better."
id = "ballot12"
%}

These two strategies are really just different extremes of the strong strategic voter.

Is approval voting immune to this kind of voting strategy? No; in fact, in the early seventies, mathematicians Gibbard and Satterthwaite both independently proved the theorem which bears their names, showing that no non-dictatorial voting method with more than 2 options is entirely immune to strategy. Unlike Arrow's theorem, which Nicky discussed, this one goes for any kind of voting method — ranked, rated, or whatever. So yes, approval voting is more resistant to strategy than score; but not immune.

Note: in FPTP, you would have to strategically vote for somebody other than their favorite, and approval voting allows you to support both your favorite and your strategic pick.

One scenario where approval becomes a factor is called the "chicken dilemma". Imagine 3 groups of voters, with 25%, 30%, and 45% of the vote respectively. Say that the first two groups both prefer each other over the third, so that either of them could beat that third opponent by 55% to 45%. Whichever of the first two groups strategically gives fewer approvals to its rival will win... unless neither of them gives enough, in which case the opponent will win. This is called a "chicken dilemma" because it's like a game of chicken between the voters for the two similar rivals: they can "swerve" and let their second-favorite win, or they can "drive straight" and either win (if the other side swerves) or crash (if the other side doesn't).

Here's that scenario in sandbox form. The slider on the right controls the percent of the smallest group that is strongly strategic between {{ A }} and {{ B }}; all the rest of the voters use normalized strategy (that is, approve any candidate better than the average of their favorite and least-favorite).

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSS24EMQhE7-I1iszXeK4yM9tsc4AoOXswpZE6iqJeVGNw8aD7c8xxu99ZmNj2k-7MSbzmedtG7Pv5pMFdw0FV1zX1ltY1XjV-anTcJg0bt_HNc9DwjqNuVnKVlLEIbaF5fSqZlZz056nM_jdTLY49HzJmiqDY51hwrAfjMT7e3x-jWLiwuARMHJCCYiut_lpSzYSGlHEdCvcNEQiGE9iI9wWBjSxEiQguOpucSc5m4KXwUu16hZf6GaAK-RQGLsNR98XD5msVJ-BrIBcH02tg7WPXFhbd1ha-FqBt96Fjp84QaRhXCHDdIRjdF3L5e9uOHcSEYPrAlwlsMrwn0CIKeAVQYrcsoCzcXUBZisiQw8dcrz9sIZmvpZGSnXPMlhMCwwRMAiaxp_TukuBJ-CWw8mC9ef2RB-zrB8ZdeYg2AwAA)"
title = "Playing Chicken"
caption = ""
id = "election10"
comment = "Clumps of voters at (x,y,size): (-2,1,6); (-2,-1,4)slider; (3,0,10)."
%}

The "chicken dilemma" is a genuinely tough situation for almost any voting method. The motivations for the two rival factions to vote strategically are hard to minimize safely. Voting methods that go too far out of their way to punish strategic voters in this scenario tend to get the wrong answer in other, more-common scenarios like center squeeze. Look at how these various methods deal with both of these situations:

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTWsbMRT8K0Xnl6KnjyfJt6QQ6C24Sy6OD27inExljEkppf3tHWlo2VLKwo6eNJo383a_O-82u50GFU1tLzvVKlr8WLUkmtt-L04nR03AmxysapqcDE4enOg2XlxyG_dTvROXZ224icMCcMGwHbKTFsSvHxAqCF7-eXDS_nuCNqOFDneq2DQTa2JFrErxUnSQAklxGHty_fX1ycGGwqgC6FKNAJuagHATAWgd4BhtsBl03giBwLiBMgg1LgTKhMKqsqJK9DOHShizolakVoyTH6kV84gD4nAfjZepGNtKI_nfgxmFrouwUkhxXaSpk9Ytks22qfD70XRqczNzwlkJYZrJkUC7ORMYPRee1b-nnTkD8wSmN34Z4yQtzwQRjoxaRivWJhRaKbxbaKVEVolntFLGP-fuH5YHdP64fcT7rl9eDsDb8_nS3w4nLD8998sR-KF_eemX5-N17C23W0C8CTcKXPr53fK1Y7W9e-zXoxs_cmGPuvoShcOqnkCHlekq01UOvuZpuzJgpVZlzjpyvs_44Zn08-F06tfl2_mIWf4x_uMXJYo73bEDAAA)"
title = "Playing Chicken with Different Methods"
caption = ""
id = "election11"
%}

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSwWpCMRD8lZJzLNkku4netFDoTax4eXqQqqfSyEPaQ2m_vbsZBKHIg7ez2c1kZpNvF9xsGCizJ-adH6hmRclQEEVlt_OOeg8HzYPlyc2Cd9nN3G923nFPRZu0VjQE_-_TSr1bmd6tUOjcRL1DxEvxUq0QUUgmYuva6bR1KoUyliGJBEE1UdaoCpKGaV-NSq2LUalJQ0SAtZiRcd8QQRMLsopMWaKOInRl5KPNBVwJ2lJCB7iScg2kjWSNghIY0_SGI3dCA3QF8QqUcEgGct-Xbymz9GNywd1AZJ72RcYUmRBiP5whjyGPGQFWuaCGgTGsSkCASYFJwcCEuwUTJ6AQKBAMu0BBwd4CBSUhw50VKCj2jtzzcr3U61y388P6qylaLTbtclTwstrof9HGw17jU_s4tPHteFE8P5_H9rl_V_j61kZrTpM4IcvX85Wzx1lwRr0O3CefbR1zqgEBc6pwWOGwQmXlLr3CZAVfhddqXh9Z37O5_fkD-BG5DlwDAAA)"
title = "Center Squeeze"
caption = ""
id = "election12"
comment = "two different sandboxes. One repeats chicken dilemma case from above but also lets you switch voting methods (plurality, IRV, approval, score). The other one has center squeeze."
%}

So, now I've explained why strategic voting makes things tricky, I can explain my two favorite voting methods: star voting and 3-2-1 voting. 

## Star voting

"Star" stands for "score then automatic runoff." In this method, voters use the same ballot as score voting. Between the two candidates with the highest scores, the winner is the one that comes higher on more ballots. 

Here's a one-voter star election. Try the N = Normalized and F = Frontrunner strategies. These are almost the same as in score voting, except that the ratings may be changed a little to avoid giving the same score to two frontrunners. That is an important change that can matter in the runoff. Here's a one-voter election:

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy04DMQz8l5wjFDtO4t0zf1Buqx6gXUSlqlu1RQgh-HbsjApCqNrDxI-dzDj-CCmM01SHSFrWcaJS7cR24sI_J4kstF7HQN5MSSPl5HEOY4pBwhi-iEMMJYwUQ7UuKzaDFP99VtGbleFmhVK_i1xCNZHZc4wcZJAACqB2LWQqSAztToehFzn1iKn3MANAw4LIaLJBRbIhUkTGwubeZ8emj3wU4MqMErgyuLJxTRT7560VPeDM8EyRo3sSJ_UucafuXPh6MNKp90j_U_7SChxLw6NAqgw9WTC9QgCILBkAkQWPV2C4NNS031RguCYArFZMv8JqLd2Gy6ugqFBQMfIGBQ3_NihoGRFeruHl2nV_Gor6O58onoclTQDqTAoxCjEKQgWhQo-CTyFLXdZdsZWDsKfH_X65PLwfZ9vm1WY5zbbP55fl7X4-b06742W3HHzPXw_b-Xl3mLfh8xuKlzI8PQMAAA)"
title = "Star Strong"
caption = "Keeps a space for the best."
id = "ballot9"
comment = "one-voter star election"
%}

In STAR voting, the runoff resolves the chicken dilemma example we've been using.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQU4DMQxF75K1hWI7dpJeA3ZtF4DaVaUixAahcnYcf1UahNAs_jh2fp6dfJVadvs9CxO3eaQ98yDudf3NRmzzeKTCWcNOUZc18Tda1ljU2KrRsqtUWtmVb5ZCxTL22BnJHhLGIjSF6vaL5IhkpT9fZOa_Ga5pz4uMmdzJ51oWLOvCOJTr-XwowcKBxSFgYocEFLfQOF9D4jChImEci8K5QwSC5gQ2YrlBYCMd0UAEF61JziRrMvBSeKlmvcJLbTUQhbwKHZvhqHPj0ep9FCvgbSAbh6bboKVP2x7RPI9tHbcF6DZz0TBTY4gkjCkEuGYQtG4dufF72oYZeIWge8fNOCbplh1oEDm8HCg-UzpQOvZ2oHRF1JDDZfb7C-tIjvvQSKmtdfQ2KgSGAzADMANzGpanDPAM-A1gjYX1YPEiAfbyfLlcP54-307R-uPr9f1Ubj-GvhvISwMAAA)"
title = "Chicken Star"
caption = ""
id = "election13"
comment = "chicken dilemma with star"
%}

## 3-2-1 voting

In 3-2-1 voting, voters rate each candidate "Good", "OK", or "Bad". To find the winner, you first narrow it down to three semifinalists, the candidates with the most "good" ratings. Then, narrow it further to two finalists, the candidates with the fewest "bad" ratings. Finally, the winner is the one preferred on more ballots. Here's a ballot to play with:

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy2oDMQz8F59NsWTZ1u65n5Dbsoe22ZJASEIelFLab6_kIS2lhD2M9djxjKyPkMI4TXWIpGWOE5VqJ7YTF_45SWSheY6BvJmSRsrJ4xzGFIOEMXxRDjGUMFIM1bqs2AxS_PdZRe9WhrsVSv0ucgnVRGbPMXKQQQIogNq1kKkgMbQ7HYZe5NQjpt7DDAANCyKjyQYVyYZIERkLm3ufHZs-8lGAKzNK4MrgysY1Ueyft1b0gDPDM0WO7kmc1LvEnbpz4dvBSKfeI_1P-UsrcCwNjwKpMvRkwfQKASCyZABEFjxegeHSUNN-U4HhmgCwWjH9Cqu1dBsur4KiQkHFyBsUNPzboKBlRHi5hpdrt_1pKOrvfKJ4HpY0AagzKcQoxCgIFYQKPQo-hSx1WQ_FVg7Cnp92u8Nl9X5cbJtXm9Oy2D6fN4e3x-X8ctoeL9vD3vf8ul8vr9v9sg6f3_tmOp49AwAA)"
title = "321 Strategic"
caption = "Extra rounds of approval."
id = "ballot10"
comment = "one-voter 3-2-1"
%}

And here's the chicken dilemma. Note that Frontrunner strategy doesn't change the result from Normalize strategy. Candidates wouldn't have to go negative against their nearby rivals in order to ensure that their voters would at least be moderately strategic and wouldn't just normalize.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQWoDMQxF7-K1KJZkyXbOkV2SRQsJXQRSSjelNGevrE9gSimz-CNL_n6S_VVq2R0OLEzc5okOzIO41_U3G7HN04kKZw07RV3WxN9oWWNRY6tGy65SaWVX7qyFimXssTOSPSSMRWgK1e0XyRHJSn--yMx_M1zTnhcZM7mTz7UsWNaFcSy3y-VYgoUDi0PAxA4JKG6hcb6GxGFCRcI4FoVzhwgEzQlsxHKDwEY6ooEILlqTnEnWZOCl8FLNeoWX2mogCnkVOjbDUefGo9XHKFbA20A2Dk23QUuftj2ieR7bOm4L0G3momGmxhBJGFMIcM0gaN06cuP3tA0z8ApB946bcUzSLTvQIHJ4OVB8pnSgdOztQOmKqCGHy-yPF9aRHI-hkVJb6-htVAgMB2AGYAbmNCxPGeAZ8BvAGgvryeJFAuzl-Xq9few_387R-v71_Xwu3z-WC-vnSwMAAA)"
title = "321 Chicken"
caption = ""
id = "election14"
comment = "chicken dilemma with 3-2-1"
%}

## Afterword

**From Paretoman**: To finish where Jameson left off, STAR voting and 3-2-1 voting encourage voters to put better information on their ballot. Both voting methods use additional rounds to help more accurately determine the best candidate. The additional rounds also give them some resistance to the chicken dilemma. 