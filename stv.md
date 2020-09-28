---
layout: page-3
title: The Single Transferable Vote
description: An Interactive Guide to STV (the multi-winner form of Ranked Choice Voting RCV)
byline: 'by Paretoman, June 2020'
---

I’d like to describe how **the Single Transferable Vote (multi-winner Ranked Choice Voting)** serves the idea of representative politics. In particular, I’m going to describe how 

- every voter can have an equitable share of power,
- candidates are responsive to the voters that put them in power, and
- candidates can work together on campaigns,

This differs from our current **district-based single-winner single-choice voting** method, where

- voters often feel their vote is wasted, and
- candidates are antagonistic towards each other during campaigns.

I’m also going to describe other mechanically similar voting methods that achieve the same goals.

## Representative Politics

Representation is a very fundamental concept to government. The idea of a body of representatives is to try to represent a diversity of interests as a team, and each member of the team would be responsive to the voters that put them in power. The goal is representation of minorities so that any member of the community can have an equitable share of power. This is more representative than having one single person to represent everyone, such as a president.

Voting districts are used to give representation to voters that live in a geographical area. For example, you could have each state elect representatives to a national body. Here’s an interactive simulation of districts: (as a side point, candidates from different districts don’t have to fight each other. At least, not until they get elected and start arguing about legislation.)

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRS25EMQi7S9Yswj8zV3mak1Tt2Qu40lM1GmVhiBNj4Gvt9bwuZqGzX3Txyb-AmWSfudKJXrR43tohEWvGlI42oeu5adl6rp-9aPmkUa-F3k49z2I2vZ1izkfm8ZHhPeW43XUqSOGJDQBLHIAywFZY5RpKW2jJnkxKRwsEl5CRkuECBwcZSWQHGVR0j1HuqfAQKvNXFTwMaSldTHP6aYCEoqLZ2gBpkQbJ7tX4DuUOFWId2ijYf3mDvCX2BMP2GF-O8TnMOtp2mHW07Q5A257gzlRytB0bAJXADgLDCx-n3UpAIuAgHgMJB8lTJTGuVADGldhfBnacCfLccyLre7R0WvD7F50SWj_cAgAA)"
title = "District Representation"
caption = "Each district gets a representative, and we use choose-only-one voting within each district."
comment = "just show some districts. It would be good to have a uniform distribution."
id = "district_sim"
gif = "gif/district.gif" %}

In the same way, representation can be given to voters that are from different political spaces. This idea is called proportional representation because the number of representatives is proportional to how many voters are in a political space. It’s more representative than districts for reasons we will go over later on this page.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSvU6DMQx8l8wZ4v-0j4HYPnUoohMVMLAgBM9exweqUFVlODvn73K2v6822n7biLjPcegbRfwGRJ3HXNGUig69UdWq_DHqqzgJafvRm7Z9-yFvvVnlnuXcb07WRzKj35xk5l1md5ehUc_RsrdSRgpTpABYSncFaYA0MZ9bkNrcG4_KOHUkgXEJGU4ZSjBwkOFANpFBRUYZpTUWKkK4vhUBD0OSShv1OqvUQUJR0GyuoEuSCsnVq9I15GsoEFuhlpD-l1cvCxpYFAzrri4N4zOYNbRtMGto2wyAti3AzfJqaNuh4lBx7MAxPLdyulpxSDgc-K4g8G1QvRIYVwgA4wrsLxw7jgA5r3Pquu7R0oTg0_F8fvt4_Hw_5Z_5cHx9OT237ws0clXs8wIAAA)"
title = "Proportional Representation"
caption = "Each center of political thought gets a representative. We use two-winner Ranked Choice Voting."
comment = "not sure whether to have two side by side or top-bottom. Same winners as district representation. don’t show power chart."
id = "prop_sim"
gif = "gif/prop.gif"
%}

The key advantage of STV is that districts do not need to be drawn around political minority groups in order to give them representation. Just look at how in a complex opinion-space, there is an evenly distributed selection of winning candidates:

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA41TS2pcQQy8S6-1aH1a3W-OEbJ7zMLGXsUkWWQTQnz2VKsGMsYYzIPRv1Qtaf603i7nOZfkuspp1mWNUlR0OTQdx007XDRWuUzUdGvd5ehbmcjvpR0dwdia-q3SUJBWlSFrFn4gq1pGF7PtGy7p16s03ZQsBjmNLlm9YqG_VUmKae5Ub5cuLdqlvWo2aaPsBIDJuw_5E5Eu7z5EFiIA6QB5taxfa4hB9vYm86hM83v3XRgQm4PuV2zTaJKpBgV5gnIJsNKABAcdkEe50fcCrwFIIYBjEMSxoBM4DkEcm7QWraMKvNeTdQ9LK-BWte6Mk5ED6cQOP_42QLKEffwgMkbrEoJ1yZQlOBc4UYAj2ReDuuj_x75NvfUirbC3UfA6HZAqvk3ww0ziM_wi62UxeRWcQxzlHFzL4AwGpzk4g8FpjkHBaY7J2KrHDk4ziZJESe42iZKjzm6TTkIkGST3OVk7uc_JLUyn4BYm72Imb2dOBtf9oLefT1oEfHx4efnx6-vvn8_4G3x5-P7t-an9_Qc4HPJW2QMAAA)"
title = "Evenly Distributed Representation"
caption = "With five representatives, STV can spread them out to be closer to the voters. (Dots are used for voters and circles show candidate totals, including transferred votes from eliminated candidates.)"
comment = "to show how STV can prevent factions from fighting each other."
id = "even_distribution_sim"
gif = "gif/even_distribution.gif" 
%}

## Kinder Political Culture

STV allows multiple factions within a party to be represented, so these factions don’t have to feel threatened by each other, which would allow them to work better together. Small groups can form to support an idea, and supporters don't have to face a dilemma of whether they're going to support an idea that they like best or support an idea that is more likely to be accepted by many other people. This is easier for the voters because the voters can use the voting method to find common ground rather than trying to use polls to figure out which candidate to unite behind. The voters can be more honest, and the campaigns can be more honest. 

Still, some things won’t change. There will still be disagreements in the legislature once candidates are seated. I think it's more acceptable to expect compromises and cooperative trading of policy favors in a legislature rather than at the time of an election where voters would have to sift through any misinformative campaign techniques. Legislators are more able to form cooperative relationships than groups of voters, so we are designing a system that works better for representing people, and it should lift a lot of burden off the voters’ shoulders.

## Equality

In both district representation and in proportional representation, there is a standard of equality among voters.

For districts, you have a district size, which is the number of people in a district. For proportional representation, you have a quota size, which is the number of people represented by a winning candidate. Basically, it’s how widely supported an idea needs to be in order to get a representative at the table.

In a way, the idea of a quota size already applies within a single-winner district, and it’s about 50%. It can be higher, and it can be lower. Someone can win with 48% if nobody else did better. Or 28%, which actually happens in crowded races. If only 28% voted for the winner, then that means 72% of voters might not be represented until the next election.

{% include sim.html 
link='[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSPW_CQAz9K9HNN8T3mXTM0K0SBcSSMFyrCNKmpAowoKr97fX5laUInXS2z_bL83O-VKke2pas1RTsVrd868qwYww_RZefbNSGavaC1-Rou9WKpMtxiStzbNVDqZWT28sduMLom8O1kTOlvjmcqe5m6rsZKuVzlBnl0CAEIQIjAiUKMEyAHFv-nGfD2KSVYRx-NIxj2BgYwBiHEoaxbABjIqIKUS0NthSilCUhSVgjvdYiD0KWkVrSfycXB6SBaTEusWBW8wqUE9js0NUxV8dmobPjpNf9h3ZBCLiIFYGuw9Ae4nlGVT-dWk6XNBbL9NZ1h-Y87_q5aNJ84OipT6ditU-v7xxs-t1u6IvNMI6Jw8U8fExF0zyzv973xeN0notVn47T4dgpxfAQ00MCDzG9h4GYHux8JTN4iBlKGJLKgM0GrCR4kYh_WRUAETBZqMVETBbRG7GElzSO02l9-ex53sV4ntM4nC7q-xe0u0DUBgMAAA)'
title='Single-Winner Single-Choice: 28% Wins' 
caption='If you only say, "pick only one", then the winner can win with only a small part of the votes.' 
comment='crowded election, winner gets less than 25%.  Everybody is an individual.  Everybody has an option' 
id='crowded_sim' 
gif = "gif/crowded.gif"
%}

If you use single-winner Ranked Choice Voting, then the quota is 50%. The ballot counts for the top choice, so there is no way that there is another candidate with more than 50% of ballots who could win. So, more than 50% of people are represented. More than 50% had their votes matter in the election (unless they didn't use all their rankings).

**Refresher on RCV:** Ranked choice voting asks voters to rank the candidates in order from best to worst. During counting, your vote counts for your top candidate. One-by-one, the candidate with the least number of votes is eliminated and taken out of the running. **Check out the sketch below** that shows everyone connected to their first pick. Colored flow lines show some voters moving to their next choice after their top pick is eliminated. The flow diagram shown on the right is called a Sankey diagram.

(That's enough of a refresher on RCV to get you through this page, but after you're done on this page, [read this other page on single-winner RCV](irv). )

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04EMQz8l9Qu4md29zMQ3WqLQ1zFCShoEIJvP8dTHOKEtpg4Y4_Hzn613rZ9X4JWOWjn6MTS58mDeF2OgxrPDA4htkhmUVKe99q2Ts3a1n6sUfMKI5OF7r5MH8lkN-p_v-SW5O7ui1n_ZbhXQ572ZigI4YoNAFMcgLTAlpjtNCG1mZqkTl5K6kiCACAjhhSvAoGMDEQLorUKtJdRnnvhIhSGVMFDSVNpZ2IkBijoKUblWpbd5IyxgnmU21Fr0ZVgVW-_pS2qnQ28EawaBnYszmHTMbDDpsOmOwAD-wCHtTkGjg7gygwMG1hbePnUNBKQCDiItWDAwUDtEIAC8HIDLzcCrztGkU-ny-Xt4_Hz_Zx_3cPp9eX83L6vdVB8gMQCAAA)"
title = "Single-Winner RCV (IRV)"
caption = "A candidate needs 50% to win."
comment = "Refresher. 1 winner example. don't show power chart."
id = "irv_sim"
gif = "gif/irv.gif"
%}

We can extend this logic to quotas for multi-winner Ranked Choice Voting. You wouldn’t be able to elect more than one candidate with a quota at 50%. Mathematically, it is the smallest quota where you can’t elect more than one. So let’s consider two candidates; 33% is the smallest quota where you can’t elect more than two. For three candidates, it’s 25%, and for a number n of candidates, the smallest quota where you can’t elect n+1 is 1/(n+1).

**Quota Table**

| Number of Winners | Quota   | People Represented |
| ----------------- | ------- | ------------------ |
| 1                 | 50 %    | \> 50 %            |
| 2                 | 33 %    | \> 66 %            |
| 3                 | 25 %    | \> 75 %            |
| 4                 | 20 %    | \> 80 %            |
| 5                 | 17 %    | \> 83 %            |
| n                 | 1/(n+1) | \> n/(n+1)         |

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04DMRD8F9dbeN9OPgPRnVIEkYoIKGgQgm9n7eGkSCi6Yryv8ez4vlpvx23TpBwn2lg6pdTBhEQPfxmxeRJh4uzzNHqd5HSixnM6tZrneAZFzgYL4hizQduxU7N2bD8cjZqvOGqsilnQ6d9XlXG3crhb4b64mUHOghAK2AC4v6QsKAFshXVdFBS3UJPiqaQUjxYIkqCRouECRw00kogGIrBoX0J5esCroBCkijoEaTFtZez-zfZAA1gVCzMJKRl5NVjfPZgB3wZyG-hOPQNbbPb_Oou1kiVeCkvYYSUdljoWcFjhWMBhhTsAVniiNtZtDisCLMGrM2BDwNDwpVhLSIAioCAOCxKzidkUgAJgYeJNc_-pEsVx69vMY6XRAVhpQMyAmGFL73AA3uHpfL2-fTx-vl_qJ344v75cntv3LyTk-II4AwAA)"
title = "Three Winners"
caption = "Each of three groups is able to be represented."
comment = "three parties is a cognitive achievement. don't show power chart."
id = "three_sim"
gif = "gif/three.gif" 
%}

Ranked-Choice Voting is better (more representative) when it allows smaller groups to be represented. Five would be a great number. More would be even more representative but could be overwhelming. Voters don’t have to rank all the candidates. They just need to rank enough to get one candidate elected, or maybe two.

## Counting Ballots

The fundamental part of what makes STV work is that it counts quotas exactly once.

Once a candidate has been elected by a quota of voters, the voters have successfully used their ballot to get representation, so it is not counted again for a second candidate. 

This is kind of like how in districts, you only vote in one district.

This counting method is important because it is what allows small groups to come together to get representation and to not see each other as competing factions.

### Visualization

See the example chart below for a visual of the process of elimination. It starts at the top and each row tracks who the **voter's** top pick is. Each column is a voter. Transparency is used to represent the excess vote that remains after a quota is filled. As candidates are eliminated, the groups of voters become visually apparent.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04EMQz8l9QuYjuxs_sZiG61xSGu4gQUNAjBt-N4OGnF6bTFxK_xZLJfpZZ129TJx04bSyWXODQh0eUvI22eRJjY6zyNGifZdyo8p12jeY67kflsaEZsYzZoWSuVVtbyw1ao9IwtxmLD_y_6PSqVbr6ojLuV5W6Fa67jKXOGghCiuAEgKdQlhABugbHOAoJbqEjwRFKCRwMESdBI0HBARw004ogGIrBoTaE8beEsqOSsKuoQpMG0hdfXb7YbGsCquDCHZUqNejS0evVgBnwM5BjolXoGLdna7bpmKas5Hg-XaEsmOyztuECHFR0X6LCidwCs6I7ayG0dVlgFcHYa3sVgqPVUrCHEQGFQYEuCQ4Fj1mGhKwAWOt7UDe_ujuI4-jbzIBwgfDpdLm8fj5_v5_hbH06vL-fn8v0LhmM1_yEDAAA)"
title = "Voter Chart By Round"
caption = "See the chart at the bottom for a visualization of where votes were counted towards a candidate's victory. Mouse over the rounds to see how the chart progresses through the rounds. "
comment = "voter chart time"
id = "voter_chart_sim" 
gif = "gif/voter_chart.gif"
%}

Below this chart is another chart which I called a **power** chart. When a candidate is elected in a round, the voters whose vote counted for that candidate are added to fill up the power chart. The intuition is that the voter could have voted for someone else, so the candidate owes them some share of their power . (This is best viewed on a bigger screen. there's a lot of bookkeeping to do between rounds.) 

In the background is a dark bar that shows what total equality would look like. The height of this bar is each voter's ideal share of representation. As candidates get elected, the bar is covered, showing that voters got represented. Any part of the bar that is still showing after all candidates are elected shows that some voters are underrepresented.

(The voters and candidates are arranged in a line by using an algorithm that solves the traveling salesman problem to keep voters together who are near each other in 2D space. Specifically, the ballots are used as coordinates or feature vectors since this 2D space isn't something you'd be able to see in an election. You can wiggle around the candidates in this chart to see them take the traveling salesman's route to visit all the voters.)

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04EMQz8l9QuYjuxs_sZiG61xSGu4gQUNAjBt-N4OGnF6bTFxK_xZLJfpZZ129TJx04bSyWXODQh0eUvI22eRJjY6zyNGifZdyo8p12jeY67kflsaEZsYzZoWSuVVtbyw1ao9IwtxmLD_y_6PSqVbr6ojLuV5W6Fa67jKXOGghCiuAEgKdQlhABugbHOAoJbqEjwRFKCRwMESdBI0HBARw004ogGIrBoTaE8beEsqOSsKuoQpMG0hdfXb7YbGsCquDCHZUqNejS0evVgBnwM5BjolXoGLdna7bpmKas5Hg-XaEsmOyztuECHFR0X6LCidwCs6I7ayG0dVlgFcHYa3sVgqPVUrCHEQGFQYEuCQ4Fj1mGhKwAWOt7UDe_ujuI4-jbzuNIA4dPpcnn7ePx8P8ff-nB6fTk_l-9fV4vS8SEDAAA)"
title = "Power Chart"
caption = "See the chart at the bottom for a visualization of where votes were counted towards a candidate's victory. Mouse over the rounds to see how the chart progresses through the rounds. "
comment = "power chart time"
id = "power_sim" 
gif = "gif/power.gif"
%}

### Quota Excess

What happens if a candidate gets more votes than just a quota? The rule is that exactly a quota of votes is used up by the winner, which means the excess number of votes above the quota remains in the count. These votes will count in proportion to that excess amount. It's a calculation of dividing the excess by the quota to find the new weight for the vote. This bookkeeping makes sure that the power each voter gets from their vote is the same. It makes sure that all voters are as equal as possible.

## Proportionality

Let's get back to the idea of proportionality. You can see that in STV, a voter group with two times as many voters gets two times as many representatives.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31Ty05cMQz9l6y9iJ3Ezp1dP6ALHmIzmsWlnQXqlBkhQCBEv722DxWVKNVdHL9inxznvpRaNtttr8Sj7mjL7FZXt3onqUuEqpJwc2tWkszZQizshogRa1SJdbckLI1szdjwkyOsxm7NN4tFdzsqHJPN52mWjEFsFolWNpVKL5vyi7VQGemrlwt9-LzePFPpw-eZ-Wlm-TTDNcdx0GtkFNrMiAviYMcdAG5OM8GZcHf0uSyOPoWpiHf0qHhHD4oA0Ec6SrxPc0AfMXgT3pIHWk3KHAJxJprk2daQB6Pmnbau8b--OKooxoQGGXw51KjTIPULT_IFejDKO4aGLp3fTXk3W64la3v27P8n0DVJd8OSccUOoQakH7jegFAD1xsQagwAhBqG3MzJA0JpBaCLYm2KLjpyq_FqFC0UDHRJMDAwzikGga0BILCBgcV7LGcPx_v14tvxbu_vNJ0vp9Pd8XE9_PG_3tze_Fyf3L24vCrxWg3n59_SRxwazJpwvR4Ox_vL59Pef4Pz9fbH_nt5_Q0IWhoZrgMAAA)" 
title = "Quotas Give Proportional Results"
caption = "Here's two groups with a 1:2 ratio (really 4:7). The winners are also in the same ratio."
comment = "Maybe choose a more interesting example."
id = "proportional_two_to_one_sim" 
gif = "gif/proportional_two_to_one.gif"
%}

This proportionality applies even when there aren't distinct groups. Let's look again at the example we saw earlier, but now using the additional charts. 

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA41TzYqUQQx8lz7n0Ek6_TOPId6GOay4Jxf14EXEfXYrqQFnWQT5YNKdn-pKJfOr9Xa5XteWuW9yNeuyow4quh0njXM_HRcdmaUDQbc8dZfT87BNThbq6aI28qR-L7QwmZUeQ_Yq-IGsenF0MUtfuEy_3aRpMrIRpBRdptajG89blUwxnZnq7dKljXZprzqbtKj7BIDJuw_5C5Eu7z5ENiIA6QB5tVm_1hCD7e1N5qlM80f3QxgQyUGzC5cl6E93-o1-UtZBQ8LgXgb0dMCCjAbsKTcIXOA1ICoMcAyGODboBI7DEMcWb5u3UwXeq3dN1bQCblXrzjgZOZCuGO-_vwSYLOE7fogMjV2GYG5oewvWBk4UmOQmYCXa6H_1z6ve3yKtYW-jXgqiVDyv4AdNxv_wG7M6G4vrQR3GKWdwPkENgmoGNQiqGUFDNWMxtqvZoJqz0xBlcraTKDNq_5L0JMQkg8l5LjJYnOfiFJbTcAqLe7Fyk3NtF4P7Uej0s6Xdy3x6enn59uPjz-_P-D98ePr65flz-_0HKwv-beEDAAA)"
title = "Evenly Distributed Representation - Again - With Charts"
caption = "With five representatives, STV can spread them out to be closer to the voters. (Dots are used for voters and circles show candidate totals, including transferred votes from eliminated candidates.)"
comment = "to show how STV can prevent factions from fighting each other."
id = "even_2_sim" 
gif = "gif/even_2.gif"
%}

<!--Add a section on gerrymandering-->

### Proportional Methods without Parties

There are more voting methods that use a similar way of assigning voters to STV to achieve proportionality. After you're done with this page, read more about all the different kinds of proportional voting methods:

* [Proportional Voting Methods](proportional)

## Footnotes

### Party Proportional Methods

Additionally, there are ways to have proportionality by using a party system, but that is a mechanically-different method that I haven't added to the simulator yet, so we'll discuss it on another page to come in the near future.

### Strategies

I still need to work out what the strategies would be for voters and candidates. So far, in the above examples, I've been using the honest strategy for ranking.

## Afterword

The main drive for STV is to have representation of all diverse groups and to include minorities. Group bargaining in this representative group would ideally be able to offer a policy package that includes a little bit from everyone at the table. This is also a vision of a more responsive politics. We don't have to wait until the election. We can represent each sector of the population today, so that when an event occurs, action can be taken. Also, proportional representation is a further way to avoid antagonistic campaigns. It won't get rid of partisanship, but it might prevent it from being broadcast to the voters . We can change the political culture and have campaigns that are capable of bringing groups together to achieve a greater goal.

