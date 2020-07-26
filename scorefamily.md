---
layout: page-3
title: The Approval Score STAR and 3-2-1 Family
description: An Explorable Guide to Voting Methods
byline: By Paretoman and Jameson Quinn, July 2020
---

{% include letters.html %}

**Approval, Score, STAR, and 3-2-1** are voting methods that allow voters to find common ground as a group.

* Voters give their favorite a top score, and
* candidates on the same side might offer support to each other.

These voting methods are all part of the same family of voting methods that allow voters to score every candidate, rather than just picking one candidate.

**Compare that to choosing only one candidate (FPTP)**, where

* Voters can face a dilemma of whether to vote for their favorite or someone who is more electable, and
* candidates are always pitted against each other to get your one vote.

We will also go into detail on how the different members of this family of voting methods deal with voter strategies.

## Common Ground

Approval voting is the simplest way to find common ground. It simply allows people to vote for more than one candidate. I can make a diagram of this that nearly everyone will recognize as a Venn diagram.

{% capture cap21 %}The voters vote for everyone in their circle.  Both like {{ C }}.{% endcapture %}
{% include sim.html title='Approval Voting Venn Diagram' 
caption=cap21 
link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu24CMRD8lZNrF16_jqMLRbpICSAaoHCiE5BcOHRAJBQl356xp0AKQlfMrmc93p29b2XUeLmMUYt1a70UMVrqmCNf46xEowZnHpF1gjOzXmsl-Zo1qAkCpgERXCacGhutvBpDSYWSRNRaffOhuAZj9M0HZnSXae4yYspzknvLqWXKjsQT2JJEAhoQD8RzAQBt0cpCB4cWOhZgCZSxniWQcQDK2JrZiFlTLjhTGpXsiRTC2XLXOfJsyEFpCff45eJImpqO4woMcxo7UN6wPodCK3Jor6G7Fvii4f8_4WNpxNfcFdv2HD7QxABt9btS0_6Sumqa3ler_eQ8bNqhmqRhj-ypTadqtk1vH0gW7Waza6vFrusS0udh99lXk8kL4vm2rR7781DN2nTs98eVUpCnqcEVpwNNDYFAUwO7C6MyQ6Cp0RCkVEZuOHI1MRQP8BurSInIyWJToOZkNe_WXMZr6rr-NL8cWsz7cDgM_Vfq1M8fSXNUexgDAAA)' 
comment='' id='venn_diagram_sim' %}

It's important that you're able to support more than one candidate because that means two candidates can share your support and could possibly work together. It also means you can always give your favorite a top score.

Why does approval voting work? It uses a median. A median is basically just the middle. Technically it's the point that minimizes the total distance to all the other points. Imagine you have to pick a point for you and your friends to meet. You might like to choose the median because you'll use less gas to get there. Check out the 2D median example below.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA4VTwUpEMQz8l56DNGmS5u1XePC27GEFD8KCInoQcb_dpLOC4Iq8wzTJdDpN8z5ab7v9gRon7FmERMeB9hHEvOWCw4i9V0ppFk4mtuIMTQ4Xp3fizWuluS9qZZIpq5QbudaiNnLUSiatmrCTcGmJZFH5kE5G23Vq2nbt3Bs1W6HD5Uzo9OvLSmSlnbl2nEXaFca2GCK2KKNf4-T-Oo350hRBCEusADhiB6Ql1sRAmKcwNUmdTErqSIIAICOKKGVGAmRkIoKKbIsyLm8zeGUH3IyBItwMu3AcWeiMDVkthezsX19R-HpPf3RF5X_K-P8gXdb0Ylh9dUonnhsXV7TP8AyGexvaZ2P11BQUA6B9NkGJdYRtmJm-kg4VR_ccj-C2rpSj1xwSDgeOvRMOJq9TpgAGAJ2fmIP5PZoTxVjCTFI5XCcgFhALGAkYCUxDGABeAloRgLJ0M3OC-4rvj6fT0-vd-_ND_iO3p7eX4-nx9b19fgGnVnGdzAMAAA)"
title = "Median in 2D"
caption = "<b>Move some voters. Add a candidate (+). </b> The total length of all the lines below is the sum of all the distances between the voters and the candidate or median. The median we chose here minimizes this sum. A winning candidate should also minimize this sum."
comment = ""
id = "median_2d_sim" %}

How does approval voting use a median? Approval voting is asking you whether each candidate is close to you or far from you, so you’re measuring distance and writing it on your ballot.

In approval, score, STAR, and 3-2-1, you're doing the same thing, you're writing your distance on your ballot. Higher score means shorter distance. All of these methods add up the scores to find the highest totals, and they do so in different ways.

Score is approval voting with more levels of support.

STAR combines the two ways of finding the middle, scoring and counting by pairs. Its name is an acronym, STAR, Score Then Automatic Runoff. First we score. Then we find the top two and send them to a runoff. The runoff uses the same scores but counts them by pairs for whoever each voter prefers.

In 3-2-1 voting, voters rate each candidate "Good", "OK", or "Bad". To find the winner, you first narrow it down to three semifinalists, the candidates with the most "good" ratings. Then, narrow it further to two finalists, the candidates with the fewest "bad" ratings. Finally, the winner is the one preferred on more ballots. 

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VTTW_CMAz9LzmHqU6cOO0NiV8wuFUcGHQaEqIVsE3TtP322XljBybUw4s_8vzsuJ-ucV3fC3nKtPY9pfx7Ctz8-YoPUcyXSU9pvfaO7FobPRGbGV3XeMeuc99EzrvkOvIua5IGRaHx_z6NlLuR9m6EmlqLTEG1A2xIIAYkQK46SBUQK2q9pNDWYFAidQaqOSEAQBMYltJEhQynwCqwlCVo5zbAoNrIxgCuCK4YkQGuqFy9zhmfJWeEwRrRsQ7YR88aZiO2PL52yuF6UOI-2oHrXb6lZvTNgmeBYG6rM2F-iQChikiQmiA14fkS2k6CWKm1EtrODQANZ7xBxvByqq2YwAyKDAUZgxcoENwVKJAIC-8nUCC2QW4-TafxbXPQvVpux9OgGGdhZnu2XM0fna2YIL_cDFHQc2kAqFigtkBt4Vq_YGMKBBfwFegupvtBdCuh_GlzOIyX1cc06MJfJZ1fxvfFcN6e9tNlPx7tV3g97obn_XHYua8fEHJuRmkDAAA)"
altlink='[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQU4DMQz8i885xI6dbPfMD-ht1QO0i6hUdau2CCEEb8fOlAuoymHs2J7MOJ-UaZymVhNr26SJeUg81IjMI5WIhna7E_GotM0mEccYZ8-zRl5ozImURuZE5pCoektO_443t7uV4W5ldbfCub_NISlSQQpFrAAD1K6MXQCroz9nDqteFOfxS-HeIwIAjSgypykOFZcN2YDMWcQXkbtQjp2AqYCpgKmAqTjTxOl2orliHJwFdjlJKkm9rEEbfRo2w7bKb-DEU4lA-6z-pVa41oY_glxd9UvD8owBkGqQatid4TsNpq11nTb0twymawbAcMUPVLBU61ZCYAVFhYKKtTcoaJht0pmenw6H5br-OM000uN2Oc-U6PK6vD_Ml-15f7rul6NXvt-Ou_llf5x39PUDc7xiOMsCAAA)' title='Approval Score STAR and 3-2-1 Ballots' 
caption="Try all four voting methods in this family. They all use the Normalize strategy, which we'll get to next."
comment='one-voter ballots for approval, score, STAR, and 3-2-1, switch between them' id='score_family_ballot_sim' %}

[See the page on finding common ground for more examples.](commonground)

To show that these voting methods find the middle, we're going to have to talk about strategies. These strategies get very detailed, so I'll make a simple point that if there is a candidate in the middle, this family of voting methods finds it. The only really complicated situations involve factions, which we'll get to after strategy.

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTUsDMRD9LzmnkslkJtneevFctLelhyq9FXYpIojob_clj4oosoc3ny9vZuc9pLCd56lFydMxzmIpimq3JoFlx2MM0kukKPzcfQ3bFEMJ2_ApKcRgw3dUIVkBII3p94dcQ-5PfGSmfzN4obNLF9GiV4TdezwzTjFSCJQiToAWKUC8qwA8IjFkECKYQZgBmUCaXFhioyGTJld6jd40GjQNxdLXISOhZFIlUJCCacYiWehMkU85s8SMVBl03ZCbkW8GCOdRU0Zf-UlZfAgulb-EEgsHNW7OKM8ozyjPOKgZgYNaZY7rMg7qiSCj0rl157rcxgg4l-CkcCrwaUClgsremglK4IIqFdR-PWG3rtfl9XTBTT0-L9dzx8PuAaCbvBHg_f6wD_3KKtvabYdRY-lxjt4Sgf-4cfRG0a3QMwJ1N_I1ym9d_l3FWXKAp9Plsrwc3tYzbv5b5McXZ2njRj0DAAA)"
title='Finding the Middle' 
caption="The voting methods in this family find the middle and FPTP does not. We're using a frontrunner-based strategy and getting frontrunners from polls. We'll get to this next."
comment='example of center squeeze working , but not for FPTP'
id='score_family_election_sim' %}

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSPU9DMQz8L5ldFCexnXTrwlxBt6cOBXWr1AohJITgt2PnVBAg9IbzVy53fnlLOa2XZXTiMva0sNg16kLDIhhesrrfU-KY5VaJa4m8pnWm1NI6fXBOlGTm6lPeNAdnp_z781733p_67Ix_O35DsHOI6KTmZdWoF9QhhhsAUlgBroWbo98b4JcwpZJnVpywOBQAaErDiNNUB9AUQ9aRjXmg5qmYYx08GxVMtQIgqDrTwjS_GFU0wVjhmqlQ9WablBHwNSjXwEmXEkGbJ9tP2qZTdjP8GAhtsCvYn0CkQKRApMCuCAB2xdDr8yaBXc0AnpOK3SuWpjJthAUFhUKBjgkGBYazVgAVgDUZFFi8obS5XJ7OL4eTv6z7x_PTMXC3uXOoq7Jix9vtbpvirRmO9e89Uos6rPcMwJ_usN4hujdkAoDuDr4O-T3k34g_Thh4OJxO5-fd6-XoL_9L5PsngazMqUwDAAA)"
title='Finding the Middle in a Tough Situation' 
caption="Again, like the above, FPTP doesn't find the middle. The voting methods in this family do find the middle. And they are strategizing based on polls."
comment='a tougher example of center squeeze working , but not for FPTP'
id='score_family_election_tougher_sim' %}

## Strategy

In practice, voters can adjust their self-reported distances, which is called using a strategy. Strategy makes finding the median more complicated. Strategy is the reason these different voting methods exist.

First, let's look at an example where voters don't use strategy. The voter judges the candidates based on distance. This measures distance well and finds the median.

See if you notice something odd about the ballot below. 

No candidates got a 5 and no candidates got a 0. This voter is giving up some of their voting power. If {{ A }} loses, then they'll wish they gave {{ A }} a bigger score. 

{% include sim.html
title = "Judge Strategy"
caption = "Give a score based on distance. Drag the voter and see that the circles stay the same size."
id = "ballot4"
comment = "Description: this should just be an unstrategic score voter, as in ncase's thing. Allow ballot picture to show 0 scores."
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPHzu6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ4T28lkxvFnSGGcJqVIQqs4UZXfXeb0l2sxF_WckO3qahUD-bWhRCL2sIQxxcBhDN9EIYYaRopB7JAV1SDFf8sq7WZluFmh1N8iVyCmtnguIwcZxIAKkK6FTAWxob1ZDYZezEZmyUz9TM4A0GRGZDTFQJBURA2RsWRz703Mpo-8FeAqkFTAVcBVjGuyXmP5YQEBWAtcW5NjiWxldmI_x-7W3XO-bIx4cu_M_S5fUzN8s-JrIJiHnqzoYSVA7iJqAUBqxRdW2K6KWutvVdiWBIBhgWGBYandigsUUAgUCBqvUKC4q1CgBRH-T_F_epkiRbFd9UhhqSUALDWIaRDTQNhA2KCnga9BVnNZdzYYA4Q9P-12y_nx4zDbTD-sl-NsU316Xd7v59P6uD2ct8vep_1tv5lftvt5E75-ABCA83FMAwAA)"

%}

Most voters will want to make sure that their ballot contains at least one candidate at the top rating and one candidate at the bottom rating. The simplest way to do that is "normalization". That means that you give your favorite a 5, you give your least-favorite a 0, and you judge the rest on that scale between 0 and 5.

{% include sim.html
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPHzu6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ4T28lkxs5nSGGcJqVIQqs4UZXfXeb0l2sxF_WckO3qahUD-bWhRCL2sIQxxcBhDN9EIYYaRopB7JAV1SDFf8sq7WZluFmh1N8iVyCmtnguIwcZxIAKkK6FTAWxob1ZDYZezEZmyUz9TM4A0GRGZDTFQJBURA2RsWRz703Mpo-8FeAq4CrgKuAqxjVZr7H8sIAArAWurcmxRLYyO7GfY3fr7jlfNkY8uXfmfpevqRm-WTEaCOahJyt6WAmQu4haAJBaMcIK21VRa_2tCtuSADAsmIHAsNRuxQUKKAQKBI1XKFDcVSjQggjzU8xPL79IUWxXPVJYagkAwgYxDWIaCBsIG_Q08DXIai7rzj7GAGHPT7vdcn78OMz2px_Wy3G2X316Xd7v59P6uD2ct8vef_vbfjO_bPfzJnz9AEHATI9MAwAA)"
title = "Normalizing Strategy"
caption = "Stretch your vote to the max score, 5, and the min score, 0."
id = "ballot5"
comment = "Description: this should be like ncase's 'drag the voter' examples, with a normalizing score voter. This voter should have a series of circles, where the closest one intersects the closest candidate and the farthest one the farthest candidate. Thus, as you moved the voter or candidates the circles would change size."
%}

Normalizing as above is a pretty weak strategy. To strategize even more strongly, voters could look at polls to see which candidates are the frontrunners, and use them as the endpoints for normalization. Any candidate better would get a 5, and any candidate worse would get a 0. The technical name for this is clipping.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPHzu6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ6T2M5kxvFnSGGcJqVIQqs4UZXfXeb0F2sxF_WYkO3qahUD-bWhRCL2YwljioHDGL6JQgw1jBSDWJEl1SDFf8sy7WZmuJmh1N8iVyCmtngsIwYZxIAKkK6FTAWxob1ZDYaezEZmwUy9JmcAaDLjZDTFQBBUnBpOxpLNvTcxmz7yVoCrZKTAVcBVjGuyXmN5saAKrAWurcmxRLY0O7HXsbt195wvGyOe3Dtzv8vX1AzfrPgaCOahByt6WAkAqbUAILXiCytsV0Wu9bcqbEsCwLDgDwSGpXYrLlBAIVAgaLxCgeKuQoEWnPB_iv_TyxQpku2qRwpLLQGoMzWIaRDTQNhA2KCnga9BVnNZdzYYA4Q9P-12y_nx4zDbTD-sl-NsU316Xd7v59P6uD2ct8vep_1tv5lftvt5E75-APMG_FdMAwAA)"
title = "Frontrunner Strategy"
caption = "Consider polling data and stretch your vote to the max score only for the frontrunners. Push other candidates to 5 if closer, 0 if farther, and normalize in between."
id = "ballot8"
comment = "Single-voter example with 3 candidates and a voter who normalizes based on only the 2 of them."
%}

Strongly strategic voters can have more power than normalized voters. We'll see this in the next section on playing chicken.

Even stronger strategic voters could decide to only score the best of the frontrunners (and anyone better). These are risk-takers.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPHzu6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ6T2M5kxvFnSGGcJqVIQqs4UZXfXeb0F2sxF_WYkO3qahUD-bWhRCL2YwljioHDGL6JQgw1jBSDWJEl1SDFf8sy7WZmuJmh1N8iVyCmtngsIwYZxIAKkK6FTAWxob1ZDYaezEZmwUy9JmcAaDLjZDTFQBBUnBpOxpLNvTcxmz7yVoCr5F5YwFXAVYxrsl5jebGAAKwFrq3JsUS2NDux17G7dfecLxsjntw7c7_L19QM36z4GgjmoQcrelgJkLuIWgCQWvGFFbarItf6WxW2JQFgWPAHAsNSuxUXKKAQKBA0XqFAcVehQAtO-D_F_-llihTJdtUjhaWWANQVNohpENNA2EDYoKeBr0FWc1l3NhgDhD0_7XbL-fHjMNtMP6yX42xTfXpd3u_n0_q4PZy3y96n_W2_mV-2-3kTvn4AokZDqUwDAAA)"
title = "Best Frontrunner - Optimist Strategy"
caption = "Vote for the best of the frontrunners and everybody you like better."
id = "ballot11"
%}

A more risk-averse voter could try to avoid the worst frontrunner by voting 100% for everyone they feel is better.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RihPHzu6ZH8Bt1QO0i6hUdau2CCEEb8fOUA5FVQ4T28lkxs5nSGGcJqVIQqs4UZXfXeb0l2sxF_WckO3qahUD-bWhRCL2sIQxxcBhDN9EIYYaRopB7JAV1SDFf8sq7WZluFmh1N8iVyCmtnguIwcZxIAKkK6FTAWxob1ZDYZezEZmyUz9TM4A0GRGZDTFQJBURA2RsWRz703Mpo-8FeAquTMXcBVwFeOarNdYflhAANYC19bkWCJbmZ3Yz7G7dfecLxsjntw7c7_L19QM36wYDQTz0JMVPawEyF1ELQBIrRhhhe2qqLX-VoVtSQAYFsxAYFhqt-ICBRQCBYLGKxQo7ioUaEGE-Snmp5dfpCi2qx4pLLUEoN72BjENYhoIGwgb9DTwNchqLuvOPsYAYc9Pu91yfvw4zPanH9bLcbZffXpd3u_n0_q4PZy3y95_-9t-M79s9_MmfP0A1o3sPUwDAAA)"
title = "Not the Worst Frontrunner - Pessimist Strategy"
caption = "Vote at max for anybody better than the worst frontrunner."
id = "ballot12"
%}

There is a whole range of strategies in between these two extremes.

These strategies apply to score voting and also to approval voting. They are also the basis for strategies in STAR and 3-2-1 voting.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VTwU7DMAz9F58jVCeOk_aGxB_ArdphbEVMmtZqGyCE4Nux8wChIdTDS2zn5T3HfaOOhnEsHFh5FUbO-rWK0v3EaoipeEzZVnm1CsR-rE-BWXybaOgCCQ30wR0FyjRwILUiSxaDLvz5LFP_zfT_Zozf72JXoKY2IRoRhRAWQAZoU8Omg8XQbs0GfUtGo7Ng5FYTIwA0UbAzmmSgCBbsKnbGEs2_tzGaQvZmgCtFpMCVwJWMa7Ru4_NiRRVYE3xbm0MKYmlxYq8T9-tOJX4vjHhMvpB2Vi6pBb6l4HEgWPoWzOhiZgCk5gSA1IxHzLCdC3K13ZVhWzsADCveQGFYc7PiAhUUCgWKxhcoKDhboKAk7PB-BQqKzxFdL8txfl7vbbpuN_NxIp-sgoJ60bUCk7UDcOOukFchr-KKihGpUFjBVyG0utArG5UeUu_X-_18vntdJpvzX3JOj_PLzXTaHHfLeTcf_Cd4Omynh91h2tL7J1jR5XxjAwAA)"
title = "Approval Strategy"
caption = "Approval strategy is just score strategy with two levels."
comment = "approval strategy - flip between strategies with a single ballot"
id = "approval_strategy_sim"
%}

Even with these strategies, voters are still able to find common ground. The perception of frontrunners changes a little with each poll until the polls stabilize. 

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTUsDMRD9LzmnkslkJtneevFctLelhyq9FXYpIojob_clj4oosoc3ny9vZuc9pLCd56lFydMxzmIpimq3JoFlx2MM0kukKPzcfQ3bFEMJ2_ApKcRgw3dUIVkBII3p94dcQ-5PfGSmfzN4obNLF9GiV4TdezwzTjFSCJQiToAWKUC8qwA8IjFkECKYQZgBmUCaXFhioyGTJld6jd40GjQNxdLXISOhZFIlUJCCacYiWehMkU85s8SMVBl03ZCbkW8GCOdRU0Zf-UlZfAgulb-EEgsHNW7OKM8ozyjPOKgZgYNaZY7rMg7qiSCj0rl157rcxgg4l-CkcCrwaUClgsremglK4IIqFdR-PWG3rtfl9XTBTT0-L9dzx8PuAaCbvBHg_f6wD_3KKtvabYdRY-lxjt4Sgf-4cfRG0a3QMwJ1N_I1ym9d_l3FWXKAp9Plsrwc3tYzbv5b5McXZ2njRj0DAAA)"
title='Repeat: Finding the Middle' 
caption="This is the same example as before. The voting methods in this family find the middle and FPTP does not. Also, the high-risk strategy F+ doesn't find the middle."
comment='same as above, example of center squeeze working , but not for FPTP'
id='score_family_election_copy_sim' %}

## Playing Chicken

Let's look at an example where the voter's choice of strategy gets interesting.

In the example below, there are three groups of voters. Two are on one side and can win with candidate {{ A }} or {{ B }} if they cooperate. To make things interesting, each group has its own favorite candidate. If group {{ A }} betrays group {{ B }}, then {{ A }} can win alone, and vice versa. 

Groups {{ A }} and {{ B }} are playing a game of chicken. They can "swerve" and let their second-favorite win, or they can "drive straight" and either win (if the other side swerves) or crash (if the other side doesn't).

This makes sense. If voters are willing to take a risk, then they are willing to accept the loss. Also, voters that don't take the risk will accept a second-best outcome because at least it wasn't the worst outcome. 

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSwUoEMQyG36XnIk3Spu3cfAa97e5hld3TwiyLCCL67Cb5UUZECpOmSf98yfQ9lbTsdiScqfEh265lGuS7We1sHg45kefMkYmnBXwzZ2TYTotnSFpKTjUt6ZMo5dTCV7tnwW4m0bTjn0_ZLksZllLyn2WR-W-EShQhpyOyQ9WsM2vPOnIvuZMnMZLE0fZpPZ_3yRkMlcyAkxTGQKmaNRoJzoVzYitjh0xxgxkGDTNkuMUFhgx3eAMeVKREH5TZpwUtgZZI5Au0pHk7luj0orgMRZkbjVq-B-MObR3eKFTZOjV06rZE1ShbO_4goOuMw4YJN4LhgGkCA9zWYNB664iN39NumIEWGHSv-DOKSWqLDsSIFFoKFJ1hOlA67nagdIFXEQNK91eX7q_X2_p6vFj1h-f1dkr-DjsS_LH5CDu6HAUG0gNYA1gDExst6g2QDegMAA4HvGv2UoH4dLxc1pfHt-vJhoDaH1-UCak9ZwMAAA)"
altlink="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTWsbMRT8K0Xnl6KnjyfJt6QQ6C24Sy6OD27inExljEkppf3tHWlo2VLKwo6eNJo383a_O-82u50GFU1tLzvVKlr8WLUkmtt-L04nR03AmxysapqcDE4enOg2XlxyG_dTvROXZ224icMCcMGwHbKTFsSvHxAqCF7-eXDS_nuCNqOFDneq2DQTa2JFrErxUnSQAklxGHty_fX1ycGGwqgC6FKNAJuagHATAWgd4BhtsBl03giBwLiBMgg1LgTKhMKqsqJK9DOHShizolakVoyTH6kV84gD4nAfjZepGNtKI_nfgxmFrouwUkhxXaSpk9Ytks22qfD70XRqczNzwlkJYZrJkUC7ORMYPRee1b-nnTkD8wSmN34Z4yQtzwQRjoxaRivWJhRaKbxbaKVEVolntFLGP-fuH5YHdP64fcT7rl9eDsDb8_nS3w4nLD8998sR-KF_eemX5-N17C23W0C8CTcKXPr53fK1Y7W9e-zXoxs_cmGPuvoShcOqnkCHlekq01UOvuZpuzJgpVZlzjpyvs_44Zn08-F06tfl2_mIWf4x_uMXJYo73bEDAAA)"
title = "Playing Chicken with Approval and Score Voting"
caption = ""
id = "election11"
%}

If voters play chicken and crash, they might wish they had played it safe. It's impossible to have the foresight to know the election result ahead of time. All they can do is rely on polling to make their decision. It is their judgement of risk that leads to their decision. In a way, this is more information that gets fed into the voting method.

## STAR Voting

STAR voting was created to address scoring strategies. It uses a final runoff where stretching your scores doesn’t matter. Voters aren't playing the game of chicken anymore because STAR's extra round can resolve the contention between factions.

Let's repeat the definition of STAR. STAR combines the two ways of finding the middle, scoring and counting by pairs. Its name is an acronym, STAR, Score Then Automatic Runoff. First we score. Then we find the top two and send them to a runoff. The runoff uses the same scores but counts them by pairs for whoever each voter prefers. 

All the usual advantages of this family of voting methods still apply: voters can give their favorite a top score, and candidates might offer support to other candidates on the same side.

The strategies for STAR voting are almost the same as in score voting. The difference is that the ratings are changed to avoid giving the same score to two frontrunners. That is an important change that can matter in the runoff. 

In this model, the risk-takers are not taking as much risk and the risk-averse are taking a little more. I didn't go with more extreme strategies because these are good endpoints to illustrate the logic of STAR.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy04DMQz8l5wjFDtO4t0zf1Buqx6gXUSlqlu1RQgh-HbsjApCqNrDxI-dzDj-CCmM01SHSFrWcaJS7cR24sI_J4kstF7HQN5MSSPl5HEOY4pBwhi-iEMMJYwUQ7UuKzaDFP99VtGbleFmhVK_i1xCNZHZc4wcZJAACqB2LWQqSAztToehFzn1iKn3MANAw4LIaLJBRbIhUkTGwubeZ8emj3wU4MqMErgyuLJxTRT7560VPeDM8EyRo3sSJ_UucafuXPh6MNKp90j_U_7SChxLw6NAqgw9WTC9QgCILBkAkQWPV2C4NNS031RguCYArFZMv8JqLd2Gy6ugqFBQMfIGBQ3_NihoGRFeruHl2nV_Gor6O58onoclTQDqTAoxCjEKQgWhQo-CTyFLXdZdsZWDsKfH_X65PLwfZ9vm1WY5zbbP55fl7X4-b06742W3HHzPXw_b-Xl3mLfh8xuKlzI8PQMAAA)"
title = "STAR Strategy"
caption = "These strategies are based on the score strategies, except they try to give each frontrunner their own unique score."
id = "ballot9"
comment = "one-voter star election"
%}

In STAR voting, the runoff resolves the game of chicken. There is actually very little downside to giving a 5 to {{ A }} and a 1 to {{ B }}. {{ C }} still gets a 0, so he'll still lose in the final round runoff. 

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQU4DMQxF75K1hWI7dpJeA3ZtF4DaVaUixAahcnYcf1UahNAs_jh2fp6dfJVadvs9CxO3eaQ98yDudf3NRmzzeKTCWcNOUZc18Tda1ljU2KrRsqtUWtmVb5ZCxTL22BnJHhLGIjSF6vaL5IhkpT9fZOa_Ga5pz4uMmdzJ51oWLOvCOJTr-XwowcKBxSFgYocEFLfQOF9D4jChImEci8K5QwSC5gQ2YrlBYCMd0UAEF61JziRrMvBSeKlmvcJLbTUQhbwKHZvhqHPj0ep9FCvgbSAbh6bboKVP2x7RPI9tHbcF6DZz0TBTY4gkjCkEuGYQtG4dufF72oYZeIWge8fNOCbplh1oEDm8HCg-UzpQOvZ2oHRF1JDDZfb7C-tIjvvQSKmtdfQ2KgSGAzADMANzGpanDPAM-A1gjYX1YPEiAfbyfLlcP54-307R-uPr9f1Ubj-GvhvISwMAAA)"
title = "Not Playing Chicken with Star Voting"
caption = ""
id = "election13"
comment = "chicken with star"
%}

<!--need to copy other chicken example-->

## 3-2-1 voting

3-2-1 voting is another method that avoids the chicken dilemma by addressing scoring strategies.

Let's repeat the definition of 3-2-1. In 3-2-1 voting, voters rate each candidate "Good", "OK", or "Bad". To find the winner, you first narrow it down to three semifinalists, the candidates with the most "good" ratings. Then, narrow it further to two finalists, the candidates with the fewest "bad" ratings. Finally, the winner is the one preferred on more ballots.

3-2-1 voting is doing something similar to STAR by adding a second additional round of counting votes. It's kind of like there are two rounds of counting approval ballots and one round of counting preference ballots. The first round of approval just counts "good". The second round counts "good" and "okay".

Important todo: I haven't put good strategies into 3-2-1 yet. Right now, these strategies are okay for this example, but other examples might not be correct.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy2oDMQz8F59NsWTZ1u65n5Dbsoe22ZJASEIelFLab6_kIS2lhD2M9djxjKyPkMI4TXWIpGWOE5VqJ7YTF_45SWSheY6BvJmSRsrJ4xzGFIOEMXxRDjGUMFIM1bqs2AxS_PdZRe9WhrsVSv0ucgnVRGbPMXKQQQIogNq1kKkgMbQ7HYZe5NQjpt7DDAANCyKjyQYVyYZIERkLm3ufHZs-8lGAKzNK4MrgysY1Ueyft1b0gDPDM0WO7kmc1LvEnbpz4dvBSKfeI_1P-UsrcCwNjwKpMvRkwfQKASCyZABEFjxegeHSUNN-U4HhmgCwWjH9Cqu1dBsur4KiQkHFyBsUNPzboKBlRHi5hpdrt_1pKOrvfKJ4HpY0AagzKcQoxCgIFYQKPQo-hSx1WQ_FVg7Cnp92u8Nl9X5cbJtXm9Oy2D6fN4e3x-X8ctoeL9vD3vf8ul8vr9v9sg6f3_tmOp49AwAA)"
title = "3-2-1 Strategy"
caption = "These strategies try to give frontrunners their own score with three levels of support."
id = "ballot10"
comment = "one-voter 3-2-1"
%}

Here again, the game of chicken is not being played anymore. The Frontrunner strategy doesn't change the result from Normalize strategy. Candidates wouldn't have to go negative against their nearby rivals in order to ensure that their voters would at least be moderately strategic and wouldn't just normalize.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQWoDMQxF7-K1KJZkyXbOkV2SRQsJXQRSSjelNGevrE9gSimz-CNL_n6S_VVq2R0OLEzc5okOzIO41_U3G7HN04kKZw07RV3WxN9oWWNRY6tGy65SaWVX7qyFimXssTOSPSSMRWgK1e0XyRHJSn--yMx_M1zTnhcZM7mTz7UsWNaFcSy3y-VYgoUDi0PAxA4JKG6hcb6GxGFCRcI4FoVzhwgEzQlsxHKDwEY6ooEILlqTnEnWZOCl8FLNeoWX2mogCnkVOjbDUefGo9XHKFbA20A2Dk23QUuftj2ieR7bOm4L0G3momGmxhBJGFMIcM0gaN06cuP3tA0z8ApB946bcUzSLTvQIHJ4OVB8pnSgdOztQOmKqCGHy-yPF9aRHI-hkVJb6-htVAgMB2AGYAbmNCxPGeAZ8BvAGgvryeJFAuzl-Xq9few_387R-v71_Xwu3z-WC-vnSwMAAA)"
title = "Not Playing Chicken with 3-2-1 Voting"
caption = ""
id = "election14"
comment = "chicken with 3-2-1"
%}

## Afterward

The major point we've been supporting on this page has been that this family of voting methods allows voters to find common ground. 

We described some of the mechanics of how this family of voting methods works.  Voters are reporting their score. Counting the highest score is equivalent to finding the median.

We also described differences within this family of voting methods. Score and approval voting work on the principle that the voter is assessing the risk of using a strategy. STAR voting and 3-2-1 voting use additional rounds to get more information from the ballot. That encourages the voter to put more information on the ballot. The additional rounds also reduce the influence of polling on voter strategy and reduce the dilemmas voters face.



