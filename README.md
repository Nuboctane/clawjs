<h1>clawjs</h1>

A slightly adapted version of [Tridactyl](https://github.com/tridactyl/tridactyl/)
but is easily injectable in any browser and is open source.

Works in (as far as I'm concerned) any browser, this can easily be put into a local browser extension,
you can make a browser extension locally and just use this code and unpack it in your browser's extension library.

If you don't know how to make a browser extension I recommend installing one of the following existing browser extensions to help you use my code.
Such as:

[Tampermonkey](https://www.tampermonkey.net/),
[(chrome) Pagemanipulator](https://chromewebstore.google.com/detail/page-manipulator/mdhellggnoabbnnchkeniomkpghbekko?hl=en/)

These extensions should guide you on how to do what you want with my code.

You can always also just paste this code in your browsers console for a one-time run.

<h2>whats different?</h2>

- Scrolling automatically keeps updating the positions of the layered frames.
- The script is activated more respectfully by pressing G and H simultaneously, as opposed to just pressing F in Tridactyl.
- The script uses keys that are easier in finger reach range of mostly all keyboard layouts from 25% and above.
- The script automatically keeps track of the buttons/elements currently in-frame and ignores other ones respectfully, updates when scrolling.
- The script makes use of less cryptic key tags when activated, read more about this below on how to use them.
  
<h2>how to use</h2>
Press G and H simultaneously to activate the frames on top of interactable elements.

Press G and H simultaneously again to disable the frames.

After enabling the frames, key tags are shown in the corner of each frame indicating which key you will have to press to interact with this element.
When the key you want is pressed, all frames that did not have this key will disappear and the elements that remain will show new keys.
this way you can narrow down quickly which element you want to interact with. Once there are no more combinations left, the element will be selected.