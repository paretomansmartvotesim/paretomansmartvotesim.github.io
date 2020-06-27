---
layout: page-3
title: Proportional Methods
description: An Interactive Guide to Proportional Voting Methods
byline: 'by Paretoman, June 2020'
---

***Draft***

------

[First, read this page on STV to see the motivation for proportional methods](stv)

Then continue on to read about proportional voting methods other than STV and how they compare.

**Quota with Other Ballots**

The concept of a quota extends to multiple ballot counting methods:

1. Single-Top Ranking Methods: the Single Transferable Vote (STV), also known as multi-winner Ranked Choice Voting RCV
2. Scoring methods (including Approval Voting and STAR voting): Monroe voting
3. Pairwise ballot methods (I'm working on the version of minimax below)
4. Choose only one methods: Single Non-Transferable Vote (SNTV).  An obvious Improvement would be to have a Single Transferable Vote.

The power chart is more useful for scoring methods because the voter can support multiple candidates at the same time.  That means the voter is able to say that their vote counted for a candidate so that candidate owes them some share of representation.  Also, the votes by round has an additional data dimension for the same reason, and it's hard to visualize, so you need to mouse over the rounds to see how the election was counted.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04DMRD8F9dbeN--_AZ0pxSA0kUKQjQIwbez9hAUCUVXjNezOx6P77P1dth3TcpxpJ2lU0otTEh0-90RmysZnXiRwlIrPh6p8ZxOreY5nkGRs8GCOMZs0Hbo1Kwd2jdvjZqvOmqsyCzo9O8rZtxltrsM96XNDHEWlHDABsD5HIAywFZYx0VBaQs1KZ3alNLRAsEmZKRkuMDBQUYS1UAFFe3LKM8MeBEqa1YVPAxpKe1Mf99sDzRAVXFhJiElJ6sG69cMZsG3hdwWepWehS01-3-cxbJliZfCJWxbm45IHRdwROG4gCMKdwCi8AQ31mmOKKIDeHUG3iUQaPhyrGUkIBFwENuChIPEbCLCVAAiTLxpXn-qBDlucpupJa40IDggOCA4IDhsGR0OwDs8P53Pl_fHj9dT_cQPL5e3U_v6AVYwU-E3AwAA)"
title = "Score Voting with Quotas"
caption = "Similar results to STV in this three-party example.  Mouse over the rounds to see the progression."
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

**Proportionality**

Let's get back to the idea of proportionality.  You can see that in these proportional methods, a voter group with two times as many voters gets two times as many representatives.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31Tu24cMQz8F9UsRIqktNf5A1wkNtIsrlgnVxg--w6GEyQIkm8PxYnhALGNLYYvkcOR9mepZbeuWomt7mllDks9LFWSusxQdRJuYY1Kkrm-EAuHIdKJfVZJ17BkWj6zNWMWJ21ajcMafy0W3--p8JzcY55niRlx7zPRyq5S0bIrv9kLFUvfozySPaDSf19kxpuZ5c0M1-zNk0ujTjoTk2hhQQZkWAGgEqwSggtrYExmCYw5TEWiZ0QlekZQBIA-oiiJPi0AfaTDG_CWPNBqkuapB2eigVFryINRi05rSPraN486ijGhQYi4C2qkZOSx8qC4rwjOcsXQqYzyiykvZgxfJVurZk99n4B6Lqwdd4oVFUIZxDesZxDKsJ5BKDMAhLKO3MjJBqG8AjgrHSI55HZL5vF4i6OFg4EvCR0MOs52ATQABO5g0OfzKx--np62q8-nx0M8y3QuzufH07ft-Oxf3j7c3m_fw726_lTme-04P_6VfsahwagAaDDAfoD90NxsGABXebMdj6en6x_nQ_wfH7eHu8OX8usP0POY5scDAAA)" 
title = "Quotas Give Proportional Results"
caption = "Try all the voting systems.  They each give a 1:2 ratio of voters between the groups.  Also try a larger number of seats.  The large group is 63% of voters, so it's a 4:7 ratio."
comment = "Maybe choose a more interesting example. altlink is [link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31SvW6UMRB8F9dbeNf27vddxwNQQCKa0xUfcEXEkTtFAYEQPDuznpwUKQS5mP3f8di_Si27_b5X0VEPsleF1R1W72J1zVB1MW2wzFQ0sswWlIXBiiHWMxnIWdabr7BmVSZ1pNUU1vJkqfnhIEVzczTRJfuXgKFZ0V3Ul6xoZVel9LIrf9SLlDF9R5_Ji4P6QKbKi4PM8mpmfTWjda7T5NkkpD-FjWGS004gNbCcACLagVirBsQSgGEgooaBDWAMco5hjgIGc5xjQW-hxymtTsaa-uhMNJu9rTFPRg2T9tD6XydbncXc0KgCHkmadBniuO8ieEgEs7zXq0zp6HPHnjvtujSdPmf3_xPpPsn34Fvzqn2dwcEXGLzmoGCD1xwUbAwCBRvB3DI3DwrmlaCz0vl8Ttl9TPb4gMU5wsnA1wlBBsHeoNDRCBQ6yCDyW5Z3386P282n88MR33U6by6Xh_P37XT1397d333dfsC9uf1Q8tPG7P-4nU7nx9uflyO--_vt_svxc_n9Fwg5q72fAwAA)"
id = "proportional_two_to_one_sim" %}

This proportionality applies even when there aren't distinct groups.  In the example below, there is a difference between STV and the other methods.  STV picks a set of candidates that is spaced more widely to cover a larger area of voters.  The other methods tend to pick candidates more toward the center.  This is probably because STV considers the first choices above others, while the other systems consider all the options at the same time.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31Ty25TQQz9l1l7Mfb4MTe7fgAL2qqbKIuAuqgUSFQVRFXBt-PxARUJiiLd49fYx2cmL6233X6vndj6gfbMaamnpUrStxXqTsIjrdlJKhcbsXAaIkHsq0pC05Jl-cr2ilmetGUNTmv-slj8cKDGa3LkPK8SM-KIlRht16lp27UfrI2ale9ZnslI6PTXLzPzzcz2ZoZ79ebFZVCQrsQi2liQAZnkUQAq7IDkwpqYk1kScw5Tk-yZUcmeGRQBoI8oSrLPSEAfCXgT3lYHRi_SvPTgSgyps2MgD0YjO-1T0n_91lFHMSYMCJF3QYOUjDxXnpT3lcFVrhi6lFF-NeXVzOF7qdaqtab-n4B6kdbAnWJFhVAG8Q3rGYQyrGcQygwAoSyQm7WNQSjvAK5Kx7U55HYr5vl4m6OFg4FvBQEGgbMBgWMAIHCAQazn195_OT8dbz6eH-_zWZZzdbk8nr8eT7_9dw-fHz4dv6V7c3uX3-vr-l7dtfV2A73mn9ew4tBjdgDYTLCZYDO1tpwGwLV-OJ5O56fb58t9_ldA6_tPpHa3y9IDAAA)" 
title = "Differences Between Proportional Methods"
caption = "STV picks a broader set of candidates to match the voters, but other methods pick more broad candidates that more voters would like."
comment = "The explanation is going to be tricky"
id = "distribution_matching_sim" %}

**Semi-Proportional Multi-Winner Methods**

There are more methods that only provide proportionality to distinct groups, and don't provide the kind of distribution matching that STV does to cover an area of voters with evenly-spaced candidates.  They are mechanically-different.  They apply a method of counting votes that is used for apportionment.  Apportionment means you have separate groups like different states, and you want to find out how many representatives to give to each state.  Two examples are given below: reweighted range voting and reweighted approval voting.  

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31Ty25TQQz9l1l7Mfb4MTe7fgAL2qqbKIuAuqgUSFQVRFXBt-PxARUJiiLd49fYx2cmL6233X6vndj6gfbMaamnpUrStxXqTsIjrdlJKhcbsXAaIkHsq0pC05Jl-cr2ilmetGUNTmv-slj8cKDGa3LkPK8SM-KIlRht16lp27UfrI2ale9ZnslI6PTXLzPzzcz2ZoZ79ebFZVCQrsQi2liQAZnkUQAq7IDkwpqYk1kScw5Tk-yZUcmeGRQBoI8oSrLPSEAfCXgT3lYHRi_SvPTgSgyps2MgD0YjO-1T0n_91lFHMSYMCJF3QYOUjDxXnpT3lcFVrhi6lFF-NeXVzOF7qdaqtab-n4B6kdbAnWJFhVAG8Q3rGYQyrGcQygwAoSyQm7WNQSjvAK5Kx7U55HYr5vl4m6OFg4FvBQEGgbMBgWMAIHCAQazn195_OT8dbz6eH-_zWZZzdbk8nr8eT7_9dw-fHz4dv6V7c3uX3-vr-l7dtfV2A73mn9ew4tBjdgDYTLCZYDO1tpwGwLV-OJ5O56fb58t9_ldA6_tPpHa3y9IDAAA)" 
title = "Differences Between Proportional Methods"
caption = "STV picks a broader set of candidates to match the voters, but other methods pick more broad candidates that more voters would like."
comment = "The explanation is going to be tricky"
id = "semi_proportional_sim" %}

**Party Proportional Methods**

Additionally, there are ways to have proportionality by using a party system, but that is a mechanically-different method that I haven't added to the simulator yet, so we'll discuss it on another page to come in the near future.

**Future Work**

I still need to work out what the strategies would be for voters and candidates.  So far, in the above examples, I've been using the honest strategy for ranking and the normalization strategy for scoring.