---
status: "published"
title: "Time Edit Request Intake Mechanism"
thumbnail: "/images/case-studies/amz_meter01.jpg"
headerImage: "/images/case-studies/amz_meter01.jpg"
headerImageAlt: "The Slack form that users fill out to request a task time edit"
summary: "Built a time edit request mechanism on Slack, enabling 24/7 transparency on edits, their authorization, and reducing overall unaccounted time for the MNL node from 3.0K+ minutes to zero in six months."
tags: ["UX/UI Design"]
client: "Amazon"
role: "Production Manager, Project Owner"
years: "2024 – 2025"
date: "2026-01-01"
# homepageOnly: true   # company case studies only: hides it from the Works listing
# CHALLENGE (what was going on and what I set out to do)
challenge: |-
  Back in Q1 2024, I identified challenges in the organization’s existing process for facilitating time edits:

  1. There was no centralized repository for all task timer edit requests. Authorization was given through three different channels (messaging service, email, and verbally), and it was difficult to retrieve approval data on time edit logs; and
  2. Both messaging services and email were only able to store data for a limited amount of time, commonly three months. The only way for users to be able to keep data received through either platform was by taking screenshots and storing them in a separate folder or document.

  Due to these, managers were unable to find authorization on ~400 hours of edited task time — from Q4 2024 to Q1 2025 — that were unaccounted for. Given this, a mechanism had to be created to:

  - Enable 24/7 visibility on the timer edit requests for all parties involved. This included managers, leads, and the associates; and
  - Ensure accountability on both the side of the associate and the approver — whether it be the lead or the manager.
# RESULTS (optional: stat tiles, then closing text). The Action text is everything below the closing dashes.
resultsStats:
  - value: "~38%"
    label: "reduction in unaccounted edits in month one of the MNL Node run"
  - value: "25%"
    label: "reduction in unaccounted edits month-on-month from Jul-Dec"
  - value: "100%"
    label: "elimination of unaccounted edits by dec 2024"
resultsCopy: |-
  - In the first month of the run in the MNL node alone, unaccounted time edits dropped by ~38% and overall volume accomplished for the node rose by ~10%.
  - Expanded the coverage of the project to the rest of the organization in Jul 2024, in which 25% reduction in time edits was observed month-on-month
  - By Dec 2024, instances of unaccounted time edits for the whole organization had dropped to zero, with volume production increasing by ~27%.
---

First of all, the platform to be used had to be something that users (managers, leads, and associates) were already familiar with, at the very least. I didn’t want to introduce any more friction in the production process, and I knew that speed of implementation was vital in quickly curbing the behavior I had observed.

Given this, I decided to mount the mechanism on Slack, a tool that the organization had already been using for at least six months.

I worked with leads to determine the information that would usually be needed to determine whether a time edit request was valid or not: the task ID, the date when the edit was to be performed, the reason (system issue, internet issue, power outage, or an honest mistake from the end of the user), and accompanying images proving the veracity of the request.

***

![The form to be filled out by users requesting for a task time edit.](/images/case-studies/amz_meter01.jpg)

***

![A Slack message from the Edit Time Request workflow listing the requester, ASIN, reason, proof of the tech issue, original time and requested adjustment](/images/case-studies/amz_meter02.jpg)

The manager selected in the form will be notified of the request, and must review the request no more than 30 minutes from when it was sent to ensure minimal time wastage. If the manager has not triggered a review, the request will be left unread in the Slack channel. Other managers may pick up the request if they have bandwidth, but must also notify the selected manager of the same.

I designed the responses to the form to be automatically stored in a sheet that is shared with other managers and leads for full visibility on the requests coming in. During the pilot run of this project, the senior leader for the MNL node also had access to the sheet and could review it whenever needed.

***

I ran a pilot test on my team in Mar 2024 and, seeing that it had been smoothly adapted by the team, I then rolled it out to the rest of the MNL node in Apr 2024.
