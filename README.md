# sab-react-ts
This is my code repo as I worked through Newline.co's [FullStack React with TypeScript](https://www.newline.co/fullstack-react-with-typescript) book.

I have experience with FlowJS from my time at Facebook, but wanted to learn how to use TypeScript - turns out, pretty similar but also better.

When I learned ReactJS back in 2018 it was a time when functional and pure components were new and preferred but before the hooks ecosystem had been launched. I also neglected to dive into Redux as a central state store. And I didn't even bother trying to go with TypeScript or Flow, thinking this would all be easier for me and require less learning time.

Oh boy, if there were two things I could tell myself before I started my [metric-teacher](https://github.com/TiE23/metric-teacher) project it would be: "Use TypeScript and use Redux." There were complicated objects and state management that would've saved me days worth of time if I had type checking to keep me from writing tons of docs and needing to closely check things whenever I adjusted shapes. And Redux, oh my god, would've let me not have to pass functions and values down three, four, five, or heck, maybe even six layers within the most complicated portions of my site.

I learned to use hooks during my time (June 2019 to June 2021) at Facebook as a contractor, but we were stuck with using FlowJS, which is honestly really only used at Facebook from the looks of things. Entirely servicable. But the lack of Redux and instead a mixture of central state managers extending from Flux made life a bit un-fun.
