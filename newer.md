---
layout: page-3
title: An Even Better Ballot
banner: To Build a<span class="notation">n Even</span> Better Ballot
description: An addendum to the Interactive Guide to Approval Voting
description-banner: An <span class="notation">addendum to the</span> Interactive Guide to Approval Voting
byline: by <span class="notation">Jameson Quinn &</span> nicky case, <span class="strike">dec 2016</span> <span class="notation">sep 2017</span>
twuser: bettercount_us
min-width: 460
---

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
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQWoDMQz8i8-mrGRL1u65P2hvSw5tsqWBkC1JSimlfXslD4FCCT6MLMnjGdlfaUjTPOuYyWSTZxL1iD1i4R5tcqJoaS0TldiWNA051TSlH6KUk6SJclJv8mJzGPK_5RW7WRlvVmjod1EoUFdWIsfIQQZVgAC0ayFXQdXR7ywOYy-yk3mSqfcwA0DDFTvQsAJaP86GnbOwu4-BUeYYBJgKBBUwFTAV6W2-olFxFHwFfsFRO10E4TE8V74GTjiH41r7ufqXssJpbXgMSKxjTwqmJgTgfrkUAOQJHk1gVBpqGJfAqA4AmFSYVJhU6RZCnIJCoUAx6gYFDWcbFLSCHV6sYdTt-m8ainadTS65Rh6WbADAkkGMQYyB0EBo0GPgM8iykHUn_tUg7PnpcFgvj59vi__ih-16Wvwfn1_Xj_vlvD3t3y779Rj_-_24W172x2WXvn8BH9PCECoDAAA)"

%}

But notice something about that ballot? For many positions of the voter and candidate, the ballot doesn't include a score of 5 or a score of 0. If you actually voted like that, you'd be giving up on some of your voting power. Say Triangle is your favorite, and you give them a score of 3, which also happens to be their average score. If Square wins with a score of 3.2, you're going to feel very silly for not giving a triangle a 5, in order to pull their average up as high as you can.

## Lightly-strategic voting: "normalization"

As I suggested above, in the real world, in score voting and similar methods, most voters will want to make sure that their ballot contains at least one candidate each at the top rating and at the bottom rating. The simplest way to do that (even though the name sounds complicated and math-y) is "normalization". That just means that you set the top and bottom ratings to be however good your favorite and least-favorite candidates are, and then spread the rest of the ratings evenly between that.

Here's an example of a "normalizing" voter for you to play with:

{% include sim.html
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQWoDMQz8i8-mrGRL1u65P2hvSw5tsqWBkC1JSimlfXslD4FCCT6MLMnjGdlfaUjTPOuYyWSTZxL1iD1i4R5tcqJoaS0TldiWNA051TSlH6KUk6SJclJv8mJzGPK_5RW7WRlvVmjod1EoUFdWIsfIQQZVgAC0ayFXQdXR7ywOYy-yk3mSqfcwA0DDFTvQsAJaP86GnbOwu4-BUeYYBJgKmAqYCpiK9DZf0ag4Cr4Cv-ConS6C8BieK18DJ5zDca39XP1LWeG0NjwGJNaxJwVTEwJwv1wKAPIEjyYwKg01jEtgVAcATCqmrjCp0i2EOAWFQoFi1A0KGs42KGgFO7xYw6jb9d80FO06m1xyjTws2QAAoUGMQYyB0EBo0GPgM8iykHUn_tUg7PnpcFgvj59vi__ih-16Wvwfn1_Xj_vlvD3t3y779Rj_-_24W172x2WXvn8BRLz1zCoDAAA)"
title = "Normalizing Voter"
caption = "Best is 5. Worst is 0."
id = "ballot5"
comment = "Description: this should be like ncase's 'drag the voter' examples, with a normalizing score voter. This voter should have a series of circles, where the closest one intersects the closest candidate and the farthest one the farthest candidate. Thus, as you moved the voter or candidates the circles would change size."
%}

As soon as voters are using strategy in score voting — even a very slight amount of strategy, such as normalization — it is no longer fully exempt from impossibility theorems like Arrow's theorem. In particular, it no longer obeys independence of irrelevant alternatives (IIA); adding or removing a losing candidate can change how voters normalize, and thus change who wins. For instance, in the simulation below, try moving the losing yellow triangle candidate, and see what happens.

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQW7EIAxF78IaVdhg7OQq0Zxk1J59DE8ZjdRWWXxjw-fZ5FlaOa9LtFWx9qiXxjtqRI9aZO-x97qXs9Uyyll-REotttczd2XRU45Wf31Ziiz9XTn-rUjb5rIYRFZCSQAhAwFBJpIMMlLzwp5y7KymUyY1nSRFEWx0sMJGsVHfxzVYpYtm722jLpKOUweod1Y4dVu8Vdg4OYpfp1mpmqWx7VYgd6B3kIZXX8HY58an5Zj7muE8BYjj2EljZCaI7sutI-CZITRqTo1xGY3OhtDkpMnJuKbtFhbcxGJCMBm1Q-CcdQicATkv5oza77_GKcY9m9rrWHlaiobQUgATwAQtBYYBT-AXYMXC-rL8zxbY9wsTcUex9gIAAA)"
title = "Non-optimal"
caption = ""
id = "election7"
comment = "This should be a score voting scenario with 100% normalizing voters. the voter median around (0,0), and candidates square (3,0), triangle (-2,0), pentagon (-4,0). Pentagon voters are not enthusiastic enough about triangle so square wins, even though triangle is higher utility. Removing penta fixes the problem. "
%}

But a bigger problem than IIA violation, which in the real world is relatively hard to engineer or take advantage of, is the issue of differential voting power. In the following election, one of the groups of voters normalizes, and the other one doesn't. The two groups are the same size, but the normalizing group gets a candidate they like a lot better.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQW7EIAxF7-I1qrAx4MxVMrOdbQ9QtWev4Wk6bdUqUj7Y8P3s5E2qXM5Tay3a662c9rXKd7Fc3Yro32cy0-RSi7hc5ENVivS9H3k-kzNFZs2wH1Lqzyfzkfn6O74zx78ZrbuCLiTVFTACbTFc5fV-v0pWVCcMkA4kidRTs7KlZBktYmmZQVN2htCZOTtsDBtLm5YS7I5t1upmtjUUnBpkrbHDqfUFXvJZBwdX8Wt0rdvDsVstuz6X9lym7Wmc9X3fv1v72OV88oFAdRruzLArYhuiNwTM3hEa7pNc7DqdhkdFaHbQ7GBso2_OliADiwHBOLZMCCZ3JwSTQU2-3GTk8_EvTZLxmFFpxVeclqIitBTABDBBS4FhwBP4BVixsF56_ngL7P0T2lZ4lBYDAAA)"
title = "Strategists win"
caption = ""
id = "election8"
comment = "groups of voters at (-4,0)non-normalizing and (4,0)normalizing. Cands at (-2.5,.5), (-2,0), (0,0), (2,0), (2.5,.5). (2,0) wins."
%}

Is that kind of thing realistic? Perhaps not in the form above; few voters would be so unstrategic as not to normalize. But actually, normalizing as above is a pretty weak strategy. To strategize even more strongly, voters could somehow assess which two candidates were the frontrunners, and use them as the endpoints for normalization. Mostly, this means casting an approval-like ballot that gives every candidate either a 5 or a 0. For instance, in the election below, the voter believes triangle and square are the frontrunners. Compare the strongly strategic voter below with the normalized voter in the second example above.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSwUoDQQz9lzkPsslMMrN79g_0tvSg7YqF0pW2IiL67SZ5FAQpe3iZJPP2vUy-0pCmedYxU5dNnknUIraIhSPa5ETe0lomKn4saRpyqmlKP0QpJ0kT5aTWZMVmMOR_n1X6zcp4s0JD_ItcgZqy4jlGDjKoAgSgoYVMBVVD-2cxGKPIRmZJpuhhBoCGK06gYQW0uM4dJ2Nhc-8Do1BXwFQYBTAVMBWJNvu8UdEBvgK_lG3MqQadB-7RWStfAyOc3XGtca_-paxwWhseAxLrGEnB1IQAkCcFAHmCRxMYlYYaxiUwqgMAJhVTV5hUCQsuTkGhUKAYdYOChrsNClrBCS_WMOp23ZuGYr_OJpdcPQ9LfQBQMHWI6RDTQdhB2KGng69DVndZd2KrBmHPT4fDenn8fFtsix-262mxPT6_rh_3y3l72r9d9uvR9_v9uFte9sdll75_AdYxydQqAwAA)"
title = "Strong Strategic Voter"
caption = "Almost like strategic approval."
id = "ballot8"
comment = "Single-voter example with 3 candidates and a voter who normalizes based on only the 2 of them."
%}

Just as normalized voters can have more voting power than naive voters, strongly strategic voters can have more than normalized voters (as long as they are not too far off in guessing the frontrunners). This is a potential weakness of score voting.

Even stronger strategic voters could only choose the best of the frontrunners.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQWoDMQz8i8-mrGRL9u65P2hvSw5tsqWBkC1JSimlfXslDYFCCT6MLMnjGdlfaUjTPOuYqcsmzyRqEVvEwhFtciJvaS0TFd-WNA051TSlH6KUk6SJclJrsmIzGPK_ZZV-szLerNAQd5ErUFNWPMfIQQZVgAA0tJCpoGpodxaDMYpsZJZkih5mAGi4YgcaVkCL49yxMxY29z4wCnUFTIWjrYCpgKlItNnyRsVR8BX4pWxjTjXoPHCPzlr5Ghjh7I5rjXP1L2WF09rwGJBYx0gKpiYE4LhcCgDyBI8mMCoNNYxLYFQHAEwqpq4wqRIWXJyCQqFAMeoGBQ1nGxS0gh1erGHU7fpvGor9OptccvU8LPUBQKGwQ0yHmA7CDsIOPR18HbK6y7oT-2oQ9vx0OKyXx8-3xX7xw3Y9LfaPz6_rx_1y3p72b5f9evT__X7cLS_747JL37-NXv4IKgMAAA)"
title = "Best Frontrunner"
caption = "And everybody you like better."
id = "ballot11"
%}

A more risk-averse, safe strategic voter could avoid the worst frontrunner by voting for everyone better.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQWoDMQz8i8-mrGRL9u65P2hvSw5tsqWBkC1JSimlfXslDYFCCT6MLMnjGdlfaUjTPOuYqcsmzyRqEVvEwhFtciJvaS0TFd-WNA051TSlH6KUk6SJclJrsmIzGPK_ZZV-szLerNAQd5ErUFNWPMfIQQZVgAA0tJCpoGpodxaDMYpsZJZkih5mAGi4YgcaVkCL49yxMxY29z4wCnUFTIWDt4CpgKlItNnyRsVR8BX4pWxjTjXoPHCPzlr5Ghjh7I5rjXP1L2WF09rwGJBYx0gKpiYE4LhcCgDyBI8mMCoNNYxLYFQHAEwqpq4wqRIWXJyCQqFAMeoGBQ1nGxS0gh1erGHU7fpvGor9OptccvU8LPUBQDHqDjEdYjoIOwg79HTwdcjqLutO7KtB2PPT4bBeHj_fFvvFD9v1tNg_Pr-uH_fLeXvav13269H_9_txt7zsj8suff8Cz1jpcSoDAAA)"
title = "Not the Worst Frontrunner"
caption = "Just everybody you like better."
id = "ballot12"
%}

These two strategies are really just different extremes of the strong strategic voter.

Is approval voting immune to this kind of voting strategy? No; in fact, in the early seventies, mathematicians Gibbard and Satterthwaite both independently proved the theorem which bears their names, showing that no non-dictatorial voting method with more than 2 options is entirely immune to strategy. Unlike Arrow's theorem, which Nicky discussed, this one goes for any kind of voting method — ranked, rated, or whatever. So yes, approval voting is more resistant to strategy than score; but not immune.

Note: in FPTP, you would have to strategically vote for somebody other than their favorite, and approval voting allows you to support both your favorite and your strategic pick.

One scenario where approval becomes a factor is called the "chicken dilemma". Imagine 3 groups of voters, with 25%, 30%, and 45% of the vote respectively. Say that the first two groups both prefer each other over the third, so that either of them could beat that third opponent by 55% to 45%. Whichever of the first two groups strategically gives fewer approvals to its rival will win... unless neither of them gives enough, in which case the opponent will win. This is called a "chicken dilemma" because it's like a game of chicken between the voters for the two similar rivals: they can "swerve" and let their second-favorite win, or they can "drive straight" and either win (if the other side swerves) or crash (if the other side doesn't).

Here's that scenario in sandbox form. The slider on the right controls the percent of the smallest group that is strongly strategic between triangle and square; all the rest of the voters use normalized strategy (that is, approve any candidate better than the average of their favorite and least-favorite).

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSS24EMQhE7-I1iszPxnOVmdlmmwNEydkDlEbqKIp6UY3BxTP255jjdr-zMLGdJ92Zg3jP-jtG7Of5pMFdw4uyrmvyL6xrPGu8anTcJg0bt_HNc9DwjlfuzOROSWMROkLz-mUyMjnpz5eZ828mW5Q9FxlzLQgWtAAe4-P9_TGSghOIU0DDC5I4bKnZWVOyjdCQtMxF4d4hAsGxBDYCG4GN7N4ugQguOpuZSWom8FJ4qXa9wku90LOw6HVhMxz1XDxsvoZQAV8DuTiYXgNrH7u2sNVtbeOeAG2nFx3TdIZIw7hCgOsOwdF9Ixe_p-2YwZoQnH7hZhYmubxPoEm04LWAsk7LBsrG3g2UrYgMOdzCfr2tjWS8hkZKVus4W0wIDAMwAZjAnMK7S4An4BfAisJ683yLBfb1Azz3QwAwAwAA)"
title = "Playing Chicken"
caption = ""
id = "election10"
comment = "Clumps of voters at (x,y,size): (-2,1,6); (-2,-1,4)slider; (3,0,10)."
%}

The "chicken dilemma" is a genuinely tough situation for almost any voting method. The motivations for the two rival factions to vote strategically are hard to minimize safely. Voting methods that go too far out of their way to punish strategic voters in this scenario tend to get the wrong answer in other, more-common scenarios like center squeeze. Look at how these various methods deal with both of these situations:

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy0pDMRD9Fck6lczkNemuFQR3pV66absofazElEvRhei3O8lBuCJy4Z7M68yZST6MM_PtlpgshbK3WyKxlF07lWAplv3eGuo5lKzm9Rw9Seg5UXNiy_Fm7qwJZm6-yBlrYreTVmowKygxsy1s3fTToGjQ2T-fRsq_EW3R6KkpI4KL4fJNws7Uy2VnVAepJFKAHkoAFURBUXt7BW3E1rCSqpOpVzADMBiDhkHDoOHcy1lggcW7rpost62Ay4PL-57vweVjE6-J1BITisHoy4QjuJ81NIOmBk8Ygp8aofOEaYuQetuQcVMQHUp3RuwzEoC7mOgBkBsjAKPHjJj83nbEDpIDYPqEm0nYZIp9Aq-KErgSpKTSIUNKRm2GlOxhBcQgJbfXZR5Xw0o7P603-l_W8XRQXFyvY307vOjx-VjHs-JDfT3V8Xi-Nd-wWCv4Gc9IcajXu-G96mm93NTb2bQnm9FDJjeRsSxxACgUTCeYTrB4iV22YEABl2BOaXPex89vRwqx3XwDAAA)"
title = "Playing Chicken with Different Methods"
caption = ""
id = "election11"
%}

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy2oDMQz8leKzUyxbsr17SwqF3kK65LLJIeRxKnVYQnso7bdX9jQQKCGQkSx5NCPvl3GmH0disSSytSNl1ijUyEWN0nZrDbUecZq7mgfTO2vY9OaHjTXS0qhNWksKzv77aSXfrXR3K-QaN1UFLffIQ529MeV02hhVQIxjKKEIUCnEijo4KHTt1CujHnplJAUPgCPPyEDjQeNTu-4zMmXxugHXJJP1dR3gCtAWAjrAFZRrJG2k2hhRAmPobjjY_Tnkq1X210AJx1ADbvf4lpJjG8MJTwKR3LVDwfKEAL4NF8gTyBMBwKok1LAwgdXoADAZYTJiYVGahSougiJCQcSyExQk3E1QkAIyvFmCglQ_H_O8HJb6nEM5PwyfRaPVYl0uRw1eVmv9X5TpsFN8Ku-HMu2PF43n5_NUPnZvGr7uy1Sbw8zPqObDfGXqN5kwI18XboPleo49ZQfAnjIcZjjMUJmlSc8wmcGX4TVXr4_y_QtIT4MDTAMAAA)"
title = "Center Squeeze"
caption = ""
id = "election12"
comment = "two different sandboxes. One repeats chicken dilemma case from above but also lets you switch voting methods (plurality, IRV, approval, score). The other one has center squeeze."
%}

So, now I've explained why strategic voting makes things tricky, I can explain my two favorite voting methods: star voting and 3-2-1 voting. 

## Star voting

"Star", or more precisely, "s+ar", stands for "score plus automatic runoff." In this method, voters use the same ballot as score voting. Between the two candidates with the highest scores, the winner is the one that comes higher on more ballots. Here's a one-voter star election. You can choose between three kinds of strategy: normalized, moderately strategic, and strongly strategic. The first and last kinds you've seen before. The third is almost like a strongly strategic voter, except that the ratings may be changed by one to avoid giving a frontrunner the same score as any other candidate. Here's a one-voter election:

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSwUoDQQz9lzkPsskkmdk9-wd6W3rQdsVC6UpbERH9djN5FAQpe3iZJPP2vUy-0pCmebYxU9NNnknNI_aIlSPa5ES9hQevSJxLmoacJE3phzjlpGminMy7vFgdhvzv80q7WRlvVmiIf1GXYC6g9BwjBxkkAAVYaCFXQeLo_ywOYxTZyTzJFD3MANCw4AQaNkCN69xwchZ2931iFOoKmAqjAKYCpqLR5l9vNHSAr8AvZZ9zkqDrQffYWYWvgRPO3bFI3JO_lAKnUvEYkChjJBVTUwJAnhYA5CkeTWFUK2oYl8KoDQCYNEzdYNI0LHRxBgqDAsOoKxRU3K1QUAtOeLGKUdfr3lQU23U2uWTpeVhqA4CCqUFMg5gGwgbCBj0NfA2yWpd1p75qEPb8dDisl8fPt8W3-GG7nhbf4_Pr-nG_nLen_dtlvx77fr8fd8vL_rjs0vcv6HnVzysDAAA)"
title = "Star Strong"
caption = "Keeps a space for the best."
id = "ballot9"
comment = "one-voter star election"
%}

And here's the chicken dilemma you saw above:

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQU4DMQxF75K1hWI7TpxeA3ZtF4DaVaUixAahcnYcf1UahNAs_jh2fp6dfJVadvs9CxO3eaQ9sxOPuv5mI7Z5PFLhrOFOUZc18ectayxqbNVo2VUqrezKN0uhYhn32BnJERLGIjSF6vaLpEey0p8vMvPfDNe050XGvBYEC7oADuV6Ph9KUHAAcQhouEMCh1tonKwhcYxQkbCMReHcIQJBWwIbgY3ARkZuF0cEF63JzCRrJvBSeKlmvcJLbaFH4aLXjs1w1LnxaPU-hBXwNpCNQ9Nt0NKnbY9oPY9tA_cE6DZz0TBNY4gkjCkEuGYQtG4DOf89bcMMeoWg-46b6Zhkt-xAg6jDqwOlz5QBlIG9AyhDETXkcAvj_rYGkn4fGim1tY7evEJg6IBxwDjm5JanOHgcfg4sX1gPFm8RYC_Pl8v14-nz7RStP75e30_l9gMrdmg0RQMAAA)"
title = "Chicken Star"
caption = ""
id = "election13"
comment = "chicken dilemma with star"
%}

## 3-2-1 voting

In 3-2-1 voting, voters rate each candidate "Good", "OK", or "Bad". To find the winner, you first narrow it down to three semifinalists, the candidates with the most "good" ratings. Then, narrow it further to two finalists, the candidates with the fewest "bad" ratings. Finally, the winner is the one preferred on more ballots. Here's a ballot to play with:

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy2oDMQz8F59NWcmS7N1zPyG3JYe22ZJASEIelFLab6-sIVAoYQ8jS_LsjKyvNKRpnm3M1HSdZ1LziD1i5YjWOVFv4cErEueSpiEnSVP6oZJy0jRRTuZdXqwOQ_73eaU9rIwPKzTEv6hLMBdQeo6RgwwSgAIstJCrIHH0fxaHMYrsZJ5kih5mAGhYcAING6DGdW44OQu7-z4xCnUFTIVRAFMBU9Fo8683GjrAV-CXss85SdD1oHvsrML3wAnn7lgk7slfSoFTqXgMSJQxkoqpKQEgTwsA8hSPpjCqFTWMS2HUBgBMGqZuMGkaFro4A4VBgWHUFQoq7lYoqAUnvFjFqOt9byqK7T6bXLL0PCy1AUDB1CCmQUwDYQNhg54GvgZZrct6Ul81CHt92e-P19XnafEtXm3Py-J7fNkeP56Xy9t5d7rujoe-37fDZnnfHZZN-v4Ftz7ZVisDAAA)"
title = "321 Strategic"
caption = "Approval with an extra level."
id = "ballot10"
comment = "one-voter 3-2-1"
%}

And here's the chicken dilemma. Note "moderately strategic" doesn't change the result from "normalized". So unlike in star voting, candidates wouldn't have to go negative against their nearby rivals in order to ensure that their voters would at least be moderately strategic and wouldn't just normalize.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQWoDMQxF7-K1KJZk2XLOkV2SRQsJXQRSSjelNGevrE9gSimz-CNL_n6S_VVq2R0OLEzc5okOzE486vqbjdjm6USFs4Y7RV3WxJ-3rLGosVWjZVeptLIrd9ZCxTLusTOSIySMRWgK1e0XSY9kpT9fZOa_Ga5pz4uMeS0IFnQBHMvtcjmWoOAA4hDQcIcEDrfQOFlD4hihImEZi8K5QwSCtgQ2AhuBjYzcLo4ILlqTmUnWTOCl8FLNeoWX2kKPwkWvHZvhqHPj0epjCCvgbSAbh6bboKVP2x7Reh7bBu4J0G3momGaxhBJGFMIcM0gaN0Gcv572oYZ9ApB9x030zHJbtmBBlGHVwdKnykDKAN7B1CGImrI4RbG420NJP0xNFJqax29eYXA0AHjgHHMyS1PcfA4_BxYvrCeLN4iwF6er9fbx_7z7Ryt71_fz-fy_QOkh_1jRQMAAA)"
title = "321 Chicken"
caption = ""
id = "election14"
comment = "chicken dilemma with 3-2-1"
%}

Putting it all together, here's a sandbox for you to try out all the different systems and to make your own scenarios: