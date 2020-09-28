---
layout: page-3
title: Approval Voting
banner: Practical Approval Voting
description: An Interactive Guide
twuser: paretoman1
byline: By Paretoman, Feb 2018
---
{% include letters.html %}

Hi, did you vote? Do you think our elections choose the best leaders? Even if they're not the best, the people chose them, right? It's important that we have the power to choose our representatives. That's why I'm writing to you about approval voting.

Approval voting gives a better representative. When you compare approval to what we do now, approval gets better information from the voters, gets better candidates to run, and has less problems.

## Better Information from Voters

Approval gets better information from the voters because approval asks you to choose the better candidates. That can mean more than one. **Try it out below.** Move the voter around the arena. See what candidates he chooses. (There are 3 candidates: {{ A }}, {{ B }}, and {{ C }}.) See that he's choosing the candidate he's closest to. He's also avoiding the candidate he's furthest from. And for the in-between, he draws a line. Anybody inside is better than anybody outside. This is a relative judgement.

{% include sim.html
title = "Approval Voting Basics"
caption = "Pick the Better Candidates"
id = "election16"
gif = "gif/election16.gif"
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQW7EMAhF7-K1VQUbDJOrRDnJqD17wU-RKlWjLABjP_-P825HO6_LVxf1u19ikplmNqQyu-_epLZIeJeIqmc7j960ne1HjtabtVN6W7krm57h6P--7MTHzutjJ_l1lwhwGZQoECUYYW0ZkgJEM-Z1M8NrN0dycnHI3jMGAcxQKtsHxmLRqYIqKSONH1uo1AwgTUgT0oQ0k3Tl9Ni4OApvYlX6yJYWrvZo2Su7Op4kgdesRPc5_YtUnKrzDkjU1140BmZCQJ4hz5iX8V6GUfOtzxiXYXQdBEwupr6gLNsWStwCsVCwGLWjwDnrY5N8UqHAeTF_fhmnGc9s-uxa61gKgAEwEBOICYBh-5ZAT8ALZEXJ-rL8y4rz_QuHr_l18gIAAA)"
%}

In an election, the voter also needs to decide one more thing: what is he risking? Things do get a little more complicated whenever you add more people to a situation. The above was a simple model, and we just set it so that the line is drawn halfway between the best and worst candidates. In a real election, the voter will be checking the polls to see where he should draw the line. He's going to see who has a shot to win, and he's going to draw the line between those in particular because the difference the voter makes can decide who wins the election. **Try it out below.** See that when {{ A }} isn't doing well, {{ C }} voters don't need to use {{ B }} as a fallback.

{% include sim.html
title = "Consider Risk"
caption = "Decide Which Frontrunner is Better."
id = "election17_frontrunner_status"
gif = "gif/election17_frontrunner_status.gif"
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSXW7EIAyE78IzqjDYGHKVKCdZtWevzaeVKlWrPPiXYWbIq7Ry3bfPKupPvcUkMo2sS2b2PLVIrsj2KntnPcrVatFylR9ppRYrl9QyYyuGHqHVf19M1sfJ_jgJ_LxLkoKMbHQacBAlGGEeIhIURCPGhSPCPsMeSNHscnZ6JwDTlcrOgT5pOtWiCpQe0tMuqT1dAGl0BiANkIadtfhycbIB3kAsGHrgMkmBKVj7OwnAOxWrnnP6F1JRqs5LQFH3aRqWmRAQatAz_DJezBBqfvgZdhlCZyMgcuL6BGXakZDkJhATBhOrHQbOWccgH1QwcF7M3z-NM1xvb-qomn0krUaQg7QAXJBZAC6jCZ8F3oLWSlpfFv9ZEvv-BUf8SXr0AgAA)"
%}

Approval asks for this judgement from every voter. Then the votes are added and the most votes wins. That's the group judgement. **Try it out below.** Move the voter group to see which candidate wins. See that when the center moves toward a candidate, that candidate wins.

{% include sim.html
title = "Approval Election"
caption = ""
id = "election18"
gif = "gif/election18_approval_poll_frontrunner.gif"
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSW2rEMAxF9-JvUyJZD0-2ErKSoV17ZR8ChTLkQ5JlH19d592Odl5XRhfLu1_iUplVprIyv-_eZG0R966Sqx7tPHqzdrYfOVpv3k7pLWpXNbPC0f991ZkfO6-PneKvu0SAi1KiQIzghCCUALGKdd2o8NqrWpxaVNlSVQlg1Kh8H1AwmlSTqihagx9bqCwPZDeG0oA0II0iXeUeG4Md8AajStdq2catRJ5En6SA11iJ7XP2F2mxr7HkHZBor73oGObIcwZ15Dl-Oe_lDOq59Tl2OYPGQcCuwPWAEr5HWOICRKAgsDpRkJxNDMpBhYLkxfL5ZZLmfLzpo9taZ6QJcMomTYATMRPgdBbRM-FNZM0l68vrL1uc719_EIbQ8gIAAA)"
%}

Compare approval to the way we vote now. Right now, you can only choose one candidate when you go to vote, and that limits you. You can only say which candidate you like best. **Try it out below.** See that your opinion is limited to one candidate.

{% include sim.html
title = "Choose One"
caption = "(the way we vote now)"
id = "election19"
gif = "gif/election19_pick_one.gif" 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSUW4FIQhF9-K3aURBmNnK5K2kadde8OQlTZpmPhDB4704n220-3l8d1F_9UfUcjVzNUVyZa9Xb1ItUj3Xqny1e_Sm7W7fo_Vm7ZbedjZlzTOM_ufLSvxbuf6tyDhXiQCXSYoAUYIR9pEhKUA0Y163MlynOJOTm1NOz5wEMFPJ7ByYm00nC7KkzPQ9jlCpEUBaCFqLOqSVpCeHR-OmBG9hVXpOuGnhqkfLXtnV-V4k8Fm10HNOfyMVp-o8AxL1OpvGwEwIGDWMGvMy3sswan70GeMyjO5BwOTG5Iay7VgocRvERsFm1I4C56zPQ_JFhgLnxfz9yzjFeM-mr661j6UAGAADMYGYABh2bgn0BLxAVpSsD8u_rDhfPzoOPd_xAgAA)"
%}

And you also need to decide one more thing: what are you risking? If your favorite doesn't win, then the worst candidate might win. In a real election, you're going to look at the two frontrunners and pick one. **Try it out below.** See that you only get two choices.

{% include sim.html
title = "Risky Choose One"
caption = "(the Real way we vote now)"
id = "election20"
gif = "gif/election20_risky_choose_one.gif" 
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSWWoEMQxE7-JvEyxZ8tJXaeYkQ3L2SH40BMLQH6XN5Sq536WV677nqGLzVW8xj0gjUpGI_PWqRXJE1qqyR-a9XK0WK1f5aaUWL5fUMmIoejOg1X9fdNbHzv7YkXauklQgPQtKAQligAPjCJGQIBYYF_aAfZoaTFFUOTOqADRqZH4O6KA4yRZZsGg4b0eq5hJg6kqjAzB1T701vhwctODrmJXDYUmXM5YG07DpEwThnY7Nzjn7S2k4tclDINH2KTorcwGQ58hz5Dkv5hj1SY91OUZHAzA52PpgXcOPhRQ3oBgoGKx6omBydqJgdjJebPJi8_lpJs317Kb2alnH0mqAHKYF4ULMgnA5RfQs-BayVsr68vjPELafZe9ctmfQT_D9C18ZfaYOAwAA)"
%}

In an election, every voter faces this risk. And the only thing they can do is pick from two. **Try it out below.** See that the winner isn't always the candidate closest to center.

{% include sim.html
title = "A Risky Choose One Election"
caption = "(Our General Election)"
id = "election21" 
gif = "gif/election21_risky_choose_one.gif"
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSUW4FIQhF9-K3aURAnNnKy1tJ0669yMkkTZpmPi6CHi84n220-_WK1cXi3V9impFlNEUy8ve7NzlbRHeXqLW2e_Rm7W7fo_Xm7ZbeVm7KWqSM_ufLyv63cv1bkVFXyXEgehKTBBbEEEcWkhbEUvNCTbkqO5OUySlldiZmpoCZRtLrwAQzg9VmddUBHWV1niFAUkiqCCT147fndzYuSvCUZqUYVrgTyBPMJ0jg63RsVufsN9JWXWPBQ2DRrko6I3NBJkkadeblvJjTqEf5c8blNLoGQpOLqS8oy6uFY26BWDhYjDpwEJwNBhTKCgfBi8Xz0wTF_cyma7eTp6U9ECnSBrgxswFuJ4mfDW9jax9bH57_2TH29QPStld28wIAAA)"
%}

**To recap:**

- Approval chooses a better winner.
  - Better information is collected from the voters.
    - It asks for the better candidates (plural).
    - It asks for a risk assessment.
    - A group judgement is formed and the candidate nearest the center wins.
  - Compare to the way we vote now:
    - It asks for one candidate.
    - It asks for a risk assessment which leads to a bad choice between two.
    - A group judgement is formed but the center doesn't always win.

Here's a sandbox where you can try changing the number of candidates, the number of voters, and the election method.

{% include sim.html
title = "Sandbox so far"
caption = ""
id = "election22_sandbox"
gif = "gif/election22_sandbox.gif"
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSQW7EIAwA_8IZVRhjTPYrUX6w6q2nqvv2Go8iVapWOdhgMxocvksrj_P0WWX4VU8ZGtmIrItEZtdVi-wW0VXFc63l0WoZ5VFe0kotlusZXVH0CK3--6Ky3laOt5Xgb7ZIdmgtr8-v57NU6VW26W7ptGAlg4CTTEJIyYgYCsGQI3d7sGOzB1siBKZHANMHm5YHOpjurBarIw9oS7W-5yJZUEgKSRHSIJ0x0Sq7cdIBT7m-JGMkbidyJ_1OAnjqTkaeG3-RY6bwcP4NiuPITWOIhp6hZ0pAz5iXcVFzaozLuOhsBMY1mfrkktP4PyEyQUwMJqN2DJyzjoErKwwcA7-fkVPcj6bHY9h3dK6zgC1JygK2EFnAlrGJy4K1UFpb6cPi1cE57kEfe9C2E83k5xfvl6cSHQMAAA)"
%}

(By the way, there are a couple different names for our election method that we use now: first-past-the-post (FPTP), single-member plurality (SMP), or just plurality voting. First-past-the-post is a term that has been used for around 100 years. It comes from horseracing and it means the first horse to cross the finish line, even if the horse had been disqualified. It was a negative term used by people that wanted to improve the way we vote because they saw that the wrong winner was being selected. Single-member means you pick one winner as opposed to multiple representatives. Plurality means the highest count of first choices wins.)

(Also, when we say election method what we mean is what information we write on our ballots about what we want and how we combine that information into what the group wants.)

## Map 

We're now going to take a step up the ladder of abstraction from one election to many possible elections. If you've played around with the sandbox for a while, you might start putting together a map inside your head of where the voters have to go in order for a candidate to win. Each candidate has his own territory. I added this to the election by putting the voter center at every pixel on the map and seeing who wins. Then I colored the pixel with the winner's color. **Try it out.** See that whenever you move the center voter to the {{ C }} territory, the {{ C }} candidate is the winner.

{% include sim.html
title = "Map of Winner"
caption = ""
id = "election23"
gif = "gif/election23_map_of_winner.gif"
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSW2rEMAxF9-JvUyJbspRsJcxKhnbtlXUIFMqQD72s4ys573a06759dVF_9Vt0pqfpDZH07PXqTfYRmdHFK57tOnrTdrUfOVpv1i7pbeWpLHqao__7shIfK-fHSvL3XSLAZRDOulGUyDALkwJE0-Z1M81Z2ZGcTA6pxpGYkYZBhpK0ahhghhMF0VkN8yihY-9AqjAhTUgT0kzSndvrsg8uTsCbjCrF0MJtRx5nPE4C77kdrT79i9RV16jzDkjUs5LGwgx5Nkgiz9iX8V4Gxbz0WRAx6DowrGux9QVlWY2wxS12tVCwWLWjwOl1FuS8mKPAeTF_fhmnGM9u-uy684wUAEOKFAADMQEwjCR6Al4gK7asL8u_bHO-fwFyRTIr8gIAAA)"
%}

## Better Candidates

In this next part, I'll describe how approval voting gives an opportunity to candidates to run for office. We'll change perspective to consider what a candidate sees.

A candidate will win if he moves to the center. A candidate thinking about running for office would think about what his campaign message is. He would consider where that would put him on the political spectrum (left to right). If everything looks good, he would start his campaign. **Try to see what a candidate sees, below.** This is a map of every place {{ B }} could put his campaign message, and who would win if he entered the race. Move him toward the center of the voters and see that he wins. This example works for every candidate, so all the candidates will want to be at the center and try to be as broadly representative of the entire population. This is good because it serves the purpose of an election that the people have the power to choose their representatives.

{% include sim.html
title = "The Winners' Circle"
caption = ""
id = "election24"
gif = "gif/election24_winners_circle.gif"
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSW2rEMAxF9-JvUSxZspXZSpiVlHbtlX0IFEoZhms9cnIl57P19rrvlaK53nK7S3ipaYp1f7-l6W7Q6FL_HY_26tK8vdq39iYt2kulzeqq4irp8udXlfy3cv1bKf5-lypwNcJyMEqcKJCJlAH10qTnOlkrTiVNj1UzhEHMieI8YGBsESURlNGPUd07UDJFshJIA9Io0q2iNE46FsKoKlYlP7h90Odgz6GA99gHPz78N9LneY0v7gGLfp1ksLDAXjBoYC_YV3BfASUwFolcR2ZHWNdk6xPKjDPCNjfZ1cTBZEkLB4tnFwtagwgHixtbzyezKOazGxniO89ICTD1kBJgYiYBZpDET8JLbOW29RH1lW3O1w83jKme8AIAAA)"
%}

Compare that to what we have now at the general election and you'll see that some nice candidates can't run. Right now, once the two front-running candidates are settled on, there isn't much opportunity for another candidate to be running against them. **Try it out below.** Move {{ B }} to the center and see that voters are still stuck on the frontrunners. I have set this example so that about a quarter of voters who like {{ B }} best will actually vote for him as "true believers". See that this causes {{ B }} to become a spoiler. When {{ B }} moves toward {{ C }}, {{ C }} loses because {{ B }} takes votes away from {{ C }}. This is the spoiler effect. If {{ B }} was nice, he would drop out to help {{ C }} win because they're on the same side. {{ B }} is a jerk, so he stays in and spoils the election for {{ C }}. 

{% include sim.html
title = "The Spoiler Effect"
caption = ""
id = "election25"
gif = "gif/election25_spoiler.gif"
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSW2rtMAxF5-JvUyxZtpQzlXBGUtqxV9YiUO6l5GPr4axsyflso73u21eXsHe_dVuXoSeSK2vj_e5NzhGxzN1OPttr9Gbt1b5H6221l_S281D2PKWptz7-fbIZ2fyvXp3rz46M-poIfFHS9DBTjGwhG0kPYqnBmauqmpwsqpRbTYymMIoaxVUvKJgcorIggzJHGdWzBUgT0oQ0Ic0k3dLzOQc3J5wWo0oxrHAnkCfQJ0jgPU9g5cN-I20Xy5ybwKJdVVwsbAmiFLG32NfiyhaU5eVvBXKV7IEw5GbrG8peNcIxt9nVxsFmSY4D511nQT7JcODcmD9_DbvxeHbTZ7dTZ6QAGFKkABiYCYABMPAT8AJbcWx9rPzLDufrB89U4yz0AgAA)"
%}

Nice candidates dropping out is very common in the primaries. With the way we vote now, primaries are necessary to prevent the vote-splitting we see with {{ B }} and {{ C }}. The important choices are made in the primary, and in the general, we are left with only two. A primary will pick the candidates in a complicated kind of way involving considerations of electability. **Try it out below.** {{ E }} wins the primary vote because primary voters saw that {{ C }} would lose the general election against the more moderate {{ A }}, and {{ B }} and {{ D }} split their vote. For more explanation, see the [Page on Primaries](primaries).

{% include sim.html
title = "Primary Vote-Splitting"
caption = ""
id = "primary_sim"
gif = "gif/primary.gif"
link = "[link](http://127.0.0.1:4000/ballot/sandbox/?v=2.5&m=H4sIAAAAAAAAA3WSW24DIQxF98I3qrCxwcxWRllJ1K69hqMqUqpoPowfHF-beZZWrvuOUcXbo94yvYpFnlRXxnTHVsZEzinrVn88apF9bUgW-y7ucooz0cvVarFylR8ptXi5pJaR1ZmbaVr992UmPmbWx4y000oEuCguAsQwjhmYFCCWNtt5mnXEaXIyqIKXGE0DRo1gYnoaMDrxAm-dC70dobpXAKkjqEPqkHqS7lwW3y4eXIfZGVeq1l4t0wZ2z2vyOurrmPhbT1-zw7D3FjZOa5s8DbKN4Z0lumCUIJKdHTpv6Azv8-j1OL2c4UfDMPhg8AFl-NHaU8gAMVAw1jETBZO7k_XPjoeCySvOv99okoy3XU1GCoDBSIGYQEwADICBnoAXyIot6yt_j7U5379wAhm1IgMAAA)"
%}

**Final Recap:**

- Approval chooses a better winner.
  - Better information is collected from the voters.
    - It asks for the better candidates (plural).
    - It asks for a risk assessment.
    - A group judgement is formed and the candidate nearest the center wins.
  - Compare to the way we vote now:
    - It asks for one candidate.
    - It asks for a risk assessment which leads to a bad choice between two.
    - A group judgement is formed but the center doesn't always win.
- There are better candidates running.
  - The incentive is for candidates to move to the center.
  - Nice candidates are available that otherwise are staying out of the race because they'll cause a spoiler effect.
  - There is no need for a primary.

Putting it all together, here's a sandbox for you to try out all the different systems and to make your own scenarios: