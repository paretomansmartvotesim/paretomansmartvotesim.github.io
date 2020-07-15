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
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPH8e6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ4T28lkxvFnSGGcpkaRhFZxoiq_u8zpL6cxl-Y5IdvV1SoG8mtDiUTsYQljioHDGL6JQgw1jBSD2CErNoMU_y2r6M3KcLNCqb9FrkBMbfFcRg4yiAEVIF0LmQpiQ3uzGgy9mI3Mkpn6mZwBoMmMCDRZAEZTDBSRsWRz703Mpo-8FeAqkFTAVcBVjGuyXmP5YQEBWAtcW5NjiWxldmI_x-7W3XO-bIx4cu_M_S5fUzN8c8PXQDAPPVnRw0qA3EXUAoDUii-ssF0batrfqrAtCQDDAsMCw1K7FRcooBAoEDS-QUHD3QYFrSDC_zU0vl2mqKGoVz1qsKQJAEsKMQoxCkIFoUKPgk8hS13WnQ3GAGHPT7vdcn78OMw20w_r5TjbVJ9el_f7-bQ-bg_n7bL3aX_bb-aX7X7ehK8fte0tn0wDAAA)"

%}

But notice something about that ballot? For many positions of the voter and candidate, the ballot doesn't include a score of 5 or a score of 0. If you actually voted like that, you'd be giving up on some of your voting power. Say Triangle is your favorite, and you give them a score of 3, which also happens to be their average score. If Square wins with a score of 3.2, you're going to feel very silly for not giving a triangle a 5, in order to pull their average up as high as you can.

## Lightly-strategic voting: "normalization"

As I suggested above, in the real world, in score voting and similar methods, most voters will want to make sure that their ballot contains at least one candidate each at the top rating and at the bottom rating. The simplest way to do that (even though the name sounds complicated and math-y) is "normalization". That just means that you set the top and bottom ratings to be however good your favorite and least-favorite candidates are, and then spread the rest of the ratings evenly between that.

Here's an example of a "normalizing" voter for you to play with:

{% include sim.html
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPH8e6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ4T28lkxvFnSGGcpkaRhFZxoiq_u8zpL6cxl-Y5IdvV1SoG8mtDiUTsYQljioHDGL6JQgw1jBSD2CErNoMU_y2r6M3KcLNCqb9FrkBMbfFcRg4yiAEVIF0LmQpiQ3uzGgy9mI3Mkpn6mZwBoMmMCDRZAEZTDBSRsWRz703Mpo-8FeAq4CrgKuAqxjVZr7H8sIAArAWurcmxRLYyO7GfY3fr7jlfNkY8uXfmfpevqRm-ueFrIJiHnqzoYSVA7iJqAUBqxRdW2K4NNe1vVdiWBIBhwR8IDEvtVlyggEKgQND4BgUNdxsUtIII_9fQ-HaZooaiXvWowZImAAgVYhRiFIQKQoUeBZ9ClrqsOxuMAcKen3a75fz4cZhtph_Wy3G2qT69Lu_382l93B7O22Xv0_6238wv2_28CV8_5K2SYUwDAAA)"
title = "Normalizing Voter"
caption = "Best is 5. Worst is 0."
id = "ballot5"
comment = "Description: this should be like ncase's 'drag the voter' examples, with a normalizing score voter. This voter should have a series of circles, where the closest one intersects the closest candidate and the farthest one the farthest candidate. Thus, as you moved the voter or candidates the circles would change size."
%}

As soon as voters are using strategy in score voting — even a very slight amount of strategy, such as normalization — it is no longer fully exempt from impossibility theorems like Arrow's theorem. In particular, it no longer obeys independence of irrelevant alternatives (IIA); adding or removing a losing candidate can change how voters normalize, and thus change who wins. For instance, in the simulation below, try moving the losing yellow triangle candidate, and see what happens.

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQW7EIAxF78IaVdhg4-Qq0Zxk1J59DE8ZjdRWWXxjw-fZ5FlaOa9LtFWx9qiXxjtqRI9aZO-x97qXs9Uyyll-REottteeu7I4U45Wf31Ziiz9XTn-rUjb5rIYRKp79WOllTQoMhBAxJEkkZGa1_aUY2c1_TKp6ScpimCjgxU2io3OfVyDVbpoTqBtYFnDwKkD1DsrnLot6ipsdI7i12lZqmZpbLsVyB3oHaTh1Vcw9rnxaTl8XzMmDwLiOHbSGJwJovty6wh4ZgiN2qTGuIxGvSE06TTpjMttt7DgHAuHwBn1hGBydkIwGdDkxSajnve_MynGPZva61h5WoqG0FIAE8AELQWGAU_gF2DFwvqy_NsW2PcLK_RwUvwCAAA)"
title = "Non-optimal"
caption = ""
id = "election7"
comment = "This should be a score voting scenario with 100% normalizing voters. the voter median around (0,0), and candidates square (3,0), triangle (-2,0), pentagon (-4,0). Pentagon voters are not enthusiastic enough about triangle so square wins, even though triangle is higher utility. Removing penta fixes the problem. "
%}

But a bigger problem than IIA violation, which in the real world is relatively hard to engineer or take advantage of, is the issue of differential voting power. In the following election, one of the groups of voters normalizes, and the other one doesn't. The two groups are the same size, but the normalizing group gets a candidate they like a lot better.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQW7EIAxF7-I1qrAxhsxVMrOdbQ9QtWev4Wk6bdUqUj7Y8P3s5E2qXM5Tay3a662c9rXKd7Fc3Yro32cy0-RSi7hc5ENVivS9jzyfyZEio2bYDyn155P5mfn6O74zx78ZrbuCLiTVElHiWGEj3BbJVV7v96tkXXXCYGkgyaWemvUtJYtpEUvjDJqyM4T-zNlhY9hY2rSUye7YZq1uclujwalB1ho7nFpf-CWfdTC4il-jd90ejt1q3PW5tOcybU_jrO_7_t3aY5fzwWcC1Wm4M8muiG2I3hAwe0douA9yc9fpNBwVodmg2WBs0TdnS5DAIiCIY8uAYHB3QDAY1ODLDUY-Hn_UIDkfMyqt-IrT0qwILU1gJjCTliaGE56J3wRrLqyXnr_fAnv_BKDnu5IcAwAA)"
title = "Strategists win"
caption = ""
id = "election8"
comment = "groups of voters at (-4,0)non-normalizing and (4,0)normalizing. Cands at (-2.5,.5), (-2,0), (0,0), (2,0), (2.5,.5). (2,0) wins."
%}

Is that kind of thing realistic? Perhaps not in the form above; few voters would be so unstrategic as not to normalize. But actually, normalizing as above is a pretty weak strategy. To strategize even more strongly, voters could somehow assess which two candidates were the frontrunners, and use them as the endpoints for normalization. Mostly, this means casting an approval-like ballot that gives every candidate either a 5 or a 0. For instance, in the election below, the voter believes triangle and square are the frontrunners. Compare the strongly strategic voter below with the normalized voter in the second example above.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPH8e6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ6T2M5kxvFnSGGcpkaRhFZxoiq_u8zpL6Yxl-YxIdvV1SoG8mtDiUTsxxLGFAOHMXwThRhqGCkGsSJLNoMU_y3L6M3McDNDqb9FrkBMbfFYRgwyiAEVIF0LmQpiQ3uzGgw9mY3Mgpl6Tc4A0GTGCTRZAEZTDBQnY8nm3puYTR95K8BVMlLgKuAqxjVZr7G8WFAF1gLX1uRYIluandjr2N26e86XjRFP7p253-VraoZvbvgaCOahByt6WAkAqbUAILXiCyts14ac9rcqbEsCwLDgDwSGpXYrLlBAIVAgaHyDgoa7DQpawQn_19D4dpmihqRe9ajBkiYAdSaFGIUYBaGCUKFHwaeQpS7rzgZjgLDnp91uOT9-HGab6Yf1cpxtqk-vy_v9fFoft4fzdtn7tL_tN_PLdj9vwtcPVmsiuUwDAAA)"
title = "Strong Strategic Voter"
caption = "Almost like strategic approval."
id = "ballot8"
comment = "Single-voter example with 3 candidates and a voter who normalizes based on only the 2 of them."
%}

Just as normalized voters can have more voting power than naive voters, strongly strategic voters can have more than normalized voters (as long as they are not too far off in guessing the frontrunners). This is a potential weakness of score voting.

Even stronger strategic voters could only choose the best of the frontrunners.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84Rih3Hye6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ6T2M5kxvFnSGGcpkqRlFZxoqK_O5b0F2uRc_WYku3KahUD-bUhRyLxYw5jikHCGL6JQgwljBSDWpElq0GK_5Zl2s3McDNDqb9FrkBNbfYYIwYZJIAC0K6FTAWJob1ZDIaeZCOzIFOvYQaAhgUn0LACjCYbNJyMhc29N5FNH3krwJW5F2ZwZXBl45qs11herCAAa4Zra3LMUSwtTux14m7dvfBlY8STexfpd-WaWuBbKr4GgmXowYIeFgJwF1EyAFILvrDAdqnItf5WgW1NABhW_IHCsJZuxQUqKBQKFI2vUFBxt0JBzTjh_yoaXy9TVJFsVz2qsNQSgLrCBjENYhoIGwgb9DTwNchqLuvOBmOAsOen3W45P34cZpvph_VynG2qT6_L-_18Wh-3h_N22fu0v-0388t2P2_C1w8HK51HTAMAAA)"
title = "Best Frontrunner"
caption = "And everybody you like better."
id = "ballot11"
%}

A more risk-averse, safe strategic voter could avoid the worst frontrunner by voting for everyone better.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84Rih3Hye6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ4T28lkxvFnSGGcpkqRlFZxoqK_O5b0l2uRc_Wcku3KahUD-bUhRyLxMIcxxSBhDN9EIYYSRopB7ZAVq0GK_5ZV2s3KcLNCqb9FrkBNbfYcIwcZJIAC0K6FTAWJob1ZDIZeZCOzJFM_wwwADQsi0LACjCYbNETGwubem8imj7wV4MrcmTO4MriycU3Wayw_rCAAa4Zra3LMUawsTuznxN26e-HLxogn9y7S78o1tcC3VHwNBMvQkwU9LATgLqJkAKQWfGGB7VJRa_2tAtuaADCs-AOFYS3digtUUCgUKBpfoaDiboWCmhHh_yoaXy9TVFFsVz2qsNQSgHrbG8Q0iGkgbCBs0NPA1yCruaw7G4wBwp6fdrvl_PhxmG2mH9bLcbapPr0u7_fzaX3cHs7bZe_T_rbfzC_b_bwJXz9z4DLTTAMAAA)"
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
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSS24EMQhE7-I1iszXeK4yM9tsc4AoOXswpZE6iqJeVGNw8aD7c8xxu99ZmNj2k-7MSbzmedtG7Pv5pMFdw0FV1zX1ltY1XjV-anTcJg0bt_HNc9DwjqNuVnKVlLEIbaF5fSqZlZz056nM_jdTLY49HzJmiqDY51hwrAfjMT7e3x-jWLiwuARMHJCCYiut_lpSzYSGlHEdCvcNEQiGE9gIbAQ2svq6JCK46GxyJjmbgZfCS7XrFV7qZ4Aq5FMYuAxH3RcPm69VnICvgVwcTK-BtY9dW1h0W1v4WoC23YeOnTpDpGFcIcB1h2B0X8jl7207dhATgukDXyawyfCeQIso4BVAid2ygLJwdwFlKSJDDl9hvf6whWS-lkZKds4xW04IDBMwCZjEntK7S4In4ZfAyoP15vVHHrCvH3AL_hg2AwAA)"
title = "Playing Chicken"
caption = ""
id = "election10"
comment = "Clumps of voters at (x,y,size): (-2,1,6); (-2,-1,4)slider; (3,0,10)."
%}

The "chicken dilemma" is a genuinely tough situation for almost any voting method. The motivations for the two rival factions to vote strategically are hard to minimize safely. Voting methods that go too far out of their way to punish strategic voters in this scenario tend to get the wrong answer in other, more-common scenarios like center squeeze. Look at how these various methods deal with both of these situations:

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTWtbMRD8K0VnpWhX0kryLSkEegvuIxfHBzdxTqYyxqSU0v72jjS0vFLKgzf6GM3OrPTdBbfZ7UTFS2p7vxOpXkoYo5a85LbfeyeTI-bBmxyMapqcDE4enOg2wbvkNu6nBOddnnPDSWwWgFPDsmbnm_qw_kCoIAT_z4ed9t8dlBklZLgTwaKZt-ateKu-BF9kkJSkOIw9uf76-uRgQ2BUAHQpRoBNSUC4iQCUVjhGGSyqzBOqBMZVyihllDJa5nGtnFElhplDvI5eUStSK8bJj9SKecQBcbiPxsNUjG2lkcLvxoyJrCe6UkhxPUlTJ61LJJtlU-H90XRqczGzw1kIOs3kSKDdnAmMngv36t_dzuyBBQLTG2_G2EnLM0GEI6OW0Yq1CYVWCs8WWimRs8Q9Winjzbn7h-UBlT9uH_G_65eXA_D2fL70t8MJw0_P_XIEfuhfXvrl-Xgda8vtFhBv9EaASz-_W752jLZ3j_16dOMhF9aoq5sobFYNBDqsTFeZrrLxNU_blQErtSpz1pHzfcaDZ9LPh9OpX5dv5yN6-cf4j1-q-t8nsQMAAA)"
title = "Playing Chicken with Different Methods"
caption = ""
id = "election11"
%}

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSwWpCMRD8lZJzLNkku4netFDoTax4eXqQqqfSyEPaQ2m_vbsZBKHIg7ez2c1kZpNvF9xsGCizJ-adH6hmRclQEEVlt_OOeg8HzYPlyc2Cd9nN3G923nFPRZu0VjQE_-_TSr1bmd6tUOjcRL1DxEvxUq0QUUgmYuva6bR1KoUyliGJBEE1UdaoCpKGaV-NSq2LUalJQ0SAtZiRgSaCJpa-PVZkyhJ1FKErIx9tLuBK0JYSOsCVlGsgbSRrFJTAmKY3HLkTGqAriFeghEMykPu-fEuZpR-TC-4GIvO0LzKmyIQQ--EMeQx5zAiwygU1DIxhVQICTApMCgYm3C2YOAGFQIFg2AUKCvYWKCgJGe6sQEGxd-Sel-ulXue6nR_WX03RarFpl6OCl9VG_4s2HvYan9rHoY1vx4vi-fk8ts_9u8LXtzZac5rECVm-nq-cPc6CM-p14D75bOuYUw0ImFOFwwqHFSord-kVJiv4KrxW8_rI-p7N7c8fqv0fv1wDAAA)"
title = "Center Squeeze"
caption = ""
id = "election12"
comment = "two different sandboxes. One repeats chicken dilemma case from above but also lets you switch voting methods (plurality, IRV, approval, score). The other one has center squeeze."
%}

So, now I've explained why strategic voting makes things tricky, I can explain my two favorite voting methods: star voting and 3-2-1 voting. 

## Star voting

"Star" stands for "score then automatic runoff." In this method, voters use the same ballot as score voting. Between the two candidates with the highest scores, the winner is the one that comes higher on more ballots. 

Here's a one-voter star election. Try the N = Normalized and F = Frontrunner strategies.  These are almost the same as in score voting, except that the ratings may be changed a little to avoid giving the same score to two frontrunners.  That is an important change that can matter in the runoff. Here's a one-voter election:

{% include sim.html
link="[link](http://www.howtofixtheelection.com/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84Rih0n8e6ZH5TbqgdoF1Gp6lZtEUII3o6dUUEIVTlMHDuTGccfIYVxmuoQScs6TlSq7dh2XPhnJ5GF1usYyIspaaScPM5hTDFIGMMXcYihhJFiqFZlyWaQ4r9lGb2ZGW5mKPW3yCVUE5n9jHEGGSSAAqhdC5kKEkN702HoSU49Yuo1zADQsCACDVeA0WQDRWQsbO69d2z6yFsBrsxIgSuDKxvXRLEvL62oAWeGZ4oc3ZM4qVeJO3XnwteNkU69RvpN-UsrcCwNnwKpMvTDgu4VAkBkyQCILPi8AsOlIaf9pQLDNQFgtaL7FVZr6TZcXgVFhYKKljcoaLjboKBlRPi5hpa36_w0JPW3P1H8HJY0AagzKcQoxCgIFYQKPQo-hSx1WXfFRg7Cnh73--Xy8H6cbZpXm-U02zyfX5a3-_m8Oe2Ol91y8Dl_PWzn591h3obPb7MMRxU9AwAA)"
title = "Star Strong"
caption = "Keeps a space for the best."
id = "ballot9"
comment = "one-voter star election"
%}

In STAR voting, the runoff resolves the chicken dilemma example we've been using.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQU4DMQxF75K1hWI7dpJeA3ZtF4DaVaUixAahcnYcf1UahNAs_jh2fp6dfJVadvs9CxO3eaQ98yDudf3NRmzzeKTCWcNOUZc18Tda1ljU2KrRsqtUWtmVb5ZCxTL22BnJHhLGIjSF6vaL5IhkpT9fZOa_Ga5pz4uMmdzJ51oWLOvCOJTr-XwowcKBxSFgYocEFLfQOF9D4jChImEci8K5QwSC5gQ2AhuBjfTcLgMRXLQmOZOsycBL4aWa9QovtdVAFPIqdGyGo86NR6v3UayAt4FsHJpug5Y-bXtE8zy2ddwWoNvMRcNMjSGSMKYQ4JpB0Lp15MbvaRtm4BWC7h0345ikW3agQeTwcqD4TOlA6djbgdIVUUMOt9DvL6wjOe5DI6W21tHbqBAYDsAMwAzMaVieMsAz4DeANRbWg8WLBNjL8-Vy_Xj6fDtF64-v1_dTuf0As25D0UsDAAA)"
title = "Chicken Star"
caption = ""
id = "election13"
comment = "chicken dilemma with star"
%}

## 3-2-1 voting

In 3-2-1 voting, voters rate each candidate "Good", "OK", or "Bad". To find the winner, you first narrow it down to three semifinalists, the candidates with the most "good" ratings. Then, narrow it further to two finalists, the candidates with the fewest "bad" ratings. Finally, the winner is the one preferred on more ballots. Here's a ballot to play with:

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy2oDMQz8F59NsWTZ1u65n5Dbsoe22ZJASEIelFLab6_kIS2lBB_GsuTxjKyPkMI4TXWIpGWOE5VqO7YdF_7ZSWSheY6BvJiSRsrJ4xzGFIOEMXxRDjGUMFIM1aos2QxS_Lcso3czw90Mpf4WuYRqIrOfMc4ggwRQALVrIVNBYmhvOgw9yalHTL2GGQAaFkSg4QowmmygiIyFzb33jk0feSvAlRkpcGVwZeOaKPblpRU14MzwTJGjexIn9Spxp-5c-LYx0qnXSL8pf2kFjqXhUyBVhn5Y0L1CAIgsGQCRBZ9XYLg05LS_VGC4JgCsVnS_wmot3YbLq6CoUFDR8gYFDXcbFLSMCD_X0PJ2m5-GpP72J4qfw5ImAHUmhRiFGAWhglChR8GnkKUu66HYyEHY89Nud7is3o-LTfNqc1oWm-fz5vD2uJxfTtvjZXvY-5xf9-vldbtf1uHzG8L9T7c9AwAA)"
title = "321 Strategic"
caption = "Extra rounds of approval."
id = "ballot10"
comment = "one-voter 3-2-1"
%}

And here's the chicken dilemma. Note that Frontrunner strategy doesn't change the result from Normalize strategy. Candidates wouldn't have to go negative against their nearby rivals in order to ensure that their voters would at least be moderately strategic and wouldn't just normalize.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQWoDMQxF7-K1KJZkyXbOkV2SRQsJXQRSSjelNGevrE9gSimz-CNL_n6S_VVq2R0OLEzc5okOzIO41_U3G7HN04kKZw07RV3WxN9oWWNRY6tGy65SaWVX7qyFimXssTOSPSSMRWgK1e0XyRHJSn--yMx_M1zTnhcZM7mTz7UsWNaFcSy3y-VYgoUDi0PAxA4JKG6hcb6GxGFCRcI4FoVzhwgEzQlsBDYCG-m5XQYiuGhNciZZk4GXwks16xVeaquBKORV6NgMR50bj1Yfo1gBbwPZODTdBi192vaI5nls67gtQLeZi4aZGkMkYUwhwDWDoHXryI3f0zbMwCsE3TtuxjFJt-xAg8jh5UDxmdKB0rG3A6UrooYcbqE_XlhHcjyGRkptraO3USEwHIAZgBmY07A8ZYBnwG8AayysJ4sXCbCX5-v19rH_fDtH6_vX9_O5fP8Ao9uz_ksDAAA)"
title = "321 Chicken"
caption = ""
id = "election14"
comment = "chicken dilemma with 3-2-1"
%}

## Afterward

**From Paretoman**: To finish where Jameson left off, STAR voting and 3-2-1 voting encourage voters to put better information on their ballot. Both voting methods use additional rounds to help more accurately determine the best candidate.  The additional rounds also give them some resistance to the chicken dilemma.  