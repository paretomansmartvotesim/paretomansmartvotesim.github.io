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

I’m also going to describe other mechanically-similar voting methods that achieve the same goals.

## Representative Politics

Representation is a very fundamental concept to government. The idea of a body of representatives is to try to represent a diversity of interests as a team, and each member of the team would be responsive to the voters that put them in power. The goal is representation of minorities so that any member of the community can have an equitable share of power. This is more representative than having one single person to represent everyone, such as a president.

Voting districts are used to give representation to voters that live in a geographical area. For example, you could have each state elect representatives to a national body. Here’s an interactive simulation of districts: (as a side point, candidates from different districts don’t have to fight each other. At least, not until they get elected and start arguing about legislation.)

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSW24EMQi7S7754Bkye5XRnqRqz17AlVbVapUPQ5wxBuZr8Xrct4jS4SfdcvIvECHlM1c20ZOWzFs_pOrNuNGxJmw9mJavx_rhRSsm3fVa6e3U8yyG6e0Ucz4y10dGeMpJu0tyJutLxSWciQNgTDagbIgXVtGGqqC0lCfTUrMCxSVktGSkIMBBRhPZQQYV47ErPRsZwnS-NQMPQ1ZKt9CcfrpBQtHQcu1hOnJIdscur1BfoUGsQx8F_y_vkPfEtmDYr_EVGGLAbKDtgNlA2xEAtB0J7kylQNubAVDZ2MHG8HaM025lQ2LDwb4GEg5SpkpiXGkAjCuxv-w_q3-jXuD3LxX5UCvDAgAAnk)"
title = "District Representation"
caption = "Each district gets a representative, and we use choose-only-one voting within each district."
comment = "just show some districts. It would be good to have a uniform distribution."
id = "district_sim" %}

In the same way, representation can be given to voters that are from different political spaces. This idea is called proportional representation because the number of representatives is proportional to how many voters are in a political space. It’s more representative than districts for reasons we will go over later on this page.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04EMQz8l9Qu4vi1u5-B6FZXHOIqTkBBgxB8-zke0AmdTinGzjiTsZOv1tu278yDln6gnSN-A2YafZnRIhUdqHHVqvwx6rM4CWlbp6Ztaz_sjZpV7lk-6GZlfSTT6WYls9xl1rsM97qOpz2hIK3NgU1YYwXAWHosSBusiXnphLxhUBu9spFqkjCwCZmRMpxg4CAzAtmCDCrSyy7P4XARMuqsCHgYklTamWrNUgcJRUHL-RAkSSokZ3PK13BcQ4HYDLWE9L-8elnQwHPBsK61aRiiwayhbYNZQ9tmALRtAW4pr4a2HSoOFccbOIbnVk5nKw4JhwNfCwJng-uWwLhCABhX4P1i_qz5jaLIp-P5_Pbx-Pl-yg_4cHx9OT237wvLeGhh2gIAAA)"
title = "Proportional Representation"
caption = "Each center of political thought gets a representative. We use two-winner Ranked Choice Voting."
comment = "not sure whether to have two side by side or top-bottom. Same winners as district representation. don’t show power chart."
id = "prop_sim" %}

The key advantage of STV is that districts do not need to be drawn around political minority groups in order to give them representation.  Just look at how in a complex opinion-space, there is an evenly distributed selection of winning candidates:

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA41Sy2pdMQz8F6-1sB6W7fsZpbvLXSQkq4a2i25Kab69Y82FJoRCOXAk6zEej_Sr9Xa5XueSXDe5mnVZoxwVXQ5Px75720VjVchETY_XXXY_zkR9L293JON46vdOQ0NadYasWfiBqroyupid2HBJv92k6aFkMchpdMm6Kxbut2pJMc1T6u3SpUW7tFfNJm3UOQFg8uFD_USmy4cPmYUMQDpAXi3rbw052N7eVe6qNH8bfpMGxOGg5xUuU6KCxiD5atCQLYiXATcNWDDRAbsrjNsviBrgFAY4BkMcCwaB4zDEscnT4mlXg_d6uB7JtBJu1evOPBk5kK6Y5L-_A5Bs4T2-iQyBXUIwNLx5CZYGQTRgVc7eoC_6X_HPUe93kVbY-6yXfGgVP0fwgybxP_wi62UxuRvUIXYFB4czqMGgmoMaDKo5Bg3VHJO5VY8dVDOJkkRJzjaJkqOW75BOQiQZJOc52Ts5z8kpTKfhFCb3Yp41Pjs7K_n48PLy7cfnn9-fse2fHr5-eX5qv_8A11WG58ADAAA)"
title = "Evenly Distributed Representation"
caption = "With five representatives, STV can spread them out to be closer to the voters.  (Dots are used for voters and circles show candidate totals, including transferred votes from eliminated candidates.)"
comment = "to show how STV can prevent factions from fighting each other."
id = "even_distribution_sim" %}

## Kinder Political Culture

STV allows multiple factions within a party to be represented, so these factions don’t have to feel threatened by each other, which would allow them to work better together.  Small groups can form to support an idea, and supporters don't have to face a dilemma of whether they're going to support an idea that they like best or support an idea that is more likely to be accepted by many other people.  This is easier for the voters because the voters can use the voting method to find common ground rather than trying to use polls to figure out which candidate to unite behind. The voters can be more honest and the campaigns can be more honest. 

Still, some things won’t change. There will still be disagreements in the legislature once candidates are seated. I think it's more acceptable to expect compromises and cooperative trading of policy favors in a legislature rather than at the time of an election where voters would have to sift through any misinformative campaign techniques. Legislators are more able to form cooperative relationships than groups of voters, so we are designing a system that works better for representing people, and it should lift a lot of burden off the voters’ shoulders.

## Equality

In both district representation and in proportional representation, there is a standard of equality among voters.

For districts, you have a district size, which is the number of people in a district. For proportional representation, you have a quota size, which is the number of people represented by a winning candidate. Basically, it’s how widely supported an idea needs to be in order to get a representative at the table.

In a way, the idea of a quota size already applies within a single-winner district, and it’s about 50%. It can be higher, and it can be lower. Someone can win with 48% if nobody else did better. Or 28%, which actually happens in crowded races. If only 28% voted for the winner, then that means 72% of voters might not be represented until the next election.

{% include sim.html link='[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSPW_CQAz9K9HNN8T3mXTM0K0SBcSSMFyrCNKmpAowoKr97fX5laUInXS2z_bL83O-VKke2pas1RTsVrd868qwYww_RZefbNSGavaC1-Rou9WKpMtxiStzbNVDqZWT28sduMLom8O1kTOlvjmcqe5m6rsZKuVzlBnl0CAEIQIjAiUKMEyAHFv-nGfD2KSVYRx-NIxj2BgYwBiHEoaxbABjIqIKUS0NthSilCUhSVgjvdYiD0KWkVrSfycXB6SBaTEusWBW8wqUE9js0NUxV8dmobPjpNf9h3ZBCLiIFYGuw9Ae4nlGVT-dWk6XNBbL9NZ1h-Y87_q5aNJ84OipT6ditU-v7xxs-t1u6IvNMI6Jw8U8fExF0zyzv973xeN0notVn47T4dgpxfAQ00MCDzG9h4GYHux8JTN4iBlKGJLKgM0GrCR4kYh_WRUAETBZqMVETBbRG7GElzSO02l9-ex53sV4ntM4nC7q-xe0u0DUBgMAAA)'
title='Single-Winner Single-Choice: 28% Wins' 
caption='If you only say, "pick only one", then the winner can win with only a small part of the votes.' 
comment='crowded election, winner gets less than 25%.  Everybody is an individual.  Everybody has an option' 
id='crowded_sim' %}

If you use single-winner Ranked Choice Voting, then the quota is 50%. The ballot counts for the top choice, so there is no way that there is another candidate with more than 50% of ballots who could win. So, more than 50% of people are represented.  More than 50% had their votes matter in the election (unless they didn't use all their rankings).

**Refresher on RCV:** Ranked choice voting asks voters to rank the candidates in order from best to worst. During counting, your vote counts for your top candidate. One-by-one, the candidate with the least number of votes is eliminated and taken out of the running. **Check out the sketch below** that shows everyone connected to their first pick. Colored flow lines show some voters moving to their next choice after their top pick is eliminated.

(That's enough of a refresher on RCV to get you through this page, but after you're done on this page, [read this other page on single-winner RCV](irv). )

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04EMQz8l9Qu4md29zMQ3WqLQ1zFCShoEIJvP8dTHOKEtpg4Y4_Hzn613rZ9X4JWOWjn6MTS58mDeF2OgxrPDA4htkhmUVKe99q2Ts3a1n6sUfMKI5OF7r5MH8lkN-p_v-SW5O7ui1n_ZbhXQ572ZigI4YoNAFMcgLTAlpjtNCG1mZqkTl5K6kiCACAjhhSvAoGMDEQLorUKtJdRnnvhIhSGVMFDSVNpZ2IkBijoKUblWpbd5IyxgnmU21Fr0ZVgVW-_pS2qnQ28EawaBnYszmHTMbDDpsOmOwAD-wCHtTkGjg7gygwMG1hbePnUNBKQCDiItWDAwUDtEIAC8HIDLzcCrztGkU-ny-Xt4_Hz_Zx_3cPp9eX83L6vdVB8gMQCAAA)"
title = "Single-Winner RCV (IRV)"
caption = "A candidate needs 50% to win."
comment = "Refresher. 1 winner example. don't show power chart."
id = "irv_sim" %}

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

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04EMQz8l9Qu4kfs3fsMRLfa4hBXcQIKGoTg23E8nHTidErh-DUeT_LVejtsmwbFstPG0ikkLyYkuv5FxOZNhImjz9vS8yb7To1nd2gWz_Zw8pgF5sS-zAJth07N2qH9sDdqo3zPtpzw_2R9ZKbTzcnMcjez3s1wr3E8aSoFWQUFQVBjgwGx5FgmabClzaGeJicINUm0DEqiaRpBEDCSMJxmIAcYCXgLPKBoL7o8xeFKqFSvKvIgpIm0peKXM8sdBUBVrM0pnJLRyALrFyWmw9eOXDt6gZ6OFZrdjjMvWhZ4QixhawUHhB1YYECKgQUGpBgDBlKMQG6paQNSOFCcq9LxLg5BfRRjTSIOCAcDX8sEegO9AQlDYSBh4E1j_rb5taKST8fz-e3j8fP9lJ_y4fj6cnpu37-F24fyCAMAAA)"
title = "Three Winners"
caption = "Each of three groups is able to be represented."
comment = "three parties is a cognitive achievement. don't show power chart."
id = "three_sim" %}

Ranked-Choice Voting is better (more representative) when it allows smaller groups be represented. Five would be a great number. More would be even more representative but could be overwhelming. Voters don’t have to rank all the candidates. They just need to rank enough to get one candidate elected, or maybe two.

## Counting Ballots

The fundamental part of what makes STV work is that it counts quotas exactly once.

Once a candidate has been elected by a quota of voters, the voters have successfully used their ballot to get representation, so it is not counted again for a second candidate.  

This is kind of like how in districts, you only vote in one district.

This counting method is important because it is what allows small groups to come together to get representation and to not see each other as competing factions.

### Visualization

See the example chart below for a visual of the process of elimination.  It starts at the top and each row tracks who the **voter's** top pick is.  Each column is a voter.  Transparency is used to represent the excess vote that remains after a quota is filled. As candidates are eliminated, the groups of voters become visually apparent.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04DMRD8F9dbeB_evctnILrTFUGkIgIKGoTg21nvECkiilyM9-HZ8dhfrbfDtmlQLDttLJ1CcmNCoutfRmzuRJg4-twtPXey79R4ng7N5nk8nDxmgzmxL7NB26FTs3ZoP-yN2qjY81hO-L-yP7LS6WZlZblbWe9WuNc4njKVgqySgiSksQEgLDUWpAy2xBzqCTlBqEmyZVKSTRMESdBI0nDCQA00EogWRGDRXnJ5msNVUKmzqqhDkCbTlo5f1mx3NIBVcW1O45SMRjZYvzgxA74O5DrQC_UMrNjsdpx5ybLAE-IStlZywNiBCwxYMXCBASvGAMCKEagtNW3ACu8Ark7HuzgM9VGKNYU4KBwKfC0IKAicDVgYCoCFgTeN-dvm14oqPh3P57ePx8_3U37Kh-Pry-m5ff8C6DPT3QgDAAA)"
title = "Voter Chart By Round"
caption = "See the chart at the bottom for a visualization of where votes were counted towards a candidate's victory.  Mouse over the rounds to see how the chart progresses through the rounds. "
comment = "voter chart time"
id = "voter_chart_sim" %}

Below this chart is another chart which I called a **power** chart.  When a candidate is elected in a round, the voters whose vote counted for that candidate are added to fill up the power chart.  The intuition is that the voter could have voted for someone else, so the candidate owes them some share of their power.   (This is best viewed on a bigger screen. there's a lot of bookkeeping to do between rounds.) 

In the background is a dark bar that shows what total equality would look like.  The height of this bar is each voter's ideal share of representation.  As candidates get elected, the bar is covered, showing that voters got represented.  Any part of the bar that is still showing after all candidates are elected shows that some voters are underrepresented.

(The voters and candidates are arranged in a line by using an algorithm that solves the traveling salesman problem to keep voters together who are near each other in 2D space.  Specifically, the ballots are used as coordinates or feature vectors since this 2D space isn't something you'd be able to see in an election.  You can wiggle around the candidates in this chart to see them take the traveling salesman's route to visit all the voters.)

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04DMRD8F9dbeB_evctnILrTFUGkIgIKGoTg21nvECkiilyM9-HZ8dhfrbfDtmlQLDttLJ1CcmNCoutfRmzuRJg4-twtPXey79R4ng7N5nk8nDxmgzmxL7NB26FTs3ZoP-yN2qjY81hO-L-yP7LS6WZlZblbWe9WuNc4njKVgqySgiSksQEgLDUWpAy2xBzqCTlBqEmyZVKSTRMESdBI0nDCQA00EogWRGDRXnJ5msNVUKmzqqhDkCbTlo5f1mx3NIBVcW1O45SMRjZYvzgxA74O5DrQC_UMrNjsdpx5ybLAE-IStlZywNiBCwxYMXCBASvGAMCKEagtNW3ACu8Ark7HuzgM9VGKNYU4KBwKfC0IKAicDVgYCoCFgTeN-dvm14oqPh3P57ePx8_3U37Kh-Pry-m5ff8C6DPT3QgDAAA)"
title = "Power Chart"
caption = "See the chart at the bottom for a visualization of where votes were counted towards a candidate's victory.  Mouse over the rounds to see how the chart progresses through the rounds. "
comment = "power chart time"
id = "power_sim" %}

### Quota Excess

What happens if a candidate gets more votes than just a quota?  The rule is that exactly a quota of votes is used up by the winner, which means the excess number of votes above the quota remains in the count.  These votes will count in proportion to that excess amount.  It's a calculation of dividing the excess by the quota to find the new weight for the vote.  This bookkeeping makes sure that the power each voter gets from their vote is the same.  It makes sure that all voters are as equal as possible.

### Quota with Other Ballots

The concept of a quota extends to multiple ballot counting methods:

1. Single-Top Ranking Methods: the Single Transferable Vote (STV), also known as multi-winner Ranked Choice Voting RCV
2. Scoring methods (including Approval Voting and STAR voting): Monroe voting and a few methods I'm working on
3. Pairwise ballot methods (I'm working on a version of minimax)
4. Choose only one methods: Single Non-Transferable Vote (SNTV).  An obvious Improvement would be to have a Single Transferable Vote.

After you're done with this page, [read this page (currently a draft) about all the different kinds of proportional voting methods.](proportional)

## Proportionality

Let's get back to the idea of proportionality.  You can see that in STV, a voter group with two times as many voters gets two times as many representatives.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31Su25UMRD9F9dTeMbzuHc7PoACEqVZbXGBLSKW7CoKCBTBt2c8JyhFCHIxZ97Hx35sve32e-3E1g-0Z06knkiVpK8z1J2ER6Klk1QuVmLhBCJB7LNKQhPJRD6zvWKWnTbR4ETLM2Lxw4Eaz82R-7xKzIgjZmK0Xaembdf-sDdqVr5nudCrk_WRmU6vTmaWNzPrmxnutY4nvUFBWkFBENRYYUAsOZZJGqxpcylL2lzB1CTHZVRyXAZFYDBHFCU5Z6TBHAl4C7y1GkYvvjzV4UoMqd4xkAejkZP2KfC_zmx1FGPDgAb5MjRIycjztgvl62VwliuWzvsrv0B5gaPepGq1Zur_CagXaQ28MK6oEMqgu-F6BqEM1zMIZQYDoSyQW2qzQSjvMFyVjmdzyO1WzPMrN8cIBwNfywQYBHoDAseAgcABBjE_Y_vw_fywXX0-3x_zk5bz7nK5P__YTn_997d3t9-2n-leXd-0-VWj-j9tp9P54frX5Zif_ON29_X4pf1-ArGk_O2MAwAA)" 
title = "Quotas Give Proportional Results"
caption = "Here's two groups with a 1:2 ratio (really 4:7).  The winners are also in the same ratio."
comment = "Maybe choose a more interesting example. altlink is [link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31SvW6UMRB8F9dbeNf27vddxwNQQCKa0xUfcEXEkTtFAYEQPDuznpwUKQS5mP3f8di_Si27_b5X0VEPsleF1R1W72J1zVB1MW2wzFQ0sswWlIXBiiHWMxnIWdabr7BmVSZ1pNUU1vJkqfnhIEVzczTRJfuXgKFZ0V3Ul6xoZVel9LIrf9SLlDF9R5_Ji4P6QKbKi4PM8mpmfTWjda7T5NkkpD-FjWGS004gNbCcACLagVirBsQSgGEgooaBDWAMco5hjgIGc5xjQW-hxymtTsaa-uhMNJu9rTFPRg2T9tD6XydbncXc0KgCHkmadBniuO8ieEgEs7zXq0zp6HPHnjvtujSdPmf3_xPpPsn34Fvzqn2dwcEXGLzmoGCD1xwUbAwCBRvB3DI3DwrmlaCz0vl8Ttl9TPb4gMU5wsnA1wlBBsHeoNDRCBQ6yCDyW5Z3386P282n88MR33U6by6Xh_P37XT1397d333dfsC9uf1Q8tPG7P-4nU7nx9uflyO--_vt_svxc_n9Fwg5q72fAwAA)"
id = "proportional_two_to_one_sim" %}

This proportionality applies even when there aren't distinct groups.  Let's look again at the example we saw ealier, but now using the additional charts.  

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA41SyWpcQQz8lz7r0Np6mc8IuQ1zsLFPMUkOuYQQf3uqVQOxMYHQ8LSX6kn61Xq7XK9zyVg3uZp1WVmKii6Hprnv2nbROFkaCLodrbvsfpRlsk-h7i5qcTT1e6Glyaj0DFmz4ANZ1TG6mB1fugy_3aTpYWSRpJRdhlbThfZWJUNMx0n1dunSol3aq44mLcseADD58JA_Eeny4SGyEAFIB8irjfpaQwyyt3eZuzLN37rfhAFxOKhWK5cpUW6jm4w1KMgX1EuAnQYkuGhC7nKj_wVeA6BCAMcgiGNBJ3Acgjg2aS1auwq8Fx89Q9MKuFWtO-Nk5EC6Yrv_fgdgsIR9fBMZI3YJwdrwz0twNXCiwOQcAi6iRf87_mPqvRdphb2PgtfVAanixwQ_zCT-h1-M-rOYvA7OIXY5k-tJziA5zeQMktNMbiU5zZyMrfrZ5DRHp-BOBnc7iDKyzu-QHoQYZDC4z0kGk7WTW5hOwS1MMpjnkM_Vzgo-Pry8fPvx-ef3Z9z7p4evX56f2u8_e1HuzMEDAAA)"
title = "Evenly Distributed Representation"
caption = "With five representatives, STV can spread them out to be closer to the voters.  (Dots are used for voters and circles show candidate totals, including transferred votes from eliminated candidates.)"
comment = "to show how STV can prevent factions from fighting each other."
id = "even_2_sim" %}

<!--Add a section on gerrymandering-->

## Footnotes

### Party Proportional Methods

Additionally, there are ways to have proportionality by using a party system, but that is a mechanically-different method that I haven't added to the simulator yet, so we'll discuss it on another page to come in the near future.

### Strategies

I still need to work out what the strategies would be for voters and candidates.  So far, in the above examples, I've been using the honest strategy for ranking.

## Afterward

The main drive for STV is to have representation of all diverse groups and to include minorities. Group bargaining in this representative group would ideally be able to offer a policy package that includes a little bit from everyone at the table.  This is also a vision of a more responsive politics.  We don't have to wait until the election.  We can represent each sector of the population today, so that when an event occurs, action can be taken.  Also, proportional representation is a further way to avoid antagonistic campaigns.  It won't get rid of partisanship, but it might prevent it from being broadcast to the voters.   We can change the political culture and have campaigns that are capable of bringing groups together to achieve a greater goal.

