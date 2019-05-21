# HomeUnstuck

A Chrome extension to make the webcomic Homestuck (and various unofficial spinoffs) easier to read by replacing its many UNR34D4BL3 2triing2 0f tttext with more standard English spelling and grammar.

## About
[Homestuck](https://www.homestuck.com/ "External Link: Homestuck Comic") is an epic 8000+ page online story told in a combination of text, pictures, video, and even playable in-browser video games. 

Homestuck and its spinoffs are known for representing conversations between characters entirely in a faux chat log format. Each character uses their own unique style of typing, ranging from the fairly simple (SHOUTING IN ALL CAPS) to the nearly illegible (R3P74C1NG NUMB3R77 W17H L3773R5 BUT INC0N5151573N7LY). This can make the story challenging for many readers, especially readers with disabilities. 

While traditional text replacement extensions do exist, the complexity of many quirks makes it difficult for many users to simply 'search and replace'. Additionally, as replacement needs vary depending on the specific character speaking, global search and replace will not provide the desired outcome. 

## Features
### Version 0.4 - Vast Error
* Automatic, context-aware text replacement for the _Vast Error_ Homestuck spinoff comic on both [Vast Error's official site](https://www.deconreconstruction.com/vasterror/) and [MS Paint Fan Adventures](https://mspfa.com/?s=2302)
    * **Major characters:** Albion, Arcjec, Dismas, Ellsee, Laivan, Murrit, Occeus, Sovara, Taz
    * **Minor characters:** Hamifi, Sestro, Rodere, Vellia, Guardianspirit, Snake Denizens
* Toggle quirk correction on and off for each character via the extension's options page
* Customize the list of chat handles that each character is identified by (as chat handles may change with future comic updates)

## Known Issues (V 0.4)
* Options page does not yet detect alias collisons - defining the same alias for multiple quirks may lead to unexpected results

## Installation
HomeUnstuck is still in alpha (unreleased to Chrome store). It may currently be tested via Chrome's developer mode.
1. Clone this repo to your machine 
```
git clone git@github.com:kmtenhouse/homeunstuck.git
```
2. In Chrome (38 and up), navigate to [chrome://extensions](chrome://extensions)
3. In the upper right hand corner, select the toggle to switch 'Developer mode' ON
4. A new menu will appear. Select 'Load Unpacked'.
5. Select the directory where this extension was cloned onto your machine.
6. You should now see 'HomeUnstuck' appear in your list of extensions!

* **Security note**: please remember to always _disable developer mode_ when you have completed testing!

## Future Releases
* V0.5 - Enable/disable quirk replacement via the options page
* V0.6 - Customize which parts of each quirk are being corrected (and how) 
