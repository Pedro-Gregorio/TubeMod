# TubeMod - Release Notes


## 1.7.1

Fix:
  - Suggestion Wall (on the end of the video) wasn't properly formatted when using TubeMod;

## 1.7.0

Add:

- General:
  - Blur Video Thumbnails

- Profile Settings:
  - Hide 'Sign Out' Button

- Home:
  - Hide Mix Playlists

- Search:
  - Hide Shorts
  - Hide 'People Also Search For'

- Trending:
  - Hide Shorts

- Video:
  - Hide Subscribe Button
  - Hide Video Live Chat Replay

- Import / Export TubeMod Settings

Fix: 

- Toggles now maintain their width regardless of label length 
- When removing everything from the sidebar, no more horizontal bars are shown

## 1.6.0 

Add:

- General:

  - Hide Live Videos (Streams)
  - Hide Video Previews
  - Hide Thumbnails (both videos and playlists)
  - Hide Video Extra Information - Views and Posted Time

- Header:

  - Hide Search Bar

- Video:
  - Hide Subscribed Button (when you're subscribed to a channel)
  - Hide Download Button
  - Hide Extra Buttons (besides Share and Download)

Fix:

- Miscellaneous
  - Fixed an issue where users had to reset the settings every time a newer version was released.  

- Sidebar
  - Fixed an issue with the Sidebar Footer, as it was messing up with posts creation. [View the issue On GitHub](https://github.com/Pedro-Gregorio/TubeMod/issues/60).

## 1.5.0 

### **Note from Pedro**:

#### Regarding Performance

1.5.0 introduces a big performance upgrade, in comparison to 1.4.0. From what I've tested, having the extension on or off is the same, when it comes to components loading in the page. In the next few weeks, I'll study and think if it makes sense to remove elements, instead of simply hiding them - perhaps even give the users the option to choose between deleting elements, requiring a reload on unchecking, or simply hiding them, which requires no reload to show them again, but keeps them "loading" in the background (comments or suggested content in a video, for example).

#### Regarding Actions

1.5.0 removes two actions, which could be performed: automatically expand the description and hide the Stream chat. TubeMod will focus on UI customization for now, leaving actions to a later stage of the extension.

Add:

- Sidebar:

  - Hide 'You' Sidebar Option
  - Hide Your Courses Option
  - Hide Your Movies and TV Option
  - Hide Settings Section
  - Hide Footer Section

- Video:
  - Hide Subscribers Counter in Video
  - Hide Views in Video
  - Hide Share Button
  - Hide Chapters in Video Description
  - Hide Transcript in Video Description
  - Hide Links in Video Description
  - Hide Suggested Videos Wall in the end of the video

Change:

- Hide Scheduled Videos was moved to General, as it also hides scheduled videos on the homepage

Fix:

- Shorts were appearing on the Home Page, even when the toggle was enabled

Disabled:

- Auto Expand Description
- Hide Stream Chat Automatically

Note: Both these features are related to taking actions, and that will be a later focus of the extension. For now, the focus will be around hiding content, as gracefully as possible, without impacting on performance.

## 1.4.0 

Add:

- Hide YouTube Music in the Sidebar Option, for Premium users
- Hide Transfers Sidebar Option, for Premium users
- Hide Video Suggested Shorts Option

## 1.3.0 

Add:

- "Support This Extension" Button to popup
- "Send Feedback" Button to popup
- "Release Notes" hyperlink to popup
- Auto Expand Video Description

Fix:

- Hide Home Page Tabs was affecting Channel Video Section Tabs

## 1.2.0 

Add:

- Error Page when opening the extension outside of YouTube

Fix:

- "Create Button" Locator for Opera

## 1.1.0 

Add:

- MutationObserver to properly track elements state

Change:

- Subscription Page Shorts Locator

## 1.0.0 

Add:

- First Official TubeMod release. Check the [Features Doc](Features.md) for more details.
