# boids
A Vanilla JS implementation of Craig Reynolds's "Boids" flocking algorithm

## Parameters
`TURN_FACTOR` : the factor at which a boid will turn to avoid a screen boundary

`TURN_PADDING` : the distance from a screen edge that a boid will begin turning away

`VISUAL_RANGE` : range of cohesion and alignment

`PROTECTED_RANGE` : range of separation

`CENTERING_FACTOR` : the factor of cohesion forces

`AVOID_FACTOR` : the factor of separation forces

`MATCHING_FACTOR` : the factor of alignment

More information about parameters at https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/boids.html