---
layout: page-3
title: Instant Runoff Voting
description: An Interactive Guide to IRV (a kind of Ranked Choice Voting RCV)
byline: 'by Paretoman, June 2020'
---

I'd like to describe an ideal of cooperative politics and how it is better achieved with **instant runoff voting (a kind of ranked choice voting)**, where (in most situations)

* candidates that are on the same side can support each other, and
* voters can vote for their favorite candidate.

This is in contrast to what we have now with **single choice voting**, where

* candidates are forced into opposition with each other just by the way we vote, and end up using terms like spoiler to intimidate each other, and
* voters face a dilemma when they have to decide whether to betray their fellow supporters and support a candidate who is more viable but not their favorite.

## Spirit of Cooperation

In an ideal world, like-minded people would gather together to work as a group to accomplish goals that are larger than themselves.  The higher the goal, the bigger and broader the group needs to be.

We can get closer to this ideal if we use ranked choice voting because this voting method allows candidates to ally and work together as a team.  This happened in an actual election for mayor in 2018 where two candidates came together to support each other against a third.  The campaign not only got the strength of both candidates, but because the ballots were ranked choice ballots, it got the strength of all their combined voters.  This happens in any system which avoids vote-splitting.  In ranked-choice voting, in approval voting, in STAR voting, in score voting, and in pairwise ranked condorcet voting, there is a spirit of cooperation.  Candidates see each other as assets to help reach out to new voters rather than liabilities that take their voters away.

So.. what is ranked choice voting and how does it work?

<!--comment: "It would be good to have a turnout switch. Then the presence of a candidate near you could increase your chance of turnout."--> 

<!--This is as opposed to digs at each other.-->

<!--**need to explain how RCV works, and what the diagram means**-->

## Introducing RCV

Ranked choice voting asks voters to rank the candidates in order from best to worst.  Here's an example ballot where you can just write a number next to each candidate:

{% include sim.html id="irv_ballot_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu2oEMQz8lUO1C0uW7PV-RIqQJuxucSFb5bgLJE0IybdH1nAQOA4XY73GM_I3ZZqXZeqJtW9p4Z6vN89JqduWiEdLl6TTiArNOZHSrIks7tXrkm6O9zav5HRzvDLdrfS7Fc7xHA89IxSEEMQKgCR2TezgAth1sj9XHHoUJYd4YUROIw6gEY1BsRiQimRDNCHqMVByCOWxEjAVMJUCgKDiTAsnRmNFCXwFVjlWpYNu9OiwN-yqXC9OuJRx0ZjT_5QKp9rwLZCoPZKGhZkz0u9Kz_vHup4PD5fDSuRpyDXINRg3A8C4gdWwPoPxmgEcnRW_ULG-amFpiK2gqFBUsfoGRQ0LaxIUrQCwsJfj6XT5fPp631314_H8tr_Szx9OauPpqAIAAA)" title = "Ranked Choice Voting Ballot"

caption = "Your vote counts for your top choice.  It's like a stack of cards.  The top card is who you like best.  Under that is your second choice, and so on."

comment = "single ballot" %}

During counting, your vote counts for your top candidate.  One-by-one, the candidate with the least number of votes is eliminated and taken out of the running.  Still, your vote counts for your top candidate of those remaining.  The process of elimination can continue until there's only one candidate left, or until the winner is decided: that means someone has gotten more than 50% of the votes. Once that happens, nobody else can beat them.

This is pretty similar to what we do now, eliminating candidates in the run up to the election. Except now that voters put all the information on their ballot, the process of elimination is transparent.

Here's a sketch that shows everyone connected to their first pick. Colored flow lines show some voters moving to their next choice after their top pick is eliminated.

{% include sim.html id="irv_second_counts_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA21RMU4EMQz8S2oXsWM7yT4D0a22OMRVnICCBiF4O44H6dCBtphYY4_Hsx-llm3fmY2GHLTzmDR8PWYl4XkcVDg7RiM2XgwLiSyila1S0bIpFcu3R2uwt1_09mCCpnr7BTeCi-EvnuNPQ9Dzh3ar_9FcczUvm6sUlDDHCoA9dkCY4fDMsbgFxAKmIjUPkdCRAAFARhQtlgMCGemoBqqZA62mW17xcBJNcrY18DDUQmlnYjQ6KOg13MsZm17llPO5Tla5PltGng2a8_pbWj2Xa8evglXFwYbgDDYNBxtsGg42A-Bg6-AQm-FgrwDOTkf6jtjc0mcLIw4JhwOfCR0OOmY7guoNgKAeTpfLy9v9--u5bOXu9Px0fiyf32gdSPW2AgAA)" title = "Election with Instant Runoff Voting"

caption = "Your vote counted for A, your favorite, in the first round.  Not enough people chose A as their favorite, so A was eliminated.  Your vote counted for B over C in the final round, so you didn't spoil the election for B by voting for A."

comment = "do a transfer, you still win" %}

**Instant Runoff Voting (IRV)** is the formal name for this counting procedure.  It refers to ranked choice voting when there is only one candidate being elected. 

**The Single Transferable Vote (STV)** is the formal name for a similar procedure with an extra step.  It refers to ranked choice voting when there's more than one winner.  You could call it multi-winner RCV.  The "Single" in the name comes from the fact that your vote counts for a single candidate, your top choice.  The "Transferable" part refers to when if, in an elimination round, your top choice gets eliminated, then your vote transfers to your new top choice for the next round of counting.  There is much more to say about the procedure of STV, but that will be all we mention it on this page. 

Around the world, IRV has been called by various names: the Alternative Vote (UK referendum 2011) and preferential voting (Canada 2015).  STV is also known as the Hare-Clark system in Australia.  IRV and STV are used nationally in Ireland, Australia, and India, and for cities and states in the US.

<!--Tie this voter choice thing into the intro to RCV-->

## Less Strategy, More Honesty

By being able to express more on a ranked choice ballot, voters no longer face a common dilemma.  The dilemma happens when you have to decide, "Am I going to vote for my favorite?" or "Am I going to show support where it would count in determining the winner of the election?" Honestly, the voter would like to support their favorite candidate and send a message of strength with all the other supporters that "this candidate represents us the best and deserves recognition".

{% include sim.html id="irv_not_wasted_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA21RMU4EMQz8S2oXsWM7yT4D0a22OMRVnICCBiF4O44H6dCBtphYY4_Hsx-llm3fmY2GHLTzmDR8PWYl4XkcVDg7RiM2XgwLiSyila1S0bIpFcu3R2uwt1_09mCCpnr7BTeCi-EvnuNPQ9Dzh3ar_9FcczUvm2PVghruWAHwxw4INxymOTa3gNjAVKTmJRJCEiAAyIiixXJAICMd1UA1c6DVtMsrH06iSc62Bh6GWijtTIxGBwW9hoM5c9OrnHI-180q12fLzLNBc15_S6vncu34V7CqONiQnMGm4WCDTcPBZgAcbB0cYjMc7BXA2elI3xGbW_psYcQh4XDgM6HDQcdsR1C9ARDUw-lyeXm7f389l63cnZ6fzo_l8xtp4lfrtwIAAA)" title = "RCV: Less Spoiler Dilemma"

caption = "Same example as above. You don't have to vote strategically to support B.  You can support A over B and B over C. There is no benefit to switching from O=zero strategy to F=frontrunner strategy."

comment = "slider showing strategy of voters. show a single voter, too.  Show choice between systems FPTP and IRV." %}

This dilemma is familiar to anyone who has voted in a single-choice voting eleciton.  (More formally, this kind of choose-only-one voting is called plurality or First Past the Post, FPTP).

{% include sim.html id="wasted_vote_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRS24FIQy7C-sscH4w7yqjOUnVuzfEi1f1qRoJA06M4_kac7zue6dc-siNFQJ471x07ueRgVOBVIFnMdvEcO5tvKYM7zV6zapU-fiqdhVTtMy_X3G7uI_7Zq5_Gcx-EMfbPmflmZ5AU6ArJKE8wAvrPSsoccjQEqpLLSEtUAJl1FkS3aCU0cXT5unqBpvtFCcVNGHavWbkqWSldEPAwiRFPeOs6LT8LedgBmer76110l3g3e-_pT37OV_8Q7TqHDiYXNBmcOCgzaDNCAIHjkWOsQUHzklAVybTT8aW0T6tjCQlkg7yalh0sNi7GNQywvlz3z8e1Uc2lgIAAA)" title = "The Single-Choice Dilemma"

caption = "Do I waste my vote on my favorite A or do I support?  Change from O=zero strategy, to F=frontrunner strategy to get a better result."

comment = "slider showing strategy of voters. Maybe show a single voter, too.  Show choice between systems FPTP and IRV." %}

## Electability Polling

Still, there will be tough situations where if there are a large number of candidates that are all doing well, then it may be up to the voter to vote strategically and vote for a more electable candidate.  The voter should rely on head-to-head polling information to see who would win the final round.  This is the same kind of problem that is faced in the primaries.  The nice part is that this is handled in a single stage of voting. There are other ways to handle this electability problem.  Some voting systems can even handle it without voters having to rely on polls and you can read about that on the page about [finding common ground](http://./commonground.html).

{% include sim.html id="tough_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu04EMQz8l9Qp4lce-xmIbrXFIa7iBBQ0CPHv2B5tASeUYuwdZzLj_SqtbPu-ZiVeR93JxllNq2tEsfzTkOOohWKWVCoJRy9la7Vo2bQWy7r7BNe747PDGadr-3ucm87dfU9m_ctQywcpPM3oGT08kQLgijrAPZBbpZmOycWpFm7ZsQuxAwMgw4oRlxEHyPBAN9GtvCAtnVJshZIQKIkAYEhcaaeaJ0Y7SCgK0pJvTJzUlIyCzoLPQmLPUWje1N-y2tO2DvwfGFXENezNYNJg0mDSENcMgLg2wM18yRC3NwDlZMfuO5bWLWNEhA6JDgd9JQw4GLg7GCAArOnpcru9fTx-vl_LVh4ury_X5_L9AzYTUNKsAgAA)" title = "A Tough Situation Solved by Strategy"

caption = "Strategic voting can help turn a tough situation into a successful election when there are useful head-to-head polls."

comment = "Silver lining.  So, maybe show an option button to turn on or off strategic voting." %}

This is an improvement over single-choice voting.  The polls are much more useful since rankings are given and any pair of candidates can be compared head-to-head, so voters are able to strategize better.  Attempting the same strategy with FPTP can turn a small lead in the polls to a big lead at the ballot box.

{% include sim.html id="fptp_bad_polls_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRMWoEMQz8i2sXlmTJ631FinTLFhdIEVhICJfiCPl7JA1bXI5g8EgeeTySv0sr67bNpRLPvW6k44wWrXNEMP1oyL7XQlFLXSoJRy5lbbX03DV38wquD8trhzNO1_Z3Obc493CezPyXoZYPUnhaImfk8EQwRXBFBnAP1B39vQAXp1q4ZcYuxA4MgAx3lLiMOECGB7IF2cwL0tIpxVQoCYGSCACGxJU2qrmi1EBCUdAt-cTEyZ6SEdAZ8BlIzDmCnjf7vWy3tN0H_gdGO9pVzE1hUmFSYVLRrioA7eoAt-RLinatASgrDbM3DM0024gWDBIGBzYTBhwM3B0MEADG9HI5jvfr8-3jtazl6fj6vBxv11v5-QVIqEK2rwIAAA)" title = "FPTP: Tough to Strategize"

caption = "C loses even though he's in the middle because he never got good poll numbers inFPTP polls."

comment = "C loses in the middle" %}

It is very important that head-to-head polling is reported, since the information is available in a ranked poll, and without it, the polls are not that much better than FPTP polls.

Only one faces the final round.

## Sp***er

The worst part of single-choice voting is the term spoiler.  It sounds bad. and there's a reason it sounds bad, because that's how people intend to use it.  The hope is that the accuser will get the spoiler's votes by intimidating their voters.  This insult would no longer work in a ranked choice election.  It would only be accurate when the spoiler is getting more first-choice votes than the accuser.  And then it would not be effective because voters behind that large a candidate would not be intimidated.  

For new candidates who don't have many supporters yet, the barrier to entry would be lowered.  Hopefully, this would create competitive pressure to bring out the best candidates.  

(The technical definition of a spoiler is a candidate with a small enough level of support that they cannot win themselves, but that can change who wins merely by being in the election.  You would think that the only way to change who wins is to be the winner, and that can be true for some really great voting systems. For instant runoff voting, it's true if the candidate is small enough to be called a spoiler. )


{% include sim.html id="standard_spoiler_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu2oEMQz8F9curKfX-xUp0i1bXOCKwEJCuBRHyL9H1uQg5DgWLMkjjUezX6WVddvGUonHXjda5Ddj8soy9r0Wmi2kgQjPWsraatE8LU-PDq53X_T2QAKu7f8X2BLY3X0i4yFCLR-kqWmWjBKSCJoIosgRQgJpxHhOIgQ31cLBE5ccPByBEUDDihbLAQYNd1QLqpED0lIoTVMoAeGcFQEOQRJMG1VCowMCn2BVSrM06WZCt4RviUyLZ6I5p38p1fNR7fgxkKhY1GCYQZ5hUYM8w6JmCFjUOjDYZVjUGwJlp8N1h11uuYKEEAeFQ4GPDB0KOmY7DOqCAINeTsfxdnm-vp_LWp6Oz4_T8Xq5lu8fubfAvp8CAAA)" title = "Accusation of Spoiler"

caption = "B accuses C of spoiling the election, hoping he’ll get C’s supporters"

comment = "standard spoiler example. Maybe needs a switch between FPTP and IRV." %}


{% include sim.html id="no_spoilers_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu04DQQz8F9dbrJ97d5-B6E5XBJGKCChoEOLf8XoSCRGhK8bO2LPjyRd12vZ9XRrLerSdF71WwtFE1-NoxHOELRmV2SttvZHRZo286sgJaXdfzo5kkm7975fcktzd78Ws_zLc60GenmYraGGJDQBTHIC0wOmU8zlNSG1uJL3sS-pIggAgI4YRrwWBjAx0C7q1FrSXUZ6hcBEqtasKHoY0lXZujMEABT3FqVxhWcnNgm-F3AqdEc_Cas9-S1rUozbwx8Ci4VBHYA57jkMd9hyHugNwqA9wiMtxaHQA12Qg9UBc4XWCppGARMBBrAUDDgZ2BwIaCkBAT6fL5e3j8fP9TBs9nF5fzs_0_QPwcCwonAIAAA)" title = "No More Accusations"

caption = "B is okay with C running because C’s supporters will support B against A."

comment = "no spoilers" %}

Resistance to spoilers cannot be overstated. If you decide to become engaged in your community and run for office, the other candidates can't call you a spoiler any more.  They might even see you as an ally who can help bring in supporters. Running for office is a great avenue for people to become involved in politics, and it would be nice if they are welcomed.

## Afterward

In summary we have illustrated the problem that the fundamental way in which we cast our votes pits every candidate against each other.  We can address the problem by allowing voters to support more than one choice.  That means candidates can join each other as teams and work together on campaigns, at least until they become large enough to become each others' best competition.  We also showed that voters are able to support candidates that they feel best represent themselves, and even in more complex situations where they need to strategize, voters will be able to rely on more informative head-to-head polls.

 <!--Footnote: This is a Sankey diagram, which can be used to report poll results.  It doesn't report all the results because it doesn't show a head-to-head chart.  It only explains how the tallying was done and how the winner was chosen.-->

<!--I could also mention 1D orderings of candidates and the traveling salesman problem...-->