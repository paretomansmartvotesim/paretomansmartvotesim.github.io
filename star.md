---
layout: page-3
title: STAR Voting
description: An Explorable Guide
byline: By Paretoman and Jameson Quinn, July 2020
---

{% include letters.html %}

**STAR Voting** allows voters to find common ground as a group. In STAR voting, 

* voters can give their favorite a top score, and
* candidates on the same side might offer support to each other.

**Compare that to choosing only one candidate (FPTP)**, where

* voters can face a dilemma of whether to vote for their favorite or someone who is more electable, and
* candidates are always pitted against each other to get your one vote.

(First time on this site? [Review the basics.](basics))

## Common Ground

STAR combines the two ways of finding the middle, scoring and counting by pairs. Its name is an acronym, STAR, Score Then Automatic Runoff. First voters give scores to the candidates. Then we find the top two candidates and send them to a runoff. The runoff uses the same scores but counts them by pairs for whoever each voter prefers.

Let's see how this works in an actual election. Let's use a range of scores from 0 to 5. Let's also model voter behavior. We'll get to how voters behave using strategies by the end of the page.

{% include sim.html title="STAR Voting"
caption="Score from 0 to 5 and add up the scores."
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSsU4DMQyG38VzhGLHdnLdeAXa7XQDoG6VihALQuXZcfxThqLqht-xk_8-J_6iSrt1NS9c21ZW5lq4LzOyFjmJSP5yohq5um2FeB7LPdrmutGuFlLa0TcLFbJce-yKYg-p5d8XlXG3stytcE1vngjuSAlSoGCFgIEdEhCsofFLCwl_LiThFUkJLwkRCGxEsSVsWghspGM1sFryQKsJy_MeOAsNTq1BANTCaeXy-83NjjI8G1rmIqUVjbKm7Qz4Gsg1CONVZqB5Vm-t1RNeO94FuIqmDRdoQDWgGlANTZtB0LR11Eb-y9C0VwjnTscLOK7OLVuJiSKHhYPAl5QOgo6zXSANgsvqIOhzhGh_eHyKodq_nt-PNAeqozhubqyjwVEheNUBtAG0oUgaBHQDfgOQY0I-xJAswHx5Pp3OH4fPt2OMNxguP5L3f-I5AwAA)"
comment='' id='scores_sim' %}

Why does STAR voting work?

The easiest way to see how STAR allows voters to find common ground is with a Venn diagram. This isn't just a Venn diagram, though. This is a visual representation of how voters can vote using scores. In this case, we're just keeping it simple and using scores of 1 or 0. This simple voting method is called approval voting.

{% capture cap21 %}The voters vote for everyone close to them.  Both like {{ C }}.{% endcapture %}
{% include sim.html title='Approval Voting Venn Diagram' 
caption=cap21 
link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu24CMRD8lZNrF16_jqMLRbpICSAaoHCiE5BcOHRAJBQl356xp0AKQlfMrmc93p29b2XUeLmMUYt1a70UMVrqmCNf46xEowZnHpF1gjOzXmsl-Zo1qAkCpgERXCacGhutvBpDSYWSRNRaffOhuAZj9M0HZnSXae4yYspzknvLqWXKjsQT2JJEAhoQD8RzAQBt0cpCB4cWOhZgCZSxniWQcQDK2JrZiFlTLjhTGpXsiRTC2XLXOfJsyEFpCff45eJImpqO4woMcxo7UN6wPodCK3Jor6G7Fvii4f8_4WNpxNfcFdv2HD7QxABt9btS0_6Sumqa3ler_eQ8bNqhmqRhj-ypTadqtk1vH0gW7Waza6vFrusS0udh99lXk8kL4vm2rR7781DN2nTs98eVUpCnqcEVpwNNDYFAUwO7C6MyQ6Cp0RCkVEZuOHI1MRQP8BurSInIyWJToOZkNe_WXMZr6rr-NL8cWsz7cDgM_Vfq1M8fSXNUexgDAAA)' 
comment='' id='venn_diagram_sim' %}

It's important that voters can support more than one candidate because that means two candidates can share support and could possibly work together. It also means you can always give your favorite a top score. The same is true in STAR voting.

Also, STAR works because it uses a median. A median is basically just the middle. Technically it's the point that minimizes the total distance to all the other points. Imagine you have to pick a point for you and your friends to meet. You might like to choose the median because you'll use less gas to get there. Check out the 2D median example below.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA4VTwUpEMQz8l56DNGmS5u1XePC27GEFD8KCInoQcb_dpLOC4Iq8wzTJdDpN8z5ab7v9gRon7FmERMeB9hHEvOWCw4i9V0ppFk4mtuIMTQ4Xp3fizWuluS9qZZIpq5QbudaiNnLUSiatmrCTcGmJZFH5kE5G23Vq2nbt3Bs1W6HD5Uzo9OvLSmSlnbl2nEXaFca2GCK2KKNf4-T-Oo350hRBCEusADhiB6Ql1sRAmKcwNUmdTErqSIIAICOKKGVGAmRkIoKKbIsyLm8zeGUH3IyBItwMu3AcWeiMDVkthezsX19R-HpPf3RF5X_K-P8gXdb0Ylh9dUonnhsXV7TP8AyGexvaZ2P11BQUA6B9NkGJdYRtmJm-kg4VR_ccj-C2rpSj1xwSDgeOvRMOJq9TpgAGAJ2fmIP5PZoTxVjCTFI5XCcgFhALGAkYCUxDGABeAloRgLJ0M3OC-4rvj6fT0-vd-_ND_iO3p7eX4-nx9b19fgGnVnGdzAMAAA)"
title = "Median in 2D"
caption = "<b>Move some voters. Add a candidate (+). </b> The total length of all the lines below is the sum of all the distances between the voters and the candidate or median. The median we chose here minimizes this sum. A winning candidate should also minimize this sum."
comment = ""
id = "median_2d_sim" %}

[See the page on finding common ground for more examples of finding the median.](commonground)

How does STAR voting use a median? STAR voting is asking you whether each candidate is close to you or far from you, so you’re measuring distance and writing it on your ballot. Higher score means shorter distance.

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQU4DMQxF7-J1hMaJE2dmh8QJaHejLqAdRKWqU7VFCCE4O3Y-ZVFUZeHYTn6eHX9SR8M4KgcuvAoj5_K7i9L9xWqIST1W2HZ5tQrEfq1PgVncTTR0gYQG-uZIgTINHKjYIUuqmS78W5apNzP9zQx37S12guZH-EBggckwpXGwEbCYtfeymb4lowlZMHI7EyMMZKLAM5lkpiCo8Co8U4lWuTcwGht7G6CVoJUSTkArmdZofcbywwVpqCZUbA0OKYilxYX9nFwqlXjZmPCYfCPtrlxLC-oWxbcAWPoWzOhfZpjYIDJQM1Azvi-j7KzI1fZWRtmlg0HBBX9Q0LySWykOWCBRQFDQeAWB4q6CQBM8_J-CQH2CaLGej5MN1WJ5_0g-T4pkveqYosDawUC-Aq0CrUp7rGI8Kugq9Cogq0PeqY0gMJ-fdrv5vPw4TDbdF5TT6_z-MJ3Wx-3hvJ33Pvdv-830st1PG_r6AcTSEXZWAwAA)"
altlink='[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQU4DMQz8i885xI6dbPfMD-ht1QO0i6hUdau2CCEEb8fOlAuoymHs2J7MOJ-UaZymVhNr26SJeUg81IjMI5WIhna7E_GotM0mEccYZ8-zRl5ozImURuZE5pCoektO_443t7uV4W5ldbfCub_NISlSQQpFrAAD1K6MXQCroz9nDqteFOfxS-HeIwIAjSgypykOFZcN2YDMWcQXkbtQjp2AqYCpgKmAqTjTxOl2orliHJwFdjlJKkm9rEEbfRo2w7bKb-DEU4lA-6z-pVa41oY_glxd9UvD8owBkGqQatid4TsNpq11nTb0twymawbAcMUPVLBU61ZCYAVFhYKKtTcoaJht0pmenw6H5br-OM000uN2Oc-U6PK6vD_Ml-15f7rul6NXvt-Ou_llf5x39PUDc7xiOMsCAAA)' 
title='STAR Ballots' 
caption="See what the voter is thinking."
comment='one-voter ballots for approval, score, STAR, and 3-2-1, switch between them' id='score_family_ballot_sim' %}

STAR also works by counting by pairs. In the runoff, your support goes 100% to the candidate you like better. That means whichever candidate is closer to the middle will win. This also encourages voters to give different scores to each candidate.

Here are a few more examples of how STAR finds the middle. Also, let's see how other voting methods that use scores find the middle, too. The only method that isn't finding the middle is FPTP, First Past the Post, which is what we do now.

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTUtDMRD8LzkHyW6ym7zevHgu2tujhyq9FVqKCCL6253sUBBF3mH2czK7bz9SSZt1XUYWXfZ5FStZap3WIrBsv89JZom0Cl-nX9Om5NTSJn2JppwsfEcVkh0A0lx-f8gN5P7EI7P8m5ES7DJFjOwdYfcZV8YpRhqBUsQJ0CINiHcrAI9ITgpCBBWEClACabSxxKJBSaOd3qC3REMtoVjmOiQSlUy1EiiogmnFIlnoTJGvcmbJilQLumnIzdCbAcI1alr0tZ-UzUNw6_wllNg4qHFzRnlGeUZ5xkHNCBzUOnNcl3FQLwSJSufWnetyixFwLslJ4VTgS0Cngs7eroRK4II6FfR5Pen-crme3w4n3NTTy_l6nLi7fwQ8bHfbNK-rs3zcdpdrbjPOkUch8N8OjjwodjR6RqDeQb5B2WPKvjOcI4U_H06n8-vu_XLErVPR5zfWMTXRMgMAAA)"
title='Finding the Middle' 
caption="The voting methods in this family find the middle and FPTP does not. We're using a frontrunner-based strategy and getting frontrunners from polls. We'll get to this next."
comment='example of center squeeze working , but not for FPTP'
id='score_family_election_sim' %}

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VST0vDMQz9Lj0HadombXfbxfPQ3-3HDlN2G2wMEUT0s5vkMURFenj519eXNO8pp826zkFc5p5Wln6zhtDsbkwL9brfU2Kv5VaJa3G_pk2m1NImfXJJlCR8tSpLdgNjp_z7WG5Y7k88MvPfDOdgZxcxSLuFVT1eEIcYbgBIYQWYFm6G9q6DPcKUSg6vGGExKADQlIYSo6kGoCkd3oA340LNoZh9HByJCqZaARBUjWlliuOliiQYK7pmKlQt2YLSDb4Z5WYY6VrcaHGz_aRtGrJbx8dAaEO7gvkJRApECkQK2hUBoF3pyI14SdCuZgBHpWL2iqGpRBvegoJCoUBnQIeCjru9ACoAY-pQ0H2H0vZyuZ5fDyfbrMfn8_XouGwfDO53yy75jnWUj-_5UfM4Wh4ZgB8eaHlA7GjwBAC9A3wDsofLvhNbSgh_OpxO55fl7XK0jYeijy-Hm9dbQQMAAA)"
title='Finding the Middle in a Tough Situation' 
caption="Again, like the above, FPTP doesn't find the middle. The voting methods in this family do find the middle. And they are strategizing based on polls."
comment='a tougher example of center squeeze working , but not for FPTP'
id='score_family_election_tougher_sim' %}

## Strategy

We need to now fill in a little more detail about these strategies that we've been using. These strategies get very detailed. Still, STAR voting is able to find the middle. The only really complicated situations involve factions playing a game of chicken. To explain the game of chicken, we have to first explain strategy.

Strategy is when voters adjust their self-reported distances. This makes finding the median more complicated. Part of the reason STAR voting exists is to deal with strategy.

We'll show you the score strategy and the STAR strategy, which is slightly different because STAR also uses a runoff.

First, let's look at an example where voters don't use strategy. The voter judges the candidates based on distance. This measures distance well and finds the median.

See if you notice something odd about the ballot below. 

No candidates got a 5 and no candidates got a 0. This voter is giving up some of their voting power. If {{ A }} loses, then they'll wish they gave {{ A }} a bigger score. 

{% include sim.html
title = "Judge Strategy"
caption = "Give a score based on distance. Drag the voter and see that the circles stay the same size."
id = "ballot4"
comment = "Description: this should just be an unstrategic score voter, as in ncase's thing. Allow ballot picture to show 0 scores."
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSwU7DMAyG38XnCNWJ46S9Ie0J2G7VDrAVMWlap20IIQTPjp0fOAxNPTixkz_f7_qDOhrGsXBg5XUYOevPKkr3l6shpuI5ZVvl9ToQ-7U-BWbxbaKhCyQ00BdHCpRp4EBqh6xYLHTh32eVerPS36xw195iJ1CjTchGZAHCgpARtNGwcbBYtFezhb4Vo8lZMnI7EyMCZKJgZzLJgiJZsKvYmUo0_97GaITszYBWAlKCVoJWMq3Ruo3PDysEoJrg29ocUhAriwv7OXG_7lTi78KEx-QLaXflWlrgWwp-DoClb8mMLmZGiA0iJwSgZvzEDNu5oFbbWxm2tUOAYYVhhWHNzYoDKiQUBIrGFxAU3C0gKAk7_L8CguJzRMvV_YNN1nIznybyqSoo1quOFRisHQIMVqBVoFXIV4xHBV2FXgVkdcg7G5MemE-P-_18Wb0fJ5txMAQ6v8xvi-m8Oe2Ol9188Ol_PWyn591h2tLnN-FJWrFcAwAA)"

%}

Most voters will want to make sure that their ballot contains at least one candidate at the top rating and one candidate at the bottom rating. The simplest way to do that is "normalization". That means that you give your favorite a 5, you give your least favorite a 0, and you judge the rest on that scale between 0 and 5.

One more consideration is made in STAR voting, and this makes it different than score voting. The ratings are changed to avoid giving the same score to two candidates. That is an important change that can matter in the runoff. 

{% include sim.html
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSwU7DMAyG38XnCNWJ46S9Ie0J2G7VDrAVMWlap20IIQTPjp0fOAxNPfyJnfz97PiDOhrGsXBg5XUYOevPKkr3F6shpuIxZVvl9ToQ-7U-BWbxbaKhCyQ00BdHCpRp4EBqhyxZTLrw77NMvZnpb2a4a_9iJ1CjTYhGRAHCAskQbTRsHCym9tds0rdkNDsLRm5nYoTAJgp2ZpNMFMGCXcXOXKLV722MRsjeDHgleKUEgVcyr9G6jc8PKwzgmlC3tTmkIJYWN_Zz4vV6pRJ_F2Y8Jl9IuyvX1oK6peBxACx9C2Z0MTMkNoicIEDNeMSMsnNBrrZ_ZZStHQQFK95A0TzNrRQHVFgoCBSNLyAouFtAUNCsgvcrICg-R7Rc3T_YZC0382kin6qCZL3qWEGBtYPAvgKtAq2iwIrxqKCr8KuArA55Z2PSA_Ppcb-fL6v342QzDoZA55f5bTGdN6fd8bKbDz79r4ft9Lw7TFv6_AY8yRtZXAMAAA)"
title = "Normalizing Strategy"
caption = "Stretch your vote to the max score, 5, and the min score, 0."
id = "ballot5"
comment = "Description: this should be like ncase's 'drag the voter' examples, with a normalizing score voter. This voter should have a series of circles, where the closest one intersects the closest candidate and the farthest one the farthest candidate. Thus, as you moved the voter or candidates the circles would change size."
%}

Normalizing as above is a pretty weak strategy. To strategize even more strongly, voters could look at polls to see which candidates are the frontrunners and use them as the endpoints for normalization. Any candidate better would get a 5, and any candidate worse would get a 0. In other words, the scores are clipped.

Again, one more consideration is made for STAR voting as opposed to score voting. The voter strategically gives different scores to each frontrunner.

It makes more sense to use a frontrunner strategy than a normalized strategy because the voter is showing more distinction between frontrunners, where it matters.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RWieO490bEi-gva16gHYRlapu1RYhhODt2BnKoajKYWI7mcw4_gxdGMaxUiShVRypyO8ucfeX05hy9ZyQ7cpqFQP5tT5HIvYwh6GLgcMQvimFGEoYKAaxQ1asBl38t6yiNyv9zQp17S1yBWJqM7IJWQghBhSANDVkOogN7dVi0LdiMjpLJmpnUgKAJjEio8kGgmRFpIiMJZl_b2MyheTNAFdOKIErQ1I2rtG6jeWHBafAmuHb2hxzZCuzE_s5dr_ulNNlY8Rj9g23u3xNzfDNFZ8Dwdy3ZEEXCwEgtWQAbBd8YoHtUlHT9laBbekAMCz4A4FhKc2KCxRQCBQIGl-hoOJuhYKaEaFZFQqqz1FYrOfjZKO1WN4_Bp-qiqJedazCoHYAarwKaQppCnrFeCjUKfgUItVF3tmY9JD5_LTbzeflx2GyGb9IOb3O7w_TaX3cHs7bee_T_7bfTC_b_bQJXz-WHRZ9XAMAAA)"
title = "Frontrunner Strategy"
caption = "Consider polling data and stretch your vote to the max score only for the frontrunners. Push other candidates to 5 if closer, 0 if farther, and normalize in between."
id = "ballot8"
comment = "Single-voter example with 3 candidates and a voter who normalizes based on only the 2 of them."
%}

Risk-takers may want to only support their favorite frontrunner (and anyone better). In this way, they can show more distinction between their favorite frontrunner and the rest. This comes at a cost because they don't distinguish between the other frontrunners, and that might matter.

STAR encourages these risk-takers to distinguish between the frontrunners so that their vote will matter in the final round.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSwU7DMAyG3yXnCNWx46S9IfEEbLdqB9iKmDSt0zaEEIJnx87POAxNPTixkz_f7_ozdGEYx0KRlFZxpKy_qyTdX67GxMVzSrbKq1UM5Nd6jkTiWw5DF4OEIXxTCjHkMFAMaoesWCx08d9nlXqz0t-sUNfeIidQo2VkE7IAIUHICNpoyDhILNqr2ULfisnkLJmonUkJATJJsDMZtqBIFuwqdqaSzL-3MRkheTOgxakdZGgxkNi0Rus2Pj-sEIAqw7e1OXIUK4sL-zlxv-5U0mVhwiP7QtpduZYW-JaCnwNg6Vsyo4uZEFKDyIwA2xk_McN2LqjV9laGbe0QYFjxDxSGNTcrDqiQUBAoGl9AUHC3gKAwdmhWAUHxOQqL9XycbLQWy_vH4FNVUKxXHSswWDsEarwVaBVoFfIV41FBV6FXAVkd8s7GpAfm89NuN5-XH4fJZvyCcnqd3x-m0_q4PZy3896n_22_mV62-2kTvn4AeQ8Y0FwDAAA)"
title = "Best Frontrunner - Optimist Strategy"
caption = "Vote for the best of the frontrunners and everybody you like better."
id = "ballot11"
%}

A more risk-averse voter could try to avoid the worst frontrunner by voting 100% for everyone else they feel is better.

STAR encourages these risk-averse voters to distinguish between the frontrunners without much risk.

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8S84RWseOk90bEi-gva16gHYRlapu1RYhhODt2BnKoajKYWI7mcw4_gxdGMaxUCSlVRwp6-8uSfeXqzFx8ZyS7fJqFQP5tZ4jkXjIYehikDCEb0ohhhwGikHtkBWLQRf_LavUm5X-ZoW69ha5AjW1jGxCFkJIABmgTQ2ZDhJDezUb9K2YjM6SidqZlACgSYLIaNhAkSyIKiJjSebf25hMIXkzwMWpMTO4GJLYuEbrNpYfVhCAleHb2hw5ipXFif2cuF93KumyMeKRfSPtrlxTC3xLwedAsPQtmdHFTIDURGQGwHbGJ2bYzgW12t7KsK0dAIYVf6AwrLlZcYEKCoUCReMLFBTcLVBQGBGaVaCg-ByFxXo-TjZai-X9Y_CpKijWq44VGKwdgNonVEirkFZBXzEeFeoq-CpEVhd5Z2PSQ-bz0243n5cfh8lm_CLl9Dq_P0yn9XF7OG_nvU__234zvWz30yZ8_QB2f9AlXAMAAA)"
title = "Not the Worst Frontrunner - Pessimist Strategy"
caption = "Vote at max for anybody better than the worst frontrunner."
id = "ballot12"
%}

There is a whole range of strategies in between these two extremes. 

We can now look back at the example of finding common ground with a little more understanding of strategies and polling. The perception of frontrunners changes a little with each poll. Even though strategies make elections more complicated, voters are still able to find common ground. 

{% include sim.html 
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTUtDMRD8LzkHyW6ym7zevHgu2tujhyq9FVqKCCL6253sUBBF3mH2czK7bz9SSZt1XUYWXfZ5FStZap3WIrBsv89JZom0Cl-nX9Om5NTSJn2JppwsfEcVkh0A0lx-f8gN5P7EI7P8m5ES7DJFjOwdYfcZV8YpRhqBUsQJ0CINiHcrAI9ITgpCBBWEClACabSxxKJBSaOd3qC3REMtoVjmOiQSlUy1EiiogmnFIlnoTJGvcmbJilQLumnIzdCbAcI1alr0tZ-UzUNw6_wllNg4qHFzRnlGeUZ5xkHNCBzUOnNcl3FQLwSJSufWnetyixFwLslJ4VTgS0Cngs7eroRK4II6FfR5Pen-crme3w4n3NTTy_l6nLi7fwQ8bHfbNK-rs3zcdpdrbjPOkUch8N8OjjwodjR6RqDeQb5B2WPKvjOcI4U_H06n8-vu_XLErVPR5zfWMTXRMgMAAA)"
title='Repeat: Finding the Middle' 
caption="This is the same example as before. The voting methods in this family find the middle and FPTP does not."
comment='same as above, example of center squeeze working , but not for FPTP'
id='score_family_election_copy_sim' %}

## Playing Chicken

Let's look at a more difficult to resolve election where the voter's choice of strategy gets more interesting. 

In the example below, there are three groups of voters. Two are on one side and can win with candidate {{ A }} or {{ B }} if they cooperate. To make things interesting, each group has its own favorite candidate. If group {{ A }} betrays group {{ B }}, then {{ A }} can win alone, and vice versa. 

Groups {{ A }} and {{ B }} are playing a game of chicken. They can "swerve" and let their second-favorite win, or they can "drive straight" and either win (if the other side swerves) or crash (if the other side doesn't).

This makes sense. If voters are willing to take a risk, then they are willing to accept the loss. Also, voters that don't take the risk will accept a second-best outcome; at least it wasn't the worst outcome. 

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSwUoEMQyG36XnIk3Spu3cfAa97e5hld3TwiyLCCL67Cb5UUZECpOmSf98yfQ9lbTsdiScqfEh265lGuS7We1sHg45kefMkYmnBXwzZ2TYTotnSFpKTjUt6ZMo5dTCV7tnwW4m0bTjn0_ZLksZllLyn2WR-W-EShQhpyOyQ9WsM2vPOnIvuZMnMZLE0fZpPZ_3yRkMlcyAkxTGQKmaNRoJzoVzYitjh0xxgxkGDTNkuMUFhgx3eAMeVKREH5TZpwUtgZZI5Au0pHk7luj0orgMRZkbjVq-B-MObR3eKFTZOjV06rZE1ShbO_4goOuMw4YJN4LhgGkCA9zWYNB664iN39NumIEWGHSv-DOKSWqLDsSIFFoKFJ1hOlA67nagdIFXEQNK91eX7q_X2_p6vFj1h-f1dkr-DjsS_LH5CDu6HAUG0gNYA1gDExst6g2QDegMAA4HvGv2UoH4dLxc1pfHt-vJhoDaH1-UCak9ZwMAAA)"
altlink="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTWsbMRT8K0Xnl6KnjyfJt6QQ6C24Sy6OD27inExljEkppf3tHWlo2VLKwo6eNJo383a_O-82u50GFU1tLzvVKlr8WLUkmtt-L04nR03AmxysapqcDE4enOg2XlxyG_dTvROXZ224icMCcMGwHbKTFsSvHxAqCF7-eXDS_nuCNqOFDneq2DQTa2JFrErxUnSQAklxGHty_fX1ycGGwqgC6FKNAJuagHATAWgd4BhtsBl03giBwLiBMgg1LgTKhMKqsqJK9DOHShizolakVoyTH6kV84gD4nAfjZepGNtKI_nfgxmFrouwUkhxXaSpk9Ytks22qfD70XRqczNzwlkJYZrJkUC7ORMYPRee1b-nnTkD8wSmN34Z4yQtzwQRjoxaRivWJhRaKbxbaKVEVolntFLGP-fuH5YHdP64fcT7rl9eDsDb8_nS3w4nLD8998sR-KF_eemX5-N17C23W0C8CTcKXPr53fK1Y7W9e-zXoxs_cmGPuvoShcOqnkCHlekq01UOvuZpuzJgpVZlzjpyvs_44Zn08-F06tfl2_mIWf4x_uMXJYo73bEDAAA)"
title = "Playing Chicken with Approval and Score Voting"
caption = ""
id = "election11"
%}

If voters play chicken and crash, they might wish they had played it safe. It's impossible to have the foresight to know the election result ahead of time. All they can do is rely on polling to make their decision. It is their judgement of risk that leads to their decision. In a way, this perception of risk is more information that gets fed into the voting method.

STAR voting was created to address scoring strategies. It uses a final runoff where stretching your scores doesn’t matter. Voters aren't playing the game of chicken anymore because STAR's extra round can resolve the contention between factions.

In STAR voting, the runoff resolves the game of chicken. There is actually very little downside to giving a {{ A }} a 5 and {{ B }} a 1. {{ C }} still gets a 0, so he'll still lose in the final round runoff. 

{% include sim.html
link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WS0UpDMQyG36XXQZqkTdO9ht5tu1DZrgYT8UZEn900P5MjIgdOmib5-yXtR6llt9-zCnGXI8WqEzuv1WyxN49HKrxyphPLjMBazJkZsbK6MrTsKpVWduWLpVDp6VvURXCEKTxj--dXt1-keKRU-vNFZP4b4ZqH8KJjJjOySTbInEalwStFkKIL7FCu5_OhLIIA5TCgZIMJTG5hg0WTcidUJA6JTeGsEIFBuwIZ6VkgkJEBz-FBRWt2wSRrVtBSaKlmvkJL-2omEhe9GoqhqHOj0eptLMvhrSMbhaZbp6VO2x7RLI9tA_cH6DZzs2O-nWEkYbrCALd3GLTeB2L-e9odM7AKg-4NN2OYpPXsQIPIoGVAsZlmAGWgdgBlKLyGGC5z3N7cQHA9rDWwgZ68wkDIAeGAcMzHe6o7OBw6DhxfOHc9XiWAnh4vl-vbw_vLKVq-f76-nsrnN_qa03FTAwAA)"
title = "Not Playing Chicken with Star Voting"
caption = ""
id = "election13"
comment = "chicken with star"
%}

## Afterward

The major point we've been supporting on this page has been that STAR voting allows voters to find common ground. 

We described some of the mechanics of how STAR voting works.  Voters are reporting their score. Finding the candidate with highest score is equivalent to finding the candidate closest to the median.

We also described what the runoff accomplishes in STAR voting. Score voting works on the principle that the voter is assessing the risk of using a strategy. STAR voting uses additional rounds to get more information from the ballot. That encourages the voter to put more information on the ballot. The additional round also reduces the influence of polling on voter strategy and reduces the dilemmas voters face.

It's just a smarter way to vote.
