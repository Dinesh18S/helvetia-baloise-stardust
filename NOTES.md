# My notes

My own working log. Rough on purpose. 

10 August 2026.

## Site

Helvetia Baloise, the Swiss private customer page. Basel, same as Mike's
team. Checked the source myself and found _jcr_content 65 times plus an
editingPage meta pointing at /content/os/ch/web/de/private-customers.html,
so they are on classic AEM and their author path is leaking into the live
page. Upgrade play, not a new logo.


## What I found first

Their fonts are BaloiseBold and BaloiseText, self hosted. So the merged
identity already shipped in the CSS. The structure never followed it.

H1 and H2 both 38px, so no hierarchy at all.
Mobile Lighthouse 42, desktop 90, same page. LCP 6.2s.
Agentic Browsing 1 of 2, accessibility tree not well formed.
Nine "Mehr erfahren" links, 41 different CTA labels.
Font stacks with nothing behind them, no fallback.

Their lang is correctly set to de-CH though. Not everything is broken.

## Stuff I got wrong

Thought the pastel tiles were fighting the navy. They are token defined and
reserved to one component. Kept them.

Thought the logo had not migrated yet. Read the zusammenschluss page and it
says the new identity is the Helvetia name plus the Baloise design. So the
wordmark stays on purpose. Killed that whole thesis.

Called the top strip dismissible. There is no X button. My point still
works but it is about size and position, not dismissing.

Thought all nine "Mehr erfahren" were on this page and caused the
Lighthouse name failure. Neither. Two are here, and that failure is about
icon only links with no name at all.

## What I overrode

Answered both tensions myself instead of letting a seed decide. Keep the
accents but give one a second job. Derive the type scale from their own
numbers rather than pick one. Came back 38/30/24 with 30 as the only new
value, since 24 x 1.25 = 30 and 30 x 1.25 rounds to their 38.

Extract said the pink accent had zero occurrences. My screenshot shows it
on the Online Services tile. Told it, it logged the correction.

Rejected my own merger H1 version after reading their page. Kept both
files as variant A and variant B.

Redesigned the service row instead of copying it. On the live page a card
label lands on a model's face and the fourth card gets cut. Made it 2x2 on
the left, photo full height on the right.

Removed the carousel arrows there. Four cards, all visible, control did
nothing.

Merger notice took three tries. Not the top strip, that is where it
already is. Not the H1, that is a temporary fact. Ended up as its own mint
band under the hero, left aligned so it lines up with the rest of the page.

Added hover and focus states. Live site has none on those tiles.

## What the tool did well

Wrote CLAUDE.md before anything ran, one rule being never invent brand
assets and it did well.

Never rolled a seed, which is its main feature, because my brief was a
constraint list not an exploration.

Seven viewport sweep caught a carousel leaking scroll width and
"Versicherungskompetenz" overflowing a column. Global fix, French page got
it free.

And it automatically checked the mobile version each time the changes happened and make sure that rendered well.

## French page, best find

Expected German compound words to be the story. Got something better.

The tool hit a gap and went back to the real French DOM instead of
translating my German. German says Helvetia and Baloise are now one. French
says we are part of the Helvetia Baloise group. The French FAQ says
something else again. Same site, same week, three versions of the biggest
fact they have published.

Also French uses two different headings where German reuses one, and the
French footer has one link where German has two.

That is the actual argument for authoring once across markets. Could not
have made it up.

## Numbers

Went 42 to 88 on mobile, 90 to 99 on desktop. Accessibility, Best
Practices and SEO all 100 on both. Agentic Browsing 1 of 2 to 2 of 2 on
both, which is the one I care about.

Full table in README.md.

Performance is not a fair comparison and I say so. Static page on GitHub
Pages against a full AEM app with consent, analytics and a chat widget.
The structural scores are the fair ones.

Broke SEO myself at one point, 92 to 91, no meta description. Added it,
back to 100.

## Not done

Six mega menus not rebuilt. Deciding that changed the finding though: the
nav exposes about 90 destinations behind hover, the page body about
fifteen. So the architecture is hidden, not thin. That is where the real
work is.

Only the language switcher is wired.

Product finder and the coverage check are client rendered, opaque to static
capture, left out rather than faked.

Chat and feedback widgets are vendor stuff, skipped.

## What I would do with another week

Right now this is static HTML sitting on GitHub Pages. Anyone wanting to
change a word has to edit the file. The first job would be running it through
stardust:deploy, which turns each section of the page into an Edge Delivery
block. Once it is blocks, a marketer edits the page in a document and it
goes live without an engineer. Everything else below depends on that step.

Then the navigation. I left the six mega menus out because rebuilding 90
links in a day was not realistic, but that is where the interesting problem
is. All of it sits behind hover and none of it is crawlable, so a search
engine or an AI assistant cannot see most of the site's structure. As blocks
it becomes real markup that machines can read, and the marketing team can
reorder it themselves.


Then Italian and English, using the same type scale and the same CTA label
list, plus a pass over all four languages so the merger message reads the
same everywhere.

And a real performance test. The 88 on mobile is a static page on free
hosting, which is not a fair comparison to their AEM setup. I would want the
same measurement taken on an actual Edge Delivery deployment before claiming
anything about it.