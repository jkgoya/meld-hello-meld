# hello-meld-4/5 retrospective

This note is a retrospective review of a 1-week sprint, which was a collaboration between the SSI3 (DH software sustainability), BitH (Beethoven in the House) and Music Encoding and Linked Data (MELD) activities.

- [The UK Software Sustainability Institute: Phase 3](https://gtr.ukri.org/projects?ref=EP%2FS021779%2F1)

- [Beethoven in the House](https://www.dfg.de/en/research_funding/announcements_proposals/2020/info_wissenschaft_20_01/index.html)

- [MELD Music Encoding and Linked Data](https://github.com/oerc-music/meld)


## Intro

The `hello-meld-4` and `hello-meld-5` sample applications were created as part of a remote "pair programming" exercise, as a way of passing on some technical knowledge about MELD and its supporting frameworks to a DH researcher.  It used as a starting points [TROMPA Selectable Score Demo application](https://github.com/trompamusic/selectable-score-demo) and [TROMPA Music Scholars Annotator application demo](https://github.com/trompamusic/music-scholars-annotator), and embedded those programs' logic into "Hello MELD" style applications.

The starting point for `hello-meld-4` was a copy of the `hello-meld-2` application, with the `containers` directory copied from [TROMPA Selectable Score Demo application](https://github.com/trompamusic/selectable-score-demo).  Changes were applied to `src/index.js` and files in the `public/` directory to correspond to the Selectable Score Demo application structure.

The starting point for `hello-meld-5` was a copy of the `hello-meld-4` application, with `annotations`, `containers` and `graphics` directories copied from [Music Scholars' Annotator](https://github.com/trompamusic/music-scholars-annotator).  Changes were applied to `src/index.js` and files in the `public/` directory to correspond to the Music Scholars' Annotator application structure.

We then proceeded to add a new annotation type to  `hello-meld-5` for referencing a recording of the piece displayed, and changed defaults to use the "Hello MELD" sample piece.  Testing was performed against the [Inrupt community Solid server](http://inrupt.net/). Note that actual Solid pods are allocated in sub-domains of the server; e.g. [gklyne2021.inrupt.net](https://gklyne2021.inrupt.net/).  The steps we followed for adding a new annotation are outlined in [annotation-sample-link-to-recording.txt](./annotation-sample-link-to-recording.txt).


## Meeting agenda and notes

When: 2021-04-30, 11:30 UK/12:30 Europe
Where: Zoom (71399209315)
Present: GK, MS, DL?

### 1. Purpose of meeting (GK)

To review what we did and highlight any lessons arising from the week for future work, and in particular topics that might be incorporated into the [SSI3 sustainability report](https://github.com/oerc-music/meld-testing-ssi3) (private project).

### 2. "Gather data": summarise what we did, and any particular issues that were noted (GK, MS)

(a) selectable-score-demo to hello meld framework as hello-meld-4.  Familiarization with code and supporting environment.

    MS notes: selectable score relies on a drag-select app, which sometimes throws up errors.

    Turns out that we had assumed different start points for this exercise.  The fact that DavidL could see our Slack channel meant this was picked up quickly.

    We had some problems with `npm install` - I thought it was hanging, but turns out it was just very slow.   May have been network performance related.

(b) music-scholars-annotator

    Got this running in out local environments. Fairly quick and straightforward.

    Layout seemed a bit messy -browser issues? - layout logic not fully thought out

    Created `hello-meld-5` initial stab based on `music-scholars-annotator`

    This stage was mainly an ongoing exercise of familiarization with the MELD framework, and its use by  `music-scholars-annotator`.

    Understanding the code was sometimes difficult, because of having to trace through many layers of abstraction.


(c) Add a new annotation type to `hello-meld-5`

    We worked as a pair to add a new annotation type to `hello-meld-5`.  This phase mostly went smoothly.

    We ran into Solid authentication/authorization issues.  Needed to re-login even then system said we were logged in.   Diagnostics in the area are not very clear.

    We were following paths we explored in previous step;  the pair working here was a very effective knowledge transfer process.  Used screen sharing in a Zoom conference; MS replicated the work locally as we proceeded.


(d) Add another new annotation type to `hello-meld-5`

    Subsequently MS worked alone to add another new annotation type to `hello-meld-5`

    Early on, MS had a problem with his code.  This was resolved by looking at GitHub diffs - GK was able to send link to commit in GitHub.  (GK also spotted bug in solidWrapper changes made previously in phase (c).)

    MS succeeded in getting new annotation type created, but not displayed.

    Working together again, we got the new annotation type display working.


### 3. Discussion; record insights/lessons (things we want to carry forward) (all)

Be very explicit about starting point software.  There was some confusion at the beginning, which in the event was harmless, but might have resulted in wasted effort.

Document new abstractions created.  Also testing. (Introducing new abstractions is especially an important topic for MELD).  The "Hello MELD" applications, considered as "documentation-by-recipe", were found to be very useful in this respect.

Zoom screen-sharing was very effective as a pair programming technique.

The pattern we've followed has been a series of short workshops followed by this week's longer sprint seems to have been very effective.  Reinforced value of simple early "Hello MELD" apps.  MELDfests didn't really help - difficult for outsiders to come in (though this was not what they were intended to achieve).   Generally, sprints like this do seem to be a useful way of making technical progress and transferring knowledge.

DL: overall, this long workshop (sprint) has been as helpful as we hoped it would be.

What worked well:  MS: started with personal goal which was realized.   An important thing here was actually doing it, to see all the details worked out.

Would have been nice to be working with a stable code release.  But as it happens, we don't think it was a big issue.

SSI3 report:  add some thoughts about the needs of engineer time - combining short sessions with longer intensive sprints.  Something to consider when budgeting for engineering support time.  Especially note the value of sprints.

Callbacks and promises: local vs global simplification issues?  (Promises harder to understand locally, but lead to easier-to-understand global structures.)


4. Next steps

MS to look at importing elements used by music-scholars-annotator into a new MELD application, to learn more about the process of creating an application around the MELD core features.

Check `hello-meld-4` and `hello-meld-5` against new Inrupt enterprise server (https://signup.pod.inrupt.com/).

Consider documentation sprints (see previous comments about sprints and documentation of abstractions)?  Consider documentation-by-recipe (e.g. Hello MELD) or by test cases?   Also: naming is an important aspect of documentation?

Further SSI3:

- Try open online workshop facilitation along the lines of this week exercise?  
- Design/document MELD abstractions?   This is a big sustainability issue?  Looking at issues of composing abstractions.  Patterns to use?


5. Wrap up: Summarize what will happen with what has been discussed in this meeting (all)

(a) SSI report updates

(b) circulate link to this document

(c) Raise issues for MELD/music-scholars-annotation project

(d) anticipating that lessons will be carried back to BitH project




