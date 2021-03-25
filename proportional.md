---
permalink: /proportional/
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
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA4VTu04EMQz8l9QRih9xsvsVFHSnKw6JAmklEDoKhLhvx-tJruHQaYuxHWc8mU2-U0nr4ZgTORyoUuZejvmwzICWOiLmMmvUZqTXmsmMmo6o2dwqfUQ6S7bMNQOFa5C0ck6a1nQpKaea1pKTQV9zKPnP5yvdV9KF9h0X5nSjY4kO5hotUm71-P59GtGwg5EKQAFQRAZwSaSOHalPoZzYebzIFGdxPQGgYUXmNOIAGm7IwMJLtMj4K0JRFagRGCRQI3X0GKrgkQVV3Rko__PtDXTb0asjyvca5N4IDUk6hKqFQ9pCvuLACtsq7K84b4VtFbZVRUsFwLba0NJjRF1wV0oUDSwG1wwsVuM44kIMFAYFhr0NChrFlMYAAcDxhv_f5pVsWOxB7A9mr-E4HWQdZB1COoR03IJeAdDSwdU7YJf00PzmlsifT9v2dn76en_xt_G4fX6cttfzV_r5BWjH9i2-AwAA)"
title = "Median in 1D"
caption = "Recall this example of finding the median. <b>Try moving some voters. Add a candidate (+). </b> The total area of the bars below is the sum of all the distances between the voters and the candidate or median. The median minimizes this sum. A winning candidate should also minimize this sum."
comment = ""
id = "median_1d_sim" 
gif = "gif/median.gif"
%}

A median can also be found in two dimensions by using the same idea of minimizing distance.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA4VTwUpEMQz8l56DNGmS5u1XePC27GEFD8KCInoQcb_dpLOC4Iq8wzTJdDpN8z5ab7v9gRon7FmERMeB9hHEvOWCw4i9V0ppFk4mtuIMTQ4Xp3fizWuluS9qZZIpq5QbudaiNnLUSiatmrCTcGmJZFH5kE5G23Vq2nbt3Bs1W6HD5Uzo9OvLSmSlnbl2nEXaFca2GCK2KKNf4-T-Oo350hRBCEusADhiB6Ql1sRAmKcwNUmdTErqSIIAICOKKGVGAmRkIoKKbIsyLm8zeGUH3IyBItwMu3AcWeiMDVkthezsX19R-HpPf3RF5X_K-P8gXdb0Ylh9dUonnhsXV7TP8AyGexvaZ2P11BQUA6B9NkGJdYRtmJm-kg4VR_ccj-C2rpSj1xwSDgeOvRMOJq9TpgAGAJ2fmIP5PZoTxVjCTFI5XCcgFhALGAkYCUxDGABeAloRgLJ0M3OC-4rvj6fT0-vd-_ND_iO3p7eX4-nx9b19fgGnVnGdzAMAAA)"
title = "Median in 2D"
caption = "<b>Move some voters. Add a candidate (+). </b> Just like for the 1D case, the total area or length of the lines below is the sum of all the distances between the voters and the candidate or median. The median we chose here minimizes this sum. A winning candidate should also minimize this sum."
comment = ""
id = "median_2d_sim" 
gif = "gif/median_2d.gif"
%}

We can get distances from score voting, or approval voting, or star voting. We can just use the ballot scores and try to find the candidates with the highest scores. This is the same as finding the candidates with the shortest distance to the voters. You've seen this before on the common ground page.

{% include sim.html 
link='[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQU4DMQz8i885xI6dbPfMD-ht1QO0i6hUdau2CCEEb8fOlAuoymHs2J7MOJ-UaZymVhNr26SJeUg81IjMI5WIhna7E_GotM0mEccYZ8-zRl5ozImURuZE5pCoektO_443t7uV4W5ldbfCub_NISlSQQpFrAAD1K6MXQCroz9nDqteFOfxS-HeIwIAjSgypykOFZcN2YDMWcQXkbtQjp2AqYCpgKmAqTjTxOl2orliHJwFdjlJKkm9rEEbfRo2w7bKb-DEU4lA-6z-pVa41oY_glxd9UvD8owBkGqQatid4TsNpq11nTb0twymawbAcMUPVLBU61ZCYAVFhYKKtTcoaJht0pmenw6H5br-OM000uN2Oc-U6PK6vD_Ml-15f7rul6NXvt-Ou_llf5x39PUDc7xiOMsCAAA)' title='Scoring Measures Distance' 
caption='Basically, scoring asks, "Is the candidate close to you?"' 
comment='simple,lots of candidates, one voter' 
id='score_sim' 
gif = "gif/score.gif"%}

Let's introduce now a new idea that we are also going to make assignments. Each voter will be assigned to exactly one candidate out of the set of elected winners. Only the scores they gave to that candidate will matter for the optimization. You maximize the scores that each candidate gets from only their assigned voters. That means a candidate can get closer to their assigned voters. This is very similar to districts except the voting system is doing the hard part of dividing the voters into groups.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA61WbU_bSBD-K4ulOxJlZfxuJxDQXUulSld6arjrhyRCjrMhlow39W5ouZb77Tez45cEQvlygmpfZuaZZ2YeL_1uOdZoOg0c7obOnE8Tj3tuCBvXcbnrm13ocM_xcDcccjdIYOcFAfc8vPPiGELd-ZxbLiLFgBRhmBeG3I1jNPjWyOFWYI2sfz3X4lZozhG4gzGGxeHPfsCSvGgZvmhxHYPtIhefxzxAg5ugxSMLkXEDWoiKG9ECXNwAVsgcwwJpXG55AAmXwHzkweLRQjBeQC4A48NCMF5Mp4ROQxPgO4azi-1wjcH3TKzvk50I-YA0hc53PxgQkQvh-lS9yz3u84CHPAKXgOCxBYHbbb1uC2mmnoELAoMTHEoVRIZUENPIqISAGhFSb0OiH1IjQqIfUiPCkBZqRBiTLTH5QmpE5NDiGs-IphJRO6PQ8PWBSEQQETGIhmaJiUFMsTE1MPZpoQbGxCBGdVmT679BbuLLNi3epVle5PrhD5mlOpcl3H-QZSUFm4gvbGKhEmMKTXb7i_dUfuLQQskTIp4Q8SQwRSUhLcQ9IbyESkiwBDsE8VIRw25MQxxTyEPc-t2WMIdU0JAwh_HTodWDW6RFIfX1w0bAZzbJZCWgwkwuxeUy17K6Ft80fn8za7UtM2xAb5krXeWZ5uwO3ArO5AbvVf_7bFaaX13fsDG7EYUwYW_FKt0WWvUab_K8Tyu2kUWhIQ-6L8RtXl7WMV0qylSH8tlsZimkipsaqBCaZanJ2UTZSqe3Qk1NMB3mNvgs82WqhWrZnpywa-jCA9NrwdLNppL3aaHYr-wWML_mZSmqo44tNQzzEO691KKaCG2D9-9ke1sTaPn321yIoE0yKPYfUUmTuYfM60JWsup1eZhcNRnr_uodn7YYlpe1m20as-sMvybjtPWes8F4333HdtoGPtLusSHf8L9Lv5koKCHcM1CvzNgzuS31Z3Pumez9084PEoIU0I12vTqQxryjjEwWsgI_crPNsc2Yr1gjJlvlS7FIqz7rNEiDfZMaj_aqowmwddqps1O0GRCJEdWF_zqjMQzIcqY2acmyIlVqfKzuoMbj831vJIg3v221xJWNG82kcPMnqL7PGsTmG3gh1-KcOp4q9gtKAkYAIUrli0KM2NnJ4vxsUR1IT-mWpLI367TSTYv0fhbdOtC4OCqy_uyaefNaiHYhylu97h_CIbZPqTwyUSixn7nRcD52Tll-hvlqYDgOBvsCbvQAU0HHaT638-XpE4-GAxWdZ_CAZP0BMjlWzFQwMvwGNxtRZaLU72R1l-qdB63-TubspBU5ATwvqfs-9nb5qndU6-tHo6-6rPOxt18UyPPqI_v8_urq8tPFEfv4iV2_v7w4ujg61NgbnQvc00h5Dd0_fQK4I10QDeChNhjSZ00NbMD2lXZoOj-f5-FmEydqGFuDVPE9Xee3a6E09Z8zJW3b_imgyXiCH9crPq-CLJjSD4UYH5t3Y2RGb7akCRM9IP5leif-2oAs9oowvYP5TJ7ledrp_y3Ta6Pafd7qV7EmsuPYyrF5JttnQG68PjNP3FrgAd9gJStNf4XoobZVkWeiB_9577-E0GRuQeod-VdCb6uydkJKjzPLevwPfvBbaDIMAAA)"
title = "Equal Facility Location Problem"
caption = "Similar results to STV in broadness of support."
comment = "Maybe choose a more interesting example."
id = "facility_sim" 
gif = "gif/facility.gif"
%}

That was actually a lot of computation, but the good thing is that this problem is already solved. There are techniques called the branch and bound method and the Simplex method that are used together to solve this problem. Basically, branch and bound means you can look at all the possibilities without calculating every one. You put them into groups called branches, and the best-case scenario for that branch is bound by some value. Then you can cut branches off and simplify the problem. 

If you would like to know more about branch and bound and Simplex, they are part of a more general set of algorithms called mixed integer linear programming. These tools are used in the business world in what is known as the field of operations research. They deal with logistics - physically moving around things, like groceries. They also apply to our case of electing representatives to serve voters.

This is a good method to inspire other methods like the Single Transferable Vote, STV. Voters might be more willing to accept STV because they can see the calculations being done. Also, STV gets pretty close to the motivating idea of the facility location problem, and if you compare their visualizations, they look very similar. There are more methods like the Monroe method that are also very close to this motivating idea of optimizing assignments of voters to the candidates they scored highest.

## Sequential Monroe Score Voting

Here's a simple method to get a good solution to the Equal Facility Problem quickly.  First, pick the winner with the highest score among a quota of voters. Then count only the remaining voters who weren't in that quota. And repeat. The unofficial name for this is Sequential Monroe Score Voting.  It uses the same concept of the Equal Facility Problem but uses a simpler technique to find a feasible solution. 

Also, I'm trying out a visualization of utility, so click the "+" next to "utility chart" to see it. Basically, the idea here is that each voter's utility is best measured by the utility of the closest winning candidate to them, so I chart that with dark grey dots. 

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA61WbW_bNhD-K4yALTZMKBL1aidOsLUpUGBNhzpbP9hGIMt0LECRXJFOm7XZb98dTy924jRfBjsgxbt77rm7R3S-W441mk59h7uBM-fTWHDhBrBxHZe7ntkFDheOwN1wyF0_hp3wfS4EnokoglB3PueWi0gRIIUYJoKAu1GEBs8aOdzyrZH1r_AsbgXmOQR3MEawOPzZByzxi5bhixbXMdgucvF4xH00uDFaBFmIjOvTQlTckBbg4vqwQuYIFkjjcksAJBwKgBSwCFoIRvjkAjAeLAQjInqK6WloAjzHcHaxHa4xeMLEeh7ZiZAHSFPofPfBgJBcCNej6l0uuMd9HvAQXHyCxxb4brcV3RbSTIWB832D4x9K5YeGlB_RyKgEnxoRUG8Doh9QIwKiH1AjgoAWakQQkS02-QJqROjQ4hrPkKYSUjvDwPD1gEhIECExCIdmiYhBRLERNTDyaKEGRsQgQnVZk-u_QW7yyzbJ3yVplmf64Y8yTXRWFnD-oSyqUrKJ_MImFioxotB4t794TuXHDi2UPCbiMRGPfVNUHNBC3GPCi6mEGEuwAxAvFTHsxjTEMQU8wK3XbQlzSAUNaTDD6OnQzAdRFkmel_r6YSPhRZukZSWhxrRcystlpsvqWn7T-AbOrNW2SLEFvWWmdJWlmrM7cMs5Kzd4rvrfZ7PCfHV9wsbsRubShL2Vq2Sba9VrvMnzPqnYpsxzDXnQfSFvs-KyjulSUaY6lM9mM0shVdzUQLnULE1MzibKVjq5lWpqgulhboPPMlsmWqqW7ckJu4YuPDC9lizZbKryPskV-5XdAubXrChkddSxpYZhHsK9L7WsJlLb4P072d7WBFr-_TYXImiTDIr9R1alydxD5nUhq7LqdXlYuWoy1v3VOz5tMSwrajfbNGbXGb4m47T1nrPBeN99x3baBj7S7rEh3_C_S76ZKCgh2DNQr8zY03Jb6M_muWey9087P0gIUkA32vXqQBrzjjLSMi8r8CM32zy2GbMVa8Rkq2wpF0nVZ50GabBvEuPRHnU0AbZOO3V2ijYDIjGiuvCvMxrDgCxnapMULM0TpcbH6g5qPD7f90aCePLbVpe4snGjmQRO_gTV91mD2LwDL-RanFPHE8V-QUnACCBEqWyRyxE7O1mcny2qA-kp3ZJU9madVLppkd7PolsHGhdHRdavXTNvXgvRzmVxq9f9QzjE9imVRyZzJfczNxrOxs4py84wXw0Mj4PBvoAbPcBU0HGaze1sefrEo-FARWcpXCBpf4BMjhUzFYwMv8HNRlapLPS7srpL9M6FVr8nc3bSipwAnpfUvR97u2zVO6r19aPRV13W-VjsFwXyvPrIPr-_urr8dHHEPn5i1-8vL44ujg419kZnEvc0Ul5D90-fAO5IF0QDeKgNhvRZUwMbsH2lHZrOz-d5uNnEiRrG1iBVvE_X2e1aKk3950yVtm3_FNBkPMGX6xWfV0EWTOmHXI6Pzb0xMqM3W9KEiR4Q_yK5k39tQBZ7RZjewXwmz_I87fT_lum1Ue1eb_WtWBPZcWzl2FyT7TVQbkSfmStuLfEB72BVVpp-heiitlWepbIH_773X0JoMrcg9Y78K6m3VVE7IaXHmWU9_gdWHeE1NAwAAA)"
title = "Sequential Monroe Score Voting"
caption = "Similar results to STV in broadness of support and easy to show calculations like STV"
comment = "Maybe choose a more interesting example."
id = "sequential_monroe_score_sim" 
gif = "gif/sequential_monroe_score.gif"
%}

### Clustering

Basically, what these methods try to do is make clusters. One idea of clusters is that you can represent a bunch of data points by a much smaller number of data points. This is really familiar. It's basically what a legislature does. The members of the legislature are the representatives of the people.

## STV's Quota

(mostly a refresher from the STV page)

STV uses a quota to assign voters to candidates in a similar way to the facility location problem.

Once a candidate has been elected by a quota of voters, the voters have successfully used their ballot to get representation, so it is not counted again for a second candidate.

**Refresher:** STV asks voters to rank the candidates in order from best to worst. During counting, your vote counts for your top candidate. One-by-one, the candidate with the least number of votes is eliminated and taken out of the running. **Check out the sketch below** that shows everyone connected to their first pick. Colored flow lines show some voters moving to their next choice after their top pick is eliminated. 

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA61XbU_jRhD-K4ullkRZGb_bCQR0vaPSfSjXAu19SCLkOBti1diRd0OPXulv78zO2k5CgC8VnHZ2Z3aeZ2YeL7rvlmONJpPA4W7ozPjEdcEKIrCCgHvOEI-ciHuuD1bicE_74iF3PRcMz4u5G2GUFwdgeWhF6HX0WQg3Q7R8F6zEWK4XzWbcchE5BrxIh4Qhd-MYHb41crgVWCPrXzeyuBXqfQTh4IxhcfiLH_Akr3qGr3pcR-d2kYvPY46NSPDco3Oi4ga0EBHgpBdg4gawAq7rwQooLrc8yAinHmSEQ8-jhfJ4AYVAHh8WyuPFtEtoN9QXfEdTdrEbrnb4xMj3yU-MfMg0gYYe-sGrEQUTgk9tgElwnwc85BEUnHCYFhxieECg2JfA7UyvMwF84unUQaBzBm8TCCJdcBDTRKnEgBoVUutDKi-kRoVUXkiNCkNaqFFhTL5EI4fUqMihxdWRETUpoixRqKcKorQiShERg2iol5gYxHQ39mjxaaEGx8QgRvFZv20qld5kVS1AlHrzYb2uq8e0aPa_5GX-kH6D7c3tHxaqNab7yXbr8Zx6kDi0EIOE2CckliTQRSQhLVRAQvkSqiPBOuwQBE6VDLupDXFqIQ_R9DuTcg6pqiHlHDaf1P705mlRVOr2aS3gU7xOyz_FAirLqoW4XOSqqm_FN4Uf6dRabspM5VXZW-RS1XmmOHuAsIKzao3nsv99Oi31rzInbMzuRCH0tU9imW4KJXtNNEU-pjVbV0WhAAfD5-I-Ly_NnQ6KkMxVPp1OLYkzQsMkKoRiWaoxm1u2VOm9kBN9mTYzG2IW-SJVQrZsT07YLbThiamVYKkZt2Q_snvI-VdelqI-6thSxxCH8j5WStQ3QtkQ_RP5PhkCLf9-i4UZlAaDYv8WdaWRe8jcFLKs6l6Hw6plg2j6q7Zi2mJYXpowWzdmOxh-NeKkjZ6xwXg3fMt32l58Juu5Id_wB_XrW1BCuOOgXumxZ9WmVF_1vqfR-6ddHACCFDCMrJ65SGPeUkZWFVUNcRRm622LmC9ZIyZb5gsxT-s-6zRIg_2Y6oj2qKMJaQ3sxNkqWg-IxIjqwn-dUzsG5DmT67RkWZFKOT6WD1Dj8fluNBLEkw8bVeHKxo1mUjj5FVTfZ03G5ht4BWt-Th1PJfsBJQEjgCtS5vNCjNjZyfz8bF4fgCe4Bans4yqtVdMitYui2gAaF0dFms-umTc3QrQLUd6rVf9QHmK7T-WZiUKKXeRGw_nYOWX5GeKZxLAdDHYF3OgBpoKBk3xm54vTvYiGAxWdZ_CAZP0BMjmWTFcw0vwGd2tRZ6JUP1f1Q6q2HjTznczYSStySvCypO772LHyZe_I6OufRl-mrPOxt1sUyPPqC_v6-erq8vriiH25ZrefLy-OLo4ONfZO5QJtGik3qfunewm3pAuigXyoDYb0WVMDG7BdpR2aztvzPNxs4kQNYyuQKr6nq_x-JaSi_nMmK9u230yoEU_w43on5t0kcybVUyHGx_rdGOnRa5M0oW8PiH-ZPojf1yCLnSJ072A-Ny9w9jv9vyG9N6rt5828iobIVmArx-aZbJ-Bau31mX7iVgI3-AbLqlb0V4gealsWeSZ68B-B_msZGuQ2ibEovhZqU5cmCCk9Ty3r-T_heTuKhwwAAA)" 
title = "Quotas Give Proportional Results"
caption = "Here's two groups with a 1:2 ratio (really 4:7). The winners are also in the same ratio."
comment = "Maybe choose a more interesting example."
id = "proportional_two_to_one_sim" 
gif = "gif/proportional_two_to_one.gif" 
%}

### Visualization 

(refresher from STV page)

Notice the chart that shows a visual of the process of elimination. It starts at the top and each row tracks who the **voter's** top pick is. Each column is a voter. Transparency is used to represent the excess vote that remains after a quota is filled. As candidates are eliminated, the groups of voters become visually apparent.

Below this chart are a couple of charts that are a measure of voter power. They track the weight of the each voter's contribution to a candidate's election. When a candidate is elected in a round, the voters whose vote counted for that candidate are added to fill up the chart. The intuition is that the voter could have voted for someone else, so the candidate owes them some share of their power.

In the first chart of the "Voter Weighting Used by the Method", the exact weights used by the voting method to select winners in each round are shown. To choose the final winner, the election is similar to a single-winner election. All that the last guy needs to win is 50% of the remaining vote weight. In the background is a dark bar with a height that corresponds to a vote at its full weight. As candidates get elected, the bar is covered. Any part of the bar that is still showing after all candidates are elected shows votes that are still not counted.

In the second chart of the "Voter Weight Contributed to Candidates", the total weight given to each candidate is rescaled so that it is equal for each candidate and sums across candidates to the full amount of representation available. In the background is a dark bar with a height that corresponds to every voter contributing equally to the election of the candidates. The height of this bar is each voter's ideal share of representation. 

(Also, here are a few more specifics about these charts. The voters and candidates are arranged in a line by using an algorithm that solves the traveling salesman problem to keep voters together who are near each other in 2D space. Specifically, the ballots are used as coordinates or feature vectors since this 2D space isn't something you'd be able to see in an election.)

### Visualization of  Voter Power

(refresher from STV page)

Voter weight contributed to candidates is not exactly voter power. Power is a collective phenomenon. 

Think of single-winner voting methods. The winner is most representative of the median of the group. The median is a collective measure. If there are two sides and both are competing for the median, then both sides are represented. To see why this is the case, consider a case where the election is not competitive and the median belongs to only one side, then all the voters on that side benefit from that power, which is not very representative. The most representative election would be a competitive election where the median could be on either side. 

In STV, there are multiple "medians" (more like percentiles), one for each winner. These medians can be spread out over a larger region than for the single-winner case. This means there are more ways to be part of a group that wins and candidates have to pay attention to more voters. 

Also, consider what would happen if, after the election, a candidate shifted their position toward the center of the group that elected them. They would lose the more moderate voters that voted for them when the next election comes.

------

***Draft*** - the first part above is nice. The second part below is a draft and includes voting methods that are in development.

------

## Using STV's Quota with Other Ballots

The concept of a quota extends to multiple ballot counting methods:

1. Top-choice-counts Ranking Methods: the Single Transferable Vote (STV), also known as multi-winner Ranked Choice Voting RCV
2. Scoring methods (including Approval Voting and STAR voting): the facility location problem, Sequential Monroe Score Voting, Allocated Score, and STAR Proportional Representation.
3. Clustering with STV, then electing with pairwise methods: I made one method that uses STV to form equal clusters of voters. Then it uses Minimax within the voter clusters to elect candidates.
4. Pairwise ballot methods. (I'm working on a version of minimax)

<!-- SNTV? SNTV kind of is proportional-->

The power chart is more useful for scoring methods because the voter can support multiple candidates at the same time. That means the voter is able to say that their vote counted for a candidate so that candidate owes them some share of representation. Also, the votes by round has an additional data dimension for the same reason, and it's hard to visualize, so you need to click through the rounds to see how the election was counted.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04DMRD8F9dbeN--_AZ0pxSA0kUKQjQIwbez9hAUCUVXjNezOx6P77P1dth3TcpxpJ2lU0otTEh0-90RmysZnXiRwlIrPh6p8ZxOreY5nkGRs8GCOMZs0Hbo1Kwd2jdvjZqvOmqsyCzo9O8rZtxltrsM96XNDHEWlHDABsD5HIAywFZYx0VBaQs1KZ3alNLRAsEmZKRkuMDBQUYS1UAFFe3LKM8MeBEqa1YVPAxpKe1Mf99sDzRAVXFhJiElJ6sG69cMZsG3hdwWepWehS01-3-cxbJliZfCJWxbm45IHRdwROG4gCMKdwCi8AQ31mmOKKIDeHUG3iUQaPhyrGUkIBFwENuChIPEbCLCVAAiTLxpXn-qBDlucpupJa40IDggOCA4IDhsGR0OwDs8P53Pl_fHj9dT_cQPL5e3U_v6AVYwU-E3AwAA)"
title = "Score Voting with Quotas"
caption = "Similar results to STV in this three-party example. Mouse over the rounds to see the progression."
comment = "Maybe choose a more interesting example."
id = "score_quota_sim" 
gif = "gif/score_quota.gif" 
%}

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSsWpDMQz8F88aLMmSnGz9h26PDCl0CySUUiil_fbKuqYEQvBwlk8-n8_-ar3tt02DYh5oY-kUkpMhJLr7W5GxZjI7cZHCkjM-HKjx2h2r2ZIIIx-rYRix22rQtu_URtu3H45Gzar23JZkJHS6G8nMh8zuIcO9tJkhzoISDngAcD47IA3wSMzjPCG1hZqkTi5K6miCYBEykjKcYOAgI4FqooKK9jLKKwMuQqX2qoKHIU2ljel_rHZHA1QVF2YSUjLKeNvo1wxWwbeF3BZ6lV7FKLVxf9zwsjUCL4VLjF0tGiI1XMAQhWnlY4jCDIAoLNAy6zRDFN4BXJ2Od3EE6laONY04JBwOfFcQcBDYG4gwFIAIA28a108VIOdNbiu1wJUmBCcEJwQnBOcoo9MAeIeX4-l0fn_-vLzmJ366XN7OH8dT-_4Fp_UcyToDAAA)"
title = "Approval Voting with Quotas"
caption = "Pretty much the same as score. Mouse over the rounds."
comment = "Maybe choose a more interesting example."
id = "approval_quota_sim" 
gif = "gif/approval_quota.gif"
%}

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA61W2W7jNhT9FUZAGxsmFG3UYscJ2pm0mJfMIEkxD7YRyDIdC5AlQ6TTSafut88lLyVLWSYvhW1wuYfnnruI1nfLscazmR_RKF7Qmes5NPJgEnjU8xOz4wVq5sUOdbXRcz2YuYsFtVx1OlJgBoaI0TBQgIBRN2QK4Ftjh1qBNbb-80KLWkyvQzgGxggGh774gCV-05K8aXEdze26SO56uEQFboAD-ndDHECAG8AI7kIYgNujlgc8sOkBjw-Dh5tI4wGNCwNDG9J4Ea5iXCGL72ihrsqBqw2-p8_6PtpRkA9MM5e2HwUPEYCsPgbsUo_6lFFIrxU4TQ7Uwu0uvO7Cb6jVItBswUt3QahlBRFWCoMIEr3JMKUMA2CYCoYBMEwFYzhgKliEtlh7Y5iK0MHB1cgQ6xJiQkOmFfsgJESKEBWEiR4iVBDh2QhTGPk4YAojrGnUNFWExriTN5W1CEOKkTBGwhjFxCgmDrTQmOGAemLki1FWrGTZDPoQeZJu-hOVfgZVYmrhdxfInGCyEmROon4xOkVJYvXEzK31vsxkXpWDVS5knWeSkm214gUl1U7ti-H3-bzUX2l2yJTc84LrYx_5Ot0XUgwaNCIf05rsqqKQ_JtU8CV_yMsrc-boCj2Zo3Q-n1siq2quJoao4JJkqfbZnLKFTB-4mOnDuFjYgFnlq1Ry0ao9OyN3aVE8EbnhJN3t6uoxLQT5lTwA5995WfL65Kh2CdBKKj_I-1hJXt9yaQP6d7R9NAJa_cPWl2KQ2hkE-w-vK-15oJSbQNZVPTj6IdW68WjyKzuYNhiSlwZm68R0wfDVHmctekFG0z68Y5u0Bw84OzTiG_3b9Js-BSGwngFzpcueVftSftXrgfY-nBxx4BBaQcFwNjAHscydzsiqoqoBhzBbL1uP-Zo0zWSLfMWXaT0kxx7Ewn5INaLdOsoEWuN25nSC1gXCZlTdpX5HozaM0HIudmlJsiIVYnoqthDj6UUfrQSqnd_2slIjmTY9k8LOF-j6IWkYm2fgDV_LC8x4KsgvqiWgBHBEiHxZ8DE5P1tenC_rV9yjuxV22YdNWssmRbLvRbYALBdVHWkeu6be1DSiXfDyQW6Gr_Gg2udSDoQXgvc9Nz2cT50Jyc-VP0MMy9Go38BNP0BVFHCWL-x8NXmGaDRg0HkGF0g2HCklp4LoCMZa3-h-x-uMl_KPqt6msnOhmedkQc7aJkeClyEdn4_eLF8PTkx__dv0lwnrYur1g4L2vP5Mvn66vr66uTwhn2_I3aery5PLk9cSey9zruZYUmqoh5NnhJ3WhaYBPtUbRMknTQxkRPqd9lp1fl7P15ONmjBhZAOtqu7TTf6w4UJi_ikRlW3bPyXUHs_Uw_UO5l2SJRHyqeDTU31vjHXp9RR7Qp8eof4y3fK_dtAWvSB07qA-ty_8PM_0_-bpvVJ1rzdzKxohHWDbjs012V4D1c4bEn3FbbhaqDtYVLXEfyG8qG1R5BkfwMv28C2GxnNLYmaIr7nc16UBKUmHuWWpl2LzVuzgOxzeJndPOw4vGLeqPQCk_03_rKv97gb-kartLecrAe8mfkyTMKQxvNQffgBGqmUCKgwAAA)"
title = "Allocated Score Voting"
caption = "Elect the highest scoring candidate, then assign the closest voters to that winner and elect more candidates with the rest of the voters."
comment = ""
id = "allocated_score_sim" 
gif = "gif/allocated_score.gif"
%}

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA61W2W7jNhT9FUZAGxsmFG3UYscJ2pm0mJfMIEkxD7YRyDIdC5AlQ6TTSafut88lLyVLWSYvhW1wuYfnnruI1nfLscazmR_RKF7Qmes5NPJgEnjU8xOz4wVq5sUOdbXRcz2YuYsFtVx1OlJgBoaI0TBQgIBRN2QK4Ftjh1qBNbb-8yKLWkyvQzgGxggGh774gCV-05K8aXEdze26SO56uEQFboAD-ndDHECAG8AI7kIYgNujlgc8sOkBjw-Dh5tI4wGNCwNDG9JAYHoV4wpZfEcLdVUOXG3wPX3W99GOgnxgmrm0_Sh4iABk9TFgl3rUp4xCeq3AaXKgFm534XUXfkOtFoFmC166C0ItK4iwUhhEkOhNhillGADDVDAMgGEqGMMBU8EitMXaG8NUhA4OrkaGWJcQExoyrdgHISFShKggTPQQoYIIz0aYwsjHAVMYYU2jpqkiNMadvKmsRRhSjIQxEsYoJkYxcaCFxgwH1BMjX4yyYiXLZtCHyJN005-o9DOoElMLv7tA5gSTlSBzEvWL0SlKEqsnZm6t92Um86ocrHIh6zyTlGyrFS8oqXZqXwy_z-el_kqzQ6bknhdcH_vI1-m-kGLQoBH5mNZkVxWF5N-kgi_5Q15emTNHV-jJHKXz-dwSWVVzNTFEBZckS7XP5pQtZPrAxUwfxsXCBswqX6WSi1bt2Rm5S4viicgNJ-luV1ePaSHIr-QBOP_Oy5LXJ0e1S4BWUvlB3sdK8vqWSxvQv6PtoxHQ6h-2vhSD1M4g2H94XWnPA6XcBLKu6sHRD6nWjUeTX9nBtMGQvDQwWyemC4av9jhr0QsymvbhHdukPXjA2aER3-jfpt_0KQiB9QyYK132rNqX8qteD7T34eSIA4fQCgqGs4E5iGXudEZWFVUNOITZetl6zNekaSZb5Cu-TOshOfYgFvZDqhHt1lEm0Bq3M6cTtC4QNqPqLvU7GrVhhJZzsUtLkhWpENNTsYUYTy_6aCVQ7fy2l5UaybTpmRR2vkDXD0nD2DwDb_haXmDGU0F-US0BJYAjQuTLgo_J-dny4nxZv-Ie3a2wyz5s0lo2KZJ9L7IFYLmo6kjz2DX1pqYR7YKXD3IzfI0H1T6XciC8ELzvuenhfOpMSH6u_BliWI5G_QZu-gGqooCzfGHnq8kzRKMBg84zuECy4UgpORVERzDW-kb3O15nvJR_VPU2lZ0LzTwnC3LWNjkSvAzp-Hz0Zvl6cGL669-mv0xYF1OvHxS05_Vn8vXT9fXVzeUJ-XxD7j5dXZ5cnryW2HuZczXHklJDPZw8I-y0LjQN8KneIEo-aWIgI9LvtNeq8_N6vp5s1IQJIxtoVXWfbvKHDRcS80-JqGzb_imh9nimHq53MO-SLImQTwWfnup7Y6xLr6fYE_r0CPWX6Zb_tYO26AWhcwf1uX3h53mm_zdP75Wqe72ZW9EI6QDbdmyuyfYaqHbekOgrbsPVQt3Boqol_gvhRW2LIs_4AF62h28xNJ5bEjNDfM3lvi4NSEk6zC1LvRSbt2IH3-HwNrl72nF4wbhV7QEg_W_6Z13tdzfwj1RtbzlfCXg38WOahCGN4aX-8AOL8n5rKgwAAA)"
title = "STAR Proportional Representation"
caption = "Elect the best candidate according to STAR voting, then assign the closest voters to that winner and elect more candidates with the rest of the voters."
comment = ""
id = "star_pr_sim" 
gif = "gif/star_pr.gif"
%}

{% include sim.html 
link = "[link](http://127.0.0.1:5500/sandbox/?v=2.5&m=H4sIAAAAAAAAA61W2W7jNhT9FVpAGxsmFO2LHSdoZ9JiXjJFkmIebCOQZToWKkuGSGcmnabf3kteUpayTF4K2-ByD889dxGt75ZjTeZzP6ZxsqRz13No7MEk8Kjnp3rHC-TMSxzqKqPnejBzl0tqufJ07ANYHo8jGsUSEETUjRIJ8K2JQ63Amlj_eqFFrVCtIzgGxhgGh774gCV505K-aXEdxe26SO56uEQFboAD-ncjHECAG8AI7iIYgNujlgc8sOkBjw-Dh5tI4wGNC0OINqTxYlwluEIW31FCXZkDVxl8FOQjk4-CfGCau7T9SHiEBMjqY8Au9ahPQxoAIHBMDuTC7S687sI31HIRKLbgpbsgUiEFMVYKgwhStRliSkMMIMRUhD4OmIowxAFTEcZoS5S3MMVqO2ozchUywjREmIYoVIp9EBIhRYQKIjwbo4IYz8YeDj4OmMIYaxqbporRmHTyJrMWY0gJEiYYUoJiEhSTIGGChAnqSZAvQVmJlGWH0IfIk3bTn8r0h1ClUC787iJQKUgxWSkyp3G_GJ2ipIl8YhbW5lDloqir4brgoilyQcmuXrOSknov9_no-2JRqa_QO2RG7ljJ1LGPbJMdSsGHBo3Ih6wh-7osBfsmJHzF7ovqUp85ukJP-ihdLBYWz-uGyYkmKpkgeaZ8mlM2F9k943N1GBdLGzDrYp0Jxlu1p6fkNivLRyK2jGT7fVM_ZCUnP5N74PxaVBVrBke1K4DWQvpB3odasOaGCRvQv6LtoxbQ6h-1viSDUM4g2L9ZUyvPQ6lcB7Kpm-HRD6k3xqPOr-hg2mBIUWmYrRLTBcNXeZy36CUZz_rwjm3aHnzC2ZMRb_Tvsm_qFIQQ9gyYK1X2vD5U4otaD5X30fSIA4fQChKGs6E-iGXudEZel3UDOITZatl6LDbENJPNizVbZc2IHHsQC_shU4h26ygTaLXbudMJWhUIm1F2l_wdjcowRssZ32cVycuM89kJ30GMJ-d9tBQod345iFqOZGZ6JoOdP6DrR8QwmmfgDV-rc8x4xslPsiWgBHCE82JVsgk5O12dn62aV9yjuzV22Ydt1giTItH3IloAlovKjtSPnak31Y1ol6y6F9vRazyo9rmUJ8JKzvqeTQ8XM2dKijPpTxPDcjzuN7DpB6iKBM6LpV2sp88QRgMGXeRwgeSjsVRywomKYKL0je_2rMlZJX6rm10mOheafk6W5LRtciR4GdLx-ejNis1woPvrH9NfOqzzmdcPCtrz6jP58unq6vL6YkA-X5PbT5cXg4vBa4m9EwWTcywp1dSj6TPCTutC0wCf7A0i5RMTAxmTfqe9Vp0f1_P1ZKMmTBjZQqvK-3Rb3G8ZF5h_Snht2_YPCZXHU_lwvYN5l2RFuHgs2exE3RsTVXo1xZ5Qp8eov8p27M89tEUvCJU7qM_NCz_PM_2_eXqvVN3rTd-KWkgH2LajuSbba6DeeyOirrgtkwt5B_O6EfgvhBe1zcsiZ0N42R69xWA8tyR6hviGiUNTaZCU9LSwLPlSrN-KHXzhwdvk9nHP4AXjOqv-YmtAqb_T35v6sIetdb27YWzN4eXET2gaRTSJguXTfzeyCIMrDAAA)"
title = "STV  Minimax"
caption = "Use STV to form equal clusters of voters. Then use Minimax within the voter clusters to elect candidates."
comment = ""
id = "stv_minimax_sim" 
gif = "gif/stv_minimax.gif"
%}

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSMU4EMQz8S2oXsZ3Y3n0GolttcYirOAEFDULwdpwMi046nbaYOONMxpP9KrWs26ZOHjttLJVcctGERJe_HWljJVGJJyksueJ9p8LjtGs2j-NuZD4amhFbjAYta6XSylp-OAqVPmvLY0l6QqWbL5m4yyx3Ga5TmxniLCjhgBsA97MB0gC3xLzOElJbqEjq5KakjiYINiEjKcMJHRxkxFEFKqhonUZ5ZMCTUBhSKCkMaSptTP_faDcIQFUxMJOQUqeWDa0eGYyCrwu5LvSQHkWbau32umZzpOZ4KQzRlrnZEWnHAB1RdAUgit4BiKI7uJi3dURhFcCz0xCDIQbr07GmEYOEwYEtExwOHGddAApAhI439eOncpBxldtIzTFSQDAwUsBMwExAMCAY8PN0ulzePh4_38_5Ez-cXl_Oz-X7F5mNX244AwAA)"
title = "An Attempt at Pairwise Voting with Quotas"
caption = "Under active development. Mouse over the pairs."
comment = "Maybe choose a more interesting example."
id = "pair_quota_sim" 
gif = "gif/pair_quota.gif"
%}

## Proportionality

Let's get back to the idea of proportionality. You can see that in these proportional methods, a voter group with two times as many voters gets two times as many representatives.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31TTY8TMQz9LzlbKHbsJNMbF05wgF1xGfUwlB6qHTpl1UWsEPx27DzQIsGikfr8Ffv5Jf2WctrNs2Ziy3uamd3S6pYqSZ4ilCsJF7d6Jhm5NhELuyHSiGtUSVO3JKwa2Txi5ictrMJu9V8WS93vKXFMbj6vjhIz4tYiUdIuU9K0Sz-4Jko2_OrlnmwOmf76PNOfzUzPZjiP3hxcCjXSSATRxIIMyLACQMVZDXAurI4-mcXR5zAl8Z4eFe_pQREA-oiixPsUB_SRBq_Dm8aBkgdpDj14JAoYlYI8GBXvNLuk__riaEUxJhQI4XdBhZSMqq_cye_Lg1GuGBrKKD-Z8mT68FlGa9XRU_9PQOtYWBvuFCsqhDKIb1jPIJRhPYNQZgAIZQ25PiYbhKoZwKOyQqQKuasN5v54U0WLCgZ1GtDAoOFsE0ABQOAGBi2eX3r7sF2Xm8N2f_RnOZyXl8v99mVZf_tvTufTp-Wruze37_33-PlhWV8th9N6uj6-3g7L9bSdU7zjhr79zyuJOLTpGQBtOrbq2Krr2LgbAIt19OvYr8d-L8yfPjb8sKzrdr19vBz9X_VuOd8dP6bvPwEoyRya_QMAAA)" 
title = "Quotas Give Proportional Results"
caption = "Try all the voting systems. They each give a 1:2 ratio of voters between the groups. Also try a larger number of seats. The large group is 63% of voters, so it's a 4:7 ratio."
comment = "Maybe choose a more interesting example. altlink is [link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA31SvW6UMRB8F9dbeNf27vddxwNQQCKa0xUfcEXEkTtFAYEQPDuznpwUKQS5mP3f8di_Si27_b5X0VEPsleF1R1W72J1zVB1MW2wzFQ0sswWlIXBiiHWMxnIWdabr7BmVSZ1pNUU1vJkqfnhIEVzczTRJfuXgKFZ0V3Ul6xoZVel9LIrf9SLlDF9R5_Ji4P6QKbKi4PM8mpmfTWjda7T5NkkpD-FjWGS004gNbCcACLagVirBsQSgGEgooaBDWAMco5hjgIGc5xjQW-hxymtTsaa-uhMNJu9rTFPRg2T9tD6XydbncXc0KgCHkmadBniuO8ieEgEs7zXq0zp6HPHnjvtujSdPmf3_xPpPsn34Fvzqn2dwcEXGLzmoGCD1xwUbAwCBRvB3DI3DwrmlaCz0vl8Ttl9TPb4gMU5wsnA1wlBBsHeoNDRCBQ6yCDyW5Z3386P282n88MR33U6by6Xh_P37XT1397d333dfsC9uf1Q8tPG7P-4nU7nx9uflyO--_vt_svxc_n9Fwg5q72fAwAA)"
id = "again_proportional_two_to_one_sim" 
gif = "gif/again_proportional_two_to_one.gif"
%}

This proportionality applies even when there aren't distinct groups. In the example below, there is a difference between STV and the other methods. STV picks a set of candidates that is spaced more widely to cover a larger area of voters. The other methods tend to pick candidates more toward the center. This is probably because STV considers the first choices above others, while the other systems consider all the options at the same time.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA41Ty24TQRD8lzm30EzPq9c3LpzgEBJxsXxYjA9WjNeJHESEyLdT02WEI4SELG2_pqurH_4RYlit192k2UbWqlGsupIkWYaW6nTRpiypmLtUkqahxSxTHErH--jaFBEsQ0v5kqlIaOqZRaw7fsErL1miqA5fzdLyZiMhDUpaKjnVKM1rFUN99ZQmmtp4msMqSihhFV5SCxKq2w0ACHaIKH_9EDFEkBGR8aLNvxoQg4zh1cvJX2q-dl-FATEKpuSlkg2X0kVqqVCQGDi6ALNUIMEjVcjJ3ai9glcBliCAoxDE0UIncDIEcbTTMlqTJ-RILmM6yQOZjHJmnIwykNZY2r9_A6AxhXXyRGRRyVIE-5EuJrgPOJGAqxgngrwS_4x-mOlSi7SKvo6C1zoDMkkeJvhhJuV_-JXmUymdZ8A5lMmdlaupnEHlNCtnUDnNWik4zdoZM2-2cpqNKI0ojZNsRGmDojrpRohGBo377Mzt3GdXikzBLXQy6ONiw83Tcp5vt8vjDhfpxtvT6XH5Nh9-2x_2x_3X-TvM27tP-O4enubDu3m7P-zPz--X7XzeL8cwTr8T1643NvycjUUKMjN2Zbw0K96cVQo2ZsQz9mejvzdY0sQOP8-Hw3K-ez7t8Ef8OB_vd1_Cz19X_VUPWwQAAA)" 
title = "Differences Regarding Evenly Spaced Winners"
caption = "STV picks a broader set of candidates to match the voters, but other methods pick more broad candidates that more voters would like."
comment = "The explanation is going to be tricky"
id = "distribution_matching_sim" 
gif = "gif/distribution_matching.gif" 
%}

### Apportionment-Based Multi-Winner Methods

There are more methods that only provide proportionality to distinct groups, and don't provide the kind of distribution matching that STV does to cover an area of voters with evenly spaced candidates. They are mechanically different. They apply a method of counting votes that is used for apportionment. Apportionment means you have separate groups, like different states, and you want to find out how many representatives to give to each state. Three examples are given below: reweighted range voting, reweighted approval voting, and proportional approval voting. 

{% include sim.html link = "[link](http://localhost:5500/sandbox/?v=2.5&m=H4sIAAAAAAAAA61WbU_jRhD-K4ullkRZGb_bCYTT9Y6rTqq4E9DehyRCjrMhlhw79W7o0Sv97Z3ZWdsJBPhSEbKzO2_PzDze-IflWKPJJHC4GzozPnFdkIIIpCDgnjPEIyfinuuDlDjc07p4yF3PBcHzYu5GaOXFAUgeShFqHX0WgmeIku-ClBjJ9aLZjFsuZo4hX6RNwpC7cYwK3xo53AqskfWvG1jcCvU-AnNQxrA4_NkfaJIXNcMXNa6jY7uIxecxD1CBQC3XIw2BARx6IShuRAtgcQNYIbPrwQp5XG55EBNOPYgJh55HC8XxAjKBOD4sFMeLaZfQbqgdfEeDdrEfrlb4nvb1fdITIh8iTaClh_7QNSJjyuBTI2AW3OcBD3kEJScc5gWHaB5QUuxM4Hai14mQfOLp0EGgywxeBxBEGnQQ00ypxIAaFVLzQyovpEaFVF5IjQpDWqhRYUy6RFcTUqMihxZXW0Y0tojaHYUaOZDXiihERAiioV5iQhCTb0wNjn1aqMExIYiRftb1zR_Ax6sr_f0ev8Wf27T4lGZ5kauH36osVXlVwvlX0CJbY_JOdhuP59SBxKGF8ieEPSHsSaDrSkJaCH5C8RKqIsEq7BAITnUMu5kNcWYhD1H0O5FiDqmmIcUcxocniPYJPoRTa7ktMyyst8ilqvNMcbauFqLgrNrguez_mE5L_VHmhI3ZrSiEdvsolum2ULLXWJPlfVqzTVUUSnxXaD4Xd3l5YXy6VJTJuPLpdGrJrKoFCiZQIRTLUp2z8bKlSu-EnGhn2sxssFnki1QJ2aI9OWE3aVE8MLUSLN1s6uo-LST7md1BzL_yshT1UYd2DqaVwjwU975Sor4WygbrX0j30QBo8ffbXBhB6WRQ7N-irnTmHiI3hSyrutflYdWyyWj6q3Zs2mJYXhozWzdm1xg-OuOktZ6xwXjffEd32jo-kvTYgG_wr9Pv2gtKCPcU1Cs99qzaluqb3vd09v5pZwcJgQpoRlLPONKYd5iRVUVVgx2Z2XrbZsyXrCGTLfOFmKd1n3UcpMF-SLVFe9TBhLAm7cTZKVoPiMiI7ML_TqkVA9KcyU1asqxIpRwfyzXUeHy-b40A8eT9VlW4snHDmRROvgLr-6yJ2DwDL-San1PHU8l-QkrACMBFynxeiBE7O5mfn83rA-kp3YJY9mGV1qppkdrPoloDGhdHRprHrpk3N0S0C1HeqVX_UBxC-xTKIxOFFPuZGw7nY-eU5WeYzwSG7WCwT-CGDzAVNJzkMztfnD6xaDBQ0XkGF0jWHyCSY8l0BSONb3C7EXUmSvWpqtep2rnQzHMyYyctySnA85K652NPype9I8Ovfxp-mbLOx95-UUDPyy_s2-fLy4urd0fsyxW7-Xzx7ujd0aHG3qpcoEwj5SZ0__RJwB3qAmkgHnKDIXzW1MAGbJ9ph6bz-jwPN5swUcPYCqiK9-kqv1sJqaj_nMnKtu1XA-qMJ_hwvWHzZpA5k-qhEONjfW-M9Oi1SJzQ3gPCX6Zr8fsGaLFXhO4dzOf6WZ6nnf7fMr01qt3rzdyKBsiOYUvH5ppsr4Fq4_WZvuJWAjd4B8uqVvQrRBe1LYs8Ez140e-_FKHJ3AYxEtnXQm3r0hghpMepZeF7tnnRduhlj26Tm4eNgBeMa6QHGOlf01_raru5gl-kan0txELiizm8okbR7PE_6mW-5q0MAAA)" 
title = "Apportionment-Based Methods"
caption = "STV picks a broader set of candidates to match the voters, but other methods pick more broad candidates that more voters would like."
comment = "The explanation is going to be tricky"
id = "semi_proportional_sim"
gif = "gif/semi_proportional.gif" 
%}

### Party Proportional Methods

Additionally, there are ways to have proportionality by using a party system, but that is a mechanically-different method that I haven't added to the simulator yet, so we'll discuss it on another page to come in the near future.

## Future Work

I still need to work out what the strategies would be for voters and candidates. So far, in the above examples, I've been using the honest strategy for ranking and the normalization strategy for scoring.

## Afterword

I hope that by seeing how proportional methods work you're inspired to improve our ability to represent all members of society. Basically, proportional methods allow candidates to better serve a segment of society by being closer to them.

