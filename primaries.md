---
layout: page-3
title: Primaries
description: An Interactive Guide to Voting
byline: 'by Paretoman, May 2018'
---
{% include letters.html %}

We Don’t Need Primaries
=======================


I’m going to talk about what we're trying to achieve when we vote.  And I'd like to talk about how using primaries and choosing only one candidate on our ballots will only achieve accurate representation in the best case scenario. In many cases, a lot of votes are wasted, and a lot of voters receive no consideration.

We're going to go over each aspect of voting and see how other methods of voting can work in more scenarios.  And I’m going to try to make it easier to think about voting by using diagrams. Voting is not an easy subject because there are many voters and each have different perspectives.  There are also a lot of strategic considerations you have to make. Voting is hard, but it could be easier.  You should walk away from this tutorial wanting to change how we vote.

Primaries were created to allow a party to deal with vote splitting, but there are other ways to vote that beat primaries on this original design point.  Additionally, better systems can have better competition which produces better candidates.  They also can encourage voters to vote honestly without having to watch the polls to help them vote strategically.  Most fundamentally, they avoid splitting the vote so voters don't have to coordinate on who they should support and who they will encourage to drop out.

| Method of Voting                                | Lots of Scenarios | Best Case Scenario |
| ----------------------------------------------- | ----------------- | ------------------ |
| Primaries with Choose Only One Plurality Voting | Bad               | Good               |
| Alternative Voting Methods without Primaries    | Good              | Good               |

The Original Design of a Primary is to Deal with Vote Splitting
---------------------------------------------------------------

There are ways to vote that beat primaries at their own game.  Specifically the original purpose of having a primary is to solve the problems of only being able to vote for one candidate.  A primary allows a party with many potential contenders to unite behind one.  Primaries don’t entirely solve this problem.  They are only an incremental improvement.

### Basics

Let’s back up a little here and ask what the purpose of voting systems is.  You use voting systems when you have a large group of people and have to come to a decision. This can be a referendum or a ballot initiative, or you could elect a representative to make the decision for you. 

A referendum is actually pretty simple; you just say yes or no. Really, the *hard *part of the referendum is to decide what the wording is going to be for the question.  The wording is not up to you; that's up to the group that puts the initiative together or the legislators that wrote the referendum.  This group tries to consider what the voters want, and that is the hard part.  It’s part of the mechanism for the idea that you are represented.

{% include sim.html title="Referendum - Your Ballot" caption="Yes or No?" id="yesno_sim" link="[link](http://localhost:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRy04DMQz8lVXOOcSPOLv9CMSBC9rdQ5F6QFpRBOVQofbbcTwCDlUVKY4z9ngm-U4l7ea5tkyV1zyzWiYd1zUn6gDJmMm455J2JSeNvcZuXsH5Znltc6Tkm-XIeBeZ7iJUYhx1RT1lpBBEUESQRK6JPLgAUo8-jj1MAbLz-CUTMg6MQcMajew04sFw2ZCNyKZokBJCqT8JmARMIggQJM40E8oMANhk-uvXThWHbq1bVf49ONks_aDRpf90Co_a8CEQp1Nc1oLgfOm6pOH58Dksy9vwcByWlByA1CrxEhWma0WA6dpQMsbcCtNWEGDY8AOGp7MahrpYA4VBk-HZG76vobdxDHvZb9vx9HR-P7jSx-3rY7-9ns7p8gN-hdYHkQIAAA)" %}

And lets see a whole group of people.

{% include sim.html title="Referendum - Result" caption="Everybody Votes" id="yesno_many_sim" link="[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRsWpDMQz8leDZgyVL8nM-onToUt7LkEKGwqMpbTKE0n57ZR1phxAMPktnnU_yVyppO8_aMinv8sximWTa7XKiQZCwx33ENW1LThK7xm5-g_PN8rvNmZJvljPTXabfZajEczQcjZARwhDBEcESGcANkDj6c-zQI8uu40l2HXLg4BgyLEi6THWADDdEE6IeBbWEURojoSAqDNUKHoaqK82EawYCarX_1UtIjQNdD3w91FE-DhJV8i8nFlal4UNgTnoktQBcL_0s6fnwuSxvm4fjZknJ02hZa8xB0bIqAC1rw5UpXlW0bAWAwRnaNQzONNqpbswgYXBkGHrD5zXUNg542a_r8fR0eT-4z8f1_LFfX0-X9P0LH8D-m48CAAA)" %}

For an election, the hard part happens in the primary.  The general election is easy: there's two choices (at least in the United States, where I'm from, there's two choices). There's not a lot to think about. Each party has put up their nominee, and you pick the one closest to you. 

{% capture cap3 %}{{ A }} or {{ B }}?{% endcapture %}

{% include sim.html title="General Election" caption=cap3 id="ab_sim_general" link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu2oEMQz8F9curKfX-xUp0i1bXCDFwcKFcCmOkH-PrOGS4jgWPJJHGo-036WVddusVzLe68bqlXTZ91poEqQc-Zi5lLXVonlanh4VXB--qO3BtPrwBbM8ZcZThlo-R9PRTBkpDBEcESyRA8IAaWA8xwEjbzl04pJDhwI4OYYMKy5DRgIgwx3Zgmxkg7Q0SnMllITAkAh4GJJQ2ghlDgJqMv76NaVmQPeA74HM9hlodum_nHpa1Y4fAnM68tKwKoMxw4gmObdhRDMARrSOkiVfMYzoDYBFOcZzLMot7UsYcUg4HDiW3OGgo7dzwtvpOC7X19vHe1nLy_H1eTrO11v5-QXpTWN6fwIAAA)" %}

The hard part happens in the primary.  That's where you have many more competitors. There are two primaries going on at the same time, and in each one there is the same decision process, where one party wants to put up a candidate that can beat the other party. 

{% capture cap4 %}{{ A }} or {{ B }}? Which would beat the other party?{% endcapture %}

{% include sim.html title="Primary Election" caption=cap4 id="ab_sim_primary" link="[link](http://localhost:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRMWoEMQz8i2sXlizJ3n1FinTLFhdIEVhICJfiCPl7JM2FIxyHixntaMcj-bu0sm6bjkrKe92IyZkFm8GmM7alkrV9r4WiecqfwOyMQuhlbbVIWakWTW7eyvXueO9wpdW748p8qCwPFWp5HUW0KBklApEAEIkM4AFIHP26gCW_csuKKWdgt2EH2DAGY7fpDrDhgWqiWvKH3jIoxUoohY5AvUNHoO5Om-83TrQaRDh2DEu-ru6iwDJmFbpRvtEOs6CSDvLfXizjy8AjIbAseCysTxFWMbb23IVe31MBGFsHWmbepBjbGgDLM4xsWJ5pJo1RDBaGBIbFDyQY-HdwwsvpON7Pz5eP17KWp-Pr83S8nS_l5xcgCQz0sAIAAA)" %}

### Pairwise Ranking

I’m going to tell you about another way we could vote, and it’s easier.  Instead of posing this question, “What candidate do you think would be best overall?”, we can ask voters, “Who is best for you?”.  That is a much easier question to ask.  You don't have to make people guess.  The best part is that you still get the same benefit: you get to unite a whole side behind the person that is best for all voters. 

What does that look like? The easiest example of this is a pairwise ranking, because in a pairwise ranking, for every pair, your full support goes to the candidate you prefer.  If there's a great candidate that's in the middle, and there's another great candidate that's more towards your side, you’re not going to be in a dilemma of which one to vote for.  You can throw all your support to the candidate that's on your side when they are matched against the other side, so he gets the full support of his side.  and also, your full weight will count towards the middle candidate over candidates from the other side, and that completely solves the problem that the primary was trying to solve. The whole purpose of the primary was to say that we want our single vote to matter the most.  Now, when you count by pairs, your vote - your full vote -  counts for the candidate you prefer over any other candidate.

{% include sim.html title='Pairwise Ranking'

caption='Your full support always counts for the better candidate in each pair of candidates.'

comment='three candidates, two on one side, one on other' id='pairwise_intro' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRvU6DMQx8lcpzhvgvafoQDIgFfV-HIjpRtUh0QQieHccnJASqMtiO7cvd5YMq7ZaFXYtU2ZeFR2QyM1EpomO_L8Q5o71wq7NW2tVCRrtRyDNvMRHjf0_M9ujU8u9EZ3uzM252uOZzPBnNUlCCEBsCKHFw4ghBgC1iPKcRRjYlcOJSGFXASATAiOWieC5Iw2VHtUU1ckFrEuVpCZAUSKoIIKSBtHBhDDa0gKeQymmVTbg5Y1PelGvykwTgojOx3LPfkAal1vEtoGgjLx2GeSDS10qPx7d1PW_uLpuVKK5B1zXdcAh3R4BwB6rDPofwVhE4Jxt-ocG-5ilpkm2AaGDUYH0How7DuiTE0-F0ulwf3l-PwfP-cH45PtPnN_ziP1OdAgAA)' %}

It’s much clearer what happens when you think of the candidate’s perspective.  All their supporters are behind them.  They get the full weight of their supporters when they face the other party. The candidate doesn't need to worry about splitting votes with anybody.

{% include sim.html title='Pairwise Election'

caption='Each candidate gets the full weight of their side against the other party. Mouse over each pair to see the support.'

comment='mouse over pairs to see support' id='pairwise_election' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRMU4EMQz8ysl1ijiOk80-ggLRoN0tDrEVpzskaBCCt2N7ihM6nVKMnbEnY-ebMs3Lojmxji0tzD1xE48GJ-5sUelqbNm2ROzFk1iJOiEabUYIzTlRpXkk0oiblZZ0c6y2G5PTzTFmusuMuwzneI7dmqcFKQxxBcASmyc2MANcDe05hxFkyZEVRmYyxQAypUZjMRkxaLjsyCZkIxokh1H2lUBJoCQCgCExpcX268dLG0goCoZlW5d9BFVI-qyVr2G5hgIxD2so1P_yFXPXjk-C4TriUrE-NWX6Xel5_1jX8-HhcliJ7BrmVVCLNagCsAaFqk7xsmINLQM4Khv-pGGZTcO5j9Yg0eCo4SM6HHX09hLwcjydLp9PX--7-Xw8nt_2V_r5A7EXqU-9AgAA)' %}

So, this solves the problem of splitting votes, which is caused by limiting your vote to choose only one candidate.  The head-to-head pairwise ranked ballot achieves the goal of the primary in a better way than the primary could. It does better because each voter knows for themself, who is better for themself.  The voter knows their own preferences better than they can guess the preferences of the entire population (or watch polls).  There is no more hard part of guessing what nominees to put forward.  You're asking more from the voter, and it's information that the voter has: what their own preferences are.  

If, in a primary, the voters are not engaged and not paying attention to the head-to-head polls, then their vote can be manipulated by whatever media they are consuming. The polling data itself could even be inaccurate.  A better voting system wouldn’t ask you to find the middle from the polling data.  It would find the middle for you.

Now, the voting system is smarter, and the voter also needs to get smarter.  The voter needs to do more work because now they have to consider every candidate.  With primaries, we got away with doing our civic duty pretty easily: we voted for one candidate and said, “Well I voted for that guy, that's all I need to do.”  Now it’s your duty to consider all the candidates.

### A Brief Intro to the World of Voting Methods

{% comment %} Maybe move this to Vote splitting discussion {% endcomment %}

There are also other ways to count ranked ballots and there are other kinds of ballots that avoid vote-splitting.  Scored ballots avoid vote splitting.  A scored ballot allows you to give a rating from 0 to 5 on a candidate. A specific kind of scored ballot is an approval ballot, which allows you to rate on a very simple scale: do you approve or not?  And simply because you are no longer limited to vote for a single candidate, you can vote for that candidate without feeling like you’re splitting with other groups of voters that support other candidates.  Why would you split if you are not forced into the dilemma of choosing one?

I think scored ballots aren't quite as good as pairwise because the voter has to watch the polls to decide which candidates need their vote.  This is a little more work for the voter, but in the end, it works out pretty much the same as counting by pairs.

Also, up to now, we haven't called our voting system by it's proper English name: First Past the Post (FPTP). FPTP is another name for our choose only one voting method.  Let's compare these methods in the simulation below.

{% comment %} How do I actually show vote splitting? {% endcomment %}

{% comment %} Todo: Need to add +Primaries {% endcomment %}

{% capture cap10 %}drag <span class="letterBig" style="color:hsl(0,80%,70%);"><b>{{ C }}</b></span> to <em>just under</em> <span class="letterBig" style="color:hsl(45,80%,70%);"><b>{{ B }}</b></span> to create a spoiler effect.<br> then compare these four different voting methods:{% endcapture %}

{% include sim-test.html title='More Voting Methods' caption=cap10 id='election31' %}

Another method you've likely heard of if you are reading this page is Ranked Choice Voting (RCV), which is a new name (as of the past 20 years) for Instant Runoff Voting (IRV).  It is also a name that is used for Single Transferable Voting (STV), which is different than IRV, and so you have to tell from the context which method people are talking about. IRV avoids some vote splitting by using a process of elimination.  It's worth getting into on its own page.

Read more about:

* [RCV, IRV, and STV](./rcv).

* [Approval Voting](approval)

* [Score Voting](newer)

This is just a brief introduction to the world of voting methods.  After you're finished with this page, see the other pages on this site for more explorable explanations of voting methods.

Game Theory: The Competitive Pressure that the Primary Relies on has a Flaw and Only Works in the Best Case Scenario
--------------------------------------------------------------------------------------------------------------------

Primaries rely on competitive pressure to get good results for the voters.  If the scenario changes so that the competitive pressure breaks down, then the results are not good.

### Game Rules

Say we have a set of candidates in two primaries, {{ A }}{{ B }}{{ C }}{{ D }}, arranged in a line, like in the drawing below.  There are some candidates more towards the middle that would better represent all the voters: that’s {{ B }} and {{ C }}.  Ideally, in the best case scenario, {{ B }} or {{ C }} would win.   That's what we want the voting system to do.  We also want {{ B }}&{{ C }} to actually run.  We want them to not think that they will cause any problems for their party by splitting votes or in any other way. 

This is kind of a game.  There's two players: the {{ A }}{{ B }} party and the {{ C }}{{ D }} party. A party takes an action by nominating a candidate.  The party is happier when their candidate wins.   They are the least happy when an extreme candidate of the other party wins.  This defines what is known in game theory as a normal form game.

{% capture cap20 %}'The {{ A }}{{ B }} party and the {{ C }}{{ D }} party are the players.  The action is nominating a candidate in the primary.  The outcome is who wins the general election.'{% endcapture %}

{% include sim.html id='game_setup_sim' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRMWoEMQz8i2sXlizJ3n1FinTLFhdIEVhICJfiCPl7JM2FIxyHixntaMcj-bu0sm6bjkrKe92IyZkFm8GmM7alkrV9r4WiecqfwOyMQuhlbbVIWakWTW7eyvXueO9wpdW748p8qCwPFWp5HUW0KBklApEAEIkM4AFIHP26gCW_csuKKWdgt2EH2DAGY7fpDrDhgWqiWvKH3jIoxUoohY5AvUNHoO5Om-83TrQaRDh2DEu-ru6iwDJmFbpRvtEOs6CSDvLfXizjy8AjIbAseCysTxFWMbb23IVe31MBGFsHWmbepBjbGgDLM4xsWJ5pJo1RDBaGBIbFDyQY-HdwwsvpON7Pz5eP17KWp-Pr83S8nS_l5xcgCQz0sAIAAA)'

title='Game with Two Players'

caption=cap20

comment='basically, four candidates, ABCD, in a line with +Primaries as the voting system. A is center. D is center. B and C are moderates' %}

### Strategy

Let's focus on the {{ A }}{{ B }} party.  Let's draw a table that shows how happy the {{ A }}{{ B }} party is with each outcome.  These numbers are called the payoff or the utility. For this example, we have assigned these numbers for the {{ A }}{{ B }} party: {{ A }} {{ B }} {{ C }} {{ D }} -\> 4 3 2 1.   We're assuming that all these candidates are considered based on their position rather than any other qualities that would make them appeal to a broader base.  

The payoffs only exist in the way that they affect the decisions each group makes.  It would be easy to add these numbers up, but it’s hard to make sense of them.  To really get into this idea, you’d have to think about things like how society should work, and that you’d like all voters to be treated equally. It’s an idea worth getting back to.  For now, you can just understand that a voter would like the outcome to be a bigger number.  

**{{ A }}{{ B }} Party's Utility (or Happiness) for Each Outcome**

| Outcome **→** Utility |
| --------------------- |
| {{ A }} **→** 4             |
| {{ B }} **→** 3             |
| {{ C }} **→** 2             |
| {{ D }} **→** 1             |

Now, let's take an action (in the language of game theory).  Let's have each party pick a nominee.  What happens if the parties pick {{ A }} and {{ C }} as the nominees?  {{ C }} is closer to the middle so {{ C }} wins in the general election.  

{% capture cap13 %}The {{ A }}{{ B }} party nominates {{ A }}.  The {{ C }}{{ D }} party nominates {{ C }}.  {{ C }} wins the general election.{% endcapture %}

{% include sim.html id='action_1_sim' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRMWoEMQz8i2sXlmTJ3n1FinTLFhe44sAkIdwVR0jeHlkT2OI4XIykkccj-TuVtG6btkzKe96ok0d933OiSfQaad6Y2SOahKS15FTTSjlpxOatnB-O9zZnSn44zvSnzPKUoRLP0bQ2U0YKQ1QBsEQGcANUHf05dliiyq7jRaaYgTk4hgxjMHYZcYAMN2Qd2RIXZK5u2hKKssCOCFjYEdfZXO_3_TZGyjTbDQ3QFIw7l1ULJp8hHSEfoYTYFKk1blc9KhbGa8P3wGpd8E1YnMKoYmCV2IL-_6QCMLA2tPR4RTGwFQDWZhjXsDbTcCluxCBhcGBYeYODhruNA95OY3xcX--f57Sml3H7Oo3L9Z5-_gBbft_olgIAAA)'

title='Action Example'

caption=cap13

comment='not sure if I need this' %}

Let’s look at another example: what happens if the parties pick {{ A }} and {{ D }} as the nominees?  It could be a tie. 

{% capture cap14 %}The {{ A }}{{ B }} party nominates {{ A }}.  The {{ C }}{{ D }} party nominates {{ D }}.  There is a tie in the general election.{% endcapture %}

{% include sim.html id='action_2_tie_sim' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRMU4EMQz8S-oUsR072X0FBd1qi0OiQIoAobvihODtOB50W5xOKcbOJJMZ5zuVtG5b40xqe964zqrve040iV6inQR5pZOQtJacalopJ43a_Cjnu-VnmzMl3y1n-kNmechQiedoWpsto4UhqgBYIgO4AaqO_hw7LLHLruObTJGBOTiGDCMYu4w4QIYbuo5uiQsyRzdtCcW2wI4IWNgR19lc7_f9Mka6Ic1rhoPQFsQWJ2rBBGZJR8lHKSE6RWqN21WPHYsAteGbYLku-C4MUGFYEVwlpqH_P6oABNeGIz1eUQS3AsD4DLEN4zO9xTBIGBwYRt_goOFu44CX0xgf5-fr52ta09O4fJ3G2_mafv4AxW1RZ54CAAA)'

title='Tie Example'

caption=cap14

comment='not sure if I need this' %}

In a real election with millions of voters, there won't be a tie, so let's model this tie as a probability: there's a 50/50 chance between {{ A }} and {{ D }}.  How do we compute the utility?  We could average the two utilities of the two outcomes.  But we wouldn't get the full picture.  We want to know what our risks are, so we consider both possibilities.  There is another variable.  It's kind of like another player.  We're treating chance as another player in the game.

I'm going to use a table to show these actions and the utility of the outcome.  The table below shows the utility for the {{ A }}{{ B }} party when the {{ A }}{{ B }} party nominates {{ A }}.  In each column is a different set of actions that are outside the control of the {{ A }}{{ B }} party.  I used a +/- sign to represent chance. {{ D }}+ means chance favors us, and {{ D }}- means we had a negative outcome.  The entries in the table show the outcome and the utility of that outcome.

**Outcomes When {{ A }}{{ B }} party nominates {{ A }}** - Columns are {{ C }}{{ D }} party and chance.

| {{ D }}+   | {{ D }}-   | {{ C }}    |
| ---- | ---- | ---- |
| {{ A }} **→** 4 | {{ D }} **→** 1 | {{ C }} **→** 2 |

We can extend this table to consider when the {{ A }}{{ B }} party nominates {{ B }}.  We add rows for each action the {{ A }}{{ B }} party can take.  

**Strategy Table for {{ A }}{{ B }}** - Row is {{ A }}{{ B }} party, columns are {{ C }}{{ D }} party and chance.

| {{ A }}{{ B }}'s Nominee | {{ D }}+         | {{ D }}-         | {{ C }}+         | {{ C }}-        |
| ---- | ---------- | ---------- | ---------- | --------- |
| {{ A }}    | {{ A }} **→** 4 | {{ D }} **→** 1  | {{ C }} **→** 2  | {{ C }} **→** 2 |
| {{ B }}    | {{ B }} **→** 3 | {{ B }} **→** 3 | {{ B }} **→** 3 | {{ C }} **→** 2 |

### Playing the Game

Say you’re the {{ A }}{{ B }} party.  Let’s look at your strategy table. You have several outcomes that you can’t control on the columns. and the row is your choice.  

Which candidate should you choose?  If you choose {{ A }}, then you'll either lose to the more moderate {{ C }} or you’ll have a toss-up between your most favorite and your least favorite, {{ A }} and {{ D }}.  If you choose {{ B }} you’ll probably come out on top with a more moderate candidate.  So you probably should choose {{ B }}.  If you really don’t know what the other side is going to do, you could just add up your scores for each case.

**Utility Table for {{ A }}{{ B }} - Averaging out Chance**

| {{ A }}{{ B }}'s Nominee | {{ C }} +/- | {{ D }} +/- |
| ------------ | ----- | ----- |
| {{ A }}            | 2.5   | 2     |
| {{ B }}            | 3     | 2.5   |

**Strategy Table for {{ A }}{{ B }} - Averaging out Chance and the {{ C }}{{ D }} Party's Choice**

| {{ A }}{{ B }}'s Nominee | {{ C }}/{{ D }} +/- |
| ------------ | ------- |
| {{ A }}            | 2.25    |
| {{ B }}            | 2.75    |

The same strategy works for both sides, which means that there is a competitive pressure.  Both sides should choose a more moderate candidate.  And knowing what the other side is going to do affects your strategy.  You’re even more convinced that your only chance to win is to pick a moderate.  Both parties are concerned with picking someone electable.  We talked about this earlier: electability is a consideration of whether the candidate you choose will win the general election.

We can make the same table for the {{ C }}{{ D }} party.  {{ D }} is the party center candidate and {{ C }} is the moderate. You can be lucky (+),  or you could be unlucky (-).  And you can even use the same values in reverse.  You have {{ D }} {{ C }} {{ B }} {{ A }} in order from best to worst and I used the numbers 4 3 2 1 again.  

Side Note: They could be any numbers just as long as the candidates are in this order.  For example, the numbers could be  8 6 1 0.  By choosing 4 3 2 1, I actually made this a zero-sum game which means that, in a slightly-wrong technical sense, no candidate is better than any other candidate.  I don't think utilities can be added in this way, but if these were a divisible good like dollars, then this would be a zero-sum game.   The numbers are really just here as useful tools for making comparisons for a single player.  Maybe you could extend the idea if you had two outcomes being decided.

**{{ C }}{{ D }} Party's Utility (or Happiness) for Each Outcome**

| Outcome **→** Utility |
| --------------------- |
| {{ A }} **→** 1             |
| {{ B }} **→** 2             |
| {{ C }} **→** 3             |
| {{ D }} **→** 4             |

**Strategy Table for {{ C }}{{ D }}** - Row is {{ C }}{{ D }} party, columns are {{ A }}{{ B }} party and chance.

| {{ A }}{{ B }}'s Nominee | {{ A }}+         | {{ A }}-         | {{ B }}+         | {{ B }}-        |
| ------------ | ---------- | ---------- | ---------- | --------- |
| {{ D }}            | {{ D }} **→** 4  | {{ A }} **→** 1  | {{ B }} **→** 2  | {{ B }} **→** 2 |
| {{ C }}            | {{ C }} **→** 3  | {{ C }} **→** 3  | {{ C }} **→** 3  | {{ B }} **→** 2 |

<!--Repeating, maybe take out-->

Will the parties actually behave strategically like this?  Well that would be the best case scenario, but it may not happen.  We would like voters to behave in this strategic way because, optimistically, there would be this competitive pressure between the parties.  Having that competitive pressure would encourage more moderate candidates to run.   Each party has to consider if the other party is going to challenge them with a moderate candidate, and **in this best case scenario, we have each party putting out a candidate that would best represent everybody, not just one side**.

Voters can try to find out what's best for everybody by looking at the polls.  Specifically, there are head-to-head polls done each election that put one candidate from one side against one candidate from the other side.  If a voter sees that the candidate they like best would lose to a candidate from the other side then rationally, if they want to have an effect on the results of the election, they need to support someone else.  They need to support a candidate that can win: a candidate that is electable.  <!--\<third time mentioning electable\> \<maybe take out whole paragraph\>-->

Let's show this competitive pressure with a map.  If a candidate enters the race in the right position, they can win.  The map below shows those positions in grey.  This win region is only on the side with the losing party because the winning party doesn't need a new candidate and won't vote for them.  All the pressure is on the losing party, which is kind of common sense.  If you're losing, you need to try harder.  Even existing candidates will feel this pressure to move toward the middle.  

{% include sim.html id='new_can_win_circle_sim' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQU4DMQz8SuVzDrHjOLv7CMSBC9rdQ5F6QFpRBOVQIXg7jgdUoarKwXbGmYzHn5RpmmeVxFXXNA-jJ-KJZE2sY8_MQW3rmoh77_DXK1I84w4UmnIipYkT1cjNWyVdHe9tjuR0dRwZbiLjTYRzfMddWi8FJQSxIkASW-hjF8Dq0b_rYQxQclTCqJxGPIBGMJg4TfFguGyoBlRjPCg5hHK3BExF4m0pwCGoONPMKU5vNYBgLBiW3a7ioIKyz6p8SeWSFpD1VINB_9Mr5taGJUGwjlgW7KvOTN8LPR7el-Vld3fcLUR-DRsqxNff_VYEsFaw1iF-rrDBMgJHi2EnBjOthvI-msFJgyLDIhoUNbxtsO9pv23H08P59eA677ePt_32fDrT1w_cKFitvwIAAA)'

title='Candidate Pressure'

caption="A new candidate can enter the contest if they're in the center.  (when there is competitive pressure)"

comment='FPTP+primary with win map for new can, same setup as before' %}

(That's all the game theory you need for this article.  Later, you can see more [game theory through this class on youtube](https://www.youtube.com/user/gametheoryonline). There are some quiz questions that are only on the Coursera site.)

### Problems with this Game Model

#### Other Voter Behavior

Primaries will only work if everything goes according to this plan.  You can’t rely on all voters to behave in the same way.  Voters might consider other things than electablility.  Some voters don't pay attention to the polls.  And you could imagine some voters don't know what is best for everybody. There is also a rational argument for choosing your favorite even if they are not electable because maybe your focus is not to affect the election that's happening now but to affect an election that is going to happen in the future or to affect decisions that are made by your party in a convention.

#### Honesty

Or you may feel that you can't betray your favorite. Emotionally it is hard to vote strategically because you know it's your duty to vote, and you'll be abandoning the people on your side that voted for the candidate that you like the best.  They stood up for the right thing, and maybe you should do your duty to report your opinion so that we can all make a better decision together.  But you are pulled in another direction by a candidate who also needs your vote, and although they don’t agree with you on as much, you choose them over your favorite because they agree with you on a lot of things, and you can’t betray them as well.  You’d rather not betray anyone.

{% include sim.html id='honest_sim' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu27DMAz8F80axIco21_RoZvhIQUyFDDQokiHoOi_l-QlDYIg8HCkjzrdUT-llWVdTSt12-pKTNdqiqp7xSxe6bbVQjE8-DLC8k9IWVotWhaqpWdtPsr14fPZ4UyrD58z01NmfspQy-sorEXLaGGIFABLZAA3QOro1wXM-ZdbdkyZgV2GHSDDCMYuIw6Q4YFuQjfnAWlplGIlUBIGCHgYEldafb_xxaiBhKIgLPm6xEmFZGRVupV8KwViUWoq6L28WlrQgUeCYZ3xWFhfJwBid5jtl_fsAMTuA9yUN3XEtgZAZMMbGJZnPZ1GFIOEwYFh8QMOBs4OrGvg7Nth3z9Or-fPY1nKy_79ddjfT-fy-wf2gqrYtwIAAA)'

title='Honest Voters'

caption='Honesty is not the best policy.  Strategy would have helped elect the best candidate.'

comment='example here with honest voters, just like the two player game example, but people voting honestly and losing for their party' %}

#### Asymmetric Information

Additionally there's another concern in this strategic scenario. If one party knows the other party's choice, then they can adjust their strategy. In particular, if one party knows the other party chose a party center candidate, then suddenly a lot of candidates become electable that are not moderates but closer to their own party’s center. 

Here's an example. You have {{ A }}{{ B }}{{ C }}{{ D }}.   Now say {{ D }} is the {{ C }}{{ D }} party’s choice.   Then the game table gets cut in half.  Which candidate should the {{ A }}{{ B }} party put forward?  Say there's a candidate between {{ A }} and {{ B }}: call them {{ E }}.  Say {{ E }} has a 3.5 utility for that party; that's better than {{ B }} at 3.  The {{ A }}{{ B }} party would choose {{ E }} because {{ E }} and {{ B }} are both electable and they might as well get something more.  So {{ E }} is chosen, and {{ E }} wins the general election even though they are not the best candidate for everyone; {{ B }} is a better candidate for everyone; more people prefer {{ B }} over {{ E }}. That's a problem: competitive pressure can go away when a candidate is chosen by the other party. You end up with a candidate that is not good for everybody but just good for one party.

**{{ A }}{{ B }} Strategy Table When {{ D }} is Certain**

| {{ A }}{{ B }}'s Nominee | {{ D }}+          | {{ D }}-          |
| ------------ | ----------- | ----------- |
| {{ A }}            | {{ A }} **→** 4   | {{ D }} **→** 1   |
| {{ E }}            | {{ E }} **→** 3.5 | {{ E }} **→** 3.5 |
| {{ B }}            | {{ B }} **→** 3   | {{ B }} **→** 3   |

{% capture cap11 %}{{ D }} is certain, so {{ E }} is chosen even though more people would prefer the moderate {{ B }}.{% endcapture %}

{% include sim.html id='asymmetric_info' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu24DQQj8F-otlseyd_cVKdKdrnCkFJFOSRTZhRXF3x6WseXCsrYAdmAY4JcqLevatbD1rays4bUanlQLj8df9UCnbSvEt-QEhJESgNJSCxktXKil75Eq5eFFbg-klocXyPQUmZ8iXLMdD2kjFIQQxAYDSewwISCUE0e7Yeb8lZqRcM4gQSNhQCMYTIJGw4BGOqIJ0ZwFWlMoj5VwAipZqwocgjSYVi7xf_k87TuFlyWOJDArhuaixQI0UI-Zje-u3F0F6XAtGezW5vrrKcU6jgXhNuNoWGOD6IbxG0S3610bDMZvHdiUnRrG9wqDJTpu4Viit1SqIcRB4VDgOECHgo7ajrW9Hfb96_h6_n6nhV72089h_zie6e8fixjlGbgCAAA)'

title='Information Failure'

caption=cap11

comment='remove C, add E between A and B.  In reference to ABCD in a line.' %}

#### Lopsided Districts

The same scenario plays out when one party is dominant: when we don't have a 50-50 split between parties. There is no reason for a party to back down from nominating somebody who they think they would be best for their party without thinking about what's best for everyone.  And if nobody is considering you then you don't have any representation, because choices are made without you.  And in this scenario where there is a “safe seat”, the losing side doesn't get any representation. 

{% include sim.html id='party_dominance_sim' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu2oDMRD8F9UqtE-d7itcpDtcOJAicBBjnMIE_3tWOwQTjFExuzer0czeT2ll3TZfKlk71o2Eo-KoWPrftyFZHWuhOZyMjmB85HAQUtZWi5aVarGsPUa5Pp2Y7cG0-nSCWV4y4yVDLZ-jaW22jBaGSAGwRA4IA6SB8dyEka65ZcehwwEMgAwjGIeMBECGO7oF3cgL0tIozZVQEsJ5VwQ8DEkobVTzzFEHCUVBWKqS61JIzqxKj5IfpeSqp5BqKuh_efW0oB0_CYYVsQ3rM5g1xDaYNZg1wyRiWwe35EuG2N4AlJOOf-BYnls6lTDikHA48JHQ4aDjbse63k_7_nV9u50_yloO-_fltH9eb-X-C08n7YKwAgAA)'

title='Party Dominance'

caption='One party can leave out any consideration of the other voters and choose a candidate from their own party center.'

comment='The big party picks a candidate in their own center, since all their own candidates are electable.' %}

<!--next color background for each big section-->

The Primary Does not Eliminate Vote Splitting: Choose Only One Splits Votes in the Primary Too
----------------------------------------------------------------------------------------------

<!--Alt title = Primaries only work in the case where there are at most two electable candidates in each primary.-->

Let's finally get back to vote splitting.  I think we've saved the best for last.

So far we have only looked at primaries in which there are at most two electable candidates, but that’s very limited, so I’m going to show you that when there are more than two electable candidates, primaries won’t work.  Primaries don’t work because they don't address the major problem in the way we vote: they still ask you to choose only one, so they still split the vote.

What happens when you do have vote splitting? How do people strategize in that situation? What kind of negative behavior do they show? 

What happens when there are more than two electable candidates is that similar candidates hurt each other.  See the election below with the additional candidates {{ E }} and {{ F }}.  {{ E }} and {{ F }} are just as moderate as {{ B }}, so there's no strategic advantage for either one, and voters only care which one they are closest to.  In other words, there's three electable candidates.  {{ B }}&{{ F }} share the same space at the bottom, so  {{ B }} might say to {{ F }}, “Please drop out,  and I'll help you out later.”  You don't do favors for nothing right?  That puts {{ F }} into kind of a bluffing game if he stays in. A bluffing game is a game where you try to get a good outcome by threatening to hurt another candidate, and where if you follow through with the threat then you end up hurting yourself, too.

{% capture cap19 %}{{ E }} gets squeezed out, even though {{ E }} is the best option{% endcapture %}

{% include sim.html id='center_squeeze_sim' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRMW4EMQj8i2sKAwav9xUp0q2uuEgpIq2UKLoUpyh_D2ZyuWJ1cgEYGIbhu9SybpsvxFZPtLFKeBKeaL_9sRFrelKJe3oLZ92JCifA-G-LYuOZ0LJWKq2sTMXS9ygVOryo7ZGpdHiRWR5mxsMM1xzHk9oMBSEIcYMBJXaYIMAtbIzzMCN_JXDiUzh3kICRMIARLCYBo2EAIx3Rgmhkg9YkylMSzoRK9qoiD0IaSFuoenuz3FEAVMXCTEqNLGVrgJ47N767cncVoNNtidKOY5onndZxMJBvA4eDlAbiBgkMxO3vtgYDCawjt-Q0gwReYSCk4x4OId2SrQYRB4SDgeMIHQw6ejukeznv-_vl-frxWtbytH99nve3y7X8_AL0S0pr0AIAAA)'

title='Center Squeeze'

caption=cap19

comment='could be titled vote-splitting.  Maybe just show EBF, not ACD' %}

When there are more than two candidates, the voters need to coordinate to put their unified support behind a candidate. This coordination problem might involve some lying.  You might say, “Well, my candidate is doing really well, and yours isn't doing very well. You should back my candidate and your candidate should probably drop out.  You don't want to waste your vote.”

You might think you can look at polls and polls will tell you who can win the nomination (a kind of electability) but there are no head-to-head polls in the primary, so you’re out of luck.  Nearly all the polls I've seen are general election polls with one person from each party.  The only meaningful polls I've seen have been from election reform organizations like Fair Vote and the Center for Election Science. <!--[footnotes](#footnotes)-->  The only polls I have seen on the news are choose only one polls that are trying to break the news earlier about which candidate is going to win. 

The poll numbers are important to voters so they can tell who they should be coordinating with to show their support. The voters are going to go nuts here because if they only had one candidate, they could easily show how large their group is, but because they have two candidates splitting their group’s support, the voters have less of a chance of being considered by the candidates.  Now {{ B }}&{{ F }}, they have more supporters than {{ E }}, and they could win if they decide to work together.  If {{ B }}&{{ F }} really feel like they are closer together than {{ E }}, then they are on the same team.  Voters will also realize if perhaps {{ F }} is not getting as many votes or maybe {{ B }} is not getting as many votes by looking at the polls.  Then voters will switch their vote to whichever one, {{ B }} or {{ F }}, has a little advantage.  The little advantage now becomes a bigger advantage.  The polls get amplified and locked in.

The problem is those polls aren't accurate. If you put {{ B }}&{{ F }} head to head, then {{ B }} would easily win, but in a choose-only-one poll, {{ B }} can get squeezed out because {{ E }}&{{ F }} take votes from both sides.  Even though {{ B }} is the center candidate, {{ B }} can lose because {{ B }} can get squeezed out.

{% capture cap15 %}{{ A }} small advantage in polls becomes a big advantage.{% endcapture %}

{% include sim.html id='amplify_sim' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu2oDQQz8F9VbrF67d_6KFOmOKxxIEViSEOzChOTbo9XYpDDm4EaP1WgkfVOlw7axSmGXvYTFhdnTqoVX2fdCPN8sGk_6dJUOtZDl3_Pf4oGUuy_e9sjUcvdFZnmYWR9muGY7noKmK3AhiKGIIYkbIASwBUY7DVgzKsETQQkeDggaCQCNGIKeBQIa6fAWeGsW6Nwdz4VwhhU8qgDI0eDZ6Pf9PAaV4L1a_5EkaChBF50L4GIlzkA2m8zZjW-G3Ay99jfLOvOsA6W1HMM6jgXhtmbQsUaHbIdsh2zH-O4AjO8dOSzRMX6rACyx4RYNS2yeN9QQ0kDRoKDhAB0KOmq7JLwcx_g4PV8-X-lAT-P8dRxvpwv9_AFQpOx0pQIAAA)'

title='Poll Amplification'

caption=cap15

comment='right now, this isnt implemented' %}

### False Leverage

There is an flawed idea that single-choice voting can give power to a small groups of voters through a mechanism of leverage.  The idea goes that voting for only one makes your vote valuable, and gives your favorite candidate leverage over the others so that your policies can get adopted.  Your candidate would pull some strings to make a deal in exchange for dropping out of the election.  Philosophically, the bad part about this argument is that it gives all the power to the candidate.  Candidates are deciding among themselves who will be elected rather than asking the voter who is best.  Practically, not all voters would be on-board to vote for their favorite if their favorite has no chance of winning.  Without the voters, the candidate will have no leverage.  In the worst case, a corrupt candidate could use their leverage for personal gain, so less power goes to the voter.  

**Decision for Viable Candidate** - Leverage only works if the voters follow through.

| Action | Outcome If  Voters Vote Strategically | Outcome If Voters Follow Through |
| ------ | ------------------------------------- | -------------------------------- |
| Reject | win independently                     | lose                             |
| Adopt  | win                                   | win                              |

Afterword
---------

So, we’ve described the problems that you run into when you hold an election with primaries. And we've made some diagrams to make it easier to think about voting systems.  We've talked about what dilemmas the voter Faces, what voters should rationally do, and what mistakes they could make.  We talked about how we can make it easier on the voter if the voter is willing to consider all the candidates. To conclude we can solve the problem of vote-splitting, we don't need primaries, and we should move to a better way of voting that allows you to count by pairs.

Footnotes
---------

### Utility

Finally, we can think about some other ideas that we touched on.  Can the numbers in the utility table be determined?  There could be a balance between how much utility of voter gets from a candidate and how many points they give the candidate on their ballot.  If they pretend to like the candidate more than they really do so that the candidate gets elected, then maybe there can be some risk to that. The risk might be that the candidate is the only candidate that the voter gets to choose, while other voters get to be considered in the election of multiple candidates.  So there can be some trade-off between voting for that candidate with a reasonable number of points versus exaggerating your support.   That means, we might be able to see what voters really think.

<!--Link to multi-winner method page that is a future project for now-->

### Rankings

We said we could use utilities because it would help us put the candidates in order.   But we couldn't make sense of adding utilities from different people, so we don't need to add.  Grades have an order and can't be added, so maybe we could use those.  But grades imply comparisons between different people, and that doesn't make sense either.  Really, the most accurate notation we could use would be rankings.  Rankings only have an order.  That's it.  No adding, no comparisons between different people.  Exactly what we need.

### Chicken Dilemma

Even in some better voting methods, there can be a game of chicken.  The game of chicken is weird.  Let's consider the center squeeze example with {{ B }} {{ E }} {{ F }} again.  {{ F }} voters can pull back their support from {{ B }} if they think {{ F }} can win against {{ E }}. And some of the {{ B }} supporters can pull away from {{ F }}. But if the {{ F }} supporters are overconfident, they can lose to {{ B }}. 

[The page on scored systems](newer) has a more thorough chicken dilemma explanation.  Personally, I have a hard time trying to think of the chicken dilemma for pairwise voting, so I don't think it would affect voters.

{% include sim.html id='chicken_sim' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSwUoEMQz9l5xzaJIm3Zmb_-Bt2cMK3gZ3ERVE9NtN8xQHFilMmvTl9eV1PqjRejzKWFjcTnyUNlhi1C5YTE8nJpmYEF4060NZJXKjE9r7BBitjanTKhm8ksge45uV4JEnFEbZJvkZjbjtV0IOCWl8s_Jk-fdEWt0rU6zILCgKECdTXQaok0BILdIz5oWWIdmVSZMpiyoIiiJoFDTq1aCg0YHsgAwsNp2dOnLKWTatTrPCGnjMpxlfT6_bRpz5z-6vUgQBQtxi0wLhzp5Hvf36MRPZJ1owMHTbJ714uu9rUXL6wENikL5U0WGsYwzHGG5ljmMMdwTY4aP0Okx12BENQQoZeJuAqeElfP4cAYqAglgqDCgY6B1Q8HDetsvL_fv1kVa6u16fL2_njT6_Ab_6IUHSAgAA)'

title='Chicken Dilemma'

caption='I want my friend to win.. but I would rather win myself.'

comment='just B E F' %}

### Primary Variations in the US

Let's talk a little bit about the variations on the primary.  In the US, these variations serve to amplify the wins that a candidate gets in a state.  One party uses a winner-take-all primary, which puts people into districts and only counts the votes for the candidate with the highest number of votes of a district.  This highest number is called a plurality of votes as opposed to a majority of votes (more than 50%).  The other party uses a method that dumps any votes for a candidate that got less than 15%, then rounds votes to the nearest quota, which is just a number that makes it easy to assign delegates.  Then if none of the candidates gets a majority of the rounded totals, the party requires a majority of delegate votes to decide the nominee. Both parties make different states vote at different times so one state may vote based on the results from another state’s vote.  All these variations amplify the wins.  Vote splitting, itself, amplifies the wins.

## Try the Sandbox

Finally, here's a sandbox where you can use many more options to modify the election configuration and try new scenarios with more voting methods.