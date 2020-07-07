---
layout: page-3
title: Home
banner: Finding Common Ground
description: An Explorable Guide to Group Decision Making
byline: 'By Paretoman and Contributors, June 2020'
twuser: paretoman1
---
{% include letters.html %}

Hello, I'm going to show you how to find common ground as a group . We'll go over the following:

* what we mean by the middle, 
* how we can use votes to find the middle by simple comparisons, 
* the simplest voting method that finds the middle,
* what a median really is, and
* how to bring groups together.

Let's jump right in with an example and some diagrams.

## The Middle

Now in a group you may have to come to a decision, and there's going to be a lot of different people in this group. So each one is going to have a different opinion, and they're going to be spaced out in different dimensions of how they feel about a topic: maybe what pizza to get as a group order for pizza,  or where you are going to go out to eat, or something like that.   So some people would be vegetarian or like meat.   And some people like to spend a lot of money and some a little money. So whatever dimensions there are, you're going to have differing opinions on dining or whatever. 

{% include sim.html  link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu24CMRD8lZNrF971E0qK1CREaQ4KJzrBhQsXXaBAUfLtWXtAioSQi9n1rsezY38ro-ZtyzbpWdjollzUHEiiwJqNlYBtvESBNBHXLinGzUYrKqfJWU3OlNyqudHKqbn6NUorX9MgTVKLAkbfLKmku5XZ3QqZyk0EcmKkEEAOgPspAEQAOUG5LggIN2nFwiObLDwswADQsEOL0FgB0HBElpDN6gFrqlAqFlAtWAiyFnUIssLUiovXVdoDGsBqMTBp1lY77aXBVeoS0DXgayDkLZfA1dPult6FOoKLeBiIdhjdGwCV51qrp_Gch-Ypv6_Xh8Vp2nZTs8jTQbLVscv7ZrXLb3vJXrrttu-al34YsqTLqf8Ym8XiUeLnXdc8jKepWXX5azx8rVX5BPDUwwkPT70HwFMPeT7VMTw8DQZAtTPAz4CXCf5iQQBBwGBhViHib0ScjAywALxExNeI178ZUUz_7S_7cCqBMIEwQUqClOSqzOQB0JPAlyDrNQ_DeHw-f3bi9HI4TXnoj2f18wcgESI7fgMAAA)"

title='Where to go eat?' 

caption='Horizontal Meat-Veggie axis. Vertical $-$$$ axis'  comment='show a group of people preferring many options, restaurants named and sorted by money on one axis and eco-friendlyness on the other.  Meat Shack. Burger Barn. Veggie Villa. The Four Seasons.  Primo BBQ.  Raj Veggies ' id='eat_sim' %}

Really, this is about politics, and as a group you want to make a decision for everyone in the group. You'd like to make a decision that other people will accept and won't regret.  One way you will find out if people regret this decision is if most people say they would rather do something else. That's why you might want to pick something in the middle.  No matter what you pick in the middle, if you compare the middle option to something else, then more people are going to prefer that middle option. It's really the common ground that you're looking for. 

{% capture cap1 %}Move {{ B }} anywhere. A line forms between that and the middle option, and you will see most people are on the side of the middle option.{% endcapture %}
{% include sim.html link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSsWoDMQz9F80eLMmSz_cVHbodN6TQIXCQUtIhlP57ZT3SDiEYLMlPenrS3TdVWreNjQub7mXjsRSRuu-FGIgkErHSWgu1vC1vjwwpDydyeyC1PJxAlqfIeIpwzXY8Fc1QEEIQQxFDEjtMCOAWNtpJmODmQhI88SicjyIwoJGGlKDRMKCRjmhBNLJAawrluRJOQCVrVYFDkAbTxkhzAGDT8Vffkmo6fHfk7uhc7nRaVrV_uubZrnV8EIhrGNGwKoMww4iGEQ0jmsFgRAOLLdnFMKJXGM5Mx74dLG4pP34WclA4FPhI06Ggo7ZjNW-n47hcX28f77TSy_H1eTrO1xv9_AKWPS3kgAIAAA)"

title="The middle is the common ground." 

caption=cap1

comment="allow adding candidates with + and use condorcet rule, maybe make a custom pairwise comparison between the middle option, which cant be moved, and any other option.  And you cant move the voters either" id="middle_sim" %}

So how do you find the middle option?  Well, you could hold a vote and ask everyone to pick one option out of all the options.  What happens is that people will pick a side, and you end up dividing people into little groups.  It's kind of random which side wins, and that's a win with maybe with less than 25% of people. That hardly seems like a win. 

{% include sim.html link='[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSPW_CQAz9K9HNN8T3mXTM0K0SBcSSMFyrCNKmpAowoKr97fX5laUInXS2z_bL83O-VKke2pas1RTsVrd868qwYww_RZefbNSGavaC1-Rou9WKpMtxiStzbNVDqZWT28sduMLom8O1kTOlvjmcqe5m6rsZKuVzlBnl0CAEIQIjAiUKMEyAHFv-nGfD2KSVYRx-NIxj2BgYwBiHEoaxbABjIqIKUS0NthSilCUhSVgjvdYiD0KWkVrSfycXB6SBaTEusWBW8wqUE9js0NUxV8dmobPjpNf9h3ZBCLiIFYGuw9Ae4nlGVT-dWk6XNBbL9NZ1h-Y87_q5aNJ84OipT6ditU-v7xxs-t1u6IvNMI6Jw8U8fExF0zyzv973xeN0notVn47T4dgpxfAQ00MCDzG9h4GYHux8JTN4iBlKGJLKgM0GrCR4kYh_WRUAETBZqMVETBbRG7GElzSO02l9-ex53sV4ntM4nC7q-xe0u0DUBgMAAA)'

title='Too Many Choices' 

caption='If you only say, "pick only one", then the winner can win with only a small part of the votes.' 

comment='crowded election, winner gets less than 25%.  Everybody is an individual.  Everybody has an option' id='crowded_sim' %}

This problem is called vote-splitting, which you get if you have three candidates in an election. Notice that a candidate can change the outcome of the race even if they don't win. If this is a small candidate, then we call this the spoiler effect because they spoil the election for whichever side they're on.

{% capture cap16 %}Drag {{ C }} left and right to spoil the election for either major candidate.{% endcapture %}

{% include sim.html link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRTWvDMAz9K8FnHyx_pekxh90GXVt6SXrwRmizZclI20MZ22-frEdhUErA0ouk56fnb2XUsmmISJOr9rqhMnC2yFmM2lq332tF0uOdJm8ydmpptPJyBjkjd1h993FvyRWj7z6uLB5WqocVMnIdZUUZWkAIIigiSKKIwALIc-TrHAfmJq0s8_BPyzyWg0UAjfVoCTJgQWNLoAVQJQPOiFDKlpAUnJVZ51CHIMdMDRuMxogS-BxWJbHKC11O6JbYW-KywTnxMuf_U_ool_oSzwKJHosGGBaYUf22aj1d01Cs03vbjvVlPnRzUad5ZPTcpXOxOaa3Dwa77nDou2LXD0NiuJr7z6mo6xfOt8eueJouc7Hp0mkaT61STA8DgxNXAwwMAQEGBqgLeIYAA6NBIOmMeM2IZ4hBrHG8YARFxGaxklBisxKzJYx_TcMwnbfXr473XQ2XOQ39-ap-_gBhAcnr6AIAAA)'

title='The Spoiler Effect'

caption=cap16 id='spoiler_sim' %}

## Simple Comparisons

So how do you solve that problem? Instead of dividing everybody up all at once, just consider each alternative one at a time (I guess that's two at a time).  Just between the two options below, you can tell which one's better.

{% include sim.html link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRPW_CMBD9K5FnDz5_hTBm6FapBcSSMLitBZQ0qQIMqGp_ey_3RDsg5OHu_O6e3z1_KaPmTUPeavJ-oxuqnLYmbjZaERDHiJlqp-ZGK6_mlVZB8sgdVt8c7i0ZMfrmMDK7i1R3ETLyHE2KptKihCDyCJBEEYEFkOfIz1kOzE1aWebhS0tyaS0CaKxHC9M4DqCxJaoZqkoGnBGhNFlCAjgrs84BhyDHTA2hLQIAm6v-5r1QTQldE3tN3GTulHiZ8v90PspzvsSHQJzHigFWBeZTP61aDJfUFYv03rZ9fR63eSzqNPZcPeZ0Kpa79HrgYp23230u1vuuS1w-jfuPoajrZ85Xu1w8DOexWOZ0HPpjqxTTw7rgxM8A60JAgHUB6sJM1AdYFw0CSWfEP0Z8QAxii-MFIygiNouVhBKblZgtYflL6rrhtLp8Zt53kfpDflPfvwTcre3VAgAA)' 

title='Count By Pairs'

caption='Consider the alternatives one at a time.  It is simpler, and you can always tell which option is closer to the middle.' 

comment='two candidates with a circle.' id='by_pairs_sim' %}

And you can do this for all the options.  And you can see that the middle option would beat any other option.  This is called a round robin.  Ping pong tournaments work like this.

{% capture cap12 %}Matching up all the pairs is called a round robin. {{ A }} wins all their matches. Mouse over the results to see each match.{% endcapture %}

{% include sim.html link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRPW_CQAz9K9HNN8Tn-0gYGbpVagGxJAzXNgJKmlQBBlS1v72-e2UpQjc8O7Zfnp-_VKlmTUNcabJhoxvyrCsjgTGsKdj0iYM2VEvknXTRZqMV5SkrLbZMOatZqZVVs1orl2MvHUbfPOkNUin1zZNKdbdS361QmX9HSVFKDVIIIguAJPIAEUBWUH7nBISbtDLCIx-N8BgBAwCNsWgRGhYAjQnIKmR1HuAyC6VkCeUCmzzLjDoEsTA1pP9eavYog5OxLolhrOUEymbaFNA1MNeAk9EpsHnW_qe2PguwASeCXIulHcxzwqp-WrUYL7EvFvG9bYf5edp2UzGP0yDZYxdPxXIXXw-SrLvtdt8V633fR0mfpv3HWMznzxKvdl3xMJ6nYtnF4zgcW6WEHmY6zg47mOkcAGY6qHNV3sHBTF8CKHd6XNbjJN5li1gW9KDw2MzXGQI2C5gNOMJL7PvxtLp8drLvIg6H7k19_wJC4-xxAwMAAA)' title='Count By Pairs for Everyone' 

caption=cap12 

comment='two candidates with a circle. Maybe I could use names for ping pong.' id='by_pairs2_sim' %}

So what would that look like in an actual election?. That would basically be counting the votes for every possible pair of options.  Say there's options {{ A }} {{ B }} {{ C }} {{ D }} {{ E }}, and you like them in that order.  That means you like {{ A }} over {{ B }}, and {{ A }} over {{ C }}, and {{ B }} over {{ C }}, and so on. You have a choice for every pair.  And you could write that on a ballot. But really, you have a single ranking, which is easier to write.  

You would get a ballot with the names {{ A }} {{ B }} {{ C }} {{ D }} {{ E }} written on it. And because you like them in that order, you'd write 1 2 3 4 5 on the ballot. 

Everybody writes their rankings on the ballot, and then we count all the ballots one pair at a time. If we find that one candidate was able to win all their matches, then we've found the middle.

{% include sim.html link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSQU4DMQz8i88-xImdbPbMCxC31R4KXURFta3aIoQQvB0nQy-gag8Te-zJ2NlPCjROU0kssc48iRjLkNrJgueGdqqeK42NsXrO5plJWltS9rIWJhoDk9JYmYxGYcpeEPjf57XlJjPcZOpNRkK_WpqhFkaEMCQKMEDuzsQNiDr6deZQOxldx5NRek2MAMhEReQyySEjWRANiFwl-h5CNyptJVBKUEpQSlBKrjQJ_36tOKMdmgnjCkdOrE5rk2112sZsY2u8HtKV0t6rf6UVU2vBE8Gu1p40LM8EAKsGq4bdGZ7TMLRBxYZ-l2HoHAAYOOMFMlSy9VH8j6IMiQwHGWsvcFDQW-DgcbPfHy4PH8eFRrrfrK_LlpjOL4f3u-X8dNodL7vD6tT327pdnner018_VpCSNcoCAAA)' title='Rankings' 

caption='You are saying something about each pair of options. Mouse over each pair in the tally to see how each pair is represented in your ranking.' 

comment='ranked ballot with pairs' id='pair_ballot_sim' %}

You can also use a tier list, because ties are okay, too.  You can have multiple top-tier candidates if you really can't decide.  Voters who aren't sure can use tiers and still say something about top-tier versus bottom-tier, and every tier in between.

<p style="text-align: center;" ><strong>Tier List for Candy</strong></p>
<div class="picture-container">
 <img src="https://cdn.kapwing.com/final_5dc9d759968f590014bbe8ce_848166.jpg" alt="tier list for candy" class="picture" />
</div>

Pairwise rankings really give you a lot of power.  

Next, let's talk about an even simpler way to find the middle.

## The Simplest Ballot

The simplest way to find the middle is to just allow people to vote for more than just one candidate.  This will be really easy to explain with a Venn diagram.

{% capture cap17 %}The voters vote for everyone in their circle.  Both like {{ C }}.{% endcapture %}

{% include sim.html link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu24CMRD8lZNrF16_jqMLRbpICSAaoHCiE5BcOHRAJBQl356xp0AKQlfMrmc93p29b2XUeLmMUYt1a70UMVrqmCNf46xEowZnHpF1gjOzXmsl-Zo1qAkCpgERXCacGhutvBpDSYWSRNRaffOhuAZj9M0HZnSXae4yYspzknvLqWXKjsQT2JJEAhoQD8RzAQBt0cpCB4cWOhZgCZSxniWQcQDK2JrZiFlTLjhTGpXsiRTC2XLXOfJsyEFpCff45eJImpqO4woMcxo7UN6wPodCK3Jor6G7Fvii4f8_4WNpxNfcFdv2HD7QxABt9btS0_6Sumqa3ler_eQ8bNqhmqRhj-ypTadqtk1vH0gW7Waza6vFrusS0udh99lXk8kL4vm2rR7781DN2nTs98eVUpCnqcEVpwNNDYFAUwO7C6MyQ6Cp0RCkVEZuOHI1MRQP8BurSInIyWJToOZkNe_WXMZr6rr-NL8cWsz7cDgM_Vfq1M8fSXNUexgDAAA)' title='Venn Diagram' 

caption=cap17 

comment='too simple?' id='approval2_sim' %}

On the ballot you have {{ A }} {{ B }} {{ C }} {{ D }} {{ E }} and you have a checkbox next to each one. If you like {{ A }} and {{ B }}, check both boxes.  If you like {{ D }} and {{ E }}, check those.  If you like every candidate but {{ A }}, then there you go.  This is approval voting, where you vote for those you approve of. 

{% include sim.html link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRTU_DMAz9LznnEDuO0_WGxE_gVvUwWBGTprXaBggh-O3YeeUCqnJ4_nx-dj5DCv0wVI0kdYwDURepU7eKWcJudXWNMZuV6zjGQN5Gyfwk7ufQpxgk9GRQDGJQK0nx37PiupnpNjO7zQylNptckrsMF4pIAAWgTRmZABJDG1cMdi3JxmNBplbDDAANCzyjyQaKYIXXwTMWtkOkJpT8JmDKYMpgymDKxjRQXJ8XK9rBmbEuRY45iqXFab1OfE1fW_jXMOIhuyGtV_5SC7aWij-CXNm1YMHxCgG4iSi5XaJAasF3FixdKkq6NqtgaU0ALKz4AcXCWladCgLFfMXRK-ZXdFbMf9yfTvPt4WOZQh_uluUyv-1PIYbry_x-P12fLsfldpzPlvx-PR-m5-N5OoSvH3JCY-bMAgAA)' title='Approval Voting' 

caption='Vote for as many as you like.' 

comment='simple,lots of candidates, one voter' id='approval_sim' %}

Say there's two populations of voters and they each like candidates in their little circle. If you allow them to vote for everybody in their circle, then the candidates in the middle get more votes than the candidates on either side.  

{% include sim.html altlink='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRu27CQBD8FevqK27vieniIl2kBBCNTXGJLEPiYGQgEoqSb896pyASQi5mx7M7t49vZdS8rlOpyfmNrskHjixH1jiOaLPRiqaUmdEUShE4JaRJcGputPJqTgxBSORcq28-Tk6sGH3zsTK7q5R3FTLyHE29TdSCoiPyALREEcANkGfk5xwDe5NWln34p2Ufy2ABsLEeKUEKLGxsApuBlVLgjDRK005IBGel1jnoaMixU02akBghwc9hVJJVedhNc3q6hvYaOhhNoZd6_9_aR3ncJ9wHrXoMHLC4wL7qt1GL4ZL7YpHfm2ZfnceuHYsqj3tmT20-Fcttfvtgsm67btcW613fZ6bP4-5zKKrqhePVti0eh_NYLNt8HPbHRim2xyKDk-0GLDIEABYZ0F3AOQIWGQ2AJDPiqhHniEHmdzxghEXEZLEUSJgsoTbhAK-574fT6nJoed6Hw2EcvnKvfv4AJutP2_gCAAA)' link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSPW_CMBT8K5FnD3n-CmFrhm6VWkAsgcGtIqBNCQpQCVXtb-_ZNyAVIQ_3Ps_vnf2tSjVt2xC0GLvWrUippQrJchVi2ZrUiDlYxgpi5XqtlaS2Gq7PidTmJSWsmpZaOTVFSPnsBNQafXNQXCFT6puDzORupr6bkTJfJ2m25Bq6nEgcgSNJIGAAcUBc5wHgFq0MeBA04DEAQyCNcSwBjQWQxlT0JvTq3GDLPKgkTSQnrMm91jLPgSyYWujIk4oD0-S0XFcgmNWQWjnSpn2dXE1zNS0Jk-kyh_t_hQt5EFfxrTi24_KeInpwq9-Vmg2X2Bez-L5a7ZvzuOnGoonjHt5TF0_FfBvfPuAsu81m1xXLXd9HuM_j7nMomuYF9mLbFY_DeSzmXTwO--NKKdBTVG-z0p6iek-gqJ7T-UnewVPUUBIkVwa-cODTBJ81wDdWgRSBm4U6Q8XNKvZWfIzX2PfDaXE5dNj34XAYh6_Yq58_R9yyZRgDAAA)' title='Approval Election' 

caption='Voters on both sides vote for candidates in the middle.' 

comment='lots of voters' id='election_approval_sim' %}

Here's another example for a small group.  {{ B }} on the left gets half the vote.  {{ D }} on the right gets half the vote.  {{ C }} in the middle gets all the vote.  {{ C }} is the common ground.

{% include sim.html link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04DMRD8lZNrF14_79KRgg4JSESTpDDolASOXHQ8JITg2xl7EEJByMV4X-PdWb8ro2arlY9arGz0quu0tAYX8fLtktZpSR43a4vPbDZaSamykrS4mm1a5HS4RQOXK64U4Io_VG0pc2pmtPJqJoBQjQgmq_8cJCdEjP5zEGn_jXT_RsTU56R0XkxLkx2JJ7AliQQ0IB6I5wIA3KKVBQ-cFjwWYAmksZ4poHEA0thEq6XV1QJnaqNSNJEacLbWOsc4G3JgWkE9npIcGSan47gCwZzGhpQ3J_lefgtSHPbU4U5LfOX2p0_7WBv0iTvkOJ6iBIob8Jr6XKvr8S0PzXW-X68P85dp20_NPE8HWBd9fm4Wu3z3AOOm3273fXOzH4YM83LaP47NfH6F-3LXN-fjy9Qs-vw0Hp7WSoGeYgdXNxAodggEih3YXWjrDIFiR0OQmhm5-ciVxVD1wI9VkRSRk8WuQuJkibWJS7rNwzA-L9-OPeY9Ox6n8TUP6uMLKwtR8k0DAAA)' alt2link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTU_CQBD9K82e97Czn5SbPXgzUSBcWg6raQCtlBQwIUZ_u9N5MUoI6WH27bx5M_umn8qoaV2nUlOIK12TN5q8G09l4ruwWmlFI8UScYbGDDEnlXyKfHBCToGv4kh2amq08mrKLBUERK63-upjcuKM0VcfZyY3M-XNDBlpR-O8I7SAmIg8AkaiiMADkOfI7RwH1iatLOvwpWUdy8EiQMZ6UIIUWMjYBDQBKqXAGRmURk9IEs5KrXPIYyDHSjVbC2JECnoOTyWxyptfnjA9_dkwQnsJ3SXZi57_38pHGcYn7AujexgQYGTgHuq7UbP-nLtill-bZledhnU7FFUedowe2nws5pv88sZg2a7X27ZYbrsuM3wctu99UVVPfF5s2uK-Pw3FvM2HfndolGJ5GBucuB1gbAgIMDZguoD1BBgbDQIJM2LLEeuJQXzgf1JFSES8LJYSEl6WUJuwkOfcdf1xcd63_N67_X7oP3Knvn4ApcfzpRwDAAA)' altlink='[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTU_DMAz9K1XOOcTOV7sbO3BDgoG4bDsEVI1BWacykBCC347jBwJpoB6enec82y99M87MlsvcWYppbZcU3HfUZYniem0N1RLmYClXhjlZYq1x0RJ1Gkl1GySKQrb5K2CuXFXnoFErpK-a3sycNcHMSCBqkqQN26NPirMwzh59wrT_Mt2_DMnKJFDXqilrd8JEFAAYiRJABqAgKO28QKcCLDpyyKLDAgyADAeURL3AkOGMrEXW6QXvdFCqnpASnvWu9-AxkBelJVlCYQIFPY9VSa0K7rvu56vHdGxHPea_j_3fIkH7hd-jhKTDhoz3xGoBBkWnWZTe5mNlFuNrGZpFuV-tdvPnadNPzbxMO8nO-nJoLu_K7YMk1_1ms-2b6-0wFEnPp-3j2MznFxJf3fXN6fg8NZd9eRp3TytjRB7GR9gVYXyMABgfMV3E80UYnxyAtDLhL0h4vhTVFy8LJkgkbJY6hYzNMu5mPNhNGYbxcPW672Xfk_1-Gl_KYN4_AZvC0nJjAwAA)' 


title='Approval for a Small Group' 

caption='You can move individual voters.' 

comment='less voters' id='small_group_approval_sim' %}

Approval voting is simple to use.  It's also a huge improvement in finding the middle.

## The Median

Why does approval voting work? It uses a median.

A median finds the middle of a list of numbers by putting half above it and half below it.  

*More* *importantly*, this minimizes the sum of the distances to all those numbers.

In a way, all numbers are treated equally. It doesn't matter how far a number is from the median. Each number is pulling the median to one side, just like all the others.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA4VTu04EMQz8l9QRih9JvPsVFHSnKw6JAmklEDoKhLhvx-tJruHQaYtxHHsynk2-U0nr4ZgTORyoUmYrx3xYZkBLHRFzmTnqM9JrrsmMuo6ot9kqNiKdqbbMvQYK1yBp5Zw0relSUk41rSWnBn3doeQ_n--Y76QL7R0X5nSjYokK5holUm7VeP9-GtGwg7EUgAKgiBrAJZE6GpZ-CuXEzuNJppjF9QSAhhUlTiMOoOGOFVh4iQYZf0UosgI1AoMEaqSOmoYseGRBVncGyv98ewHddvTqiPK9Arl3hIYkHUK1xfjaQ75iYIVtFfZXzFthW5Xor7CtVgBsqx0lhpIFd6VEsoGlwbUG81uNccSFNFA0KGjo7VDQKU7pDBAAHO_4_31eyY5NC2J_MHsO4xjIDGQGIQYhpiHSKgBaDFxmgF3SQ_ebW2L9fNq2t_PT1_uLv43H7fPjtL2ev9LPL23Jkue-AwAA)"
title = "Median in 1D"
caption = "<b>Try moving some voters.  Add a candidate. </b> The total area of the bars below is the sum of all the distances.  Notice that moving the median left or right would not decrease this sum because the same number of people are on each side (same number of bars are growing/shrinking)."
comment = "Maybe it would be good to try to move the median itself?"
id = "median_1d_sim" %}

A median can also be found in two dimensions by using the same idea of minimizing distance.

{% include sim.html 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA4VTwUpEMQz8l56DNGmS5u1XePC27GEFD8KCInoQcb_dpLOC4Iq8wzTJdDpN8z5ab7v9gRon7FmERMeB9hHEvOWCw4i9V0ppFk4mtuIMTQ4Xp3fizWuluS9qZZIpq5QbudaiNnLUSiatmrCTcGmJZFH5kE5G23Vq2nbt3Bs1W6HD5Uzo9OvLSmSlnbl2nEXaFca2GCK2KKNf4-T-Oo350hRBCEusADhiB6Ql1sRAmKcwNUmdTErqSIIAICOKKGVGAmRkIoKKbIsyLm8zeGUH3IyBItwMu3AcWeiMDVkthezsX19R-HpPf3RF5X_K-P8gXdb0Ylh9dUonnhsXV7TP8AyGexvaZ2P11BQUA6B9NkGJdYRtmJm-kg4VR_ccj-C2rpSj1xwSDgeOvRMOJq9TpgAGAJ2fmIP5PZoTxVjCTFI5XCcgFhALGAkYCUxDGABeAloRgLJ0M3OC-4rvj6fT0-vd-_ND_iO3p7eX4-nx9b19fgGnVnGdzAMAAA)"
title = "Median in 2D"
caption = "<b>Move some voters.  Add a candidate (+). </b> Just like for the 1D case, the total area or length of the lines below is the sum of all the distances between the voters and the candidate or median.  The median we chose here minimizes this sum.  A winning candidate should also minimize this sum."
comment = ""
id = "median_2d_sim" %}

How does approval voting use a median?

In a way, approval voting is asking you whether each candidate is close to you or far from you, so you're measuring distance and writing it on your ballot.

<!--This is different than finding the median of the distances.  We're finding the median position.-->

Score voting can give a more precise measurement of this distance.  In score voting, you give every candidate a score from 0 to 5.  Add up the scores, and the winner has the highest score, just like usual.  You could even say that approval voting is score voting with only two levels of support.

Distance is measured on your ballot.  When you find the highest score, you're also finding the smallest distance.  So you're finding the median.

That's the motivation for score voting.

{% include sim.html link='[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRQU4DMQz8i885xI6dbPfMD-ht1QO0i6hUdau2CCEEb8fOlAuoymHs2J7MOJ-UaZymVhNr26SJeUg81IjMI5WIhna7E_GotM0mEccYZ8-zRl5ozImURuZE5pCoektO_443t7uV4W5ldbfCub_NISlSQQpFrAAD1K6MXQCroz9nDqteFOfxS-HeIwIAjSgypykOFZcN2YDMWcQXkbtQjp2AqYCpgKmAqTjTxOl2orliHJwFdjlJKkm9rEEbfRo2w7bKb-DEU4lA-6z-pVa41oY_glxd9UvD8owBkGqQatid4TsNpq11nTb0twymawbAcMUPVLBU61ZCYAVFhYKKtTcoaJht0pmenw6H5br-OM000uN2Oc-U6PK6vD_Ml-15f7rul6NXvt-Ou_llf5x39PUDc7xiOMsCAAA)' title='Score Voting' 

caption='Give as many as you like a score from 0 to 5.' 

comment='simple,lots of candidates, one voter' id='score_sim' %}

In practice, voters can adjust their self-reported distances, which is called using a strategy.  Jameson Quinn has a good discussion of strategies in the links at the end of this page.  Basically, using strategies means score voting looks a lot like approval voting.

In the example below, 

- the J=Judge strategy measures distance well and would best find the median,
- the N=Normalize strategy is basically using the full power of your vote, and
- the F=Frontrunner strategy considers polling data and makes score voting very similar to approval voting.

{% include sim.html link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSy04DMQz8l5wjFCdO7O6ZP4Dbag_QLqJS1a3aIoQQfDt2pr0UVTmMX5mMHX-HFIZxlBaJZYojkUbS5lY1i7NbKpdYzmYVmaYYyK9RMj-x-yUMKQYOQ_glCjHUMFAMzaosKQYp_juW0buZ1d0Mpf4WuYRmwkuk7OGMMJQQAyqgdTlkQogN7dlqsOrJbHwWzNRrcgaAJjM8oykGDUGBp_CMJdsAfJAmJbqWAq6SkQJXAVcxrpHi5XhxQxVYCxo3nlgiW5qd2OvYG_YBcL4axd90g_tdvqVm9M2C34FgXvVgxRgrASC1FgCkVvxiRdtVkNP-VkXbLQHQcMMfNDTcam_FBTZQNChoGLxAgeCuQIEUePg_wf_JdZEESb2ZkaAlBaFSZ1KIUYhRECoIFXoUfApZ6rIebDFeX3a75fz8dZhtn5_Wy3G2jT69L5-P82l93B7O22Xvm_6x38xv2_28CT9_6sQykEkDAAA)" 

title='Practical Score Voting' 

caption='Try the different strategies.' 

comment='score can look like approval voting' id='score_strategy_sim' %}

STAR voting was created to counteract this strategizing. 

STAR combines the two ways of finding the middle, scoring and counting by pairs.  It's name is an acronym, STAR, Score Then Automatic Runoff.  First we score. Then we find the top two and send them to a runoff. The runoff uses the same scores but counts them by pairs, like we did before.

Voters will use a less aggressive strategy than the Frontrunner strategy because they'll want to put all the frontrunners at different levels for the runoff.

STAR also counteracts any distortion caused by a strategy by using a final runoff where strategy has no influence.

{% include sim.html link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSsU5DMQz8l8wWih3b8etvwPbUAVC3SiDEghB8O46PMhRVGc7J2Zezk8_W22HfzYn7ONLO3InntiILCstA_o5ENdP68UiNVxXbINax9qMdOjVth_bN0qhZ7T2zkpwJnf6tZOIms91kuJc2Lwvu60BwAA-sADhgB6QF1sS80BJSnalJKuWhpJIkCAAyokhJmZEAGZnYBXZbFYxeVnlNgYsYUrVjgIehkUo70-9ayQ4amgMNMwkN0qS1ZFfAl0AuQQrvsgKtWr2WVi8DOvEqsKto2jA-g1VD0warhqbNAGjaJriouwxNewdwZTpewDE6t2olv1NzSDgc-FYw4WCidmJYcwAwrInXm5cPNEHG1YwmWooOgGDATMBMaBkNA8BPQC9gK5atu_wWG4w9PZ7PL-8PH6-n_M73zy9vp_b1A0ecBUwoAwAA)" title='STAR Voting' 

caption='Same ballot as above for score. Score from 0-5, and add up scores. BUT THEN take the top two and count by pairs' 

comment='same as above but star' id='star_sim' %}

## Bringing Groups Together

Part of finding common ground is finding allies.  Any voting system that avoids vote-splitting will also allow allies to come together as a team.  The scoring and pairwise systems mentioned above do this, and so do the methods in this section.

To avoid vote-splitting, you could eliminate candidates that aren't doing well. That way they don't interfere with the main candidates.  The main candidates won't see the smaller candidates and spoilers and can ally with them.  This method is called RCV and is getting more popular in the US.

{% include sim.html link='[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSu04EMQz8l9Qu4md29zMQ3WqLQ1zFCShoEOLfcTwcBadTirF37MnY2a_W27bvHsRdD9qZO_FYZ-QLLZ6B_H0Ssyzrx0GNZxe7EpvOXNvWqVnbjJpXHFkhdHOydiTT6eYks9xl1rsM97qOp6OZClIYYgPAEgcgDXD65LzOE1KbqUkv85I6kiAAyIihJGU0ATIykC3I1mrQXkZ5roSLUKleVfAwpKm0M_2eWRygoakYl3NhSpa0lewM-BrINdC56BlY9dp_aYsyYANPBLuGoR3Lc1h1DO2KZ8TQ7gAM7QMlS93lGDo6gKsy8AKB1YXXKPlvtYBEwEGsBQMOBnoHlvV0ulzePh4_389taw-n15fzc_v-AdZjYJarAgAA)' title='Single-Winner Ranked Choice Voting' 

caption='Your vote counts for your top choice.  Then, do a process of elimination of the candidate in last place and repeat.' 

comment='same example' id='rcv_sim' %}

Also, you can have a multi-winner system where you have maybe two candidates getting elected.  For example, you're picking two pizzas to order, so you can have meat lover's pizza and you can also have a vegetarian pizza. You don't have to all eat the same pizza.  

{% include sim.html link="[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VSTUsDMRD9K0vOc8jkc7ZHvXhQEBEvuz2sNGixbktbBBH97U7yKEKl7OHN7Ju8vLzky1izGIZeqOclDS5YcjZrxRyJpVWSibmyHJk4uuWSDNdVHD1x8LX3ZmHJBLMwP5wMmdj6pFNKZgVL_z5l5CLTX2TYNm1miLNDCwccANhfrTRQAxwUdbuooNpMxqmO_nSq4xQcADIuYERlvAJkXEYn6Pq2wNtmlGsG3AgPQ96DhyGvSoOmh68OJ9DQ9DgukyNPQenQZGvBp8KdChUeXC1Ckwjn0iE18yHjTmA34NDRArje1Ghupvdumlfd_Xou0263KeM4X7-Wcijd1b5MK23vynTsbrcfZX_Q7qm8vKzLX49hLUZTbx0hRt8OFRFijACEGDNGBCMIMVkAt8mEABOuIsUWjdeDJUgknCj1DTKeQ8ba7AAegPAzXkM-PccMUs4yzxAUCAoEBWYEZgSRSwTAj0BPYOt52my2x8fPXdGIH6b5razM9y_xYZA_ZwMAAA)" title='Pick a Pizza' 

caption='We can order two.' 

comment='meat lovers and veggie lovers win' id='stv_sim' %}

And of course, there's primaries, which is the way we do things now. Basically, a whole party gets behind one candidate. This can work in the best case scenario.  But primaries can malfunction when there's a crowded field, or when one party has many more voters than the other party, or when there's more than two parties.

{% include sim.html link='[link](https://paretoman.github.io/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3VRMWoEMQz8i2sXlizJ3n1FinTLFhdIEVhICJfiCPl7JM2FIxyHixntaMcj-bu0sm6bjkrKe92IyZkFm8GmM7alkrV9r4WiecqfwOyMQuhlbbVIWakWTW7eyvXueO9wpdW748p8qCwPFWp5HUW0KBklApEAEIkM4AFIHP26gCW_csuKKWdgt2EH2DAGY7fpDrDhgWqiWvKH3jIoxUoohY5AvUNHoO5Om-83TrQaRDh2DEu-ru6iwDJmFbpRvtEOs6CSDvLfXizjy8AjIbAseCysTxFWMbb23IVe31MBGFsHWmbepBjbGgDLM4xsWJ5pJo1RDBaGBIbFDyQY-HdwwsvpON7Pz5eP17KWp-Pr83S8nS_l5xcgCQz0sAIAAA)' title='Primaries' 

caption="Here's a best-case scenario. In reality, they don't always work so nicely." 

comment='an best case example of primaries ABCD two groups' id='primaries_sim' %}

## Afterword

To wrap things up, there's a lot of ways you could deal with voting (casting a ballot), and there's actually even more ways you can count ballots (tallying).  As far as casting a ballot goes, picking only one person does not find common ground in a group.  But picking multiple people… that allows you to find common ground.  And that's the point of this explanation. You have to allow people to vote for more than one person in order to find common ground.

Still want more? Try the sandbox below, where I've added a ton more voting methods and configuration options.  

Want more of a narrative?  Then choose your path.  I go into depth on all the voting methods above.  This page was just an overview.

Either read about primaries and polls, more details about approval voting and strategy based on polling, or an essay by Jameson Quinn on types of strategy with score voting and some resistance to it with STAR voting.  Find out more about IRV (the single-winner RCV) and STV (the multi-winner RCV). I also have a draft of a page about proportional representation using more methods than just STV. It's a work in progress. Just be sure you get to read more about Condorcet methods. I like them best.

-   [Primaries](primaries) - and electability polls
-   [Approval Voting](approval) - and strategy based on polling
-   [Condorcet Methods](condorcet) - I like them best because they count by pairs.
-   [Instant Runoff Voting](irv) - AKA Single-Winner Ranked Choice Voting
-   [The Single Transferable Vote](stv) - AKA Multi-Winner Ranked Choice Voting
-   [Proportional Representation](proportional) - draft
-   [To Build a Better Ballot](original) - by Nicky Case - the original sim that this sim was based on
-   [An Even Better Ballot](newer) - by Jameson Quinn - on types of strategy with score voting and resistance to it with STAR voting and 3-2-1 voting

**External Links**

* [Videos by CGP Grey](https://www.youtube.com/watch?v=s7tWHJfhiyo&index=1&list=PLkLBH5Kzphe0Qu8mCW1Leef2xSxPK1FIe) - I have to mention this set of videos by CGP Grey, since I do in every discussion I have ever had about voting methods with new people. He made them at the time that the UK was considering using IRV, which the UK called the Alternative Vote. 
* [Link List](links) - I have a big list of links to communities, organizations, simulators, polling sites, courses, videos, essays, books, references, and bibliographies.