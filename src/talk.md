# Generative Art

My name is Damoon and I am here to talk a bit about Generative Art, what it is, why I like it and why I think that it's a worthwhile endevour. The first half of this talk is going to be centered around the idea of generative art, and the second half will be a practicle hands on with examples and code, hopefully it will still be interesting to people who aren't familiar with software development.

---

# Who Am I

Quickly about me, my name is Damoon Rashidi and I work as a Lead Developer at Freespee, which is a Communication Platform as a Service that was founded here in Uppsala, (and we're currently hiring engineers so checkout freespee.com)

For the last few years I've also been doing generative art and I've been fortunate enough to sell a number of pieces as NFTs.

I'm also a all around fun guy.

---

# What is generative art.

So the general concept behind generative art is that you provide the computer with a set of rules and steps to generate a pattern or painting, sometimes with a bit of randomness thrown in and the computer will create something that is hopefully pleasing to look at.

# Frameworks

There are a lot of ways to achieve this, and people have written some nice frameworks and tools to help you do it. Processing is one option that has it's own javascript-like language and editor. P5.js is a library if you want to write in javascript. There are even visual programming environments like TouchDesigner that lets you drag and drop nodes and connect them to achieve a result.

I personally like to use the general purpose programming language Typescript and the HTML Canvas API, and the practical examples later in this workshop will use that for the examples as well. The general ideas are translatable to whatever environment you chose.

---

As long as your preferred language can put a pixel on the screen it is suitable to do generative art in.

# Why generative Art

It is my belief that generative art is creative in a way that enterprise software development isn't. If you work as a software developer the day to day problems that you solve are usually in the same domain. Maybe you design a data storage solution, data extraction or transform layer, a client to display the data and manipulate it a bit and then shuffle the data back to storage. REST, GraphQL, react, angular, HTTP and so on. This is great for enterprise software development because you can develop best practices and everyone is on the same page on how to go about things.

The goal of generative art however is not to produce scalable, maintainable enterprise solutions, the code is just a tool to achieve a result and you are free to go about it using even the worst practices, or most inefficient solutions if you want.

It's also exploratory, maybe you don't know exactly what kind of art you want to create, but rather have a specific method you want to implement or a question like "what happens if I randomly split a circle at different angles and then split those slices at different angles", you can then play around with different parameters for that to see what happens and learn and change as you go.

---

# Examples

These first images are all from a single algorithm I created where I tried to explore the methods that I'll talk about more about in the code walkthrough in a bit.

This one was one of the first ones where I let the computer color a few regions on it's own based on what angle the lines started 

These first sets of images where all created by the same algorithm, just with different parameters.



And these second set of images were from another algorithm.

---

# A Practicle Example

This is where we dive into the code and theory behind how it can work, this is by no means the only way, but rather a showcase of how different techniques can be combined to achive a result that is pleasing to look at, at least to me.

---

# We'll build this

This image was entirely constructed by the computer with only very few, easy to understand rules. The main driving force behind this image is called a noise function.

---

# Noise functions

A noise function is a function that takes a position on a 2D plane and returns a value between -1 and 1 so that the surrounding points have very similar, but not equal, values. We can see that that in the preview to the right here. for the point in the upper left corner, position [0, 0] we get a value of 0. and for the surrounding points we get values that are close to zero, and the further out we go the bigger the difference. And that's true for any given point, the surrounding points will have very similar values. 

The noise function also takes a third parameter, the seed, which gives us a bit of control over the randomness. All the seed tells does that for the same seed the noise function will always return the same values for a given point. Change the seed and you will get different results.

# Noise function visualization

We can visualize the noise function in a different way by drawing a grid of lines. Here we start in the upper left corner and go line for for line until we hit the lower right part of the canvas.

We draw a line that is angled in the direction of the noise value for the point where the little circle is. Right off the bat this doesn't look too pleasing, this is because, from the noise functions point of view, these points are too far apart to return similar values.

We can see that for these two given points even if it looks like they are fairly close on screen, the distance between them being only 7 pixels, the noise function for them returns wildly different values. We can smooth this out by dividing the x and y values for both points by a sufficiently large constant and doing so will also decrease the distance between them.

We can start to see a pattern emerge, and the resulting flow field will be a lot more pleasing.

We also have this turbulance factor that we can play with, and all that does is multiply the noise value by a factor and it will make lines that turn a little turn a lot.

Just playing around with these dials gives us information and ideas about how the noise function works and how it can be used to create interesting patterns.

# Flow Vizualization
Instead of drawing a grid of angled lines, we start a line at a random point on the canvas, and then say while that point is not outside the canvas, sample the noise value for that point and move a set distance in that direction. Reapat that process until we're at the edge of the canvas.

The bigger the step we take the more jagged the line will look, but if we take very small steps it'll look like a nice smooth line.

Now we can add more lines and still play around with the parameters from before start to see how we can create the same patterns but very different results.

Even if this is only a few black lines on the canvas, what we've really established here are two things. The first is a set or rules that the computer can follow to produce a set wide variety of results, and the other less tangible thing is some sort of exploratory interplay where we see and learn what happens with the result as we go along. Perhaps we liked one smoothness value over another, or we perfer more or less turbulance. The input/output cycle of generative art is what I really like.

# Forces vizualization

Now that we can draw lines through the flow field, we can expand even further. We can say that a line consists of multiple circles instead. And just like before we can control the distance in each step by changing the step size.

If the distance between the points is low enough, it will still look like a line, or we can increase the distance to get a different effect. All the same rules from earlier still apply, we are just drawing them differently.

We can also achieve a nice effect if we keep track all the circles we've drawn. We can now say that if the circle we are about to draw overlaps with any of the circles we've drawn before, we don't draw it and stop the line and move on to the next.

This brings a kind of neatness to the field that I really enjoy, it makes it look ordered while still very organic.

# Colors

Have still not touched on colors yet, and just like before it's an exploratory process. Since we hace the help of the computer we can do things like set up a color palette and let the computer randomly pick a color for every line.

There are a lot of different ways to decide how to color this thing that isn't just by line. We can divide the canvas into regions, assign each region a color and then say whatever region the line starts in, we'll assign that line that color.

Now we can put all those different techniques together and we have an algorithm that can produce a wide variaty of results. 