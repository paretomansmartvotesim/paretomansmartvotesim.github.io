---
layout: page-3
title: Instant Runoff Voting
description: An Interactive Guide to IRV (the Single-Winner kind of Ranked Choice Voting RCV)
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

In an ideal world, like-minded people would gather together to work as a group to accomplish goals that are larger than themselves.  The higher the goal, the bigger and broader the group needs to be.

We can get closer to this ideal if we use Ranked Choice Voting because this voting method allows candidates to ally and work together as a team.  This happened in an actual election for mayor in 2018 where two candidates came together to support each other against a third.  The campaign not only got the strength of both candidates, but because the ballots were Ranked Choice ballots, it got the strength of all their combined voters.  This happens in any system which avoids vote-splitting.  In ranked-choice voting, in approval voting, in STAR voting, in score voting, and in pairwise ranked condorcet voting, there is a spirit of cooperation.  Candidates see each other as assets to help reach out to new voters rather than liabilities that take their voters away.

So.. what is Ranked Choice Voting and how does it work?

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

{% capture cap5 %}Your vote counted for {{ A }}, your favorite, in the first round.  Not enough people chose {{ A }} as their favorite, so {{ A }} was eliminated.  Your vote counted for {{ B }} over {{ C }} in the final round, so you didn't spoil the election for {{ B }} by voting for {{ A }}.{% endcapture %}

{% include sim.html id="irv_second_counts_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu04EMQz8l9Qu4md29zMQ3WqLQ3fVnYCCBiH-HcdTHOKEUkycscdj56v1tu37ErTKQTtHJ5Y-bx7E63Ic1HhmcAixRTKLkvJ817Z1atY2o-Z1j8wUejiZO5LJVtT_nuSW5B7ei1n_ZbhXQ57eZigIYYkNAFMcgLTA6ZSznSakNlOTXvYldSRBAJARQ4pXgUBGBqIF0VoF2ssoz6VwEQpDquChpKm0MzESAxT0FKNyLcvucsZYwbzK_aq16Eqwqrff0hbVzgY-CFYNAzsW57DpGNhh02HTHYCBfYDD2hwDRwdwZQaGDawtvHxqGglIBBzEWjDgYKB2CEAB-LmX0-329vH8-X5pW3s6vV4v5_b9A5Xa76erAgAA)" title = "Election with Instant Runoff Voting"

caption = cap5

comment = "do a transfer, you still win" %}

**Instant Runoff Voting (IRV)** is the formal name for this counting procedure.  It refers to Ranked Choice Voting when there is only one candidate being elected. 

**The Single Transferable Vote (STV)** is the formal name for a similar procedure with an extra step.  It refers to Ranked Choice Voting when there's more than one winner.  You could call it multi-winner RCV.  The "Single" in the name comes from the fact that your vote counts for a single candidate, your top choice.  The "Transferable" part refers to when if, in an elimination round, your top choice gets eliminated, then your vote transfers to your new top choice for the next round of counting.  There is much more to say about the procedure of STV, but that will be all we mention it on this page. 

Around the world, IRV has been called by various names: the Alternative Vote (UK referendum 2011) and preferential voting (Canada 2015).  STV is also known as the Hare-Clark system in Australia.  IRV and STV are used nationally in Ireland, Australia, and India, and for cities and states in the US.

<!--Tie this voter choice thing into the intro to RCV-->

## Less Strategy, More Honesty

By being able to express more on a Ranked Choice ballot, voters no longer face a common dilemma.  The dilemma happens when you have to decide, "Am I going to vote for my favorite?" or "Am I going to show support where it would count in determining the winner of the election?" Honestly, the voter would like to support their favorite candidate and send a message of strength with all the other supporters that "this candidate represents us the best and deserves recognition".

{% capture cap6 %}Same example as above. You don't have to vote strategically to support {{ B }}.  You can support {{ A }} over {{ B }} and {{ B }} over {{ C }}. There is no benefit to switching from O=zero strategy to F=frontrunner strategy.{% endcapture %}

{% include sim.html id="irv_not_wasted_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRO05EMQy8S2oX8Td57xiI7mmLRWzFCihoEOLuOJ5iESuUYuKMPR47X623_Thm0CYnOjg6sfR18yDe5ulEjVcGhxBbJDOVlNe7tr1Ts7YbNa97ZKbQ3cnckUy2ov73JDeTu3svZvuX4V4NeXmbKxbE8MQGgCsOQHrgtMrZTxNSnKlJL_-SQpIgAMiIIcWrQCAjA9FEtFWB9nLKaytchMKQKngoaSodTIzEAAU9xaxc27KbnDF2sK5yu2ptuhKs6u23tEW1s4EfglXDwI7NOWw6BnbYdNh0B2BgH-CwNsfA0QFcmYFhA2sLL5-aRgISAQexFQw4GKgdAlAAfu7pfL2-fTx-vl_a3h7Ory-X5_b9A5Rvw6asAgAA)" title = "RCV: Less Spoiler Dilemma"

caption = cap6

comment = "slider showing strategy of voters. show a single voter, too.  Show choice between systems FPTP and IRV." %}

This dilemma is familiar to anyone who has voted in a single-choice voting eleciton.  (More formally, this kind of choose-only-one voting is called plurality or First Past the Post, FPTP).

{% capture cap9 %}Do I waste my vote on my favorite {{ A }} or do I support the more viable {{ B }}?  Change from O=zero strategy, to F=frontrunner strategy to get a better result.{% endcapture %}

{% include sim.html id="wasted_vote_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRMWoEMQz8i2sVlmTJ3n1FinTLFhe4IrCQEC7FEfL3yJrijhyHwWN7pNFI_im1rNs2nBbZaWOvxFLnyZx4GftOhWcEuxA3D2YoKc93LWul0nK33D0ihR5WxPZgohTV_yu4EdzDezLLU4ZrFuTpbcy74A5PDFMMV-yA8MAtMOppQIgzFQmheJQQkgABQEYaQiwTBDLScRu4LZmgNZ3ynAonoTCkCh5KGkobEyPQQUFP0SvntNpNrjFmMI9yO2pOOgNa5rd76eZZrnX8EKw2NGyYnMGmoWGDTYNNMwAatg4OYzM07BXAGelo1jE2t_SpYcQh4XDgS0KHg47cLgAF4OfeTsfxcXm9fp7LWl6O76_T8X65lt8_CondrK8CAAA)" title = "The Single-Choice Dilemma"

caption = cap9

comment = "slider showing strategy of voters. Maybe show a single voter, too.  Show choice between systems FPTP and IRV." %}

## Electability Polling

Still, there will be tough situations where if there are a large number of candidates that are all doing well, then it may be up to the voter to vote strategically and vote for a more electable candidate.  The voter should rely on head-to-head polling information to see who would win the final round.  This is the same kind of problem that is faced in the primaries.  The nice part is that this is handled in a single stage of voting. There are other ways to handle this electability problem.  Some voting systems can even handle it without voters having to rely on polls and you can read about that on the page about [finding common ground](http://./commonground.html).

{% include sim.html id="tough_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu04EMQz8l9Qp4lce-xmIbrXFIa7iBBQ0CPHv2B5tASeUYsY7zmTs_SqtbPu-ZiVeR93Jxsmm1TWCLP805DhqoegllUrCUUvZWi1aNq3Fknfv4Hp3vHe44o_V9ve4Nl27-57K-lehlg9SZJpRM2pkIgUgFXWAZyCPSjMTk5tTLdyyYjdiBwbAhhUtbiMOsOGBaqJaeUFaJqXYCqUgcBIBIJC40041T7R2iHAUTEu-MXFR0zIInYRPIrHnIJo39bet9oytA_8HQRXjGvZmCGkIaQhpGNcMgHFtQJv5kmHc3gCUnR2771hatxwjRuiw6EjQV8JAgoG7gwECwJqeLrfb28fj5_u1bOXh8vpyfS7fP9OVrU2sAgAA)" title = "A Tough Situation Solved by Strategy"

caption = "Strategic voting can help turn a tough situation into a successful election when there are useful head-to-head polls."

comment = "Silver lining.  So, maybe show an option button to turn on or off strategic voting." %}

This is an improvement over single-choice voting.  The polls are much more useful since rankings are given and any pair of candidates can be compared head-to-head, so voters are able to strategize better.  Attempting the same strategy with FPTP can turn a small lead in the polls to a big lead at the ballot box.

{% capture cap18 %}{{ C }} loses even though he's in the middle because he never got good poll numbers in FPTP polls.{% endcapture %}

{% include sim.html id="fptp_bad_polls_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRMWoEMQz8i2sXlmTJ631FinTLFhdIEVhICJfiCPl7JA1bXI5g8Eg78mik_S6trNs2l0o897qRjjNatM4RwfRPQ_a9Fopa6lJJOHIpa6ul5615m1dwfTheO5zxZrX9Pc4tzj18T2b-y1DLhhSelsgZOTwRTBFckQHcA3VH7xfg4lQLt8zYhdiBAZDhjhKXEQfI8EC2IJv5QFo6pdgKJSFQEgHAkLjSRjVPlBpIKAqmJd-YONlTMgI6Az4DiT1H0PNlv5ftlrb7wP-B0Y5xFXtTmFSYVJhUjKsKwLg6wC3ZSTGuNQBlpWH3hqWZ5hgxgkHC4MBmwoCDgbeDAQLAml4ux_F-fb59vJa1PB1fn5fj7XorP7_wC763rwIAAA)" title = "FPTP: Tough to Strategize"

caption = cap18

comment = "C loses in the middle" %}

It is very important that head-to-head polling is reported, since the information is available in a ranked poll, and without it, the polls are not that much better than FPTP polls.

Only one faces the final round.

## Sp***er

The worst part of single-choice voting is the term spoiler.  It sounds bad. and there's a reason it sounds bad, because that's how people intend to use it.  The hope is that the accuser will get the spoiler's votes by intimidating their voters.  This insult would no longer work in a Ranked Choice election.  It would only be accurate when the spoiler is getting more first-choice votes than the accuser.  And then it would not be effective because voters behind that large a candidate would not be intimidated.  

For new candidates who don't have many supporters yet, the barrier to entry would be lowered.  Hopefully, this would create competitive pressure to bring out the best candidates.  

(The technical definition of a spoiler is a candidate with a small enough level of support that they cannot win themselves, but that can change who wins merely by being in the election.  You would think that the only way to change who wins is to be the winner, and that can be true for some really great voting systems. For instant runoff voting, it's true if the candidate is small enough to be called a spoiler. )

{% capture cap7 %}{{ B }} accuses {{ C }} of spoiling the election, hoping he’ll get C’s supporters{% endcapture %}

{% include sim.html id="standard_spoiler_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu2oEMQz8F9curKfX-xUp0i1bXOCKwEJCuBRHyL9H1uQg5DgWPJJHGo-0X6WVddvGUonHXjda5Ddi8soy9r0WmiWkwQjPXMraatE8LU-PCq53X9T2YIKu7f8X3BLc3X0y4yFDLR-k6WmmjBSWCJ4IpsgBYYE0MJ6TgNCmWjh04pJDhwMYABlWlFg2MGS4I1uQjWyQlkZpLoWSEBgSAQ9DEkobVUKhg4KeYFTKZWnKzYBuAd8CmSuegWaf_pVUT8Pa8WNgUTGoYWEGe4ZBDfYMg5oBMKh1cFiXYVBvAMpKx5COdbnlCBJGHBIOBz4SOhx09HYGCAALejkdx9vl-fp-Lmt5Oj4_Tsfr5Vq-fwAajgagnwIAAA)" title = "Accusation of Spoiler"

caption = cap7

comment = "standard spoiler example. Maybe needs a switch between FPTP and IRV." %}

{% capture cap8 %}{{ B }} is okay with {{ C }} running because C’s supporters will support {{ B }} against {{ A }}.{% endcapture %}

{% include sim.html id="no_spoilers_sim"

link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu04EMQz8l9Qp4meS_QxEt9riEFdxAgoahPh3HM-dhDihFGPvOJMZ71dpZdv3OSrxPOpOQ64Vk1eWeRy10BohDUZ49VK2VouWTWuxrD0muN6dmO3BBF3b3xPcCO7uezLzX4ZaPkjL01g9o4cnUgBckQPCA4VVivckIMSpFm7pn0OIAxgAGVaMWF5gyHBHN9DNvCAtndLaCiUhMCQCHoYklHaqhEEHBT1BVsptacqtgm4F3wpZO16F5j39LamehrXjz8CiIqhhYwZ7hqAGe4agZgAEtQ4O6zIE9QagnHSEdKzLLSNIGHFIOBz4TOhw0HG3M0AAWNDT6XJ5-3j8fD-XrTycXl_Oz-X7B2gMzvadAgAA)" title = "No More Accusations"

caption = cap8

comment = "no spoilers" %}

Resistance to spoilers cannot be overstated. If you decide to become engaged in your community and run for office, the other candidates can't call you a spoiler any more.  They might even see you as an ally who can help bring in supporters. Running for office is a great avenue for people to become involved in politics, and it would be nice if they are welcomed.

## Afterward

In summary we have illustrated the problem that the fundamental way in which we cast our votes pits every candidate against each other.  We can address the problem by allowing voters to support more than one choice.  That means candidates can join each other as teams and work together on campaigns, at least until they become large enough to become each others' best competition.  We also showed that voters are able to support candidates that they feel best represent themselves, and even in more complex situations where they need to strategize, voters will be able to rely on more informative head-to-head polls.

 <!--Footnote: This is a Sankey diagram, which can be used to report poll results.  It doesn't report all the results because it doesn't show a head-to-head chart.  It only explains how the tallying was done and how the winner was chosen.-->

<!--I could also mention 1D orderings of candidates and the traveling salesman problem...-->