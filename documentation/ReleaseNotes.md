# TubeMod - Release Notes

## 1.12.0

Add:

- General:
  - Set all video titles to lowercase

- Header:
  - Add Youtube Studio Icon next to the Notification Icon

- Sidebar:
  - Hide Sidebar

- Home:
  - Hide Youtube Playables
  - Hide Trending
  - Hide Breaking News

- Video:
  - Hide 'Playback Speed' Video Settings Option
  - Hide Video Progress Bar dot
  - Hide 'Thanks' Button
  - Hide 'Clip' Button
  - Hide 'Save' Button
  - Hide Progress Bar Gradient
  - Hide Comments Replies

Fix:

- Hiding Home Page tabs no longer cuts the top thumbnails;
- Selector being used to hide the Sleep Timer element is properly defined now;

Remove:

- Video:
  - Hide 'Extra Buttons' Option was removed, but individual options were added.

## 1.11.0

Add:

- Home:
  - Hide Video Ad (included in the Hide Sponsored Content toggle)

- Video:
  - Hide 'Avatars' on video comments

Fix:

- Header
  - Hide Search Bar and Create Icon are again working properly.

## 1.10.0

Add:

- Sidebar:
  - Hide 'Your Podcasts'

- Home:
  - Hide 'Podcasts' and 'Playlists'

- Video
  - Hide 'Sleep Timer' Video Settings Option
  - Hide 'Shorts remixing this video' in Video Description
  - Hide 'People mentioned' in Video Description
  - Hide 'AI-generated video summary'
  - Hide 'Watch on YouTube' Offer Module
  - Show (not hide 😉) Video Thumbnail next to the Video Player

Fix:

- Playlist mixes on the Home Page weren't being properly hidden.
- Hiding all videos on the Home Page would also cause videos on the subscription page to hide, by going back and forth.

## 1.9.0

Add:

- Sidebar:
  - Hide 'New' (Blue Dot) Indicator on Channels

- Home:
  - Hide 'Posts' Feature
  - Hide 'Shorts' Feature
  - Hide Already Viewed Videos (100%)

- Video:
  - Hide 'Show Chat' Button on Live Streams

Remove:

- Sidebar:
  - Hide 'Your Channel' Feature

Fix:

- Hiding Scheduled Videos no longer hides posts
- Issue with Hiding Video Views

## 1.8.0

Add:

- Home:
  - Hide All Videos

- Video:
  - Hide Join Button
  - Hide Collapsed Actions Button

Fix:

- Suggestion Wall (on the end of the video) wasn't properly formatted when using TubeMod
- Preventing Views from showing again if hidden

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
