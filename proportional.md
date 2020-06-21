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

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy04DMQz8l5x9iB-xd_sbcFvtAVBvlYoQF4Tg23E8FFVUVQ4TPzKeTPLZejtsmwbFstPG0ikkNyYkuv5mxOZOlk5cRWHJHe87NZ6nQ7N5Hg8nj9lgTuzLbNB26NSsHdo3r43aqNjzWE74v7I_stLpZmVluVtZ71a41zieMpWCrJKCJKSxASCMHZAy2BJzqCfkBKEmyZZJSTZNECRBI0nDCQM10EggWhCBRXvJ5WkOV0GlzqqiDkGaTBvT35rtjgawKq7NaZzSIMsG6xcnZsDXgVwHeqGegRWb3Y4zL1kWeEJcwtZKDhg7cIEBKwYuMGDFGABYMQK1paYNWOEdwNXpeBeHoT5KsaYQB4VDga8FAQWBswELQwGwMPCmMX_b_FpRxeen0-n8_vjxesxP-fByfju2rx-nCnaKBwMAAA)"
title = "Score Voting with Quotas"
caption = "Similar results to STV in this three-party example.  Mouse over the rounds to see the progression."
comment = "Maybe choose a more interesting example."
id = "score_quota_sim" %}

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSS2pDMQy8i9daWB9L72XXO3T3yCKF7gIJpRRKac9eWZOU0BC8GOvj0Xjsr9bbbts0KJY9bSydQnJjQqLrJSM2d7J04ioKS-54v6fG83RoNs_j4eQxG8yJfZkN2nadmrVd--Fo1EbFnsdywv-V_ZGVTncrK8vDyvqwwr3G8ZSpFGSVFCQhjQ0AYeyAlMGWmEM9IScINUm2TEqyaYIgCRpJGk4YqIFGAtGCCCzaSy5Pc7gKKnVWFXUI0mTamP7WbHc0gFVxbU7jlAZZNli_OjEDvg3kNtAr9Qys2Ox-nHnJssAT4hK2VnLA2IELDFgxcIEBK8YAwIoRqC01bcAK7wCuTse7OAz1UYo1hTgoHAp8LQgoCJwNWBgKgIWBN4352-bXiiq-HI7H0_vz5_k1P-XT-fx2-jgc2_cvVmzUfwoDAAA)"
title = "Approval Voting with Quotas"
caption = "Pretty much the same as score. Mouse over the rounds."
comment = "Maybe choose a more interesting example."
id = "approval_quota_sim" %}

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSO05DMRC8i-stvB_vvpdjILqnFEGkIgIKGoTg7FnvEBQRRS7G-_HseOyv1ttu2zQolj1tLJ1CcmNCoutvRmzuZOnEVRSW3PF-T43n6dBsnsfDyWM2mBP7Mhu07To1a7v2w0ujNir2PJYT_q_sj6x0ullZWe5W1rsV7jWOp0ylIKukIAlpbAAIYwekDLbEHOoJOUGoSbJlUpJNEwRJ0EjScMJADTQSiBZEYNFecnmaw1VQqbOqqEOQJtPG9Ldmu6MBrIprcxqnNMiywfrFiRnwdSDXgV6oZ2DFZrfjzEuWBZ4Ql7C1kgPGDlxgwIqBCwxYMQYAVoxAbalpA1Z4B3B1Ot7FYaiPUqwpxEHhUOBrQUBB4GzAwlAALAy8aczfNr9WVPHpcDq9fTx-vh_zUz4cXl-Oz-37DEcADVkIAwAA)"
title = "Pairwise Voting with Quotas"
caption = "Under active development. Mouse over the pairs."
comment = "Maybe choose a more interesting example."
id = "pair_quota_sim" %}

**Proportionality**

Let's get back to the idea of proportionality.  You can see that in these proportional methods, a voter group with two times as many voters gets two times as many representatives.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31Su05jQQz9l6ldjD1-3JuOD6BAIJooRXZFgZTdRBG7AiH4djw-IAqW1RQ-fp85M8-tt812q53Y-o62zInUE6mS9HWGupPwSLR0ksrFSiycQCSIfVZJaCKZyGe2V8yy0yYanGh5Ryy-21HjuTlyn1eJGXHETIy26dS0bdorr42ale9ZLvTlZH1kptOXk5nl28z6bYZ7reNJb1CQvocFYZBjhQE1dpgkwpo217KkzSVMTXJgRiUHZlAEBnNEUZJzRhrMkYC3wFurYfRizFMfrsSQ6h0DeTAaOWmbEv_rzFZHMTYMqJBvQ4OUjDzvu1C-XwZnuWLpvL_yJ5RPOOpVqlZrpv6fgHqR1sAb44oKoQzKG65nEMpwPYNQZjAQygK5pTYbhPIOw1XpeDaH3G7FPD9zc4xwMPC1TIBBoDcgcAwYCBxgEPM7tqs_x4f99c_j-S6_aTkXp9P5-Hd_-PAv73_f_9o_pnt9c9vmZ43q_7E_HI4PN0-nu_zmmPDyBte_z9WNAwAA)" 
title = "Quotas Give Proportional Results"
caption = "Try all the voting systems.  They each give a 1:2 ratio of voters between the groups.  Also try a larger number of seats.  The large group is 63% of voters, so it's a 4:7 ratio."
comment = "Maybe choose a more interesting example. altlink is [link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31SvW6UMRB8F9dbeNf27vddxwNQQCKa0xUfcEXEkTtFAYEQPDuznpwUKQS5mP3f8di_Si27_b5X0VEPsleF1R1W72J1zVB1MW2wzFQ0sswWlIXBiiHWMxnIWdabr7BmVSZ1pNUU1vJkqfnhIEVzczTRJfuXgKFZ0V3Ul6xoZVel9LIrf9SLlDF9R5_Ji4P6QKbKi4PM8mpmfTWjda7T5NkkpD-FjWGS004gNbCcACLagVirBsQSgGEgooaBDWAMco5hjgIGc5xjQW-hxymtTsaa-uhMNJu9rTFPRg2T9tD6XydbncXc0KgCHkmadBniuO8ieEgEs7zXq0zp6HPHnjvtujSdPmf3_xPpPsn34Fvzqn2dwcEXGLzmoGCD1xwUbAwCBRvB3DI3DwrmlaCz0vl8Ttl9TPb4gMU5wsnA1wlBBsHeoNDRCBQ6yCDyW5Z3386P282n88MR33U6by6Xh_P37XT1397d333dfsC9uf1Q8tPG7P-4nU7nx9uflyO--_vt_svxc_n9Fwg5q72fAwAA)"
id = "proportional_two_to_one_sim" %}

This proportionality applies even when there aren't distinct groups.  In the example below, there is a difference between STV and the other methods.  STV picks a set of candidates that is spaced more widely to cover a larger area of voters.  The other methods tend to pick candidates more toward the center.  This is probably because STV considers the first choices above others, while the other systems consider all the options at the same time.

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31Su25UMRD9F9dTeMbzuHc7PoAiJKJZbXGBLSKW7CoKURCCb2c8JyhFCHIxZ97Hx_7Zetvt99qJrR9oz5xIPZEqSV9nqDsJj0RLJ6lcrMTCCUSC2GeVhCaSiXxme8UsO22iwYmWZ8TihwM1npsj93mVmBFHzMRou05N2679Zm_UrHzPcqFXJ-sjM51encwsb2bWNzPcax1PeoOC9DksCIMcKwyoJcsySYQ1ba5lSZtLmJrkwIxKDsygCAzmiKIk54w0mCMBb4G3VsPoxZinPlyJIdU7BvJgNHLSPiX-15mtjmJsGFAh34YGKRl53nehfL8MznLF0nl_5RcoL3DUq1St1kz9PwH1Iq2BN8YVFUIZlDdczyCU4XoGocxgIJQFckttNgjlHYar0vFsDrndinl-5uYY4WDga5kAg0BvQOAYMBA4wCDmd2xX388P2_Xn8_0xv2k57y6X-_Pjdvrrv7-9u_22PaV7ffOxzc8a1f9pO53ODzc_Lsf85h-2u6_HL-3XH4RIy8iOAwAA)" 
title = "Differences Between Proportional Methods"
caption = "STV picks a broader set of candidates to match the voters, but other methods pick more broad candidates that more voters would like."
comment = "The explanation is going to be tricky"
id = "distribution_matching_sim" %}

**Semi-Proportional Multi-Winner Methods**

There are more methods that only provide proportionality to distinct groups, and don't provide the kind of distribution matching that STV does to cover an area of voters with evenly-spaced candidates.  They are mechanically-different.  They apply a method of counting votes that is used for apportionment.  Apportionment means you have separate groups like different states, and you want to find out how many representatives to give to each state.  Two examples are given below: reweighted range voting and reweighted approval voting.  

{% include sim.html link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31Sy04cQQz8lz770Hb7MbM3PoADD3FZ7WGDOCBt2BUiESgK347bRcQBiEYalx9tl6v7T-tts91qJ7a-oy1zIvVEqiR9naHuJDwSLZ2kcrESCycQCWKfVRKaSCbyme0VszxpEw1OtLwjFt_tqPGcHDnPq8SMOGImRtt0ato27ZW1UbPyPcuFPn1ZH5np9OnLzPJtZv02w73G8aQ3KEjfw4IwyCWvMqDGDpNEWNPmWJa0OYSpSTbMqGTDDIrAoI8oSrLPSIM-EvAWeGsdGL0Y89SHKzGkzo6BPBiN7LRNib_65lFHMSYMqJB3Q4OUjDz3XSjvL4OzXDF07q_8AeUDjrqVqtVaU_9PQL1Ia-COsaJCKIPyhvUMQhnWMwhlBgOhLJBbahuDUN5huCod1-aQ262Y52NujhYOBr6WCTAInA0IHAMGAgcYxHyO7eLX8Wl_dXt8vMtnWs7Z6fR4_L0__PPP7x_uf-6f0726vsn_5WX9z27afLhRvX7sD4fj0_XL6S6fPLr9fQOxU8p8mQMAAA)" 
title = "Differences Between Proportional Methods"
caption = "STV picks a broader set of candidates to match the voters, but other methods pick more broad candidates that more voters would like."
comment = "The explanation is going to be tricky"
id = "semi_proportional_sim" %}

**Party Proportional Methods**

Additionally, there are ways to have proportionality by using a party system, but that is a mechanically-different method that I haven't added to the simulator yet, so we'll discuss it on another page to come in the near future.

**Future Work**

I still need to work out what the strategies would be for voters and candidates.  So far, in the above examples, I've been using the honest strategy for ranking and the normalization strategy for scoring.