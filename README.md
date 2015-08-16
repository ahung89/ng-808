# NG-808

![NG-808 preview](https://texel-monosnap.s3.amazonaws.com/ng-808_2015-08-16_11-37-29.png)

### What is it?

NG-808 is a drum machine written using Angular.js that runs in your browser.

### What can it do?

What can't it do! NG-808 can play back sequences up to 32 steps, and comes pre-loaded with some choice sequences courtesy of [Rob Ricketts](http://robricketts.bigcartel.com/). Unlike the original 808, each step also allows for 2 velocities, which is as many as any robot drummer should need. Individual parts can be looped in lengths of 2, 4, 8, 16 or 32 bars, thus making hat programming dead simple. Finally, taking further cues from the TR-909, the user can set a "swing" parameter, offering many new groove possibilities.

### Are there any cool tricks?

Why yes, thanks for asking! Clicking on the header for any step will seek to and play that step. Furthermore, clicking on the word "pattern" will reveal a button that allows you to dump the current pattern to the console for easy sharing with friends and acquaintences. Clicking on the name of a drum part will trigger that part (the Y-offset of the click controls volume). Lastly, if you prefer the original 808-style of sequencing, with no accent notes, you can hold down the `shift` key while clicking on a sequence step to achieve full volume with just one click.

### I'm convinced. How can I test it out?

You have two options. If you'd like to test out a live demo head over to http://quadrantsound.com/ng-808/

If you'd like to run it yourself, clone this project then run

```
$ lineman run
```

And navigate to http://localhost:8000/

### It doesn't work :(

In order to run it locally, you need to have Ruby and the Sass gem installed. Assuming you already have Ruby, just run

```
$ gem install sass
```

And try again.
