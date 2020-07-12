---
layout: page-3
title: Proportional Methods
description: An Interactive Guide to Proportional Voting Methods
byline: 'by Paretoman, June 2020'
---

I'm going to describe how we can motivate proportional voting from a mathematical perspective, and we'll look at simpler methods that keep the same motivation.

[You may first like to read this page on STV to see the political motivation for proportional methods](stv).

Then continue on to read about proportional voting methods other than STV and how they compare.

## A Closer Candidate

Proportional representation is similar to a well-known problem called the facility location problem. Say you’re in the grocery supply business. You want to save on gas, so you want to minimize the distance between the distribution facility and the grocery stores. So you want to minimize the sum of the distances between each store and its assigned facility. 

**Facility Location Problem** - Colors indicate facility-store assignments. Blank facilities were proposed and rejected. Northern England is pictured.

<img src="img/facility location.png" alt="facility location" class="picture100" />

Let's apply this idea to voting. Above, we're selecting multiple facilities to serve a larger set of stores. Now we’re thinking of electing multiple candidates to multiple seats in a legislature for the same voter population. 

We already used the idea of minimizing distance to find a candidate that is in the middle of the voters (on the common ground page). This is what the median does.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA4VTu04EMQz8l9QRih9JvPsVFHSnKw6JAmklEDoKhLhvx-tJruHQaYtxHHsynk2-U0nr4ZgTORyoUmYrx3xYZkBLHRFzmTnqM9JrrsmMuo6ot9kqNiKdqbbMvQYK1yBp5Zw0relSUk41rSWnBn3doeQ_n--Y76QL7R0X5nSjYokK5holUm7VeP9-GtGwg7EUgAKgiBrAJZE6GpZ-CuXEzuNJppjF9QSAhhUlTiMOoOGOFVh4iQYZf0UosgI1AoMEaqSOmoYseGRBVncGyv98ewHddvTqiPK9Arl3hIYkHUK1xfjaQ75iYIVtFfZXzFthW5Xor7CtVgBsqx0lhpIFd6VEsoGlwbUG81uNccSFNFA0KGjo7VDQKU7pDBAAHO_4_31eyY5NC2J_MHsO4xjIDGQGIQYhpiHSKgBaDFxmgF3SQ_ebW2L9fNq2t_PT1_uLv43H7fPjtL2ev9LPL23Jkue-AwAA)"
title = "Median in 1D"
caption = "Recall this example of finding the median. <b>Try moving some voters. Add a candidate (+). </b> The total area of the bars below is the sum of all the distances between the voters and the candidate or median. The median minimizes this sum. A winning candidate should also minimize this sum."
comment = ""
id = "median_1d_sim" %}

A median can also be found in two dimensions by using the same idea of minimizing distance.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA4VTwUpEMQz8l56DNGmS5u1XePC27GEFD8KCInoQcb_dpLOC4Iq8wzTJdDpN8z5ab7v9gRon7FmERMeB9hHEvOWCw4i9V0ppFk4mtuIMTQ4Xp3fizWuluS9qZZIpq5QbudaiNnLUSiatmrCTcGmJZFH5kE5G23Vq2nbt3Bs1W6HD5Uzo9OvLSmSlnbl2nEXaFca2GCK2KKNf4-T-Oo350hRBCEusADhiB6Ql1sRAmKcwNUmdTErqSIIAICOKKGVGAmRkIoKKbIsyLm8zeGUH3IyBItwMu3AcWeiMDVkthezsX19R-HpPf3RF5X_K-P8gXdb0Ylh9dUonnhsXV7TP8AyGexvaZ2P11BQUA6B9NkGJdYRtmJm-kg4VR_ccj-C2rpSj1xwSDgeOvRMOJq9TpgAGAJ2fmIP5PZoTxVjCTFI5XCcgFhALGAkYCUxDGABeAloRgLJ0M3OC-4rvj6fT0-vd-_ND_iO3p7eX4-nx9b19fgGnVnGdzAMAAA)"
title = "Median in 2D"
caption = "<b>Move some voters. Add a candidate (+). </b> Just like for the 1D case, the total area or length of the lines below is the sum of all the distances between the voters and the candidate or median. The median we chose here minimizes this sum. A winning candidate should also minimize this sum."
comment = ""
id = "median_2d_sim" %}

We can get distances from score voting, or approval voting, or star voting. We can just use the ballot scores and try to find the candidates with the highest scores. This is the same as finding the candidates with the shortest distance to the voters. You've seen this before on the common ground page.

{% include sim.html link='[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQU4DMQz8i885xI6dbPfMD-ht1QO0i6hUdau2CCEEb8fOlAuoymHs2J7MOJ-UaZymVhNr26SJeUg81IjMI5WIhna7E_GotM0mEccYZ8-zRl5ozImURuZE5pCoektO_443t7uV4W5ldbfCub_NISlSQQpFrAAD1K6MXQCroz9nDqteFOfxS-HeIwIAjSgypykOFZcN2YDMWcQXkbtQjp2AqYCpgKmAqTjTxOl2orliHJwFdjlJKkm9rEEbfRo2w7bKb-DEU4lA-6z-pVa41oY_glxd9UvD8owBkGqQatid4TsNpq11nTb0twymawbAcMUPVLBU61ZCYAVFhYKKtTcoaJht0pmenw6H5br-OM000uN2Oc-U6PK6vD_Ml-15f7rul6NXvt-Ou_llf5x39PUDc7xiOMsCAAA)' title='Scoring Measures Distance' 
caption='Basically, scoring asks, "Is the candidate close to you?"' 
comment='simple,lots of candidates, one voter' id='score_sim' %}

Let's introduce now a new idea that we are also going to make assignments. Each voter will be assigned to exactly one candidate out of the set of elected winners. Only the scores they gave to that candidate will matter for the optimization. You maximize the scores that each candidate gets from only their assigned voters. That means a candidate can get closer to their assigned voters. This is very similar to districts except the voting system is doing the hard part of dividing the voters into groups.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VTsU4DMQz9l8wWih07zvUDmNhasZw6HFWHSicKqAwVgm_HyRuKBCjDc2L7-eVd7iPltJlnzcSW9zQ3IWGLgDMTlxFZJsnSo2ki1haRqJJIPxP3aOX9nhJ3Jg-m2tvEjNi9J0raZEqaNulLOFGysa9RHkkPyPRrRab9m5n-zXAe3Ny1FHLSnuDWM4IMxLACIIUrILSwBsZkD4gxTEmCMg5D-UYCBAAaUZQETQkAjTh2DbtpNJQ8NHO3g0eiyOgtBXkIKsE0h_O31RsqSsBbcHsmoUJKRjVKFPTdAuVbKLcwxswy6FQHj_41SusQpY5PhisojDB4a5BvMMIg32CEGQBGmCPXxjyDETUDeFRWfJUKO6sNvSWEVFBUKKjTAIcCR6_DQC8AGOhQ4P11pe3uMZ7b8fV9We-Xw2k9Xa4P58NyOZ2fU396jtr209B-jvu2DMC0BqUNSpuOWzQDQGwDX4Pm1jXfWbxWqH5a1vV82V1fjvEjbA_nt2P6_AbVg3LOfwMAAA)"
title = "Equal Facility Location Problem"
caption = "Similar results to STV in broadness of support."
comment = "Maybe choose a more interesting example."
id = "facility_sim" %}

That was actually a lot of computation, but the good thing is that this problem is already solved. There are techniques called the branch and bound method and the Simplex method that are used together to solve this problem. Basically, branch and bound means you can look at all the possibilities without calculating every one. You put them into groups called branches, and the best-case scenario for that branch is bound by some value. Then you can cut branches off and simplify the problem. 

If you would like to know more about branch and bound and Simplex, they are part of a more general set of algorithms called mixed integer linear programming. These tools are used in the business world in what is known as the field of operations research. They deal with logistics - physically moving around things, like groceries. They also apply to our case of electing representatives to serve voters.

This is a good method to inspire other methods like the Single Transferable Vote, STV. Voters might be more willing to accept STV because they can see the calculations being done. Also, STV gets pretty close to the motivating idea of the facility location problem, and if you compare their visualizations, they look very similar. There are more methods like the Monroe method that are also very close to this motivating idea of optimizing assignments of voters to the candidates they scored highest.

## STV's Quota

STV uses a quota to assign voters to candidates in a similar way to the facility location problem.

Once a candidate has been elected by a quota of voters, the voters have successfully used their ballot to get representation, so it is not counted again for a second candidate.

**Refresher:** STV asks voters to rank the candidates in order from best to worst. During counting, your vote counts for your top candidate. One-by-one, the candidate with the least number of votes is eliminated and taken out of the running. **Check out the sketch below** that shows everyone connected to their first pick. Colored flow lines show some voters moving to their next choice after their top pick is eliminated. 

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31Ty05cMQz9l6y9iJ3Ezp1dP6ALHmIzmsWlnQXqlBkhQCBEv722DxWVKNVdHL9inxznvpRaNtttr8Sj7mjL7FZXt3onqUuEqpJwc2tWkszZQizshogRa1SJdbckLI1szdjwkyOsxm7NN4tFdzsqHJPN52mWjEFsFolWNpVKL5vyi7VQGemrlwt9-LzePFPpw-eZ-Wlm-TTDNcdx0GtkFNrMiAviYMcdAG5OM8GZcHf0uSyOPoWpiHf0qHhHD4oA0Ec6SrxPc0AfMXgT3pIHWk3KHAJxJprk2daQB6Pmnbau8b--OKooxoQGGXw51KjTIPULT_IFejDKO4aGLp3fTXk3W64la3v27P8n0DVJd8OSccUOoQakH7jegFAD1xsQagwAhBqG3MzJA0JpBaCLYm2KLjpyq_FqFC0UDHRJMDAwzikGga0BILCBgcV7LGcPx_v14tvxbu_vNJ0vp9Pd8XE9_PG_3tze_Fyf3L24vCrxWg3n59_SRxwazJpwvR4Ox_vL59Pef4Pz9fbH_nt5_Q0IWhoZrgMAAA)" 
title = "Quotas Give Proportional Results"
caption = "Here's two groups with a 1:2 ratio (really 4:7). The winners are also in the same ratio."
comment = "Maybe choose a more interesting example."
id = "proportional_two_to_one_sim" %}

Notice the chart that shows a visual of the process of elimination. It starts at the top and each row tracks who the **voter's** top pick is. Each column is a voter. Transparency is used to represent the excess vote that remains after a quota is filled. As candidates are eliminated, the groups of voters become visually apparent.

Below this chart is another chart which I called a **power** chart. When a candidate is elected in a round, the voters whose vote counted for that candidate are added to fill up the power chart. The intuition is that the voter could have voted for someone else, so the candidate owes them some share of their power . (This is best viewed on a bigger screen. there's a lot of bookkeeping to do between rounds.) 

------

***Draft*** - the first part above is nice. The second part below is a draft and includes voting methods that are in development.

------

## Using STV's Quota with Other Ballots

The concept of a quota extends to multiple ballot counting methods:

1. Top-choice-counts Ranking Methods: the Single Transferable Vote (STV), also known as multi-winner Ranked Choice Voting RCV
2. Scoring methods (including Approval Voting and STAR voting): the facility location problem, Monroe voting, and a few methods the election method community has developed.
3. Pairwise ballot methods (I'm working on a version of minimax)

<!-- SNTV? SNTV kind of is proportional-->

The power chart is more useful for scoring methods because the voter can support multiple candidates at the same time. That means the voter is able to say that their vote counted for a candidate so that candidate owes them some share of representation. Also, the votes by round has an additional data dimension for the same reason, and it's hard to visualize, so you need to mouse over the rounds to see how the election was counted.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04DMRD8F9dbeN--_AZ0pxSA0kUKQjQIwbez9hAUCUVXjNezOx6P77P1dth3TcpxpJ2lU0otTEh0-90RmysZnXiRwlIrPh6p8ZxOreY5nkGRs8GCOMZs0Hbo1Kwd2jdvjZqvOmqsyCzo9O8rZtxltrsM96XNDHEWlHDABsD5HIAywFZYx0VBaQs1KZ3alNLRAsEmZKRkuMDBQUYS1UAFFe3LKM8MeBEqa1YVPAxpKe1Mf99sDzRAVXFhJiElJ6sG69cMZsG3hdwWepWehS01-3-cxbJliZfCJWxbm45IHRdwROG4gCMKdwCi8AQ31mmOKKIDeHUG3iUQaPhyrGUkIBFwENuChIPEbCLCVAAiTLxpXn-qBDlucpupJa40IDggOCA4IDhsGR0OwDs8P53Pl_fHj9dT_cQPL5e3U_v6AVYwU-E3AwAA)"
title = "Score Voting with Quotas"
caption = "Similar results to STV in this three-party example. Mouse over the rounds to see the progression."
comment = "Maybe choose a more interesting example."
id = "score_quota_sim" %}

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSsWpDMQz8F88aLMmSnGz9h26PDCl0CySUUiil_fbKuqYEQvBwlk8-n8_-ar3tt02DYh5oY-kUkpMhJLr7W5GxZjI7cZHCkjM-HKjx2h2r2ZIIIx-rYRix22rQtu_URtu3H45Gzar23JZkJHS6G8nMh8zuIcO9tJkhzoISDngAcD47IA3wSMzjPCG1hZqkTi5K6miCYBEykjKcYOAgI4FqooKK9jLKKwMuQqX2qoKHIU2ljel_rHZHA1QVF2YSUjLKeNvo1wxWwbeF3BZ6lV7FKLVxf9zwsjUCL4VLjF0tGiI1XMAQhWnlY4jCDIAoLNAy6zRDFN4BXJ2Od3EE6laONY04JBwOfFcQcBDYG4gwFIAIA28a108VIOdNbiu1wJUmBCcEJwQnBOcoo9MAeIeX4-l0fn_-vLzmJ366XN7OH8dT-_4Fp_UcyToDAAA)"
title = "Approval Voting with Quotas"
caption = "Pretty much the same as score. Mouse over the rounds."
comment = "Maybe choose a more interesting example."
id = "approval_quota_sim" %}

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSMU4EMQz8S2oXsZ3Y3n0GolttcYirOAEFDULwdpwMi046nbaYOONMxpP9KrWs26ZOHjttLJVcctGERJe_HWljJVGJJyksueJ9p8LjtGs2j-NuZD4amhFbjAYta6XSylp-OAqVPmvLY0l6QqWbL5m4yyx3Ga5TmxniLCjhgBsA97MB0gC3xLzOElJbqEjq5KakjiYINiEjKcMJHRxkxFEFKqhonUZ5ZMCTUBhSKCkMaSptTP_faDcIQFUxMJOQUqeWDa0eGYyCrwu5LvSQHkWbau32umZzpOZ4KQzRlrnZEWnHAB1RdAUgit4BiKI7uJi3dURhFcCz0xCDIQbr07GmEYOEwYEtExwOHGddAApAhI439eOncpBxldtIzTFSQDAwUsBMwExAMCAY8PN0ulzePh4_38_5Ez-cXl_Oz-X7F5mNX244AwAA)"
title = "Pairwise Voting with Quotas"
caption = "Under active development. Mouse over the pairs."
comment = "Maybe choose a more interesting example."
id = "pair_quota_sim" %}

## Proportionality

Let's get back to the idea of proportionality. You can see that in these proportional methods, a voter group with two times as many voters gets two times as many representatives.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31TTY8TMQz9LzlbKHbsJNMbF05wgF1xGfUwlB6qHTpl1UWsEPx27DzQIsGikfr8Ffv5Jf2WctrNs2Ziy3uamd3S6pYqSZ4ilCsJF7d6Jhm5NhELuyHSiGtUSVO3JKwa2Txi5ictrMJu9V8WS93vKXFMbj6vjhIz4tYiUdIuU9K0Sz-4Jko2_OrlnmwOmf76PNOfzUzPZjiP3hxcCjXSSATRxIIMyLACQMVZDXAurI4-mcXR5zAl8Z4eFe_pQREA-oiixPsUB_SRBq_Dm8aBkgdpDj14JAoYlYI8GBXvNLuk__riaEUxJhQI4XdBhZSMqq_cye_Lg1GuGBrKKD-Z8mT68FlGa9XRU_9PQOtYWBvuFCsqhDKIb1jPIJRhPYNQZgAIZQ25PiYbhKoZwKOyQqQKuasN5v54U0WLCgZ1GtDAoOFsE0ABQOAGBi2eX3r7sF2Xm8N2f_RnOZyXl8v99mVZf_tvTufTp-Wruze37_33-PlhWV8th9N6uj6-3g7L9bSdU7zjhr79zyuJOLTpGQBtOrbq2Krr2LgbAIt19OvYr8d-L8yfPjb8sKzrdr19vBz9X_VuOd8dP6bvPwEoyRya_QMAAA)" 
title = "Quotas Give Proportional Results"
caption = "Try all the voting systems. They each give a 1:2 ratio of voters between the groups. Also try a larger number of seats. The large group is 63% of voters, so it's a 4:7 ratio."
comment = "Maybe choose a more interesting example. altlink is [link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31SvW6UMRB8F9dbeNf27vddxwNQQCKa0xUfcEXEkTtFAYEQPDuznpwUKQS5mP3f8di_Si27_b5X0VEPsleF1R1W72J1zVB1MW2wzFQ0sswWlIXBiiHWMxnIWdabr7BmVSZ1pNUU1vJkqfnhIEVzczTRJfuXgKFZ0V3Ul6xoZVel9LIrf9SLlDF9R5_Ji4P6QKbKi4PM8mpmfTWjda7T5NkkpD-FjWGS004gNbCcACLagVirBsQSgGEgooaBDWAMco5hjgIGc5xjQW-hxymtTsaa-uhMNJu9rTFPRg2T9tD6XydbncXc0KgCHkmadBniuO8ieEgEs7zXq0zp6HPHnjvtujSdPmf3_xPpPsn34Fvzqn2dwcEXGLzmoGCD1xwUbAwCBRvB3DI3DwrmlaCz0vl8Ttl9TPb4gMU5wsnA1wlBBsHeoNDRCBQ6yCDyW5Z3386P282n88MR33U6by6Xh_P37XT1397d333dfsC9uf1Q8tPG7P-4nU7nx9uflyO--_vt_svxc_n9Fwg5q72fAwAA)"
id = "again_proportional_two_to_one_sim" %}

This proportionality applies even when there aren't distinct groups. In the example below, there is a difference between STV and the other methods. STV picks a set of candidates that is spaced more widely to cover a larger area of voters. The other methods tend to pick candidates more toward the center. This is probably because STV considers the first choices above others, while the other systems consider all the options at the same time.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA41Ty24TQRD8lzm30EzPq9c3LpzgEBJxsXxYjA9WjNeJHESEyLdT02WEI4SELG2_pqurH_4RYlit192k2UbWqlGsupIkWYaW6nTRpiypmLtUkqahxSxTHErH--jaFBEsQ0v5kqlIaOqZRaw7fsErL1miqA5fzdLyZiMhDUpaKjnVKM1rFUN99ZQmmtp4msMqSihhFV5SCxKq2w0ACHaIKH_9EDFEkBGR8aLNvxoQg4zh1cvJX2q-dl-FATEKpuSlkg2X0kVqqVCQGDi6ALNUIMEjVcjJ3ai9glcBliCAoxDE0UIncDIEcbTTMlqTJ-RILmM6yQOZjHJmnIwykNZY2r9_A6AxhXXyRGRRyVIE-5EuJrgPOJGAqxgngrwS_4x-mOlSi7SKvo6C1zoDMkkeJvhhJuV_-JXmUymdZ8A5lMmdlaupnEHlNCtnUDnNWik4zdoZM2-2cpqNKI0ojZNsRGmDojrpRohGBo377Mzt3GdXikzBLXQy6ONiw83Tcp5vt8vjDhfpxtvT6XH5Nh9-2x_2x_3X-TvM27tP-O4enubDu3m7P-zPz--X7XzeL8cwTr8T1643NvycjUUKMjN2Zbw0K96cVQo2ZsQz9mejvzdY0sQOP8-Hw3K-ez7t8Ef8OB_vd1_Cz19X_VUPWwQAAA)" 
title = "Differences Regarding Evenly Spaced Winners"
caption = "STV picks a broader set of candidates to match the voters, but other methods pick more broad candidates that more voters would like."
comment = "The explanation is going to be tricky"
id = "distribution_matching_sim" %}

### Semi-Proportional Multi-Winner Methods

There are more methods that only provide proportionality to distinct groups, and don't provide the kind of distribution matching that STV does to cover an area of voters with evenly spaced candidates. They are mechanically different. They apply a method of counting votes that is used for apportionment. Apportionment means you have separate groups like different states, and you want to find out how many representatives to give to each state. Two examples are given below: reweighted range voting and reweighted approval voting. 

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31TPY8TQQz9L1NbaOyxx5N0NFRUdyeaVYoQpYgUEUChOCH47dh-SIcEh1ba5_Xn85vZ7623_bZpJ7Z-oI05LJ1hqZL0Xbr6JOER1uokFfMdsXAYIk48M0tcw5K0ZkZ7-SwqLa3BYa3fFss8HKhxTvaYNyvFjNg9A6PtOzVt-_aTtVGz-p6RHkEP6PTXE5H1amT3aoR79ebkMshJM5BEGwsiIBM8CkCFJyC4sAbGZJbAmMPUJHqGV6JnOEUA6COKlOgzAtBHHF8LX7sqGL1Ic-rBFRhStWMgDkYjOm0h6b-eLJ1IxoQBIeIsaJCS0YyVF8V5hTPTFUNTGeUXU17MGL5JtVatNfX_BHQWaXWcKVZUCGUQ37CeQSjDegahzAAQyhyxVdsYhJodwJU5cWwTck8r5nF520SLCQZzV-Bg4Kh1COwDAIEdDDyvX3t8-hD38eGh3m_zff7y7Xh9dzxdrpf78_vb6Xi_3D61vKeOuvWn5OnH7qsDMHmB9QLrpbXRMgCIL_Rb4L-S_xuLq40NPh6v19v96fnzOf6ax9Pt67n9-AW7Hm2n3AMAAA)" 
title = "Semi-Proportional Methods"
caption = "STV picks a broader set of candidates to match the voters, but other methods pick more broad candidates that more voters would like."
comment = "The explanation is going to be tricky"
id = "semi_proportional_sim" %}

### Party Proportional Methods

Additionally, there are ways to have proportionality by using a party system, but that is a mechanically-different method that I haven't added to the simulator yet, so we'll discuss it on another page to come in the near future.

## Future Work

I still need to work out what the strategies would be for voters and candidates. So far, in the above examples, I've been using the honest strategy for ranking and the normalization strategy for scoring.

## Afterward

I hope that by seeing how proportional methods work you're inspired to improve our ability to represent all members of society. Basically, proportional methods allow candidates to better serve a segment of society by being closer to them.

