---
layout: page-3
title: Instant Runoff Voting
description: An Interactive Guide to IRV (the Single-Winner form of Ranked Choice Voting RCV)
byline: 'by Paretoman, June 2020'
---
{% include letters.html %}

I'd like to describe an ideal of cooperative politics and how it is better achieved with **instant runoff voting (the single-winner form of Ranked Choice Voting)**, where (in most situations)

* candidates that are on the same side can support each other, and
* voters can vote for their favorite candidate.

This is in contrast to what we have now with **single choice voting**, where

* candidates are forced into opposition with each other just by the way we vote and end up using terms like spoiler to intimidate each other, and
* voters face a dilemma when they have to decide whether to betray their fellow supporters and support a candidate who is more viable but not their favorite.

## Spirit of Cooperation

In an ideal world, like-minded people would gather together to work as a group to accomplish goals that are larger than themselves. The higher the goal, the bigger and broader the group needs to be.

We can get closer to this ideal if we use Ranked Choice Voting because this voting method allows candidates to ally and work together as a team. This happened in an actual election for mayor in 2018 where two candidates came together to support each other against a third. The campaign not only got the strength of both candidates, but because the ballots were Ranked Choice ballots, it got the strength of all their combined voters. This happens in any system which avoids vote-splitting. In Ranked Choice Voting and also in approval voting, in STAR voting, in score voting, and in pairwise ranked Condorcet voting, there is a spirit of cooperation because voters can support more than one candidate. Candidates see each other as assets to help reach out to new voters rather than liabilities that take their voters away.

So.. what is Ranked Choice Voting and how does it work?

<!--comment: "It would be good to have a turnout switch. Then the presence of a candidate near you could increase your chance of turnout."--> 

<!--This is as opposed to digs at each other.-->

## Introducing RCV

Ranked choice voting asks voters to rank the candidates in order from best to worst. Here's an example ballot where you can just write a number next to each candidate:

{% include sim.html id="irv_ballot_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy04DMQz8lSrnCMWJnTj9CA6IC9rtoYieqFokuCAE347t0UpIqNrDxK_JjLNfqaT9sujMxPOQF5plO1mutn445ETeMmtm9ailfcmJ0z79cMpJIuzWYrVhUPK_zyp6szJvVqgENxHIqSKEAGIA7icTQAYmgNjQrmsGM4rVeCxZCZHRVAPQVI7BKjFQO5IDkSKaMdBKCCVfAZgaBLWGOgQ1Y1ooExo7SuBrsEq5WomdznvY7bldrtvBCJfmB445_kvJcMoDzwCJPCMpWJiQP86ank7v63rZ3V93a_KXgnGBXIFxEQCMC1gF6xMY7wVA0dlhumN9XcKSi-2g6FDUsfoBRQMLGzUoRgNgYQMvOLZfaKCo265yy-x5WFQQKoUmhRiFGGUkBQA9Cj6FLHVZd8P-OvA8H8_n68fj59vJVvZwvLyeXtL3Lx2Xrl0VAwAA)" title = "Ranked Choice Voting Ballot"

caption = "Your vote counts for your top choice. It's like a stack of cards. The top card is who you like best. Under that is your second choice, and so on."

comment = "single ballot" %}

During counting, your vote counts for your top candidate. One-by-one, the candidate with the least number of votes is eliminated and taken out of the running. Still, your vote counts for your top candidate of those remaining. The process of elimination can continue until there's only one candidate left, or until the winner is decided: that means someone has gotten more than 50% of the votes. Once that happens, nobody else can beat them.

This is pretty similar to what we do now, eliminating candidates in the run up to the election. Except now that voters put all the information on their ballot, the process of elimination is transparent.

Here's a sketch that shows everyone connected to their first pick. Colored flow lines show some voters moving to their next choice after their top pick is eliminated. The flow diagram shown on the right is called a Sankey diagram, after it's inventor.

{% capture cap5 %}Your vote counted for {{ A }}, your favorite, in the first round. Not enough people chose {{ A }} as their favorite, so {{ A }} was eliminated. Your vote counted for {{ B }} over {{ C }} in the final round, so you didn't spoil the election for {{ B }} by voting for {{ A }}.{% endcapture %}

{% include sim.html id="irv_second_counts_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu04EMQz8l9Qu4md29zMQ3WqLQ3fVnYCCBiH-HcdTHOKEUkycscdj56v1tu37ErTKQTtHJ5Y-bx7E63Ic1HhmcAixRTKLkvJ817Z1atY2o-Z1j8wUejiZO5LJVtT_nuSW5B7ei1n_ZbhXQ57eZigIYYkNAFMcgLTA6ZSznSakNlOTXvYldSRBAJARQ4pXgUBGBqIF0VoF2ssoz6VwEQpDquChpKm0MzESAxT0FKNyLcvucsZYwbzK_aq16Eqwqrff0hbVzgY-CFYNAzsW57DpGNhh02HTHYCBfYDD2hwDRwdwZQaGDawtvHxqGglIBBzEWjDgYKB2CEAB-LmX0-329vH8-X5pW3s6vV4v5_b9A5Xa76erAgAA)" title = "Election with Instant Runoff Voting"

caption = cap5

comment = "do a transfer, you still win" %}

**Instant Runoff Voting (IRV)** is the formal name for this counting procedure. It refers to Ranked Choice Voting when there is only one candidate being elected. 

**The Single Transferable Vote (STV)** is the formal name for a similar procedure with an extra step. It refers to Ranked Choice Voting when there's more than one winner. You could call it multi-winner RCV. The "Single" in the name comes from the fact that your vote counts for a single candidate, your top choice. The "Transferable" part refers to when if, in an elimination round, your top choice gets eliminated, then your vote transfers to your new top choice for the next round of counting. There is much more to say about the procedure of STV, but that will be all we mention it on this page. 

Around the world, IRV has been called by various names: the Alternative Vote (UK referendum 2011) and preferential voting (Canada 2015). STV is also known as the Hare-Clark system in Australia. IRV and STV are used nationally in Ireland, Australia, and India, and for cities and states in the US.

<!--Tie this voter choice thing into the intro to RCV-->

## Less Strategy, More Honesty

By being able to express more on a Ranked Choice ballot, voters no longer face a common dilemma. The dilemma happens when you have to decide, "Am I going to vote for my favorite?" or "Am I going to show support where it would count in determining the winner of the election?" Honestly, the voter would like to support their favorite candidate and send a message of strength with all the other supporters that "this candidate represents us the best and deserves recognition".

{% capture cap6 %}Same example as above. You don't have to vote strategically to support {{ B }}. You can support {{ A }} over {{ B }} and {{ B }} over {{ C }}. There is no benefit to switching from H=honesty to F=frontrunner strategy.{% endcapture %}

{% include sim.html id="irv_not_wasted_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04DMRD8F9dbeJ_25TMQ3SlFEKmIgIIGIfh21juKgkDoirF31uOZ9X203g77PoM2OdLO0Ymlr5UH8TaPR2q8OjiE2CKZqaS86toOnZq1Q_uyRs1rG9mc3EhIaeq_v-Rmcn_qxWz_MtxLnZeXSTFWSVCCDTYAXHAA0gZbYl6pCanP1CS1siipJQkCgIwYWrwOCGRkYDex2-qA9jLLaxBchMKQKngoaSrtTIzGAAU9RVymnHyzm5wxxrCWclum7C5osDpvP6Ut6jobeBRYNQR2DM9h0xHYYdNh0x2AwD7AYWyOwNEBXJ2BsIGxhZdPTSMBiYCD2AoGHAycHQJQAF5u4OXG9QcaIOd1RqRkq45IswMQacLMhJlpZXQ6ADN_OF0uL2_376_n_F_vTs9P58f2-Q3G8My5_gIAAA)" title = "RCV: Less Spoiler Dilemma"

caption = cap6

comment = "slider showing strategy of voters. show a single voter, too. Show choice between systems FPTP and IRV." %}

This dilemma is familiar to anyone who has voted in a single-choice voting eleciton. (More formally, this kind of choose-only-one voting is called plurality or First Past the Post, FPTP).

{% capture cap9 %}Do I waste my vote on my favorite {{ A }} or do I support the more viable {{ B }}? Change from H=honesty, to F=frontrunner strategy to get a better result.{% endcapture %}

{% include sim.html id="wasted_vote_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy0oEMRD8l5z7kH4mM1_hwdswhxU8CAOKrIdF9Nu3k2JZUWQOlXR1KlWd-Sy1rNvWgxbZaeOoxFLHyoN46ftOhUcHhxBbJNOVlEddy1qpWFnLdy1UfG4jm5NrCSlN9feXXE_uT30yy78M16nOw0unaKMkKMEGGwAuOABpgy0xr9SE1GcqklpZlNSSBAFARgwtPg8IZKRh17Fb5gGt0yyPQfAkFIZUwUNJU2ljYjQGKOgp4jLl5Ivd5YwxhrGU-zJlN0GDzfP2U9piXmcNjwKrhsCO4TlsOgI7bDpsugMQ2Bs4jM0ROCqAZ2cgbGBs4dOnppGARMBBLBMaHDScbQJQAF6u4eXa7QdqIPttRqRko45IvQIQqcNMh5lu02h3AGb-dDqO1_Pj5e05_9eH4-P9dLycL-XrCt84MXMBAwAA)" title = "The Single-Choice Dilemma"

caption = cap9

comment = "slider showing strategy of voters. Maybe show a single voter, too. Show choice between systems FPTP and IRV." %}

## Electability Polling

Still, there will be tough situations where if there are a large number of candidates that are all doing well. Then it may be up to the voter to vote strategically and vote for a more electable candidate. The voter should rely on head-to-head polling information to see who would win the final round. This is the same kind of problem that is faced in the primaries. The nice part is that this is handled in a single stage of voting. There are other ways to handle this electability problem. Some voting systems can even handle it without voters having to rely on polls and you can read about that on the page about [finding common ground](http://./commonground.html).

{% include sim.html id="tough_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04EMQz8l9QWihM7du4zEN1qi0NcxQkoaBCCb8fxaIUAoS3Gr0xmnH0vtZy2bTpxmzttrHZErjRtBTNK1vedCq9Zlk7c28p7OVUqUk7lUwoVzXTEUPQsIMip_v6i59H7U8_O_LfDNdl5aXAatkoNJchgAUAFD0DIYAmMKxcEP1NpNbMWXC2gAUDTBCNB0wNA0wyZI5t5oNcUy2sRnI0Opt4BENSDaWPKb40ONMHYYZipUY-mJOUK-AjaEQTp1lYgeVJ-0spI2WJ4EggV2FWsTiFSIVIhUmFXFQC7auh53qSwOyqAc3Jg9wNLG5o2loUBigEFYyYYFBjOWgN0ANZkeDc7fh9D07_3Q7LqsOQVgBd0WHJYcgEoAPt28Dlk-ZJ1Y1Tuz9fr8-vd28slfuLb89Pj5aF8fAFAn7oMFQMAAA)" title = "A Tough Situation Solved by Strategy"

caption = "Strategic voting can help turn a tough situation into a successful election when there are useful head-to-head polls."

comment = "Silver lining. So, maybe show an option button to turn on or off strategic voting." %}

This is an improvement over single-choice voting. The polls are much more useful since rankings are given and any pair of candidates can be compared head-to-head, so voters are able to strategize better. Attempting the same strategy with FPTP and FPTP polls can turn a small lead in the polls to a big lead at the ballot box.

{% capture cap18 %}{{ B }} loses even though he's in the middle because he never got good poll numbers in FPTP polls.{% endcapture %}

{% include sim.html id="fptp_bad_polls_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04EMQz8l9QuYjuOk_sKCrrVFYdEgbQSCB3FCcG343i0QoDQFuNXJjPOvpdaTts2B7HMM21sfkTDaPoKZpRcz2cqvGa5KbHKyrWcKpVWTuWzFiqWaY-h6HlAkFP9_UVvRO9PPTvz3w7XZOelYVD3VRKUIIMbACq4A0IGt8C4ckHwMxWpmUlwSYAAQCMNI0GjAaARRzaQzTygNcXyWgRnQ8GkCoAgDaaNKb812tEEo8Iwk5BGsyXlCvgI5AiCdJMVtDzZftK2nrKb40kgtMGuYXUGkQaRBpEGu2YA2DVHb-RNBru9AjgnO3bfsbRuaWNZ6KDoUNBngkOB46wLQAFYk-Pd_Ph9HM3xvR9qqw5LowLwggOWBiyNBjAA9v1w2ffn6_3t5TH-1rv97fWyP11v5eMLMekMPQEDAAA)" title = "FPTP: Tough to Strategize"

caption = cap18

comment = "C loses in the middle" %}

It is very important that head-to-head polling is reported because the final round is a head-to-head match. This information is available in a ranked poll, but without it, the polls are not that much better than FPTP polls.

## Sp***er

The worst part of single-choice voting is the term spoiler. It sounds bad. and there's a reason it sounds bad, because that's how people intend to use it. The hope is that the accuser will get the spoiler's votes by intimidating their voters. This insult would no longer work in a Ranked Choice election. It would only be accurate when the spoiler is getting more first-choice votes than the accuser. And then it would not be effective because voters behind that large a candidate would not be intimidated. 

For new candidates who don't have many supporters yet, the barrier to entry would be lowered. Hopefully, this would create competitive pressure to bring out the best candidates. 

The technical definition of a spoiler is a candidate with a small enough level of support that they cannot win themselves, but that can change who wins merely by being in the election. You would think that the only way to change who wins is to be the winner. For instant runoff voting, it's true if the candidate is small enough to be called a spoiler.

{% capture cap7 %}{{ B }} accuses {{ C }} of spoiling the election, hoping he’ll get {{ C }}’s supporters{% endcapture %}

{% include sim.html id="standard_spoiler_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSvUoGMRB8l9Qpsr_J3VNY2B1XfIKFcKDIZ_Eh-uxudjwQRa6YZGczN7PJe2ll3bZlVOJlrxsN-V4xeWVZ9r0Wmi2kwQjPvZS11aJlLZ-t1GK59WgKrgeEZm2_v-BGcH_qySz_MtRSnaYH77PAKMAEKQAeyAFhgjQwfigBoU61cChFkUOJAxgAGVa0WB5gyHDHbmC35AFpaZXmGCgJgSER8DAkobRRJTQ6KOgJwlLloDTl5oLOBZ-LENyyR_Oc_pRUT8PacRWwqAhqGJnBniGowZ4hqBkAQa2Dw7gMQb0BKDsdIR3jcssIEkYcEg4HviR0OOg42xkgAAyo48b6-Ww6yHHOpkrVWUek0QCINGBmwMzQNDoMgFk_XI7j-Xp_e3mMV3p3vL1ejqfrrXx8AQl2JQHwAgAA)" title = "Accusation of Spoiler"

caption = cap7

comment = "standard spoiler example. Maybe needs a switch between FPTP and IRV." %}

{% capture cap8 %}{{ B }} is okay with {{ C }} running because {{ C }}’s supporters will support {{ B }} against {{ A }}.{% endcapture %}

{% include sim.html id="no_spoilers_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu07EQAz8l60tFL92nfsMRBelOMRVnICCBiH4drweIiEQSjH2jncy4-S9Le20bWsQy7rTxqHflXAn0XXfqfEcYUtGZfbaTgs1a6f2aY2aV9tzKLmRkDUtv5_kIrk_58Ws_zK8lDpPDzF7QQ8PbABY4A5ID2yJ-T5NSHGmJimUh5JCkiAAyIhhxOuCQEYGukC31gVdyinPLXARCkOq4GFIU2ljYgx2UNBTZGWSpKzkZsFHIUeRglvNWN2zn5LWy7ANfAlYNAR1bMxhzxHUYc8R1B2AoD7AYV2OoH0BcE12hOxYV_eKoGmkQ6LDQV8LBhwM3B0CUAAWNPDFxvHXDJBx7IaUbJ4jUkAwEClgJmAmrIyGA-AnoBewFdPWzaB2f75en1_v3l4u-e_enp8eLw_t4wsWUHUZAwMAAA)" title = "No More Accusations"

caption = cap8

comment = "no spoilers" %}

Resistance to spoilers cannot be overstated. If you decide to become engaged in your community and run for office, the other candidates can't call you a spoiler anymore. They might even see you as an ally who can help bring in supporters. Running for office is a great avenue for people to become involved in politics, and it would be nice if they are welcomed.

## Afterward

In summary we have illustrated the problem that the fundamental way in which we cast our votes pits every candidate against each other. We can address the problem by allowing voters to support more than one choice. That means candidates can join each other as teams and work together on campaigns, at least until they become large enough to become each other's best competition. We also showed that voters are able to support candidates that they feel best represent themselves, and even in more complex situations where they need to strategize, voters will be able to rely on more informative head-to-head polls.

 <!--Footnote: This is a Sankey diagram, which can be used to report poll results. It doesn't report all the results because it doesn't show a head-to-head chart. It only explains how the tallying was done and how the winner was chosen.-->

<!--I could also mention 1D orderings of candidates and the traveling salesman problem...-->