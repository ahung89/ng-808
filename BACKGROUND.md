* How much time did you spend on the exercise, what parts took longer?

I started work on Tuesday evening, and couldn't leave it alone until Saturday. All told, I'm probably about 25 hours in, but it was so much fun to work on I had to keep going back and adding stuff.

The longest stretches were spent, as usual, researching the tools and becoming familiar with them. Starting out, I burned a bit of time just getting the dev environment set up. I started out with `ng-boilerplate` which proved to be a bit more heavy-handed than necessary, but it allowed me to write the first couple of models using TDD. I later moved to `lineman` which has been much nicer.

This is my first Angular project, so I had to come to terms with the framework, figure out how to use directives, and think hard about how to best organize the code.

* What were the hard parts, what parts did you enjoy most?

I ran into surprisingly few roadblocks once I had momentum, and I'm going to place credit for that solely on Angular. This project is a pretty good impedance match for the framework, and I'm not used to getting this much done with this little code (in JavaScript).

There were a couple of snags, though. When I first set out to implement visual feedback for looping/ghost patterns, I ran into an issue with `ng-repeat` - apparently it's very difficult to get Angular to represent the same object multiple times in an iterator. Even if you have it key by `$index`, the bindings still didn't appear to work correctly. I ended up solving that problem by creating a `DummySequenceEvent` type that proxies to an underlying `SequenceEvent`. Once that was in place, the Angular property observers did their jobs beautifully. This also gave me an opportunity to learn about and use ES5 properties.

The next challenging piece was implementing the waveform visualizations. I had opted to use a third-party library for sound loading/playback since the Web Audio APIs are fairly low level and I didn't want to reinvent the wheel. While that was a great decision for bootstrapping a working drum machine, it limited my flexibility later on when I wanted to hook the output of each part into a visualizer.

I made a [different repo](https://github.com/texel/webaudio-test) to test out some ideas, and used the fantastic [Web Audio API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API) from MDN as a starting point. My goal was to build a longer waveform readout– the example code I started with only worked over short intervals (the length of the FFT window) so my `BufferOscilloscope` creates a longer buffer, and copies the short FFT buffer into it on a rolling window, while also scaling down the number of total points to the number of pixels in the destination canvas. It works *pretty* well, but there's still some weirdness with overlaps in the analysis window which causes visible waveform discontinuities at higher zoom levels. Furthermore, short samples without trailing silence cause the readout to get "stuck" and repeat. The latter was solved very pragmatically, by adjusting the window and adding some trailing silence to one of the samples, but I'd love to dig in later and solve it correctly.

Finally, I didn't want the oscilloscope to display all the time, so I built in some silence detection which causes the waveform to draw only when there's something interesting to show.

Oh, almost forgot to answer the second part of the question! I most enjoyed the immediate feedback every time a new feature was implemented. Turns out messing around with an in-browser drum machine is endlessly entertaining... I spend a ton of time just messing around and creating patterns.

* Data modeling - How did you model the concepts of songs and tracks/patterns, can you explain why?

I do a lot of work in traditional DAWs, so I already came into this project with a predisposed mental "object model" for a sequencer. I combined the concept of a `Track` and `Instrument` into a `Part` model, which holds onto exactly one `Sequence` full of `SequenceEvent`s. My first pass at writing `Sequence` simply had an `events` array with numeric levels, but it quickly became apparent that a `SequenceEvent` would need to be maniuplated as an object, and I can also envision many other useful properties than just `level` (though that's all it has for now).

The top-level model is the `DrumMachine` which holds a reference to a `Clock`, a collection of `Part`s, and a `masterPart` which produces no sound but keeps track of the overall current position. Separating domain models out like this proved to be super useful since I was able to start developing and testing them independently of each other. The tests were particularly invaluable early on while nailing down the behavior of the `Clock` and `Sequence`s.

Early on, I thought of a `Sequence` as a simple iterator and tried to only access its values through `next()`, but on later reflection, I had to provide random access to its contents and re-implement `next()` and `previous()` in terms of the more flexible `seekTo()`.


* Simplicity vs Flexibility - How flexible is your solution? Can a user define patterns of different lengths? Can they play at the same time? Can the patterns be changed in real time? Can the velocity be set? None of these features are expected, what is needed for you to add support for these?

The solution is as flexible as time allowed :) I made the decision early on to work with a fixed number of parts and steps, since I wanted this to work and act like a traditional drum machine. The models themselves could be used to implement a more flexible version, for instance one that allows an arbitrary number or arrangement of tracks. The sequences themselves can also be of arbitrary lengths, though the current interface only loops properly with powers of 2. That being said, it's super useful being able to set the loop length of a sequence since it makes short repeating patterns far easier to program.

Right now, a `Part` can only have one `Sequence` - it might be cool to introduce a `Timeline` abstraction that allows multiple `Sequence`s to co-exist on the same `Part`.

Patterns can be changed on the fly, but there's still a bit of bugginess keeping track of the current time index. If that happens, hit the stop button twice to reset everything to 0, and it should work fine the next time you hit play.

Velocity can be set arbitrarily (floating point values between `0.0` and `1.0`) but I made the conscious decision to limit it in the interface to `0.0`, `0.5`, and `1.0`. More of an old school drum machine feel that way. You can test out a hit at any volume by clicking anywhere in the part label in the left-most column - the higher you click, the louder the sound wil play.

* Is your code tested? Why/why not? How would you test it (or better)?

Some of the model code is tested, but a lot of the interface code isn't. I'm pretty new to testing in JavaScript, but in Ruby, I hardly ever write code that's not test-first. I'm pretty excited about Angular's emphasis on testability, but I still didn't opt to test anything in the controller this time around (though it's probably a good idea). As it happened, I decided to test "infrastructure" code that wasn't easy to verify in the interface, which saved a lot of time, but I'm not convinced that testing the helpers would have saved a similar amount of time (though, in a production app it would act as a safety net against regressions).
