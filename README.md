# boids
A Vanilla JS implementation of Craig Reynolds's "Boids" flocking algorithm
![boids](https://user-images.githubusercontent.com/124934049/218286526-79b405f0-b447-4a1b-b5bf-31b7b33a2ef7.gif)

## Parameters
`TURN_FACTOR` : the factor at which a boid will turn to avoid a screen boundary

`TURN_PADDING` : the distance from a screen edge that a boid will begin turning away

`VISUAL_RANGE` : range of cohesion and alignment

`PROTECTED_RANGE` : range of separation

`CENTERING_FACTOR` : the factor of cohesion forces

`AVOID_FACTOR` : the factor of separation forces

`MATCHING_FACTOR` : the factor of alignment

More information about parameters at https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/boids.html
